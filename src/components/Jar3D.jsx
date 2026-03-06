import { useRef, useEffect, useCallback } from 'react';
import { JAR_URL } from '../data/foods';
import '../styles/components/Jar3D.css';

const N = 24;           // Number of panels
const ANGLE_STEP = 360 / N;
const RADIUS = 56;      // px
const PANEL_W = 2 * Math.PI * RADIUS / N + 1; // +1 overlap
const IMG_W = 200;      // jar image display width
const FRONT_ARC = 210;  // degrees showing the image

export default function Jar3D({ size = 'large' }) {
  const wrapRef = useRef(null);
  const cylRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cyl = cylRef.current;
    const shadow = shadowRef.current;
    if (!wrap || !cyl) return;

    // Build panels
    cyl.innerHTML = '';
    for (let i = 0; i < N; i++) {
      const panel = document.createElement('div');
      panel.className = 'jar3d-panel';
      const angle = i * ANGLE_STEP;
      let theta = angle;
      if (theta > 180) theta -= 360;

      panel.style.width = Math.ceil(PANEL_W) + 'px';
      panel.style.marginLeft = -Math.ceil(PANEL_W) / 2 + 'px';
      panel.style.transform = `rotateY(${angle}deg) translateZ(${RADIUS}px)`;

      const halfArc = FRONT_ARC / 2;
      if (Math.abs(theta) > halfArc) {
        panel.style.backgroundImage = 'none';
        panel.style.background = 'linear-gradient(180deg,#2a2520 0%,#1e1b16 30%,#15120e 60%,#0d0b08 100%)';
      } else {
        const ratio = (theta + halfArc) / FRONT_ARC;
        const imgX = ratio * IMG_W;
        panel.style.backgroundPosition = `${-(imgX - PANEL_W / 2)}px center`;
      }
      cyl.appendChild(panel);
    }

    // Animation state
    let ry = 0;
    let isDragging = false;
    let lastX = 0;
    let velX = 0;
    let autoAnim = null;
    let snapAnim = null;
    let autoAngle = 0;

    function update() {
      cyl.style.transform = `rotateX(2deg) rotateY(${ry}deg)`;
      if (shadow) {
        const sx = Math.sin(ry * Math.PI / 180) * 10;
        shadow.style.transform = `translateX(calc(-50% + ${sx}px))`;
      }
    }

    // Auto oscillation
    function autoOscillate() {
      if (isDragging) return;
      autoAngle += 0.01;
      ry = Math.sin(autoAngle) * 30;
      update();
      autoAnim = requestAnimationFrame(autoOscillate);
    }
    autoAnim = requestAnimationFrame(autoOscillate);

    // Drag handlers
    function onStart(x) {
      isDragging = true;
      lastX = x;
      velX = 0;
      cancelAnimationFrame(autoAnim);
      cancelAnimationFrame(snapAnim);
      wrap.style.cursor = 'grabbing';
    }

    function onMove(x) {
      if (!isDragging) return;
      const dx = x - lastX;
      ry += dx * 0.5;
      velX = dx * 0.5;
      lastX = x;
      update();
    }

    function onEnd() {
      if (!isDragging) return;
      isDragging = false;
      wrap.style.cursor = 'grab';

      function snapBack() {
        if (Math.abs(velX) > 0.3) {
          ry += velX;
          velX *= 0.9;
          update();
          snapAnim = requestAnimationFrame(snapBack);
        } else {
          function spring() {
            const diff = -ry;
            if (Math.abs(diff) < 0.5) {
              ry = 0;
              update();
              autoAngle = 0;
              autoAnim = requestAnimationFrame(autoOscillate);
              return;
            }
            ry += diff * 0.08;
            update();
            snapAnim = requestAnimationFrame(spring);
          }
          spring();
        }
      }
      snapBack();
    }

    // Event listeners
    const mouseDown = (e) => { e.preventDefault(); onStart(e.clientX); };
    const globalMouseMove = (e) => { if (isDragging) onMove(e.clientX); };
    const globalMouseUp = () => onEnd();
    const touchStart = (e) => { onStart(e.touches[0].clientX); };
    const globalTouchMove = (e) => { if (isDragging) onMove(e.touches[0].clientX); };
    const globalTouchEnd = () => onEnd();

    wrap.addEventListener('mousedown', mouseDown);
    window.addEventListener('mousemove', globalMouseMove);
    window.addEventListener('mouseup', globalMouseUp);
    wrap.addEventListener('touchstart', touchStart, { passive: true });
    window.addEventListener('touchmove', globalTouchMove, { passive: true });
    window.addEventListener('touchend', globalTouchEnd);

    return () => {
      cancelAnimationFrame(autoAnim);
      cancelAnimationFrame(snapAnim);
      wrap.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mousemove', globalMouseMove);
      window.removeEventListener('mouseup', globalMouseUp);
      wrap.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchmove', globalTouchMove);
      window.removeEventListener('touchend', globalTouchEnd);
    };
  }, []);

  const wrapClass = `jar3d-wrap ${size === 'small' ? 'jar3d-wrap--small' : ''}`;

  return (
    <div className={wrapClass} ref={wrapRef}>
      <div className="jar3d-cylinder" ref={cylRef} />
      <div className="jar3d-shadow" ref={shadowRef} />
    </div>
  );
}
