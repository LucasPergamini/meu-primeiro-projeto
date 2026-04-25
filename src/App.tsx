import { useState, useEffect } from 'react';
import Header from './Header';
import Login from './Login';
import Profile from './Profile';
import Carrinho from './Carrinho';
import Products from './Products';
import './App.css';

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartProduct = Omit<CartItem, 'quantity'>;

const App: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'products' | 'profile'>('products');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user && !userName) {
      const userData = JSON.parse(user);
      setUserName(userData.username);
    }
  }, [userName]);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleLogin = (_email: string) => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.username);
    }
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserName(null);
    setCurrentView('products');
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleAddToCart = (product: CartProduct) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  return (
    <div className="app-container">
      <Header
        userName={userName}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
        onCartClick={handleCartClick}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />
      {currentView === 'products' ? (
        <>
          <h1 className="app-title">Produtos</h1>
          <Products onAddToCart={handleAddToCart} />
        </>
      ) : (
        userName && <Profile email={userName} onLogout={handleLogout} onBackToProducts={handleBackToProducts} />
      )}
      <Login isOpen={isLoginOpen} onClose={handleCloseLogin} onLogin={handleLogin} />
      <Carrinho
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default App;
