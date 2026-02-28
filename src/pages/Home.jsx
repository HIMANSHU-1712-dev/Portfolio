import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import DynamicBackground from '../components/DynamicBackground';
import GeometricBackground from '../components/GeometricBackground';

const FALLBACK_IMAGE = './sample.jpg';

// ─── Reusable scroll-reveal wrapper ──────────────────────────────────────────
const Reveal = ({ children, delay = 0, direction = 'up', style }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        },
        visible: { opacity: 1, y: 0, x: 0 },
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            style={style}
        >
            {children}
        </motion.div>
    );
};

const ScrollSection = ({ children, style, delay = 0 }) => (
    <motion.section
        style={style}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        {children}
    </motion.section>
);

const FloatingOrb = ({ style, duration = 16, delay = 0 }) => (
    <motion.div
        style={{ ...styles.floatingOrb, ...style }}
        animate={{
            x: [0, 24, -16, 0],
            y: [0, -18, 12, 0],
            scale: [1, 1.08, 0.96, 1],
            opacity: [0.18, 0.28, 0.2, 0.18],
        }}
        transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
);

// ─── Magnetic hover button ────────────────────────────────────────────────────
const MagneticLink = ({ to, children, className, style }) => {
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    };
    const handleMouseLeave = () => {
        if (ref.current) ref.current.style.transform = 'translate(0, 0)';
    };

    return (
        <Link
            ref={ref}
            to={to}
            className={className}
            style={{ ...style, transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </Link>
    );
};

// ─── Floating skill pill ──────────────────────────────────────────────────────
const SkillPill = ({ label, index }) => (
    <motion.span
        style={styles.skillPill}
        whileHover={{
            scale: 1.08,
            borderColor: 'rgba(222,196,255,0.6)',
            color: '#f3e9ff',
            background: 'linear-gradient(135deg, rgba(205,168,255,0.24), rgba(185,140,232,0.16))',
            boxShadow: '0 14px 34px -20px rgba(185,140,232,0.62), inset 0 0 0 1px rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
        }}
        variants={skillVariants}
        custom={index}
    >
        {label}
    </motion.span>
);

// ─── Project card ─────────────────────────────────────────────────────────────
const CardImage = ({ src, alt }) => {
    const [failed, setFailed] = React.useState(false);

    if (failed) {
        return <div style={styles.projectImageFallback} />;
    }

    return (
        <motion.img
            src={src || FALLBACK_IMAGE}
            alt={alt}
            style={styles.projectImg}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6 }}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
        />
    );
};

const ProjectCard = ({ to, img, alt, title, desc, index }) => (
    <motion.div
        variants={projectCardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        custom={index}
    >
        <Link to={to} style={{ textDecoration: 'none' }}>
            <motion.div
                style={styles.projectCard}
                whileHover={{ y: -8, boxShadow: '0 24px 64px -24px rgba(185,140,232,0.42)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                <div style={styles.projectImageWrap}>
                    <CardImage src={img} alt={alt} />
                    <div style={styles.projectImgOverlay} />
                </div>
                <div style={styles.projectInfo}>
                    <h3 style={styles.projectTitle}>{title}</h3>
                    <p style={styles.projectDesc}>{desc}</p>
                    <span style={styles.projectArrow}>View case study →</span>
                </div>
            </motion.div>
        </Link>
    </motion.div>
);

const projectCardVariants = {
    hidden: { opacity: 0, y: 46, scale: 0.965, filter: 'blur(8px)' },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            delay: 0.08 + index * 0.12,
            duration: 0.72,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

const skillContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.08,
        },
    },
};

const skillVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96 },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: index * 0.02,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

const ctaContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.72,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
};

const ctaItemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Home = () => {
    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 680], ['0%', '18%']);
    const heroOpacity = useTransform(scrollY, [0, 460, 700], [1, 1, 0]);
    const heroActionsOpacity = useTransform(scrollY, [0, 560, 760], [1, 1, 0]);
    const geometryOpacity = useTransform(scrollY, [220, 620], [0, 1]);
    const geometryScale = useTransform(scrollY, [220, 620], [0.97, 1]);

    const skills = ['UI Design', 'UX Research', 'Prototyping', 'Design Systems', '3D Modeling', 'Motion Design', 'Interaction Design', 'Brand Identity'];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
        >
            <motion.div style={{ ...styles.homeGeometryLayer, opacity: geometryOpacity, scale: geometryScale }}>
                <GeometricBackground showBackdrop={false} />
            </motion.div>

            {/* ── HERO ───────────────────────────────────────────────────── */}
            <section ref={heroRef} style={styles.heroSection}>
                <DynamicBackground />
                <FloatingOrb style={{ top: '16%', right: '12%', width: '260px', height: '260px' }} duration={18} />
                <FloatingOrb style={{ bottom: '14%', left: '6%', width: '180px', height: '180px' }} duration={22} delay={1.2} />

                <motion.div
                    className="container"
                    style={{ ...styles.heroContent, y: heroY }}
                >
                    <motion.div style={{ opacity: heroOpacity }}>
                        <motion.h1
                            style={styles.heroTitle}
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Crafting{' '}
                            <span className="text-gradient">digital<br />experiences</span>{' '}
                            that<br />inspire.
                        </motion.h1>

                        <motion.p
                            style={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            UI/UX Designer translating complex problems into elegant,
                            intuitive interfaces. I bring ideas to life through design.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        style={{ ...styles.heroActions, opacity: heroActionsOpacity }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65, duration: 0.8 }}
                    >
                        <MagneticLink to="/projects" className="glass-button" style={{ padding: '16px 44px', fontSize: '1rem', fontWeight: 600 }}>
                            View Work
                        </MagneticLink>
                        <MagneticLink to="/contact" style={styles.ghostLink}>
                            Let's talk →
                        </MagneticLink>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    style={styles.scrollIndicator}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                >
                    <motion.div
                        style={styles.scrollLine}
                        animate={{ scaleY: [0, 1, 0], originY: 0 }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    />
                    <span style={styles.scrollLabel}>Scroll</span>
                </motion.div>
            </section>

            <div className="container">
                {/* ── SKILLS ───────────────────────────────────────────── */}
                <ScrollSection style={styles.section} delay={0.05}>
                    <Reveal>
                        <div style={{ ...styles.sectionHeader, ...styles.skillsSectionHeader }}>
                            <span style={styles.sectionTag}>What I Do</span>
                            <h2 style={styles.sectionTitle}>Core Skills</h2>
                        </div>
                    </Reveal>
                    <motion.div
                        style={styles.skillsGrid}
                        variants={skillContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {skills.map((s, i) => <SkillPill key={s} label={s} index={i} />)}
                    </motion.div>
                </ScrollSection>

                {/* ── FEATURED PROJECTS ────────────────────────────────── */}
                <ScrollSection style={styles.section}>
                    <Reveal>
                        <div style={styles.sectionHeader}>
                            <span style={styles.sectionTag}>Selected Work</span>
                            <h2 style={styles.sectionTitle}>Featured Projects</h2>
                        </div>
                    </Reveal>

                    <div style={styles.projectGrid}>
                        <ProjectCard
                            to="/projects/1"
                            img="./sample.jpg"
                            alt="Fintech Dashboard"
                            title="Fintech Dashboard"
                            desc="A comprehensive financial dashboard focusing on data visualization and ease of use."
                            index={0}
                        />
                        <ProjectCard
                            to="/projects/2"
                            img="./sample.jpg"
                            alt="Eco-Store App"
                            title="Eco-Store App"
                            desc="Sustainable e-commerce mobile app designed with a focus on ethical shopping."
                            index={1}
                        />
                    </div>

                    <Reveal delay={0.3}>
                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <MagneticLink to="/projects" className="glass-button" style={{ padding: '14px 36px' }}>
                                See All Projects
                            </MagneticLink>
                        </div>
                    </Reveal>
                </ScrollSection>

                {/* ── CTA ──────────────────────────────────────────────── */}
                <ScrollSection style={styles.ctaSection} delay={0.1}>
                    <motion.div
                        style={styles.ctaInner}
                        variants={ctaContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.28 }}
                    >
                            <motion.div
                                style={styles.ctaAura}
                                animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.32, 0.18] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.span style={styles.sectionTag} variants={ctaItemVariants}>Ready to start?</motion.span>
                            <motion.h2 style={styles.ctaTitle} variants={ctaItemVariants}>Let's build something<br /><span className="text-gradient">extraordinary</span>.</motion.h2>
                            <motion.div variants={ctaItemVariants}>
                                <MagneticLink to="/contact" className="glass-button" style={{ padding: '18px 52px', fontSize: '1.1rem', marginTop: '2rem' }}>
                                Get In Touch
                                </MagneticLink>
                            </motion.div>
                    </motion.div>
                </ScrollSection>
            </div>
        </motion.div>
    );
};

