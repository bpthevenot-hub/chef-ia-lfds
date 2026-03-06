import { useState, useEffect, useRef } from 'react';
import { COOKING_SCENES } from '../data/scenes';
import { JAR_URL } from '../data/foods';
import '../styles/components/CookingTheater.css';

export default function CookingTheater({ active, onComplete }) {
  const [currentScene, setCurrentScene] = useState(-1);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) {
      setCurrentScene(-1);
      setProgress(0);
      return;
    }

    let step = 0;

    function showScene() {
      if (step >= COOKING_SCENES.length) {
        onComplete();
        return;
      }

      setCurrentScene(step);
      setProgress(((step + 1) / COOKING_SCENES.length) * 100);
      if (navigator.vibrate) navigator.vibrate(8);

      const dur = COOKING_SCENES[step].duration;
      step++;
      timerRef.current = setTimeout(showScene, dur);
    }

    // Small delay before starting
    timerRef.current = setTimeout(showScene, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, onComplete]);

  return (
    <div className="screen-inner">
      <div className="step-label">— Le Chef prépare —</div>
      <h2 className="title" style={{ marginBottom: '1rem' }}>
        Votre assiette <span className="accent">se compose</span>
      </h2>

      <div className="cooking-theater">
        {COOKING_SCENES.map((scene, i) => (
          <div
            key={i}
            className={`chef-scene${currentScene === i ? ' chef-scene--active' : ''}${
              currentScene > i ? ' chef-scene--exit' : ''
            }${scene.isSauce ? ' chef-scene--sauce' : ''}`}
          >
            {scene.isSauce ? (
              <>
                <div className="sauce-glow" />
                <div className="sauce-glow sauce-glow--outer" />
                <div className="sauce-hero">
                  <img src={JAR_URL} alt="Harmonie Secrète" className="sauce-jar-hero" />
                </div>
                {/* Floating particles */}
                {[...Array(10)].map((_, j) => (
                  <div
                    key={`p${j}`}
                    className="sauce-particle"
                    style={{
                      top: `${15 + Math.random() * 70}%`,
                      left: `${10 + Math.random() * 80}%`,
                      animationDelay: `${j * 0.25}s`,
                      animationDuration: `${2.5 + Math.random() * 2}s`,
                    }}
                  />
                ))}
                {/* Sauce brand label */}
                <div className="sauce-hero-label">
                  <span className="sauce-hero-name">Harmonie Secrète</span>
                  <span className="sauce-hero-sub">Beurre aux herbes fraîches</span>
                </div>
              </>
            ) : (
              <div
                className="scene-photo"
                style={{ backgroundImage: `url('${scene.photo}')` }}
              />
            )}
            <div className="scene-gradient" />
            <div className="scene-label">
              <div className="scene-step">{scene.step}</div>
              <div className="scene-title">{scene.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cook-progress">
        <div className="cook-progress__fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
