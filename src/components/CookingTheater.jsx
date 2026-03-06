import { useState, useEffect, useRef, useMemo } from 'react';
import { JAR_URL } from '../data/foods';
import '../styles/components/CookingTheater.css';

/* ── Premium loading messages ── */
const MESSAGES = [
  'Le Chef prépare votre assiette…',
  'Harmonie des saveurs en préparation…',
  'Dressage en cours…',
  'Votre assiette prend forme…',
  'Dernières touches du Chef…',
];

/* ── Total duration in ms ── */
const TOTAL_DURATION = 12000;
const MSG_INTERVAL = TOTAL_DURATION / MESSAGES.length;

/* ═══════════════════════════════════════════════════════════════
   SVG ILLUSTRATIONS — Premium line art, fine-dining style
   Refined, proportionate, elegant single-stroke aesthetic
   ═══════════════════════════════════════════════════════════════ */

function IllustrationViande() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="ct-illustration" xmlns="http://www.w3.org/2000/svg">
      {/* Premium steak cut — refined butcher line art */}
      <g stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Steak shape — thick cut, slightly irregular natural edge */}
        <path d="M20 52 C22 44, 32 36, 48 34 C64 32, 82 33, 94 38 C100 41, 104 46, 102 54 C101 60, 98 66, 94 70 C86 78, 68 82, 50 80 C34 78, 22 72, 19 64 C18 60, 18 56, 20 52Z" opacity="0.85" />
        {/* Fat marbling lines — subtle, organic */}
        <path d="M35 48 Q44 45 52 48" opacity="0.2" />
        <path d="M58 42 Q68 39 76 43" opacity="0.18" />
        <path d="M42 58 Q54 54 64 57" opacity="0.15" />
        <path d="M70 52 Q78 49 86 53" opacity="0.2" />
        <path d="M48 66 Q58 62 68 65" opacity="0.15" />
        <path d="M30 56 Q36 52 42 55" opacity="0.18" />
        {/* Fat cap — top edge detail */}
        <path d="M32 40 C40 36, 56 34, 72 35 C82 35.5, 90 37, 96 40" opacity="0.3" />
        {/* Bone cross-section hint (côte de bœuf) */}
        <ellipse cx="88" cy="56" rx="6" ry="10" opacity="0.25" />
        <ellipse cx="88" cy="56" rx="3" ry="5" opacity="0.12" />
        {/* Rosemary sprig — chef garnish */}
        <path d="M28 86 Q42 84 56 88" opacity="0.5" />
        <path d="M34 86 Q37 82 40 84" opacity="0.35" />
        <path d="M40 85 Q43 81 46 83" opacity="0.35" />
        <path d="M46 86 Q49 82 52 84" opacity="0.35" />
        <path d="M34 87 Q37 91 40 89" opacity="0.35" />
        <path d="M40 87 Q43 91 46 89" opacity="0.35" />
        <path d="M46 88 Q49 92 52 90" opacity="0.35" />
      </g>
    </svg>
  );
}

