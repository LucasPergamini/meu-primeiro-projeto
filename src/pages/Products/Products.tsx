import { useEffect, useState } from 'react';
import './Products.css';
import { fetchFakeStoreProducts, type FakeStoreProduct } from '../../services/fakeStoreApi';

type CartProduct = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type ProductsProps = {
  onAddToCart: (product: CartProduct) => void;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, index) => (index < Math.round(rating) ? '★' : '☆')).join('');

export default function Products({ onAddToCart }: ProductsProps) {
  const [products, setProducts] = useState<FakeStoreProduct[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const items = await fetchFakeStoreProducts();
        setProducts(items);
      } catch (err) {
        setError((err as Error).message || 'Erro ao carregar produtos');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const selectedProduct = products.find((item) => item.id === selectedProductId) ?? null;

  const handleSelectProduct = (productId: number) => {
    setSelectedProductId(productId);
  };

  const handleBack = () => {
    setSelectedProductId(null);
  };

  const handleRatingChange = (productId: number, rating: number) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, rating: { ...product.rating, rate: rating } } : product
      )
    );
  };

  if (isLoading) {
    return <div className="loading-message">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      {selectedProduct ? (
        <section className="product-detail-section">
          <button onClick={handleBack} className="back-button">
            Voltar
          </button>

          <article className="product-detail-card">
            <h1 className="product-detail-title">{selectedProduct.title}</h1>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="product-detail-image" />
            <p className="product-detail-text">{selectedProduct.description}</p>
            <p className="product-price">{formatPrice(selectedProduct.price)}</p>
            <p className="product-meta">Categoria: {selectedProduct.category}</p>
            <div className="product-rating-row">
              <span className="product-stars">{renderStars(selectedProduct.rating.rate)}</span>
              <span className="rating-value">{selectedProduct.rating.rate.toFixed(1)} ({selectedProduct.rating.count} avaliações)</span>
            </div>
            <div className="rating-section">
              <p className="rating-title">Avalie este produto:</p>
              <div className="rating-buttons">
                {Array.from({ length: 5 }, (_, index) => {
                  const value = index + 1;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleRatingChange(selectedProduct.id, value)}
                      className="rating-star"
                      style={{ color: value <= selectedProduct.rating.rate ? '#D4AF37' : '#ccc' }}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
              <p className="rating-value">Nota selecionada: {selectedProduct.rating.rate.toFixed(1)} / 5</p>
            </div>
            <div className="product-actions">
              <button onClick={() => alert(`Comprar agora: ${selectedProduct.title}`)} className="action-button buy-button">
                Comprar agora
              </button>
              <button onClick={() => {
                onAddToCart({
                  id: selectedProduct.id,
                  title: selectedProduct.title,
                  price: selectedProduct.price,
                  image: selectedProduct.image
                });
                alert(`Adicionado ao carrinho: ${selectedProduct.title}`);
              }} className="action-button cart-button">
                Colocar no carrinho
              </button>
            </div>
          </article>
        </section>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-copy">{product.category}</p>
              <div className="rating-row">
                <span className="rating-stars">{renderStars(product.rating.rate)}</span>
                <span className="rating-value">{product.rating.rate.toFixed(1)}</span>
              </div>
              <div className="product-footer">
                <p className="product-price">{formatPrice(product.price)}</p>
                <button className="primary-button" onClick={() => handleSelectProduct(product.id)}>
                  Saiba Mais
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
