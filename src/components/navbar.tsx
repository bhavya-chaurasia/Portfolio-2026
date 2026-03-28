import { FC } from "react";
import '../styles/components/Header.css';
import { LinkedInIcon, MailIcon, PhoneIcon, MoonIcon, SunIcon } from "./icons/icons";
import { THEMES } from "../constants/themes";

interface NavbarProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  showThemeToggle?: boolean;
  themeOverride?: "dark" | "light";
}

const Navbar: FC<NavbarProps> = ({
  dark,
  setDark,
  showThemeToggle = true,
  themeOverride,
}) => {
  const isDarkTheme = themeOverride ? themeOverride === "dark" : dark;
  const t = isDarkTheme ? THEMES.dark : THEMES.light;

  const iconLinkStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 36, height: 36, borderRadius: '50%',
    color: t.ink2, border: `1px solid ${t.border}`,
    transition: 'color 0.2s, border-color 0.2s, transform 0.2s',
    textDecoration: 'none',
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .site-nav {
            grid-template-columns: auto 1fr auto !important;
            padding: 0 12px !important;
            height: 56px !important;
          }
          .nav-social {
            display: none !important;
          }
          .nav-links {
            justify-content: center !important;
            gap: 2px !important;
          }
          .nav-link {
            font-size: 12px !important;
            letter-spacing: 0.02em !important;
            padding: 6px 8px !important;
          }
          .nav-brand {
            font-size: 20px !important;
          }
          .nav-theme-toggle {
            width: 32px !important;
            height: 32px !important;
            margin-left: 6px !important;
          }
        }
      `}</style>
      <nav className="site-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999999,
        background: 'transparent',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: 'none',
        height: 60,
        display: 'grid', gridTemplateColumns: showThemeToggle ? 'auto 1fr auto auto' : 'auto 1fr auto', alignItems: 'center',
        padding: '0 32px',
        transition: 'background 0.3s, border-color 0.3s',
        columnGap: 16,
      }}>
      <a className="nav-brand" href="#" style={{ fontFamily: "'Argine', serif", fontSize: 22, fontWeight: 700, fontStyle: 'italic', color: t.ink, letterSpacing: '0.01em', textDecoration: 'none' }}>
        Bhavya
      </a>
      <div className="nav-social" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <a href="https://in.linkedin.com/in/bhavya-chaurasia" className="nav-icon-link" style={iconLinkStyle}><LinkedInIcon /></a>
        <a href="mailto:contact@bhavyachaurasia.in" className="nav-icon-link" style={iconLinkStyle}><MailIcon /></a>
        <a href="tel:+919109502001" className="nav-icon-link" style={iconLinkStyle}><PhoneIcon /></a>
      </div>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
        {['Work', 'About', 'Resume'].map(l => (
          <a key={l} href="#" className="nav-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: '0.04em', color: t.ink2, textDecoration: 'none', padding: '6px 12px', borderRadius: 20, transition: 'color 0.2s, background 0.2s', whiteSpace: 'nowrap' }}>
            {l}
          </a>
        ))}
      </div>
      {showThemeToggle && (
        <button
          className="theme-toggle nav-theme-toggle"
          onClick={() => setDark(d => !d)}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: `1px solid ${t.border}`, background: t.btn, color: t.ink2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginLeft: 8, transition: 'all 0.2s',
          }}
        >
          {isDarkTheme ? <SunIcon /> : <MoonIcon />}
        </button>
      )}
    </nav>
    </>
  );
};

export default Navbar;
