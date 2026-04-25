import { useState } from 'react';
import axios from 'axios';
import './Carrinho.css';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CarrinhoProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function Carrinho({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}: CarrinhoProps) {
  const [isCheckout, setIsCheckout] = useState(false);

  if (!isOpen) {
    return null;
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem(id);
    } else {
      onUpdateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckout(true);
  };

  const handleConfirmPurchase = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para finalizar a compra.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/orders', {
        products: cartItems,
        total: totalPrice
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert(`Compra realizada com sucesso! Pedido #${response.data.orderId}`);
      // Limpar carrinho após compra
      cartItems.forEach(item => onRemoveItem(item.id));
      onClose();
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert('Erro ao finalizar compra. Tente novamente.');
    }
  };

  return (
    <div className="carrinho-overlay" onClick={onClose}>
      <div className="carrinho-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="carrinho-close-button" onClick={onClose}>
          ×
        </button>

        <div className="carrinho-header">
          <h2 className="carrinho-title">
            {isCheckout ? 'Finalizar Compra' : 'Carrinho de Compras'}
          </h2>
          {!isCheckout && (
            <span className="carrinho-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          )}
        </div>

        {!isCheckout ? (
          <>
            <div className="carrinho-content">
              {cartItems.length === 0 ? (
                <div className="carrinho-empty">
                  <p className="carrinho-empty-text">Seu carrinho está vazio</p>
                  <p className="carrinho-empty-subtext">Adicione produtos para começar suas compras!</p>
                </div>
              ) : (
                <div className="carrinho-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="carrinho-item">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="carrinho-item-image"
                      />
                      <div className="carrinho-item-details">
                        <h3 className="carrinho-item-title">{item.title}</h3>
                        <p className="carrinho-item-price">{formatPrice(item.price)}</p>
                        <div className="carrinho-item-controls">
                          <button
                            type="button"
                            className="quantity-button"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            type="button"
                            className="quantity-button"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="carrinho-footer">
                <div className="carrinho-total">
                  <span className="total-label">Total:</span>
                  <span className="total-value">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  type="button"
                  className="checkout-button"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="checkout-content">
            <div className="checkout-summary">
              <h3>Resumo da Compra</h3>
              <div className="checkout-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <span>{item.title} (x{item.quantity})</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="checkout-total">
                <span>Total: {formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="checkout-actions">
              <button
                type="button"
                className="back-button"
                onClick={() => setIsCheckout(false)}
              >
                Voltar ao Carrinho
              </button>
              <button
                type="button"
                className="confirm-button"
                onClick={handleConfirmPurchase}
              >
                Confirmar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
