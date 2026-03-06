import { useCallback } from 'react';
import '../styles/components/ShareButton.css';

export default function ShareButton({ recipeName }) {
  const handleShare = useCallback(async () => {
    const shareData = {
      title: 'Mon plat — Le Chef IA',
      text: `${recipeName} sublimé par l'Harmonie Secrète — La Française des Sauces 🧈✨`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        // Brief visual feedback
        const btn = document.querySelector('.share-btn');
        if (btn) {
          btn.classList.add('share-btn--copied');
          setTimeout(() => btn.classList.remove('share-btn--copied'), 2000);
        }
      }
    } catch (err) {
      // User cancelled or error — silent
    }
  }, [recipeName]);

  return (
    <button className="share-btn" onClick={handleShare}>
      <svg className="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      <span className="share-label">Partager</span>
      <span className="share-copied">Copié !</span>
    </button>
  );
}
