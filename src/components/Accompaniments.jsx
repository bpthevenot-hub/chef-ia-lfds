import { useState } from 'react';
import PhotoCard from './PhotoCard';
import { STARCHES, SIDES } from '../data/foods';
import '../styles/components/Accompaniments.css';

export default function Accompaniments({ state, updateState, onValidate }) {
  const [freeText, setFreeText] = useState('');

  const handleValidate = () => {
    updateState({ freeText });
    if (!state.starch && !state.side && !freeText.trim()) return;
    onValidate();
  };

  return (
    <div className="screen-inner">
      <div className="step-label">— Étape 2 —</div>
      <h2 className="title">
        Vos <span className="accent">accompagnements</span>
      </h2>
      <p className="subtitle">Composez votre assiette.</p>

      <div className="section-label">Féculents</div>
      <div className="accomp-row">
        {STARCHES.map((item) => (
          <PhotoCard
            key={item.id}
            photo={item.photo}
            name={item.name}
            sub={item.sub}
            icon={item.id === 'frites' ? 'frites' : 'potato'}
            selected={state.starch === item.id}
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(10);
              updateState({ starch: state.starch === item.id ? '' : item.id });
            }}
          />
        ))}
      </div>

      <div className="section-label">Accompagnement</div>
      <div className="accomp-row">
        {SIDES.map((item) => (
          <PhotoCard
            key={item.id}
            photo={item.photo}
            name={item.name}
            sub={item.sub}
            icon={item.id === 'pates' ? 'pasta' : 'greens'}
            selected={state.side === item.id}
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(10);
              updateState({ side: state.side === item.id ? '' : item.id });
            }}
          />
        ))}
      </div>

      <div className="input-wrap">
        <span className="input-icon">✍</span>
        <input
          type="text"
          className="free-input"
          placeholder="Ou écrivez ce que vous voulez..."
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
        />
      </div>

      <button className="btn-primary" onClick={handleValidate} style={{ marginTop: '1rem' }}>
        C'est parti, Chef !
      </button>
    </div>
  );
}
