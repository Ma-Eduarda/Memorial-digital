import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from './Header.module.css';
import logo from '../assets/logo.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  const navLinks = isAdmin
    ? [
        { to: '/admin', label: 'Painel' },
        { to: '/admin/memorials', label: 'Memoriais' },
        { to: '/admin/analytics', label: 'Análises' },
        { to: '/', label: 'Ver Site' },
      ]
    : [
        { to: '/', label: 'Início' },
        { to: '/memoriais', label: 'Memoriais' },
        { to: '/mapa', label: 'Mapa do Cemitério' },
        { to: '/admin', label: 'Administração' },
      ];

  return (
    <header className={styles.header}>

      {/* Barra Principal Institucional */}
      <div className={styles.mainBar}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <img src={logo} alt="Logo da Prefeitura" className={styles.logoImage} />
            </div>

            <div className={styles.logoText}>
              <span className={styles.title}>
                Sistema Digital
              </span>
              <span className={styles.subtitle}>
                Cemitério São Miguel
              </span>
            </div>
          </Link>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={24} color="#0066cc" /> : <Menu size={24} color="#0066cc" />}
          </button>

          <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`${styles.navLink} ${
                  location.pathname === link.to ? styles.navLinkActive : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}