function IllustrationPoisson() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="ct-illustration" xmlns="http://www.w3.org/2000/svg">
      {/* Whole fish — refined gastro line art */}
      <g stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Body — elegant elongated profile */}
        <path d="M18 58 C24 42, 42 32, 62 30 C78 29, 90 34, 98 44 C102 50, 103 56, 100 62 C96 72, 84 80, 66 84 C48 86, 30 82, 22 72 C18 66, 16 62, 18 58Z" opacity="0.85" />
        {/* Head detail */}
        <path d="M92 44 C96 48, 98 52, 98 56" opacity="0.5" />
        {/* Eye */}
        <circle cx="90" cy="50" r="3.5" opacity="0.7" />
        <circle cx="90.5" cy="49.5" r="1.5" fill="currentColor" opacity="0.5" />
        {/* Mouth */}
        <path d="M100 56 C103 55, 105 56" opacity="0.6" />
        {/* Gill arc */}
        <path d="M84 40 C81 50, 82 60, 85 68" opacity="0.35" />
        {/* Dorsal fin */}
        <path d="M50 32 C54 20, 64 18, 72 24 C76 27, 76 30, 74 32" opacity="0.6" />
        {/* Pectoral fin */}
        <path d="M80 65 C86 74, 82 80, 76 78" opacity="0.45" />
        {/* Anal fin */}
        <path d="M44 82 C48 90, 42 92, 38 88" opacity="0.4" />
        {/* Tail (caudal fin) — elegant fork */}
        <path d="M20 54 C12 42, 8 34, 10 28" opacity="0.6" />
        <path d="M20 62 C12 72, 8 80, 10 86" opacity="0.6" />
        <path d="M10 28 C14 48, 14 66, 10 86" opacity="0.3" />
        {/* Scale hints — subtle arcs */}
        <path d="M44 46 Q48 42 52 46" opacity="0.15" />
        <path d="M56 44 Q60 40 64 44" opacity="0.15" />
        <path d="M68 46 Q72 42 76 46" opacity="0.15" />
        <path d="M40 56 Q44 52 48 56" opacity="0.12" />
        <path d="M52 54 Q56 50 60 54" opacity="0.12" />
        <path d="M64 54 Q68 50 72 54" opacity="0.12" />
        <path d="M46 64 Q50 60 54 64" opacity="0.12" />
        <path d="M58 62 Q62 58 66 62" opacity="0.12" />
        {/* Lateral line */}
        <path d="M26 58 C40 54, 60 52, 82 54" opacity="0.2" strokeDasharray="2 3" />
        {/* Lemon slice garnish */}
        <circle cx="36" cy="92" r="7" opacity="0.35" />
        <path d="M36 85 L36 99" opacity="0.15" />
        <path d="M29 92 L43 92" opacity="0.15" />
        <path d="M31 87 L41 97" opacity="0.12" />
        <path d="M31 97 L41 87" opacity="0.12" />
      </g>
    </svg>
  );
}

function IllustrationLegumes() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="ct-illustration" xmlns="http://www.w3.org/2000/svg">
      {/* Artichoke — refined French vegetable, elegant form */}
      <g stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Artichoke body — layered petals from bottom up */}
        {/* Outer petals */}
        <path d="M42 72 C38 62, 40 50, 48 44" opacity="0.5" />
        <path d="M78 72 C82 62, 80 50, 72 44" opacity="0.5" />
        <path d="M38 68 C34 56, 38 44, 50 40" opacity="0.45" />
        <path d="M82 68 C86 56, 82 44, 70 40" opacity="0.45" />
        {/* Middle petals */}
        <path d="M44 66 C42 56, 44 46, 52 40" opacity="0.55" />
        <path d="M76 66 C78 56, 76 46, 68 40" opacity="0.55" />
        <path d="M48 62 C46 54, 48 46, 54 42" opacity="0.6" />
        <path d="M72 62 C74 54, 72 46, 66 42" opacity="0.6" />
        {/* Inner petals */}
        <path d="M52 58 C50 50, 52 44, 56 40" opacity="0.65" />
        <path d="M68 58 C70 50, 68 44, 64 40" opacity="0.65" />
        {/* Center tip */}
        <path d="M56 42 C58 34, 60 30, 60 28" opacity="0.7" />
        <path d="M64 42 C62 34, 60 30, 60 28" opacity="0.7" />
        {/* Main body outline */}
        <path d="M42 74 C40 60, 42 46, 52 36 C56 32, 60 30, 60 28 C60 30, 64 32, 68 36 C78 46, 80 60, 78 74" opacity="0.85" />
        {/* Base */}
        <path d="M42 74 C46 78, 56 80, 60 80 C64 80, 74 78, 78 74" opacity="0.7" />
        {/* Stem */}
        <path d="M58 80 C57 88, 56 96, 58 102" opacity="0.6" />
        <path d="M62 80 C63 88, 64 96, 62 102" opacity="0.6" />
        {/* Small leaf on stem */}
        <path d="M62 92 C66 88, 70 86, 72 88" opacity="0.35" />
        {/* Herb sprig beside — thyme */}
        <path d="M86 98 C84 88, 86 76, 88 68" opacity="0.4" />
        <path d="M87 78 C90 75, 92 76" opacity="0.25" />
        <path d="M87 82 C84 79, 82 80" opacity="0.25" />
        <path d="M87 86 C90 83, 92 84" opacity="0.25" />
        <path d="M87 74 C84 71, 82 72" opacity="0.25" />
        <path d="M87 90 C90 87, 92 88" opacity="0.25" />
        <path d="M87 70 C90 67, 92 68" opacity="0.25" />
      </g>
    </svg>
  );
}

