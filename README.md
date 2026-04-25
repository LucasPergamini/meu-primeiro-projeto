# Meu Primeiro Projeto - E-commerce com Autenticação

Este projeto é um aplicativo de e-commerce simples construído com React, TypeScript e Vite, agora incluindo um sistema de autenticação com backend Node.js e banco de dados SQLite.

## Funcionalidades

- Visualização de produtos
- Carrinho de compras
- Sistema de login e registro de usuários
- Banco de dados SQLite para armazenar usuários

## Como executar

### Pré-requisitos

- Node.js instalado
- npm ou yarn

### Instalação

1. Clone ou baixe o projeto
2. Instale as dependências:

```bash
npm install
```

### Executando o Backend

O backend fornece APIs para registro e login de usuários.

```bash
npm run server
```

O servidor será executado em `http://localhost:3001`.

### Executando o Frontend

```bash
npm run dev
```

O aplicativo será executado em `http://localhost:5173`.

### Uso

1. Abra o navegador em `http://localhost:5173`
2. Clique em "Login" no header
3. Para criar uma conta, clique em "Não tem conta? Registre-se"
4. Preencha os campos: Nome de usuário, E-mail, Senha e Confirmar Senha
5. Após registrar, faça login com seu e-mail e senha

## Estrutura do Projeto

- `src/`: Código fonte do frontend React
- `backend/`: Servidor Node.js com APIs
- `public/`: Arquivos estáticos
- `src/data/`: Dados mock dos produtos

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, SQLite
- **Outros**: Axios para requisições HTTP, bcryptjs para hash de senhas
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
