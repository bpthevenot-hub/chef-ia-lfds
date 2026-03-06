import { useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for drag/touch interaction with inertia
 * Returns refs and handlers for 3D rotation controls
 */
export function useDrag({ onDrag, onEnd, sensitivity = 0.5 }) {
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);

  const onStart = useCallback((x) => {
    isDragging.current = true;
    lastX.current = x;
    velocity.current = 0;
  }, []);

  const onMove = useCallback((x) => {
    if (!isDragging.current) return;
    const dx = x - lastX.current;
    velocity.current = dx * sensitivity;
    lastX.current = x;
    onDrag(dx * sensitivity);
  }, [onDrag, sensitivity]);

  const handleEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (onEnd) onEnd(velocity.current);
  }, [onEnd]);

  // Bind global listeners
  useEffect(() => {
    const moveHandler = (e) => {
      if (isDragging.current) {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        onMove(x);
      }
    };
    const upHandler = () => handleEnd();

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
    window.addEventListener('touchmove', moveHandler, { passive: true });
    window.addEventListener('touchend', upHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('touchend', upHandler);
    };
  }, [onMove, handleEnd]);

  const bind = useCallback((el) => {
    if (!el) return;
    const mouseDown = (e) => { e.preventDefault(); onStart(e.clientX); };
    const touchStart = (e) => { onStart(e.touches[0].clientX); };
    el.addEventListener('mousedown', mouseDown);
    el.addEventListener('touchstart', touchStart, { passive: true });
    return () => {
      el.removeEventListener('mousedown', mouseDown);
      el.removeEventListener('touchstart', touchStart);
    };
  }, [onStart]);

  return { bind, isDragging };
}
