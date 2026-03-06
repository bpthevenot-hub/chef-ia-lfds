import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, STARCHES, SIDES, COOKING_LEVELS, PLATING_STYLES, SAUCE_LEVELS, JAR_URL, PRODUCT_URL } from '../data/foods';
import { getPlateImage } from '../data/plateImages';
import ShareButton from './ShareButton';
import '../styles/components/FinalPlate.css';

const ALL_FOODS = [...CATEGORIES, ...STARCHES, ...SIDES];
const findFood = (id) => ALL_FOODS.find((f) => f.id === id);
const findLevel = (id) => COOKING_LEVELS.find((l) => l.id === id);
const findStyle = (id) => PLATING_STYLES.find((s) => s.id === id);
const findSauce = (id) => SAUCE_LEVELS.find((s) => s.id === id);

export default function FinalPlate({ state, onRestart }) {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get the plate image based on user selections
  const plateImageUrl = getPlateImage(state);

  // Recipe name
  const mainName = state.category === 'viande' ? 'Viande du Chef' :
    state.category === 'poisson' ? 'Poisson du Jour' : 'Légumes du Marché';
  const parts = [];
  if (state.starch) { const f = findFood(state.starch); if (f) parts.push(f.name); }
  if (state.side) { const f = findFood(state.side); if (f) parts.push(f.name); }
  if (state.freeText) parts.push(state.freeText);
  const recipeName = parts.length ? `${mainName} & ${parts.join(', ')}` : mainName;

  // Details
  const cookingLevel = state.cookingLevel ? findLevel(state.cookingLevel) : null;
  const platingStyle = state.platingStyle ? findStyle(state.platingStyle) : null;
  const sauceLevel = state.sauceLevel ? findSauce(state.sauceLevel) : null;

  // Ingredients
  const ingredients = [];
  if (state.category) { const f = findFood(state.category); if (f) ingredients.push({ emoji: f.emoji, name: f.name }); }
  if (state.starch) { const f = findFood(state.starch); if (f) ingredients.push({ emoji: f.emoji, name: f.name }); }
  if (state.side) { const f = findFood(state.side); if (f) ingredients.push({ emoji: f.emoji, name: f.name }); }
  if (state.freeText) ingredients.push({ emoji: '✨', name: state.freeText });
  ingredients.push({ emoji: '🧈', name: 'Harmonie Secrète' });

  // Reset imageLoaded when the URL changes, then check if already cached
  useEffect(() => {
    setImageLoaded(false);
    // Use rAF to check after the img element updates its src
    const raf = requestAnimationFrame(() => {
      const img = imageRef.current;
      if (img && img.complete && img.naturalWidth > 0) {
        setImageLoaded(true);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [plateImageUrl]);

  // Perspective tilt effect
  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    let isDragging = false;
    let lastX = 0, lastY = 0;
    let currentRx = 0, currentRy = 0;
    let velX = 0, velY = 0;
    let animFrame;

    function applyTransform() {
      image.style.transform =
        `perspective(800px) rotateX(${currentRx}deg) rotateY(${currentRy}deg) scale(1.02)`;
      // Dynamic shadow based on tilt
      const shadowX = -currentRy * 0.8;
      const shadowY = currentRx * 0.8 + 12;
      image.style.boxShadow =
        `${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, 0.3)`;
    }

    function resetTransform() {
      currentRx = 0;
      currentRy = 0;
      image.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
      image.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
    }

    // Mouse hover tilt (desktop)
    function onMouseMove(e) {
      if (isDragging) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      currentRy = x * 12;
      currentRx = -y * 8;
      applyTransform();
    }

    function onMouseLeave() {
      if (!isDragging) resetTransform();
    }

    // Touch drag tilt (mobile)
    function onTouchStart(e) {
      isDragging = true;
      const t = e.touches[0];
      lastX = t.clientX;
      lastY = t.clientY;
      velX = 0;
      velY = 0;
      cancelAnimationFrame(animFrame);
    }

    function onTouchMove(e) {
      if (!isDragging) return;
      const t = e.touches[0];
      const dx = t.clientX - lastX;
      const dy = t.clientY - lastY;
      currentRy += dx * 0.3;
      currentRx -= dy * 0.2;
      currentRy = Math.max(-15, Math.min(15, currentRy));
      currentRx = Math.max(-10, Math.min(10, currentRx));
      velX = dx * 0.3;
      velY = -dy * 0.2;
      lastX = t.clientX;
      lastY = t.clientY;
      applyTransform();
    }

    function onTouchEnd() {
      isDragging = false;
      function inertia() {
        if (Math.abs(velX) < 0.05 && Math.abs(velY) < 0.05 &&
            Math.abs(currentRx) < 0.1 && Math.abs(currentRy) < 0.1) {
          resetTransform();
          return;
        }
        currentRy += velX;
        currentRx += velY;
        // Spring back to center
        currentRy *= 0.9;
        currentRx *= 0.9;
        velX *= 0.85;
        velY *= 0.85;
        applyTransform();
        animFrame = requestAnimationFrame(inertia);
      }
      inertia();
    }

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Show card after delay
    setTimeout(() => setCardVisible(true), 800);

    return () => {
      cancelAnimationFrame(animFrame);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      setCardVisible(false);
    };
  }, [state]);

  return (
    <div className="screen-inner final-plate-inner">
      {/* Tricolor line */}
      <div className="final-tri" />

      {/* Plate image with perspective tilt */}
      <div className="plate-image-container" ref={containerRef}>
        <img
          ref={imageRef}
          src={plateImageUrl}
          alt={recipeName}
          className={`plate-image${imageLoaded ? ' plate-image--loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          draggable={false}
        />
        {/* Jar badge */}
        <div className="plate-jar-badge">
          <img src={JAR_URL} alt="Harmonie Secrète" />
        </div>
        {/* Tilt hint */}
        <div className="plate-hint">Survolez ou glissez pour explorer</div>
      </div>

      {/* Recipe card */}
      <div className={`recipe-card${cardVisible ? ' recipe-card--visible' : ''}`}>
        <div className="recipe-header">
          <div className="recipe-name">{recipeName}</div>
          <div className="recipe-tagline">Sublimé par l'Harmonie Secrète</div>
        </div>

        {/* Tricolor divider */}
        <div className="recipe-tri" />

        {/* Details badges */}
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

        {/* Ingredients */}
        <ul className="recipe-ingredients">
          {ingredients.map((ing, i) => (
            <li key={i}>
              <span className="ing-emoji">{ing.emoji}</span>
              {ing.name}
            </li>
          ))}
        </ul>

        {/* Tip */}
        <div className="recipe-tip">
          Ajoutez une cuillerée d'Harmonie Secrète en fin de cuisson — elle sublime chaque saveur sans jamais masquer le produit.
        </div>
      </div>

      {/* Actions */}
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
