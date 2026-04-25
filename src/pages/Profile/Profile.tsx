import Status from '../../components/Status/Status';
import Pedidos from '../../components/Pedidos/Pedidos';
import './Profile.css';

type ProfileProps = {
  email: string;
  onLogout: () => void;
  onBackToProducts: () => void;
};

const formatUserName = (email: string) => {
  const rawName = email.split('@')[0] || email;
  return rawName
    .replace(/[._]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
};

export default function Profile({ email, onLogout, onBackToProducts }: ProfileProps) {
  const name = formatUserName(email);

  return (
    <div className="profile-container">
      <section className="profile-card">
        <div className="profile-section profile-profile">
          <div className="profile-header">
            <div className="profile-avatar">{name.charAt(0)}</div>
            <div>
              <h2 className="profile-name">{name}</h2>
              <p className="profile-email">{email}</p>
            </div>
          </div>
          <p className="profile-summary">Este é o seu painel pessoal. Aqui você visualiza seu perfil, seu status e o histórico de pedidos.</p>
        </div>

        <div className="profile-actions">
          <button type="button" className="profile-back-button" onClick={onBackToProducts}>
            Voltar aos Produtos
          </button>
          <button type="button" className="profile-logout-button" onClick={onLogout}>
            Sair da conta
          </button>
        </div>
      </section>

      <Status email={email} />
      <Pedidos />
    </div>
  );
}
