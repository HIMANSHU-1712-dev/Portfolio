import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FALLBACK_IMAGE = './sample.jpg';

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 28,
        scale: 0.985,
    },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: 0.06 + index * 0.07,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

const ProjectImage = ({ src, alt }) => {
    const [failed, setFailed] = React.useState(false);

    if (failed) {
        return (
            <div style={styles.imageFallback}>
                <span style={styles.fallbackText}>Project Preview</span>
            </div>
        );
    }

    return (
        <img
            src={src || FALLBACK_IMAGE}
            alt={alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
        />
    );
};

const Projects = () => {
    // Mock data for projects
    const projects = [
        { id: 1, title: 'TrekMate', category: 'Mobile App', image: './tm.jpg' },
        { id: 2, title: 'WorkHive', category: 'Web-Platfrom', image: './wh.jpg' },
        { id: 3, title: 'The Hunger Games', category: 'UX Case Study', image: './sample.jpg' },
        { id: 4, title: 'Lens & Light', category: 'Photography Collection', image: './hosue.jpg' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="container section projects-page"
        >
            <motion.h1
                style={styles.pageTitle}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                Selected Works
            </motion.h1>
            <motion.div
                style={styles.titleAccent}
                className="projects-title-accent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            <div style={styles.grid} className="projects-grid">
                {projects.map((project, index) => (
                    <motion.article
                        key={project.id}
                        style={styles.cardMotion}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link
                            to={`/projects/${project.id}`}
                            style={styles.card}
                        >
                            <motion.div
                                style={styles.imageHolder}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <ProjectImage src={project.image} alt={project.title} />
                                <span style={styles.categoryBadge}>{project.category}</span>
                            </motion.div>
                            <div style={styles.cardContent} className="projects-card-content">
                                <h2 style={styles.projectTitle}>{project.title}</h2>
                                <motion.span
                                    style={styles.viewLink}
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    View Case Study →
                                </motion.span>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </motion.div>
    );
};

const styles = {
    pageTitle: {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        marginBottom: '1.2rem',
    },
    titleAccent: {
        width: '150px',
        height: '3px',
        borderRadius: '999px',
        background: 'linear-gradient(90deg, rgba(185,140,232,0.95), rgba(185,140,232,0.08))',
        transformOrigin: 'left center',
        marginBottom: '2.4rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '2.5rem',
    },
    cardMotion: {
        perspective: '1200px',
        transformStyle: 'preserve-3d',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        textDecoration: 'none',
    },
    imageHolder: {
        width: '100%',
        aspectRatio: '4/3',
        backgroundColor: 'var(--surface-color)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        border: '1px solid var(--glass-border)',
    },
    imageFallback: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 20% 25%, rgba(185,140,232,0.22), rgba(20,17,38,0.9) 65%)',
    },
    fallbackText: {
        fontSize: '0.82rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(223,206,244,0.78)',
    },
    categoryBadge: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        padding: '4px 12px',
        borderRadius: 'var(--radius-pill)',
        fontSize: '0.8rem',
        color: 'var(--text-primary)',
        border: '1px solid var(--glass-border)',
    },
    cardContent: {
        padding: '1.5rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectTitle: {
        fontSize: '1.5rem',
        color: 'var(--text-primary)',
    },
    viewLink: {
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        transition: 'color var(--transition-fast)',
    }
};

export default Projects;
