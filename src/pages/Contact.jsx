import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="container section contact-page"
        >
            <div style={styles.layout} className="contact-layout">
                <div style={styles.infoCol} className="contact-info-col">
                    <h1 style={styles.title}>Let's create <br />together.</h1>
                    <p style={styles.subtitle} className="contact-subtitle">
                        I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div style={styles.contactDetails} className="contact-details">
                        <div style={styles.contactItem}>
                            <span style={styles.label}>Email</span>
                            <a href="mailto:hello@kabiroscope.com" style={styles.link} className="contact-link">kabiroscope@gmail.com</a>
                        </div>
                        <div style={styles.contactItem}>
                            <span style={styles.label}>Social</span>
                            <a href="#" style={styles.link} className="https://www.linkedin.com/in/kabirsharma192003/">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const styles = {
    layout: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '70vh',
        alignItems: 'center',
    },
    infoCol: {
        width: '100%',
        maxWidth: '720px',
    },
    title: {
        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
        lineHeight: '1.1',
        marginBottom: '1.5rem',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.6',
        marginBottom: '3rem',
        maxWidth: '500px',
    },
    contactDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    contactItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--text-secondary)',
        marginBottom: '0.5rem',
    },
    link: {
        fontSize: '1.2rem',
        color: 'var(--text-primary)',
        fontWeight: '500',
        transition: 'color var(--transition-fast)',
    },
};

export default Contact;
