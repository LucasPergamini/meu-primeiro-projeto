import { useState } from 'react';
import axios from 'axios';
import './Login.css';

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
};

export default function Login({ isOpen, onClose, onLogin }: LoginProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      if (response.data.message === 'Login bem-sucedido') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLogin(email, password);
        onClose();
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setError(error.response?.data?.error || 'Erro ao fazer login');
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Senhas não coincidem');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/register', { username, password, email });
      if (response.data.message === 'Usuário registrado com sucesso') {
        alert('Registro bem-sucedido! Faça login.');
        setIsRegister(false);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setError(error.response?.data?.error || 'Erro ao registrar');
    }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="login-close-button" onClick={onClose}>
          ×
        </button>
        <div className="login-header">
          <h2 className="login-title">{isRegister ? 'Criar conta' : 'Entrar na sua conta'}</h2>
          <p className="login-description">
            {isRegister ? 'Crie sua conta para acessar o sistema.' : 'Use seu e-mail e senha para acessar seu perfil e seus dados.'}
          </p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <form className="login-form" onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}>
          {isRegister && (
            <label className="login-label">
              Nome de usuário
              <input
                className="login-input"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Seu nome de usuário"
                required
              />
            </label>
          )}

          <label className="login-label">
            E-mail
            <input
              className="login-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@exemplo.com"
              required
            />
          </label>

          <label className="login-label">
            Senha
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required
            />
          </label>

          {isRegister && (
            <label className="login-label">
              Confirmar Senha
              <input
                className="login-input"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="********"
                required
              />
            </label>
          )}

          <button type="submit" className="login-submit-button">
            {isRegister ? 'Criar conta' : 'Entrar'}
          </button>
        </form>

        <button type="button" className="toggle-button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Já tem conta? Faça login' : 'Não tem conta? Registre-se'}
        </button>
      </div>
    </div>
  );
}
