import React from 'react';
import './ProductCard.css';
import { Product } from './data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onLike?: (id: number) => void;
  isLiked?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onLike,
  isLiked = false,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? 'filled' : 'empty'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <button
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={() => onLike?.(product.id)}
          aria-label="Like product"
        >
          ♡
        </button>
        <span className="product-category">{product.category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <div className="stars">{renderStars(product.rating)}</div>
          <span className="review-count">({product.reviews})</span>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">
            R$ {product.price.toLocaleString('pt-BR')}
          </span>
          <button
            className="add-to-cart-button"
            onClick={() => onAddToCart(product)}
            aria-label="Add to cart"
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
