import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Project4 = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    // Hardcoded data for Project 1
    const project = {
        title: 'SaaS Platform Redesign',
        category: 'Design System',
        timeline: '3 Months',
        role: 'Lead Product Designer',
        overview: 'A comprehensive rethink of how institutional traders interact with complex real-time data. By simplifying the visual hierarchy and introducing customizable widgets, we increased user efficiency by 30%.',
        problem: 'Traders were overwhelmed by the density of information on legacy platforms, leading to decision fatigue and slower execution times.',
        solution: 'We introduced a modular, dark-themed dashboard that minimizes eye strain and uses progressive disclosure to hide secondary information until needed.',
        heroImage: './sample.jpg',
        persona1: './sample.jpg',
        persona2: './sample.jpg',
        sitemap: './sample.jpg',
        wireframes: ['./sample.jpg', './sample.jpg', './sample.jpg'],
        final: './sample.jpg'
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Parallax Hero */}
            <div style={styles.heroContainer}>
                <motion.div style={{ ...styles.heroBg, y }}>
                    {/* Large Hero Image */}
                    <img src={project.heroImage} alt={`${project.title} Hero`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={styles.heroGradientOverlay} />
                </motion.div>

                <div className="container" style={styles.heroContent}>
                    <Link to="/projects" style={styles.backLink}>← Back to Projects</Link>
                    <span style={styles.category}>{project.category}</span>
                    <h1 style={styles.title}>{project.title}</h1>
                </div>
            </div>

            <div className="container section">
                {/* Project Meta Info */}
                <div style={styles.metaGrid}>
                    <div>
                        <span style={styles.metaLabel}>Role</span>
                        <p style={styles.metaValue}>{project.role}</p>
                    </div>
                    <div>
                        <span style={styles.metaLabel}>Timeline</span>
                        <p style={styles.metaValue}>{project.timeline}</p>
                    </div>
                    <div>
                        <span style={styles.metaLabel}>Deliverables</span>
                        <p style={styles.metaValue}>Wireframes, UI Design, Interactive Prototypes, Design System</p>
                    </div>
                </div>

                {/* Content Sections */}
                <div style={styles.contentSections}>

                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader}>Overview & Motivation</h2>
                        <p style={styles.paragraph}>{project.overview}</p>
                    </section>

                    <section style={styles.textSection}>
                        <div style={styles.splitLayout}>
                            <div style={styles.splitContent}>
                                <h2 style={styles.sectionHeader}>The Problem</h2>
                                <p style={styles.paragraph}>{project.problem}</p>
                            </div>
                            <div style={styles.splitContent}>
                                <h2 style={styles.sectionHeader}>The Solution</h2>
                                <p style={styles.paragraph}>{project.solution}</p>
                            </div>
                        </div>
                    </section>

                    {/* User Personas */}
                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader}>User Personas</h2>
                        <div style={styles.imageGrid}>
                            <div style={styles.imagePlaceholder} className="persona-image-holder">
                                <img src={project.persona1} alt="User Persona 1" className="persona-image" style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div style={styles.imagePlaceholder} className="persona-image-holder">
                                <img src={project.persona2} alt="User Persona 2" className="persona-image" style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    </section>

                    {/* Wireframes & Sitemaps */}
                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader}>Information Architecture & Wireframes</h2>
                        <div style={styles.largeImagePlaceholder}>
                            <img src={project.sitemap} alt="Sitemap" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={styles.imageGrid3}>
                            {project.wireframes.map((wf, idx) => (
                                <div key={idx} style={styles.imagePlaceholder}>
                                    <img src={wf} alt={`Wireframe ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Final Mockups */}
                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader}>High-Fidelity Mockups</h2>
                        <div style={{ ...styles.largeImagePlaceholder, height: '600px' }}>
                            <img src={project.final} alt={`${project.title} Final UI`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </section>

                </div>
            </div>
        </motion.div>
    );
};

const styles = {
    heroContainer: {
        position: 'relative',
        height: '60vh',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        borderBottom: '1px solid var(--glass-border)',
    },
    heroBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '110%',
        backgroundColor: 'var(--surface-color)',
        zIndex: -1,
    },
    heroGradientOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, var(--bg-color) 0%, transparent 80%)',
    },
    heroContent: {
        position: 'relative',
        zIndex: 1,
        paddingBottom: '3rem',
    },
    backLink: {
        display: 'inline-block',
        marginBottom: '2rem',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        transition: 'color var(--transition-fast)',
    },
    category: {
        display: 'block',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--accent-color)',
        marginBottom: '0.5rem',
    },
    title: {
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    },
    metaGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        paddingBottom: '4rem',
        borderBottom: '1px solid var(--glass-border)',
        marginBottom: '4rem',
    },
    metaLabel: {
        display: 'block',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    metaValue: {
        fontSize: '1.1rem',
        fontWeight: '500',
    },
    contentSections: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6rem',
    },
    textSection: {
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
    },
    sectionHeader: {
        fontSize: '2rem',
        marginBottom: '1.5rem',
    },
    paragraph: {
        fontSize: '1.2rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.8',
        maxWidth: '800px',
    },
    splitLayout: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
    },
    splitContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    imageGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginTop: '2rem',
    },
    imageGrid3: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        marginTop: '2rem',
    },
    imagePlaceholder: {
        width: '100%',
        aspectRatio: '4/3',
        backgroundColor: 'var(--surface-color)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        overflow: 'hidden',
    },
    largeImagePlaceholder: {
        width: '100%',
        height: '400px',
        backgroundColor: 'var(--surface-color)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        marginTop: '2rem',
        overflow: 'hidden',
    }
};

export default Project4;
