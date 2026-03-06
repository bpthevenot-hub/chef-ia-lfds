import { useState } from 'react';
import { SAUCE_LEVELS, JAR_URL } from '../data/foods';
import '../styles/components/SauceQuantity.css';

export default function SauceQuantity({ selected, onSelect }) {
  const [hoveredId, setHoveredId] = useState(null);
  const activeLevel = SAUCE_LEVELS.find((l) => l.id === (hoveredId || selected));
  const sauceAmount = activeLevel ? activeLevel.amount : 0.6;

  return (
    <div className="screen-inner">
      <div className="step-label">— Étape 3 —</div>
      <h2 className="title">
        Votre <span className="accent">dosage</span>
      </h2>
      <p className="subtitle">Quelle quantité d'Harmonie Secrète ?</p>

      {/* Sauce visual preview */}
      <div className="sauce-preview">
        <div className="sauce-jar-mini">
          <img src={JAR_URL} alt="Harmonie Secrète" />
        </div>
        <div className="sauce-pour-visual">
          <div
            className="sauce-stream"
            style={{ height: `${sauceAmount * 80}px`, opacity: sauceAmount }}
          />
          <div
            className="sauce-pool"
            style={{
              transform: `scale(${0.5 + sauceAmount * 0.5})`,
              opacity: 0.6 + sauceAmount * 0.4,
            }}
          />
        </div>
        {/* Sauce info tooltip */}
        <div className="sauce-info">
          <span>Beurre aux herbes fraîches</span>
          <span className="sauce-info__dot">·</span>
          <span>70% beurre</span>
          <span className="sauce-info__dot">·</span>
          <span>Sans additifs</span>
        </div>
      </div>

      {/* Sauce level options */}
      <div className="sauce-options">
        {SAUCE_LEVELS.map((level) => (
          <button
            key={level.id}
            className={`sauce-option${selected === level.id ? ' sauce-option--selected' : ''}`}
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(10);
              onSelect(level.id);
            }}
            onMouseEnter={() => setHoveredId(level.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <span className="sauce-option__emoji">{level.emoji}</span>
            <span className="sauce-option__name">{level.name}</span>
            <span className="sauce-option__sub">{level.sub}</span>
            {selected === level.id && (
              <span className="sauce-option__check">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
