import { PLATING_STYLES } from '../data/foods';
import '../styles/components/PlatingStyle.css';

export default function PlatingStyle({ selected, onSelect }) {
  return (
    <div className="screen-inner">
      <div className="step-label">— Dressage —</div>
      <h2 className="title">
        Votre <span className="accent">style</span>
      </h2>
      <p className="subtitle">Comment dresser votre assiette ?</p>

      <div className="plating-options">
        {PLATING_STYLES.map((style) => (
          <button
            key={style.id}
            className={`plating-option${selected === style.id ? ' plating-option--selected' : ''}`}
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(10);
              onSelect(style.id);
            }}
          >
            <div className="plating-option__emoji">{style.emoji}</div>
            <div className="plating-option__info">
              <div className="plating-option__name">{style.name}</div>
              <div className="plating-option__sub">{style.sub}</div>
            </div>
            <div className="plating-option__desc">{style.desc}</div>
            {selected === style.id && (
              <div className="plating-option__badge">
                <span>✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
