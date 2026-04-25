import React from 'react';
import './Header.css';

type HeaderProps = {
  userName: string | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onCartClick: () => void;
  cartItemCount: number;
};

const Header: React.FC<HeaderProps> = ({ userName, onLoginClick, onLogout, onProfileClick, onCartClick, cartItemCount }) => {
  return (
    <header className="header">
      <img src="/src/data/logo.png" alt="Lojas Luisa Logo" className="logo-image" />
      <nav>
        <ul className="nav-links">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/produtos" className="nav-link">Produtos</a></li>
          <li><a href="/sobre" className="nav-link">Sobre</a></li>
        </ul>
      </nav>
      <div className="header-actions">
        {userName ? <span className="user-badge">Olá, {userName}</span> : null}
        {userName ? (
          <button type="button" className="header-button icon-button profile-button" onClick={onProfileClick} title="Perfil">
            <img src="/src/data/perfil.png" alt="Perfil" className="button-icon" />
          </button>
        ) : null}
        <button type="button" className="header-button icon-button login-button" onClick={userName ? onLogout : onLoginClick} title={userName ? 'Sair' : 'Login'}>
          <img src="/src/data/login.png" alt={userName ? 'Sair' : 'Login'} className="button-icon" />
        </button>
        <button type="button" className="header-button icon-button header-cart-button" onClick={onCartClick} title="Carrinho">
          <img src="/src/data/carrinho.png" alt="Carrinho" className="button-icon" />
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;