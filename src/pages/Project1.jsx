import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Project1 = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    // Hardcoded data for Project 1
    const project = {
        title: 'Trekmate',
        category: 'Mobile App',
        timeline: '3 Months',
        role: 'Lead Product Designer',
        overview: 'A modern mobile e-commerce app tailored specifically for camping and trekking enthusiasts, offering a focused and seamless shopping experience for outdoor gear.',
        problem: 'There are not many dedicated apps for camping and trekking products, forcing users to rely on generic marketplaces with poor categorization and overwhelming choices.',
        solution: 'A niche, user-centric platform that simplifies discovery through curated categories, intuitive navigation, and a streamlined checkout experience built specifically for outdoor needs.',
        heroImage: './tmh.jpg',
        persona1: './tmp11.jpg',
        persona2: './tmp22.jpg',
        sitemap: './tmsm.jpg',
        wireframes: ['./tmw11.jpg', './tmw22.jpg', './tmw33.jpg'],
        finalMockups: ['./tmf1.jpg', './tmf222.jpg', './tmf333.jpg']
    };

    return (
        <motion.div
            className="project-detail-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Parallax Hero */}
            <div style={styles.heroContainer} className="project-hero">
                <motion.div style={{ ...styles.heroBg, y }}>
                    {/* Large Hero Image */}
                    <img src={project.heroImage} alt={`${project.title} Hero`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={styles.heroGradientOverlay} />
                </motion.div>

                <div className="container project-hero-content" style={styles.heroContent}>
                    <Link to="/projects" style={styles.backLink}>← Back to Projects</Link>
                    <span style={styles.category}>{project.category}</span>
                    <h1 style={styles.title}>{project.title}</h1>
                </div>
            </div>

            <div className="container section">
                {/* Project Meta Info */}
                <div style={styles.metaGrid} className="project-meta-grid">
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
                <div style={styles.contentSections} className="project-content-sections">

                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader} className="project-section-header">Overview & Motivation</h2>
                        <p style={styles.paragraph} className="project-paragraph">{project.overview}</p>
                    </section>

                    <section style={styles.textSection}>
                        <div style={styles.splitLayout} className="project-split-layout">
                            <div style={styles.splitContent}>
                                <h2 style={styles.sectionHeader} className="project-section-header">The Problem</h2>
                                <p style={styles.paragraph} className="project-paragraph">{project.problem}</p>
                            </div>
                            <div style={styles.splitContent}>
                                <h2 style={styles.sectionHeader} className="project-section-header">The Solution</h2>
                                <p style={styles.paragraph} className="project-paragraph">{project.solution}</p>
                            </div>
                        </div>
                    </section>

                    {/* User Personas */}
                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader} className="project-section-header">User Personas</h2>
                        <div style={styles.imageGrid} className="project-image-grid">
                            <div style={styles.imagePlaceholder} className="persona-image-holder">
                                <img src={project.persona1} alt="User Persona 1" className="persona-image" style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div style={styles.imagePlaceholder} className="persona-image-holder">
                                <img src={project.persona2} alt="User Persona 2" className="persona-image" style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    </section>

                    {/* User Journey Map */}
                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader} className="project-section-header">User Journey Map</h2>
                        <div style={styles.largeImagePlaceholder} className="project-large-image journey-image-holder">
                            <img src={project.sitemap} alt="Sitemap" className="journey-image" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div style={styles.mobileImageGrid} className="project-mobile-image-grid">
                            {project.wireframes.map((wf, idx) => (
                                <div key={idx} style={styles.mobileImagePlaceholder} className="journey-image-holder">
                                    <img src={wf} alt={`Mobile Wireframe ${idx + 1}`} className="journey-image" style={{ width: '100%', height: '100%' }} />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Final Mockups */}
                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader} className="project-section-header">High-Fidelity Mockups</h2>
                        <div style={styles.mobileImageGrid} className="project-mobile-image-grid">
                            {project.finalMockups.map((mockup, idx) => (
                                <div key={idx} style={styles.mobileImagePlaceholder}>
                                    <img src={mockup} alt={`${project.title} High-Fidelity Mockup ${idx + 1}`} style={styles.mobileImage} />
                                </div>
                            ))}
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
        gap: 'clamp(1.5rem, 4vw, 4rem)',
    },
    splitContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    imageGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
    },
    imageGrid3: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
    },
    mobileImageGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1.75rem',
        marginTop: '2rem',
        justifyItems: 'center',
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
    mobileImagePlaceholder: {
        width: '100%',
        maxWidth: '230px',
        aspectRatio: '9/19.5',
        backgroundColor: 'var(--surface-color)',
        borderRadius: '28px',
        border: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    },
    mobileImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'top',
    },
    largeImagePlaceholder: {
        width: '100%',
        height: 'clamp(240px, 42vw, 400px)',
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

export default Project1;
