import { LOGO_URL } from '../data/foods';
import '../styles/components/Header.css';

export default function Header({ visible }) {
  return (
    <header className={`app-header${visible ? ' app-header--visible' : ''}`}>
      <img src={LOGO_URL} alt="LFDS" className="header-logo" />
      <div className="header-tri" />
    </header>
  );
}
