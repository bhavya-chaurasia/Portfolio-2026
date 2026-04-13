import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Header.css';

interface HeaderProps {
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
}

const Header: FC<HeaderProps> = ({ onThemeToggle, theme }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1 className="anim-fade-up-1">
            Bhavya <span className="hi-word">Chaurasia</span>
          </h1>
          <p className="subtitle anim-fade-up-2">Designer & Developer</p>
        </div>

        <nav className="nav">
          <button
            onClick={() => navigate('/work')}
            className="nav-link"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'inherit',
              color: 'inherit',
              padding: '8px 16px',
              fontFamily: 'inherit',
            }}
          >
            Work
          </button>
          <button
            className="theme-toggle"
            onClick={onThemeToggle}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>

      <div className="header-divider">
        <div className="scroll-line"></div>
      </div>
    </header>
  );
};

export default Header;
