import '../styles/components/PhotoCard.css';

const ICONS = {
  steak: (
    <svg viewBox="0 0 24 24">
      <path d="M4 14c0-4 3-8 8-9.5C17 6 20 10 20 14c0 3-2.5 5.5-5.5 5.5-1.2 0-2.3-.4-3.2-1.1A5.5 5.5 0 018 19.5 5.5 5.5 0 014 14z" />
      <path d="M10 13c0-1.5 1-2.5 2-2.5s2 1 2 2.5" />
    </svg>
  ),
  fish: (
    <svg viewBox="0 0 24 24">
      <path d="M2 12c3-4 7-6 10-6s7 2 10 6c-3 4-7 6-10 6s-7-2-10-6z" />
      <path d="M7 12c1-1.5 3-2.5 5-2.5s4 1 5 2.5c-1 1.5-3 2.5-5 2.5s-4-1-5-2.5z" />
      <circle cx="12" cy="12" r="1" />
      <path d="M22 12l-2-1.5M22 12l-2 1.5" />
    </svg>
  ),
  vegetable: (
    <svg viewBox="0 0 24 24">
      <path d="M12 2C8 2 5 5 5 9c0 6 7 13 7 13s7-7 7-13c0-4-3-7-7-7z" />
      <path d="M12 2v20" />
      <path d="M8 7c2 0 4 2 4 5" />
      <path d="M16 7c-2 0-4 2-4 5" />
    </svg>
  ),
  frites: (
    <svg viewBox="0 0 24 24">
      <rect x="6" y="4" width="3" height="16" rx="1" />
      <rect x="10.5" y="3" width="3" height="17" rx="1" />
      <rect x="15" y="5" width="3" height="15" rx="1" />
    </svg>
  ),
  potato: (
    <svg viewBox="0 0 24 24">
      <ellipse cx="12" cy="12" rx="8" ry="6" />
      <circle cx="9" cy="10" r="0.8" />
      <circle cx="14" cy="11" r="0.8" />
      <circle cx="11" cy="14" r="0.8" />
    </svg>
  ),
  greens: (
    <svg viewBox="0 0 24 24">
      <path d="M6 21c0-6 3-12 6-14 3 2 6 8 6 14" />
      <path d="M12 7v14" />
      <path d="M9 12c1.5 0 3 1 3 3" />
      <path d="M15 12c-1.5 0-3 1-3 3" />
    </svg>
  ),
  pasta: (
    <svg viewBox="0 0 24 24">
      <path d="M4 12c2-4 5-6 8-6s6 2 8 6" />
      <path d="M4 12c2 4 5 6 8 6s6-2 8-6" />
      <path d="M8 8c0 4 1.5 8 4 8s4-4 4-8" />
    </svg>
  ),
};

export default function PhotoCard({ photo, name, sub, icon, selected, onClick }) {
  return (
    <div
      className={`photo-card${selected ? ' photo-card--selected' : ''}`}
      onClick={onClick}
    >
      <span className="check-badge" />
      <div
        className="photo-card__bg"
        style={{ backgroundImage: `url('${photo}')` }}
      />
      <div className="photo-card__overlay" />
      <div className="photo-card__content">
        {icon && ICONS[icon] && (
          <div className="photo-card__icon">{ICONS[icon]}</div>
        )}
        <div className="photo-card__name">{name}</div>
        {sub && <div className="photo-card__sub">{sub}</div>}
      </div>
    </div>
  );
}
