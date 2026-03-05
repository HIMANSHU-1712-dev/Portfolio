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
        introduction: 'Swiggy and Zomato have transformed the way urban users discover, order, and experience food. While both platforms offer similar core services—food delivery, dine-in bookings, and loyalty programs—their user experiences differ significantly in design clarity, task efficiency, and service perception. This UX comparative study analyzes both platforms across key user journeys to understand how design decisions influence usability, satisfaction, and overall user preference. By combining feature evaluation with real user feedback from 40 participants, this study aims to uncover which platform delivers a more seamless and intuitive experience.',
        problem: 'Despite offering comparable services, Swiggy and Zomato adopt different UX approaches in navigation, checkout flows, personalization, and support systems. However, it remains unclear how these differences impact real user satisfaction and behavioral preference.The core problem this study addresses is: Which platform provides a superior end-to-end user experience, and what specific UX elements drive that perception?Understanding these differences can reveal broader insights into speed vs. depth in design strategy, and how minimalism, transparency, and support responsiveness affect user trust and loyalty.',
        scope: 'This study evaluates both platforms across critical stages of the food ordering journey, including: Onboarding & App Layout | Food Discovery & Filtering | Checkout & Payment Flow | Delivery & Post-Order Experience | Offers, Discounts & Loyalty Programs | Dine-In & Table Booking Features | Customer Support & Issue Resolution | The research is based on: A structured comparative feature analysis | Survey responses from 40 participants | Qualitative feedback on pain points and satisfaction. The objective is not to declare a winner, but to identify strengths, weaknesses, and strategic UX differences that shape overall user perception.',
        heroImage: './hg.jpg',
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
        ],
        insightSummary: 'Based on survey responses from 40 participants and comparative UX analysis of both platforms, several patterns emerged across the food ordering journey.',
        researchInsights: [
            {
                title: 'Simplicity vs Feature Depth',
                description: 'Users consistently perceived Swiggy as simpler and faster to use, largely due to its minimal interface and streamlined navigation. Zomato, while feature-rich, sometimes introduced additional cognitive load because of denser information and promotional elements.'
            },
            {
                title: 'Speed of Task Completion Matters Most',
                description: 'For the majority of users, ordering food is a quick, routine activity. Platforms that enable faster decision-making and checkout flows were preferred. Swiggy’s auto-applied coupons and straightforward checkout reduced friction during ordering.'
            },
            {
                title: 'Trust Through Transparency',
                description: 'Users valued real-time delivery tracking and clear order updates. Swiggy’s tracking system was perceived as more reliable and transparent, which increased confidence during the delivery stage.'
            },
            {
                title: 'Customer Support Influences Perception',
                description: 'While Swiggy excelled in ordering efficiency, Zomato was rated stronger in customer support responsiveness. Faster response times and flexible refund policies created greater trust when issues occurred.'
            },
            {
                title: 'Offers Drive Platform Switching',
                description: 'A significant number of users reported using both apps interchangeably depending on discounts and available offers. This indicates that pricing incentives still play a major role in user loyalty.'
            }
        ],
        painPoints: [
            {
                title: 'Slow Delivery Times',
                description: 'The most frequently mentioned issue was delayed deliveries, which directly impacted satisfaction regardless of interface quality.'
            },
            {
                title: 'Promotional Overload',
                description: 'Some users found Zomato’s interface cluttered with advertisements and promotional banners, making navigation slightly overwhelming.'
            },
            {
                title: 'Checkout & Payment Glitches',
                description: 'Although rare, occasional payment issues and glitches were reported, particularly during peak usage times.'
            },
            {
                title: 'Hidden Charges & Price Transparency',
                description: 'Unexpected delivery fees or service charges sometimes caused frustration and reduced trust in the platform.'
            },
            {
                title: 'Confusing Interface Flows',
                description: 'A small number of users mentioned difficulty locating specific features such as cancellation options or offer details.'
            }
        ],
        recommendations: {
            swiggy: [
                {
                    title: 'Improve Customer Support Responsiveness',
                    description: 'While Swiggy performs well in ordering flow, improving response time and issue resolution could significantly enhance trust during problem scenarios.'
                },
                {
                    title: 'Strengthen Payment Reliability',
                    description: 'Addressing occasional payment glitches would improve overall checkout confidence.'
                },
                {
                    title: 'Enhance Loyalty Value Communication',
                    description: 'Although Swiggy One is widely appreciated, clearer communication of benefits and onboarding could increase adoption among non-subscribed users.'
                }
            ],
            zomato: [
                {
                    title: 'Reduce Interface Clutter',
                    description: 'Simplifying the home screen and reducing excessive promotional elements could improve navigation clarity and reduce cognitive overload.'
                },
                {
                    title: 'Improve Coupon Integration',
                    description: 'Automatically applying the best available discount during checkout would streamline the ordering process and improve user satisfaction.'
                },
                {
                    title: 'Optimize Delivery Transparency',
                    description: 'Enhancing real-time delivery tracking accuracy would increase reliability and match competitor expectations.'
                }
            ]
        },
        finalConclusion: [
            'Both Swiggy and Zomato deliver strong digital experiences but excel in different aspects of the food delivery journey.',
            'Swiggy stands out for its speed, simplicity, and streamlined ordering flow, making it the preferred platform for users who prioritize quick and frictionless food delivery. Its minimal interface, automated discounts, and reliable delivery tracking contribute to a smooth everyday experience.',
            'Zomato, on the other hand, differentiates itself through feature richness, restaurant discovery, and responsive customer support. Its deeper ecosystem appeals to users who enjoy exploring dining options and value stronger post-order assistance.',
            'Ultimately, the study suggests that the ideal food delivery experience balances efficiency with depth. Platforms that successfully combine fast task completion with transparent services and responsive support will be best positioned to build long-term user trust and loyalty.'
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
                        <h2 style={styles.sectionHeader} className="project-section-header">Introduction</h2>
                        <p style={styles.paragraph} className="project-paragraph">{project.introduction}</p>

                        <h2 style={{ ...styles.sectionHeader, marginTop: '2.5rem' }} className="project-section-header">Scope</h2>
                        <p style={styles.paragraph} className="project-paragraph">{project.scope}</p>

                        <h2 style={{ ...styles.sectionHeader, marginTop: '2.5rem' }} className="project-section-header">The Problem</h2>
                        <p style={styles.paragraph} className="project-paragraph">{project.problem}</p>
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

                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader} className="project-section-header">Key Research Insights</h2>
                        <p style={styles.paragraph} className="project-paragraph">{project.insightSummary}</p>
                        <div style={styles.insightGrid}>
                            {project.researchInsights.map((insight, idx) => (
                                <article key={insight.title} style={styles.insightCard}>
                                    <span style={styles.insightIndex}>{`${idx + 1}`.padStart(2, '0')}</span>
                                    <h3 style={styles.subSectionHeader}>{insight.title}</h3>
                                    <p style={styles.detailParagraph}>{insight.description}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader} className="project-section-header">Pain Points Discovered</h2>
                        <div style={styles.painPointList}>
                            {project.painPoints.map((point) => (
                                <article key={point.title} style={styles.painPointItem}>
                                    <h3 style={styles.subSectionHeader}>{point.title}</h3>
                                    <p style={styles.detailParagraph}>{point.description}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader} className="project-section-header">Strategic Recommendations</h2>
                        <div style={styles.recommendationGrid}>
                            <article style={styles.recommendationCard}>
                                <h3 style={styles.recommendationHeader}>Recommendations for Swiggy</h3>
                                <div style={styles.recommendationList}>
                                    {project.recommendations.swiggy.map((item) => (
                                        <div key={item.title} style={styles.recommendationItem}>
                                            <h4 style={styles.recommendationTitle}>{item.title}</h4>
                                            <p style={styles.detailParagraph}>{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </article>

                            <article style={styles.recommendationCard}>
                                <h3 style={styles.recommendationHeader}>Recommendations for Zomato</h3>
                                <div style={styles.recommendationList}>
                                    {project.recommendations.zomato.map((item) => (
                                        <div key={item.title} style={styles.recommendationItem}>
                                            <h4 style={styles.recommendationTitle}>{item.title}</h4>
                                            <p style={styles.detailParagraph}>{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        </div>
                    </section>

                    <section style={styles.textSection}>
                        <h2 style={styles.sectionHeader} className="project-section-header">Final Conclusion</h2>
                        <div style={styles.conclusionCard}>
                            {project.finalConclusion.map((paragraph) => (
                                <p key={paragraph} style={styles.detailParagraph}>
                                    {paragraph}
                                </p>
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
        maxWidth: '100%',
        textAlign: 'justify',
        textJustify: 'inter-word',
    },
    subSectionHeader: {
        fontSize: '1.2rem',
        marginBottom: '0.75rem',
        color: 'var(--text-primary)',
    },
    detailParagraph: {
        fontSize: '1.03rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.75',
        textAlign: 'justify',
        textJustify: 'inter-word',
    },
    insightGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem',
    },
    insightCard: {
        background: 'rgba(185, 140, 232, 0.05)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
    },
    insightIndex: {
        width: 'fit-content',
        fontSize: '0.78rem',
        fontWeight: '600',
        letterSpacing: '0.1em',
        color: 'var(--accent-color)',
        padding: '0.35rem 0.55rem',
        border: '1px solid var(--glass-border)',
        borderRadius: '999px',
    },
    painPointList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    painPointItem: {
        padding: '1.35rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
        background: 'rgba(185, 140, 232, 0.04)',
    },
    recommendationGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
    },
    recommendationCard: {
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
        background: 'linear-gradient(160deg, rgba(185, 140, 232, 0.08) 0%, rgba(20, 17, 38, 0.65) 100%)',
        padding: '1.5rem',
    },
    recommendationHeader: {
        fontSize: '1.3rem',
        marginBottom: '1rem',
    },
    recommendationList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
    },
    recommendationItem: {
        paddingBottom: '1rem',
        borderBottom: '1px solid rgba(185, 140, 232, 0.18)',
    },
    recommendationTitle: {
        fontSize: '1.05rem',
        marginBottom: '0.45rem',
        color: 'var(--text-primary)',
    },
    conclusionCard: {
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
        background: 'rgba(185, 140, 232, 0.06)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
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
