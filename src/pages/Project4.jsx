import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Project4 = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    const project = {
        title: 'Photography Journal',
        category: 'Photography',
        heroImage: './swiss.jpg',
        gallery: [
            { src: './project4/IMG_6084.HEIC', alt: 'Snow-covered mountain range under dramatic sky' },
            { src: './project4/IMG_5879.HEIC', alt: 'Orange sports car reflected on glossy surface' },
            { src: './project4/IMG_6146.HEIC', alt: 'Urban architecture framed against blue sky' },
            { src: './project4/IMG_5461.HEIC', alt: 'Black-and-white skyscraper perspective shot' },
            { src: './project4/IMG_5590.HEIC', alt: 'City tram tracks stretching into horizon' },
            { src: './project4/IMG_5597.HEIC', alt: 'Street scene with layered architecture' },
            { src: './project4/IMG_E5820.HEIC', alt: 'Travel frame with cinematic light and depth' },
            { src: './project4/IMG_E5901.HEIC', alt: 'Architectural lines with contrast and shadow' },
            { src: './project4/IMG_5730.HEIC', alt: 'City composition with strong symmetry' },
            { src: './project4/IMG_5449.HEIC', alt: 'Tower geometry from a low-angle perspective' },
            { src: './project4/IMG_E6093.HEIC', alt: 'Glacial landscape and dramatic cloud cover' }
        ],
        quotes: [
            'Photography is the pause button of life.',
            'A picture is a poem without words.',
            'Light, shadow, and silence tell stories better than noise.'
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
                <section style={styles.gallerySection}>
                    <h2 style={styles.sectionHeader} className="project-section-header">Photography Collection</h2>

                    <div style={styles.quoteStrip}>
                        {project.quotes.map((quote) => (
                            <blockquote key={quote} style={styles.quoteCard}>
                                "{quote}"
                            </blockquote>
                        ))}
                    </div>

                    <div className="project4-masonry" style={styles.masonry}>
                        {project.gallery.map((photo, index) => (
                            <motion.figure
                                key={photo.src}
                                style={styles.photoFrame}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.6, delay: Math.min(index * 0.04, 0.36) }}
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    style={styles.photo}
                                    loading="lazy"
                                />
                            </motion.figure>
                        ))}
                    </div>
                </section>
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
    gallerySection: {
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
    },
    sectionHeader: {
        fontSize: '2rem',
        marginBottom: '1.25rem',
        textAlign: 'center',
    },
    quoteStrip: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
    },
    quoteCard: {
        margin: 0,
        padding: '1rem 1.15rem',
        background: 'rgba(185, 140, 232, 0.06)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-secondary)',
        fontSize: '0.98rem',
        lineHeight: '1.7',
        fontStyle: 'italic',
        textAlign: 'justify',
    },
    masonry: {
        columnGap: '1.2rem',
    },
    photoFrame: {
        breakInside: 'avoid',
        margin: '0 0 1.2rem',
        padding: '0.45rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
        background: 'rgba(185, 140, 232, 0.04)',
    },
    photo: {
        width: '100%',
        height: 'auto',
        display: 'block',
        borderRadius: 'calc(var(--radius-md) - 6px)',
        objectFit: 'contain',
    },
};

export default Project4;
