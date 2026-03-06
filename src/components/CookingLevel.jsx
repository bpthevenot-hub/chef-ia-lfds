import { COOKING_LEVELS } from '../data/foods';
import '../styles/components/CookingLevel.css';

export default function CookingLevel({ selected, onSelect, category }) {
  // Only show for viande
  const showLevels = category === 'viande';

  if (!showLevels) {
    // Auto-skip for non-meat
    return null;
  }

  return (
    <div className="screen-inner">
      <div className="step-label">— Cuisson —</div>
      <h2 className="title">
        Votre <span className="accent">cuisson</span>
      </h2>
      <p className="subtitle">Comment aimez-vous votre viande ?</p>

      <div className="cooking-levels">
        {COOKING_LEVELS.map((level) => (
          <button
            key={level.id}
            className={`cooking-level${selected === level.id ? ' cooking-level--selected' : ''}`}
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(10);
              onSelect(level.id);
            }}
          >
            <div className="cooking-level__indicator" style={{ background: level.color }} />
            <div className="cooking-level__info">
              <span className="cooking-level__name">{level.name}</span>
              <span className="cooking-level__sub">{level.sub}</span>
            </div>
            <span className="cooking-level__emoji">{level.emoji}</span>
            {selected === level.id && <span className="cooking-level__check">✓</span>}
          </button>
        ))}
      </div>

      {/* Visual meat cross-section */}
      <div className="meat-preview">
        <div className="meat-cross-section">
          {COOKING_LEVELS.map((level) => (
            <div
              key={level.id}
              className={`meat-section${selected === level.id ? ' meat-section--active' : ''}`}
              style={{
                '--meat-color': level.color,
                '--meat-opacity': selected === level.id ? 1 : 0.2,
              }}
            />
          ))}
        </div>
        <div className="meat-label">
          {selected ? COOKING_LEVELS.find(l => l.id === selected)?.name : 'Choisissez'}
        </div>
      </div>
    </div>
  );
}
