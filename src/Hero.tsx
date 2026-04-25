import React from 'react';
import './Hero.css';

interface HeroProps {
  onShopClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Lucid Jewels</h1>
        <p className="hero-subtitle">Elegância e Sofisticação em Cada Detalhe</p>
        <p className="hero-description">
          Colecção exclusiva de jóias de luxo, cuidadosamente selecionadas para momentos inesquecíveis
        </p>
        <button className="hero-button" onClick={onShopClick}>
          Explorar Colecção
        </button>
      </div>
    </section>
  );
};

export default Hero;
