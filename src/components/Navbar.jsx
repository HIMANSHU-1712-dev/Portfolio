import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
    const logoLetters = 'kabiroscope'.split('');

    return (
        <nav style={styles.nav} className="site-nav">
            <div style={styles.container} className="container site-nav-inner">
                {/* Logo */}
                <NavLink to="/" style={styles.logoLink}>
                    <span style={styles.logoText} className="site-nav-logo" aria-label="kabiroscope">
                        {logoLetters.map((char, index) => (
                            <span
                                key={`${char}-${index}`}
                                className="site-nav-logo-letter"
                                style={{ '--logo-index': index }}
                                aria-hidden="true"
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                </NavLink>

                {/* Links */}
                <div style={styles.links} className="site-nav-links">
                    <NavLink to="/projects" className="site-nav-link" style={({ isActive }) => isActive ? styles.activeLink : styles.link}>
                        Projects
                    </NavLink>
                    <NavLink to="/experience" className="site-nav-link" style={({ isActive }) => isActive ? styles.activeLink : styles.link}>
                        Experience
                    </NavLink>
                    <NavLink to="/education" className="site-nav-link" style={({ isActive }) => isActive ? styles.activeLink : styles.link}>
                        Education
                    </NavLink>
                    <NavLink to="/research" className="site-nav-link" style={({ isActive }) => isActive ? styles.activeLink : styles.link}>
                        Research
                    </NavLink>

                    <NavLink to="/contact" className="glass-button site-nav-cta" style={{ marginLeft: '1rem' }}>
                        Contact Me
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        position: 'sticky',
        top: 0,
        width: '100%',
        padding: '1.25rem 0',
        background: 'linear-gradient(to bottom, rgba(11,10,19,0.86) 0%, transparent 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 100,
        borderBottom: '1px solid rgba(185,140,232,0.15)',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoLink: {
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    logoText: {
        fontFamily: "'Outfit', 'Space Grotesk', sans-serif",
        fontSize: '1.55rem',
        fontWeight: 700,
        letterSpacing: '-0.05em',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        transition: 'filter 0.3s',
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
    },
    link: {
        fontSize: '0.95rem',
        fontWeight: '500',
        color: 'var(--text-secondary)',
        transition: 'color var(--transition-fast)',
    },
    activeLink: {
        fontSize: '0.95rem',
        fontWeight: '600',
        color: 'var(--text-primary)',
    },
};

export default Navbar;
