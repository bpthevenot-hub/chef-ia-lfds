import { useEffect, useRef, useState, useCallback } from 'react';
import { CATEGORIES, STARCHES, SIDES, COOKING_LEVELS, PLATING_STYLES, SAUCE_LEVELS, JAR_URL, PRODUCT_URL } from '../data/foods';
import ShareButton from './ShareButton';
import '../styles/components/FinalPlate.css';

const ALL_FOODS = [...CATEGORIES, ...STARCHES, ...SIDES];
const findFood = (id) => ALL_FOODS.find((f) => f.id === id);
const findLevel = (id) => COOKING_LEVELS.find((l) => l.id === id);
const findStyle = (id) => PLATING_STYLES.find((s) => s.id === id);
const findSauce = (id) => SAUCE_LEVELS.find((s) => s.id === id);

export default function FinalPlate({ state, onRestart }) {
  const sceneRef = useRef(null);
  const plateRef = useRef(null);
  const [cardVisible, setCardVisible] = useState(false);

  // Build food items list
  const foods = [];
  if (state.category) {
    const f = findFood(state.category);
    if (f) foods.push({ ...f, pos: 'food-protein' });
  }
  if (state.starch) {
    const f = findFood(state.starch);
    if (f) foods.push({ ...f, pos: 'food-starch' });
  }
  if (state.side) {
    const f = findFood(state.side);
    if (f) foods.push({ ...f, pos: 'food-side' });
  }

  // Recipe name
  const mainName = state.category === 'viande' ? 'Viande Dorée' :
    state.category === 'poisson' ? 'Poisson du Jour' : 'Légumes du Marché';
  const parts = [];
  if (state.starch) { const f = findFood(state.starch); if (f) parts.push(f.name); }
  if (state.side) { const f = findFood(state.side); if (f) parts.push(f.name); }
  if (state.freeText) parts.push(state.freeText);
  const recipeName = parts.length ? `${mainName} & ${parts.join(', ')}` : mainName;

  // Details (cooking level, plating, sauce)
  const cookingLevel = state.cookingLevel ? findLevel(state.cookingLevel) : null;
  const platingStyle = state.platingStyle ? findStyle(state.platingStyle) : null;
  const sauceLevel = state.sauceLevel ? findSauce(state.sauceLevel) : null;

  // Ingredients list
  const ingredients = foods.map((f) => ({ emoji: f.emoji, name: f.name }));
  if (state.freeText) ingredients.push({ emoji: '✨', name: state.freeText });
  ingredients.push({ emoji: '🧈', name: 'Harmonie Secrète' });

  // 3D rotation
  useEffect(() => {
    const scene = sceneRef.current;
    const plate = plateRef.current;
    if (!scene || !plate) return;

    let rx = 55, ry = 0, isDragging = false, lastX = 0, lastY = 0;
    let velX = 0, velY = 0, animFrame;

    function update() {
      plate.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }

    function onStart(x, y) {
      isDragging = true; lastX = x; lastY = y;
      velX = 0; velY = 0;
      cancelAnimationFrame(animFrame);
      scene.style.cursor = 'grabbing';
    }
    function onMove(x, y) {
      if (!isDragging) return;
      const dx = x - lastX, dy = y - lastY;
      ry += dx * 0.5; rx -= dy * 0.3;
      rx = Math.max(15, Math.min(75, rx));
      velX = dx * 0.5; velY = -dy * 0.3;
      lastX = x; lastY = y;
      update();
    }
    function onEnd() {
      isDragging = false;
      scene.style.cursor = 'grab';
      function inertia() {
        if (Math.abs(velX) < 0.1 && Math.abs(velY) < 0.1) return;
        ry += velX; rx += velY;
        rx = Math.max(15, Math.min(75, rx));
        velX *= 0.92; velY *= 0.92;
        update();
        animFrame = requestAnimationFrame(inertia);
      }
      inertia();
    }

    const md = (e) => { e.preventDefault(); onStart(e.clientX, e.clientY); };
    const mm = (e) => onMove(e.clientX, e.clientY);
    const mu = () => onEnd();
    const ts = (e) => { const t = e.touches[0]; onStart(t.clientX, t.clientY); };
    const tmv = (e) => { const t = e.touches[0]; onMove(t.clientX, t.clientY); };
    const te = () => onEnd();

    scene.addEventListener('mousedown', md);
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseup', mu);
    scene.addEventListener('touchstart', ts, { passive: true });
    window.addEventListener('touchmove', tmv, { passive: true });
    window.addEventListener('touchend', te);
    update();

    // Show recipe card
    setTimeout(() => setCardVisible(true), 600);

    return () => {
      cancelAnimationFrame(animFrame);
      scene.removeEventListener('mousedown', md);
      window.removeEventListener('mousemove', mm);
      window.removeEventListener('mouseup', mu);
      scene.removeEventListener('touchstart', ts);
      window.removeEventListener('touchmove', tmv);
      window.removeEventListener('touchend', te);
      setCardVisible(false);
    };
  }, [state]);

  return (
    <div className="screen-inner" style={{ paddingTop: '60px' }}>
      <div className="plate-scene" ref={sceneRef}>
        <div className="plate-3d" ref={plateRef}>
          <div className="plate-base" />
          <div className="plate-rim-outer" />
          <div className="plate-rim-inner" />
          <div className="plate-rim-gold" />
          <div className="plate-drizzle" />
          <div className="steam-group">
            <div className="steam-ln" />
            <div className="steam-ln" />
            <div className="steam-ln" />
          </div>
          <div className="plate-items">
            {foods.map((f, i) => (
              <div
                key={f.id}
                className={`plate-food ${f.pos}`}
                style={{ animationDelay: `${0.3 + i * 0.25}s` }}
              >
                <img
                  src={f.plateImg}
                  alt={f.name}
                  onError={(e) => {
                    e.target.outerHTML = `<div class="emoji-fb">${f.emoji}</div>`;
                  }}
                />
              </div>
            ))}
            {state.freeText && (
              <div className="plate-food food-extra" style={{ animationDelay: `${0.3 + foods.length * 0.25}s` }}>
                <div className="emoji-fb" style={{ fontSize: '1.4rem' }}>✨</div>
              </div>
            )}
          </div>
          <img src={JAR_URL} alt="Harmonie Secrète" className="plate-jar" />
        </div>
      </div>

      <div className="rotation-hint">
        <span className="hint-icon">🔄</span> Glissez pour tourner l'assiette
      </div>

      {/* Recipe card */}
      <div className={`recipe-card${cardVisible ? ' recipe-card--visible' : ''}`}>
        <div className="recipe-name">{recipeName}</div>
        <div className="recipe-tagline">Sublimé par l'Harmonie Secrète</div>
        <div className="recipe-divider" />

        {/* Details: cuisson, dressage, sauce */}
        {(cookingLevel || platingStyle || sauceLevel) && (
          <div className="recipe-details">
            {cookingLevel && (
              <div className="recipe-detail">
                <span className="detail-dot" style={{ background: cookingLevel.color }} />
                <span className="detail-label">Cuisson</span>
                <span className="detail-value">{cookingLevel.name}</span>
              </div>
            )}
            {sauceLevel && (
              <div className="recipe-detail">
                <span className="detail-emoji">{sauceLevel.emoji}</span>
                <span className="detail-label">Sauce</span>
                <span className="detail-value">{sauceLevel.name}</span>
              </div>
            )}
            {platingStyle && (
              <div className="recipe-detail">
                <span className="detail-emoji">{platingStyle.emoji}</span>
                <span className="detail-label">Dressage</span>
                <span className="detail-value">{platingStyle.name}</span>
              </div>
            )}
          </div>
        )}

        <ul className="recipe-ingredients">
          {ingredients.map((ing, i) => (
            <li key={i}>
              <span className="ing-emoji">{ing.emoji}</span>
              {ing.name}
            </li>
          ))}
        </ul>
        <div className="recipe-tip">
          💡 Ajoutez une cuillerée d'Harmonie Secrète en fin de cuisson — elle sublime chaque saveur sans jamais masquer le produit.
        </div>
      </div>

      {/* CTA + Share + Restart */}
      <div className="plate-actions">
        <a href={`https://l-fds.com${PRODUCT_URL}`} className="btn-primary cta-buy" target="_blank" rel="noopener">
          Commander la sauce
        </a>
        <ShareButton recipeName={recipeName} />
        <button className="btn-secondary" onClick={onRestart}>
          ↻ Recommencer
        </button>
      </div>

      {/* Sticky CTA */}
      <div className="sticky-cta">
        <a href={`https://l-fds.com${PRODUCT_URL}`} className="btn-primary" target="_blank" rel="noopener">
          Commander la sauce
        </a>
      </div>
    </div>
  );
}
