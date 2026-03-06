import { useEffect, useRef } from 'react';
import Jar3D from './Jar3D';
import { LOGO_URL } from '../data/foods';
import '../styles/components/Welcome.css';

export default function Welcome({ onStart }) {
  const particlesRef = useRef(null);

  useEffect(() => {
    // Create floating particles
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 8 + 's';
      p.style.animationDuration = (6 + Math.random() * 6) + 's';
      p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
      container.appendChild(p);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  return (
    <div className="welcome">
      <div className="particles" ref={particlesRef} />
      <div className="screen-inner">
        <img
          src={LOGO_URL}
          alt="La Française des Sauces"
          className="welcome-logo"
        />
        <div className="welcome-tri" />
        <h1 className="welcome-title">
          Les recettes de<br />
          La Française <span className="accent">Des Sauces</span>
        </h1>
        <div className="welcome-cta">
          <button className="btn-primary" onClick={onStart}>
            Créer votre plat
          </button>
        </div>
        <Jar3D />
        <div className="jar-hint">↔ Glissez pour tourner</div>
      </div>
    </div>
  );
}