const styles = {
    homeGeometryLayer: {
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
    },
    heroSection: {
        position: 'relative',
        height: '100vh',
        minHeight: '560px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
    },
    floatingOrb: {
        position: 'absolute',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(216,190,255,0.38), rgba(155,110,224,0.04) 65%)',
        filter: 'blur(6px)',
        pointerEvents: 'none',
        zIndex: 0,
    },
    heroContent: {
        position: 'relative',
        zIndex: 1,
        paddingTop: 'clamp(28px, 6vh, 80px)',
        maxWidth: '820px',
    },
    heroTitle: {
        fontSize: 'clamp(2.8rem, 8.4vw, 6.2rem)',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 0.96,
        marginBottom: '1.2rem',
        textShadow: '0 0 80px rgba(185, 140, 232, 0.18)',
    },
    heroSubtitle: {
        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
        color: 'rgba(206, 190, 228, 0.8)',
        lineHeight: 1.8,
        maxWidth: '500px',
        marginBottom: '2rem',
    },
    heroActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
    },
    ghostLink: {
        fontSize: '1rem',
        color: 'rgba(206,190,228,0.78)',
        fontWeight: 500,
        letterSpacing: '0.01em',
        transition: 'color 0.2s, transform 0.2s',
    },
    scrollIndicator: {
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        zIndex: 2,
    },
    scrollLine: {
        width: '1.5px',
        height: '40px',
        background: 'linear-gradient(to bottom, rgba(185,140,232,0.9), transparent)',
        borderRadius: '2px',
    },
    scrollLabel: {
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(185,140,232,0.55)',
    },
    // ── Stats ─────────────────────────────────────────────────────────
    statsBar: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
        padding: '3rem 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        margin: '0 0 5rem',
    },
    stat: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    statNum: {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, #e040fb, #c77dff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    statLabel: {
        fontSize: '0.85rem',
        color: 'rgba(180,160,200,0.6)',
        fontWeight: 400,
        letterSpacing: '0.03em',
    },
    // ── Shared section ─────────────────────────────────────────────────
    section: {
        marginBottom: '8rem',
    },
    sectionHeader: {
        marginBottom: '3rem',
    },
    skillsSectionHeader: {
        marginBottom: '3.8rem',
    },
    sectionTag: {
        display: 'inline-block',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(185,140,232,0.78)',
        marginBottom: '0.6rem',
    },
    sectionTitle: {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.15,
    },
    // ── Projects ───────────────────────────────────────────────────────
    projectGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '2rem',
    },
    projectCard: {
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.018)',
        border: '1px solid rgba(185,140,232,0.16)',
        display: 'flex',
        flexDirection: 'column',
    },
    projectImageWrap: {
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
    },
    projectImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    projectImageFallback: {
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 25%, rgba(185,140,232,0.2), rgba(20,17,38,0.88) 65%)',
    },
    projectImgOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(3,0,6,0.8) 0%, transparent 60%)',
    },
    projectInfo: {
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    projectTitle: {
        fontSize: '1.35rem',
        fontWeight: 600,
        letterSpacing: '-0.02em',
    },
    projectDesc: {
        fontSize: '0.92rem',
        color: 'rgba(194,177,218,0.78)',
        lineHeight: 1.6,
    },
    projectArrow: {
        marginTop: '0.75rem',
        fontSize: '0.85rem',
        color: 'rgba(185,140,232,0.8)',
        fontWeight: 500,
    },
    // ── Skills ─────────────────────────────────────────────────────────
    skillsGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
    },
    skillPill: {
        padding: '10px 22px',
        background: 'rgba(185,140,232,0.09)',
        border: '1px solid rgba(185,140,232,0.22)',
        borderRadius: '99px',
        fontSize: '0.9rem',
        color: 'rgba(223,206,244,0.9)',
        fontWeight: 500,
        cursor: 'default',
        transition: 'all 0.25s',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
    },
    // ── CTA ────────────────────────────────────────────────────────────
    ctaSection: {
        marginBottom: '10rem',
    },
    ctaInner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '6rem 2rem',
        borderRadius: '32px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(185,140,232,0.14) 0%, transparent 70%)',
        border: '1px solid rgba(185,140,232,0.22)',
        position: 'relative',
        overflow: 'hidden',
    },
    ctaAura: {
        position: 'absolute',
        width: '340px',
        height: '340px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(185,140,232,0.32) 0%, rgba(185,140,232,0) 65%)',
        top: '-160px',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
    },
    ctaTitle: {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 1.1,
        marginTop: '0.75rem',
    },
};

export default Home;