const ILLUSTRATIONS = {
  viande: IllustrationViande,
  poisson: IllustrationPoisson,
  legumes: IllustrationLegumes,
};

export default function CookingTheater({ active, category, onComplete }) {
  const [messageIdx, setMessageIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle | cooking | sauce | done
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  // Reset on deactivation
  useEffect(() => {
    if (!active) {
      setMessageIdx(0);
      setProgress(0);
      setPhase('idle');
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    // Start cooking
    setPhase('cooking');
    startRef.current = Date.now();

    // Smooth progress via rAF
    function tick() {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(elapsed / TOTAL_DURATION, 1);
      setProgress(p);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);

    // Message rotation
    let msgStep = 0;
    function nextMessage() {
      msgStep++;
      if (msgStep < MESSAGES.length) {
        setMessageIdx(msgStep);
        timerRef.current = setTimeout(nextMessage, MSG_INTERVAL);
      }
    }
    timerRef.current = setTimeout(nextMessage, MSG_INTERVAL);

    // Sauce reveal at 70%
    const sauceTimer = setTimeout(() => setPhase('sauce'), TOTAL_DURATION * 0.7);

    // Complete
    const completeTimer = setTimeout(() => {
      setPhase('done');
      setTimeout(() => onComplete(), 600);
    }, TOTAL_DURATION);

    return () => {
      clearTimeout(sauceTimer);
      clearTimeout(completeTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, onComplete]);

  const Illustration = ILLUSTRATIONS[category] || IllustrationViande;

  // Circular timer dimensions
  const RADIUS = 58;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  // Stable random particles (don't re-randomize on each render)
  const particles = useMemo(() =>
    [...Array(6)].map((_, i) => ({
      top: `${20 + Math.random() * 50}%`,
      left: `${15 + Math.random() * 70}%`,
      delay: `${i * 0.6}s`,
      duration: `${3 + Math.random() * 2}s`,
      size: 2 + Math.random() * 2,
    })),
  []);

  return (
    <div className="screen-inner ct-screen">
      {/* Ambient glow */}
      <div className="ct-ambient" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="ct-particle"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Central composition */}
      <div className="ct-center">
        {/* Circular timer ring */}
        <div className="ct-ring-wrap">
          <svg className="ct-ring" viewBox="0 0 140 140">
            {/* Background ring */}
            <circle
              cx="70" cy="70" r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1.5"
            />
            {/* Progress ring */}
            <circle
              cx="70" cy="70" r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.5"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              className="ct-ring-progress"
            />
          </svg>

          {/* Illustration inside the ring */}
          <div className={`ct-illustration-wrap${phase === 'sauce' ? ' ct-illustration-wrap--sauce' : ''}`}>
            {phase !== 'sauce' ? (
              <Illustration />
            ) : (
              <img src={JAR_URL} alt="Harmonie Secrète" className="ct-jar" />
            )}
          </div>
        </div>

        {/* Message */}
        <div className="ct-message" key={messageIdx}>
          <p className="ct-message-text">{MESSAGES[messageIdx]}</p>
        </div>

        {/* Step indicator */}
        <div className="ct-steps">
          {MESSAGES.map((_, i) => (
            <div
              key={i}
              className={`ct-dot${i <= messageIdx ? ' ct-dot--active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Brand footer */}
      <div className="ct-brand">
        <span className="ct-brand-name">La Française des Sauces</span>
      </div>
    </div>
  );
}
