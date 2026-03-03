import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Project3 = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    // Hardcoded data for Project 1
    const project = {
        title: 'The Hunger Games',
        category: 'UX Research',
        timeline: '1 Month',
        role: 'UX Reseacher & Analyst',
        Introduction: 'Swiggy and Zomato have transformed the way urban users discover, order, and experience food. While both platforms offer similar core services—food delivery, dine-in bookings, and loyalty programs—their user experiences differ significantly in design clarity, task efficiency, and service perception. This UX comparative study analyzes both platforms across key user journeys to understand how design decisions influence usability, satisfaction, and overall user preference. By combining feature evaluation with real user feedback from 40 participants, this study aims to uncover which platform delivers a more seamless and intuitive experience.',
        problem: 'Despite offering comparable services, Swiggy and Zomato adopt different UX approaches in navigation, checkout flows, personalization, and support systems. However, it remains unclear how these differences impact real user satisfaction and behavioral preference.The core problem this study addresses is: Which platform provides a superior end-to-end user experience, and what specific UX elements drive that perception?Understanding these differences can reveal broader insights into speed vs. depth in design strategy, and how minimalism, transparency, and support responsiveness affect user trust and loyalty.',
        scope: 'This study evaluates both platforms across critical stages of the food ordering journey, including: Onboarding & App Layout | Food Discovery & Filtering | Checkout & Payment Flow | Delivery & Post-Order Experience | Offers, Discounts & Loyalty Programs | Dine-In & Table Booking Features | Customer Support & Issue Resolution | The research is based on: A structured comparative feature analysis | Survey responses from 40 participants | Qualitative feedback on pain points and satisfaction. The objective is not to declare a winner, but to identify strengths, weaknesses, and strategic UX differences that shape overall user perception.',
        heroImage: './bmw.jpg',
        surveyResponses: [
            './p3survey1.png',
            './p3survey2.png',
            './p3survey3.png',
            './p3survey4.png',
            './p3survey5.png',
            './p3survey6.png',
            './p3survey7.png',
            './p3survey8.png',
            './p3survey9.png',
            './p3survey10.png'
        ]
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

                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader} className="project-section-header">Survey Responses</h2>
                        <div style={styles.imageGrid} className="project-image-grid">
                            {project.surveyResponses.map((response, idx) => (
                                <div key={idx} style={styles.imagePlaceholder} className="persona-image-holder">
                                    <img
                                        src={response}
                                        alt={`Survey Response ${idx + 1}`}
                                        className="persona-image"
                                        style={{ width: '100%', height: '100%' }}
                                    />
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
    }
};

export default Project3;
