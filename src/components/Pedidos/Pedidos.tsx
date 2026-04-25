import { useState, useEffect } from 'react';
import axios from 'axios';
import './Pedidos.css';

type Order = {
  id: number;
  products: string; // JSON string
  total: number;
  created_at: string;
};

export default function Pedidos() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <section className="pedidos-card">
        <h3 className="pedidos-title">Histórico de Pedidos</h3>
        <div className="pedidos-content">
          <p>Carregando pedidos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pedidos-card">
      <h3 className="pedidos-title">Histórico de Pedidos</h3>
      <div className="pedidos-content">
        {orders.length === 0 ? (
          <div className="pedidos-empty">
            <p className="pedidos-empty-text">Você ainda não fez nenhum pedido.</p>
            <p className="pedidos-empty-subtext">Explore nossa loja e faça seu primeiro pedido!</p>
          </div>
        ) : (
          <div className="pedidos-list">
            {orders.map((order) => (
              <div key={order.id} className="pedido-item">
                <div className="pedido-header">
                  <span className="pedido-id">Pedido #{order.id}</span>
                  <span className="pedido-status">Concluído</span>
                </div>
                <div className="pedido-details">
                  <span className="pedido-date">{new Date(order.created_at).toLocaleDateString('pt-BR')}</span>
                  <span className="pedido-total">R$ {order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
