import './Status.css';

type StatusProps = {
  email: string;
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

export default function Status({ email }: StatusProps) {
  const name = formatUserName(email);

  return (
    <section className="status-card">
      <h3 className="status-title">Status do Usuário</h3>
      <div className="status-content">
        <div className="status-item">
          <span className="status-label">Nome</span>
          <span className="status-value">{name}</span>
        </div>
        <div className="status-item">
          <span className="status-label">E-mail</span>
          <span className="status-value">{email}</span>
        </div>
        <div className="status-item">
          <span className="status-label">Nível</span>
          <span className="status-value">Membro Ouro</span>
        </div>
        <div className="status-item">
          <span className="status-label">Pontos VIP</span>
          <span className="status-value">320 pontos</span>
        </div>
        <div className="status-item">
          <span className="status-label">Data de Cadastro</span>
          <span className="status-value">23 de abril de 2026</span>
        </div>
      </div>
    </section>
  );
}
