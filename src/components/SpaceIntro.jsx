import React, { useEffect, useRef, useState, useCallback } from 'react';

const PHASES = [
    { name: 'starfield', label: 'Travelling through space...', start: 0, end: 2500 },
    { name: 'earth', label: 'Approaching Earth', start: 2500, end: 4500 },
    { name: 'ireland', label: 'Ireland', start: 4500, end: 6000 },
    { name: 'dublin', label: 'Dublin', start: 6000, end: 7500 },
    { name: 'fadeout', label: '', start: 7500, end: 8500 },
];

const TOTAL = 8500;

const SpaceIntro = ({ onComplete }) => {
    const canvasRef = useRef(null);
    const overlayRef = useRef(null);
    const animRef = useRef(null);
    const startRef = useRef(null);
    const doneRef = useRef(false);
    const [currentPhase, setCurrentPhase] = useState('starfield');
    const [visible, setVisible] = useState(true);

    const finish = useCallback(() => {
        if (doneRef.current) return;
        doneRef.current = true;
        setVisible(false);
        // Small delay so the fade-out CSS transition plays
        setTimeout(() => onComplete(), 600);
    }, [onComplete]);

    // ── Single animation loop handles everything ──
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);

        // Stars
        const stars = Array.from({ length: 500 }, () => ({
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
            z: Math.random() * 3 + 0.5,
            size: Math.random() * 1.5 + 0.5,
        }));

        const cx = w / 2;
        const cy = h / 2;

        startRef.current = performance.now();

        const tick = (now) => {
            if (doneRef.current) return;

            const elapsed = now - startRef.current;

            // Determine phase
            let phaseName = 'fadeout';
            for (const p of PHASES) {
                if (elapsed >= p.start && elapsed < p.end) {
                    phaseName = p.name;
                    break;
                }
            }
            setCurrentPhase(phaseName);

            // Done?
            if (elapsed >= TOTAL) { finish(); return; }

            // ── Draw stars ──
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, w, h);

            const starAlpha = elapsed < 2500 ? 1 : Math.max(0, 1 - (elapsed - 2500) / 600);
            const speed = 0.003 + Math.min(elapsed / 2500, 1) * 0.018;

            if (starAlpha > 0) {
                for (const star of stars) {
                    star.z -= speed;
                    if (star.z <= 0.01) {
                        star.z = 3;
                        star.x = (Math.random() - 0.5) * 2;
                        star.y = (Math.random() - 0.5) * 2;
                    }

                    const sx = (star.x / star.z) * 600 + cx;
                    const sy = (star.y / star.z) * 600 + cy;
                    const sz = (1 - star.z / 3.5) * 3 + star.size;
                    const brightness = starAlpha * (1 - star.z / 3.5);

                    // Streak
                    const streakLen = Math.min(speed * 120 / star.z, 35);
                    const dx = (star.x / star.z) * 600;
                    const dy = (star.y / star.z) * 600;
                    const len = Math.sqrt(dx * dx + dy * dy) || 1;

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255,255,255,${brightness})`;
                    ctx.lineWidth = sz * 0.6;
                    ctx.moveTo(sx, sy);
                    ctx.lineTo(sx - (dx / len) * streakLen, sy - (dy / len) * streakLen);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.fillStyle = `rgba(200,215,255,${brightness})`;
                    ctx.arc(sx, sy, sz * 0.4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animRef.current = requestAnimationFrame(tick);
        };

        animRef.current = requestAnimationFrame(tick);

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [finish]);

    if (!visible && doneRef.current) return null;

    // Image transition helper
    const imgStyle = (targetPhase) => {
        const order = ['starfield', 'earth', 'ireland', 'dublin', 'fadeout'];
        const ci = order.indexOf(currentPhase);
        const ti = order.indexOf(targetPhase);
        const isActive = currentPhase === targetPhase;
        const isPast = ci > ti;

        return {
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: isActive ? 1 : 0,
            transform: `scale(${isActive ? 1 : isPast ? 2 : 0.15})`,
            transition: isActive
                ? 'opacity 0.6s ease-out, transform 1.6s cubic-bezier(0.16,1,0.3,1)'
                : 'opacity 0.4s ease-in, transform 0.4s ease-in',
            filter: isActive ? 'blur(0px)' : 'blur(15px)',
            zIndex: isActive ? 3 : 1,
        };
    };

    const labelObj = PHASES.find(p => p.name === currentPhase);
    const labelText = labelObj ? labelObj.label : '';

    return (
        <div
            ref={overlayRef}
            style={{
                position: 'fixed', inset: 0, zIndex: 99999,
                background: '#000', overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.6s ease-out',
                pointerEvents: visible ? 'auto' : 'none',
            }}
        >
            {/* Star canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', zIndex: 1,
                }}
            />

            {/* Earth */}
            <img src="./intro/earth.png" alt="" style={imgStyle('earth')} />
            {/* Ireland */}
            <img src="./intro/ireland.png" alt="" style={imgStyle('ireland')} />
            {/* Dublin */}
            <img src="./intro/dublin.png" alt="" style={imgStyle('dublin')} />

            {/* Phase label */}
            {labelText && (
                <div style={{
                    position: 'absolute', bottom: '15%', width: '100%',
                    textAlign: 'center', zIndex: 10, pointerEvents: 'none',
                }}>
                    <p style={{
                        color: '#fff',
                        fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                        fontWeight: 300,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        textShadow: '0 2px 30px rgba(0,0,0,0.9)',
                        fontFamily: "'Inter','Outfit',sans-serif",
                        margin: 0,
                    }}>
                        {labelText}
                    </p>
                </div>
            )}

            {/* Skip */}
            <button
                onClick={finish}
                style={{
                    position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 20,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff', padding: '8px 20px', borderRadius: '100px',
                    cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.1em',
                    fontFamily: "'Inter',sans-serif",
                    transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.25)'}
                onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
            >
                Skip Intro →
            </button>
        </div>
    );
};

export default SpaceIntro;
