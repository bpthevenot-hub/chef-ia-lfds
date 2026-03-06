import PhotoCard from './PhotoCard';
import { CATEGORIES } from '../data/foods';
import '../styles/components/CategorySelect.css';

export default function CategorySelect({ selected, onSelect }) {
  return (
    <div className="screen-inner">
      <div className="step-label">— Étape 1 —</div>
      <h2 className="title">
        Votre <span className="accent">protéine</span>
      </h2>
      <p className="subtitle">Que souhaitez-vous déguster ?</p>

      <div className="category-grid">
        {CATEGORIES.map((cat) => (
          <PhotoCard
            key={cat.id}
            photo={cat.photo}
            name={cat.name}
            sub={cat.sub}
            icon={cat.icon}
            selected={selected === cat.id}
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(10);
              onSelect(cat.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
