import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const Project2 = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const mockupTextRef = useRef(null);
    const mockupTextInView = useInView(mockupTextRef, { once: true, amount: 0.35 });
    const [typedMockupText, setTypedMockupText] = useState('');
    const mockupNarrative = `These mockups present WorkHive as a comprehensive career platform designed to support users across every stage of their professional journey. Rather than functioning as a traditional job board, the platform integrates structured job discovery, network-driven opportunity mapping, and data-backed decision tools such as salary insights and cost-of-living estimation.

Each interface is built with clarity and hierarchy in mind prioritizing scannable job cards, contextual filters, match indicators, and actionable CTAs. The goal is to reduce cognitive load, increase decision confidence, and create a seamless experience where users can discover roles, leverage connections, and evaluate career moves within a single, unified ecosystem.`;

    useEffect(() => {
        if (!mockupTextInView) return;

        let charIndex = 0;
        const intervalId = window.setInterval(() => {
            charIndex += 1;
            setTypedMockupText(mockupNarrative.slice(0, charIndex));
            if (charIndex >= mockupNarrative.length) {
                window.clearInterval(intervalId);
            }
        }, 15);

        return () => window.clearInterval(intervalId);
    }, [mockupTextInView, mockupNarrative]);

    // Hardcoded data for Project 1
    const project = {
        title: 'Eco-Store App',
        category: 'Mobile App Design',
        timeline: '3 Months',
        role: 'Lead Product Designer',
        overview: 'A unified career platform designed to simplify how users discover jobs, evaluate companies, and build meaningful professional connections. The interface focuses on structured search, assisted filtering, and actionable insights like salary comparisons and relocation costs reducing the cognitive load of switching between multiple platforms. WorkHive is driven by the need to make the job search more transparent, data informed, and efficient for both candidates and recruiters.',
        problem: 'The current job ecosystem is fragmented and overwhelming. Job seekers rely on multiple tools for job discovery, networking, salary research, and company reviews, leading to scattered information and inefficient decision-making. Interfaces are often cluttered with poor categorization, making it difficult to filter relevant opportunities. Recruiters, on the other hand, struggle with inconsistent candidate data, lack of verified insights, and time consuming shortlisting processes.',
        solution: 'A user-centric platform that integrates job search, candidate discovery, company ratings, salary insights, and relocation cost estimation into a single ecosystem. Features like refined filters, assisted search, and structured candidate profiles enable faster and more relevant matching. By combining data transparency with intuitive navigation, WorkHive streamlines the hiring journey helping users make confident decisions and enabling recruiters to efficiently identify and engage the right talent.',
        heroImage: './whh.jpg',
        persona1: './p2persona1.png',
        persona2: './p2persona2.png',
        sitemap: './p2journey.jpg',
        wireframes: ['./p2w1.png', './p2w2.png', './p2w3.png'],
        finalMockups: ['./p2m1.png', './p2m2.png', './p2m3.png']
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
                        <div style={styles.imageGrid3} className="project-image-grid-3">
                            {project.wireframes.map((wf, idx) => (
                                <div key={idx} style={styles.wireframeItem}>
                                    <div style={styles.wireframePlaceholder} className="project2-wireframe-holder">
                                        <img src={wf} alt={`Wireframe ${idx + 1}`} className="project2-wireframe-image" />
                                    </div>
                                    {idx === 0 && (
                                        <p style={styles.wireframeDescription}>
                                            A structured job discovery interface designed to minimize friction and cognitive load. Advanced filters remain accessible at all times, enabling precise refinement without disrupting the browsing flow. Clear CTAs support both direct applications and network-driven referrals.
                                        </p>
                                    )}
                                    {idx === 1 && (
                                        <p style={styles.wireframeDescription}>
                                            A visual network-mapping interface that highlights role relevance through dynamic relationship nodes. Instead of a static list, users can explore career pathways and company overlaps contextually. The match percentage reinforces confidence in opportunity alignment.
                                        </p>
                                    )}
                                    {idx === 2 && (
                                        <p style={styles.wireframeDescription}>
                                            A decision-support tool that helps users evaluate relocation feasibility beyond salary comparisons. By combining income, expenses, and lifestyle inputs, it enables informed career decisions. The simplified layout ensures clarity while handling complex financial variables.
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Final Mockups */}
                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader} className="project-section-header">High-Fidelity Mockups</h2>
                        <div style={styles.mockupStack} className="project-image-grid-3">
                            {project.finalMockups.map((mockup, idx) => (
                                <motion.div
                                    key={idx}
                                    style={styles.mockupMotionWrapper}
                                    initial={{ opacity: 0, y: 80, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.8, delay: idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <motion.div
                                        style={styles.wireframePlaceholder}
                                        className="project2-wireframe-holder"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.35 }}
                                    >
                                        <img src={mockup} alt={`${project.title} Final Mockup ${idx + 1}`} className="project2-wireframe-image" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                        <div ref={mockupTextRef} style={styles.mockupNarrativeWrap}>
                            <p style={styles.mockupNarrativeText}>{typedMockupText}</p>
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
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        marginTop: '2rem',
    },
    mockupStack: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        marginTop: '2rem',
    },
    mockupMotionWrapper: {
        width: '100%',
    },
    wireframeItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    wireframePlaceholder: {
        width: '100%',
        aspectRatio: '16/10',
        backgroundColor: 'var(--surface-color)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    wireframeDescription: {
        margin: 0,
        fontSize: '1.05rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.7',
    },
    mockupNarrativeWrap: {
        marginTop: '1.5rem',
    },
    mockupNarrativeText: {
        margin: 0,
        fontSize: '1.1rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.8',
        textAlign: 'justify',
        whiteSpace: 'pre-line',
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

export default Project2;
