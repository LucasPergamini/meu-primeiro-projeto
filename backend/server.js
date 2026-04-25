import express from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-secret-key'; // Em produção, use uma variável de ambiente

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Criar tabela de usuários se não existir
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
)`);

// Middleware para verificar token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Endpoint para registrar usuário
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.run(sql, [username, hashedPassword, email], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Usuário ou email já existe' });
        }
        return res.status(500).json({ error: 'Erro ao registrar usuário' });
      }
      res.status(201).json({ message: 'Usuário registrado com sucesso', id: this.lastID });
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Endpoint para login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    if (!row) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const isValidPassword = await bcrypt.compare(password, row.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: row.id, email: row.email, username: row.username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login bem-sucedido', token, user: { id: row.id, username: row.username, email: row.email } });
  });
});

// Endpoint para criar pedido (protegido)
app.post('/orders', authenticateToken, (req, res) => {
  const { products, total } = req.body;
  const userId = req.user.id;

  if (!products || !total) {
    return res.status(400).json({ error: 'Produtos e total são obrigatórios' });
  }

  const sql = 'INSERT INTO orders (user_id, products, total) VALUES (?, ?, ?)';
  db.run(sql, [userId, JSON.stringify(products), total], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar pedido' });
    }
    res.status(201).json({ message: 'Pedido criado com sucesso', orderId: this.lastID });
  });
});

// Endpoint para obter pedidos do usuário (protegido)
app.get('/orders', authenticateToken, (req, res) => {
  const userId = req.user.id;

  const sql = 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
    res.json({ orders: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});