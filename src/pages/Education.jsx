import React from 'react';
import { motion } from 'framer-motion';
import PhysicsPlayground from '../components/PhysicsPlayground';

const Education = () => {
    const education = [
        {
            id: 1,
            degree: 'M.SC. Interactive Digital Media',
            institution: 'Tinity College Dublin, Ireland',
            period: 'Sep 2025 - Sep 2026',
            description: 'Explored interaction design, UX/UI principles, digital media production, and user-centered design to create intuitive and engaging digital experiences.'
        },
        {
            id: 2,
            degree: 'Bachelor of Technology in Computer Scienece & Engineering',
            institution: 'Anurag University, Hyderabad, India',
            period: '2021 - 2025',
            description: 'Built a strong foundation in computer science, covering programming, data structures, algorithms, databases, and software engineering fundamentals.'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="container section education-page"
        >
            <h1 style={styles.pageTitle}>Education</h1>

            <div style={styles.timeline} className="timeline">
                {education.map((edu, index) => (
                    <motion.div
                        key={edu.id}
                        style={styles.timelineItem}
                        className="timeline-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                        <div style={styles.periodColumn} className="period-column">
                            <span style={styles.period}>{edu.period}</span>
                        </div>
                        <div style={styles.contentColumn} className="content-column">
                            <h2 style={styles.degree} className="role-heading">{edu.degree}</h2>
                            <h3 style={styles.institution}>{edu.institution}</h3>
                            <p style={styles.description} className="timeline-description">{edu.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <PhysicsPlayground />
        </motion.div>
    );
};

// Reusing same styles structure from Experience for consistency
const styles = {
    pageTitle: {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        marginBottom: '4rem',
    },
    timeline: {
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        position: 'relative',
        paddingLeft: '1rem',
        borderLeft: '1px solid var(--glass-border)',
    },
    timelineItem: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        position: 'relative',
    },
    periodColumn: {
        flex: '1 1 200px',
    },
    contentColumn: {
        flex: '3 1 400px',
    },
    period: {
        fontSize: '0.9rem',
        color: 'var(--accent-color)',
        fontFamily: 'monospace',
        padding: '4px 12px',
        background: 'var(--glass-bg)',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--glass-border)',
        display: 'inline-block',
    },
    degree: {
        fontSize: '1.8rem',
        color: 'var(--text-primary)',
        marginBottom: '0.2rem',
    },
    institution: {
        fontSize: '1.2rem',
        color: 'var(--text-secondary)',
        fontWeight: '400',
        marginBottom: '1rem',
    },
    description: {
        fontSize: '1.1rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.6',
    }
};

export default Education;
