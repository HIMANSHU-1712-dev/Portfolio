import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const MODEL_PATH = `${import.meta.env.BASE_URL}models/rajesh_avatar.glb`;

// ─── 3D Avatar that tracks cursor ─────────────────────────────────────────────
const AvatarModel = () => {
    const { scene } = useGLTF(MODEL_PATH);
    const groupRef = useRef();
    const headBoneRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    // Find the head bone on the LIVE scene (not a clone — cloning breaks skeleton bones)
    useEffect(() => {
        scene.traverse((child) => {
            if (child.name === 'spine006') {
                headBoneRef.current = child;
            }
        });
    }, [scene]);

    // Track mouse position
    useEffect(() => {
        const handleMove = (e) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    useFrame(() => {
        if (!headBoneRef.current) return;
        const maxRot = Math.PI / 6;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // Smooth head rotation towards cursor
        headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
            headBoneRef.current.rotation.y,
            mx * maxRot,
            0.08
        );
        headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
            headBoneRef.current.rotation.x,
            -my * maxRot * 0.6,
            0.08
        );
    });

    // Don't move the model — the camera goes to it instead
    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
};

// ─── Scene setup ──────────────────────────────────────────────────────────────
const AvatarScene = () => {
    const { camera } = useThree();

    useEffect(() => {
        // Match the reference repo's camera: the model's head is near y=13
        camera.position.set(0, 15.0, 24.7);
        camera.fov = 14.5;
        camera.zoom = 1.1;
        camera.updateProjectionMatrix();
        camera.lookAt(0, 14.4, 0);
    }, [camera]);

    return (
        <>
            {/* Main key light from top-right */}
            <directionalLight position={[3, 18, 5]} intensity={2.5} color="#ffffff" />
            {/* Fill from left */}
            <directionalLight position={[-4, 16, 4]} intensity={1.2} color="#c77dff" />
            {/* Rim/back light — purple glow for theme */}
            <pointLight position={[0, 15, -3]} intensity={8} color="#e040fb" distance={12} />
            {/* Bottom fill to avoid dark chin */}
            <pointLight position={[0, 10, 3]} intensity={1.5} color="#b98ce8" distance={8} />
            {/* Ambient */}
            <ambientLight intensity={0.8} />

            <React.Suspense fallback={null}>
                <AvatarModel />
            </React.Suspense>
        </>
    );
};

// ─── Main Overlay Component ───────────────────────────────────────────────────
const AvatarIntro = ({ onComplete, onFadeStart }) => {
    const [phase, setPhase] = useState(0);
    // Phases:
    // 0: Avatar loading/appearing
    // 1: Name + Title appear
    // 2: About Me + Enter button
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 1200);
        const t2 = setTimeout(() => setPhase(2), 6000);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    const handleEnter = () => {
        setExiting(true);
        if (onFadeStart) onFadeStart();
        setTimeout(() => {
            if (onComplete) onComplete();
        }, 1500);
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 99998,
            background: 'radial-gradient(ellipse at 50% 40%, #1a0e2e 0%, #0a0612 50%, #050308 100%)',
            opacity: exiting ? 0 : 1,
            transition: 'opacity 1.5s ease-in-out',
            pointerEvents: exiting ? 'none' : 'auto',
            overflow: 'hidden',
            fontFamily: "'Inter', 'Outfit', sans-serif",
        }}>

            {/* 3D Canvas — Avatar */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, transform: 'translateY(-10%)' }}>
                <Canvas
                    camera={{ position: [0, 15.0, 24.7], fov: 14.5 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                    style={{ background: 'transparent' }}
                >
                    <AvatarScene />
                </Canvas>
            </div>

            {/* Rim light glow effect (CSS) */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: '500px', height: '500px',
                background: 'radial-gradient(ellipse, rgba(185,140,232,0.15) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0,
            }} />

            {/* HTML Overlay Content */}
            <div style={{
                position: 'relative', zIndex: 2,
                width: '100%', height: '100%',
                display: 'flex', pointerEvents: 'none',
            }}>
                <AnimatePresence mode="wait">
                    {phase === 1 && (
                        <React.Fragment key="phase1">
                            {/* Left Side: Name */}
                            <motion.div
                                initial={{ opacity: 0, x: -60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    position: 'absolute', left: '6%', top: '50%', transform: 'translateY(-50%)',
                                    color: '#fff', textAlign: 'left',
                                }}
                            >
                                <p style={{
                                    fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', color: '#e040fb',
                                    margin: 0, marginBottom: '0.6rem',
                                    letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500,
                                }}>
                                    Hello! I'm
                                </p>
                                <h1 style={{
                                    fontSize: 'clamp(2.8rem, 5vw, 5rem)', fontWeight: 800, margin: 0,
                                    lineHeight: 0.95, letterSpacing: '-0.03em',
                                    textShadow: '0 0 60px rgba(185,140,232,0.3)',
                                }}>
                                    KABIR<br />SHARMA
                                </h1>
                            </motion.div>

                            {/* Right Side: Title */}
                            <motion.div
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 40 }}
                                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)',
                                    color: '#fff', textAlign: 'right',
                                }}
                            >
                                <p style={{
                                    fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', color: '#c77dff',
                                    margin: 0, marginBottom: '0.6rem',
                                    letterSpacing: '0.12em', fontWeight: 500,
                                }}>
                                    A Creative
                                </p>
                                <h2 style={{
                                    fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', fontWeight: 800, margin: 0,
                                    lineHeight: 1.05, letterSpacing: '-0.02em',
                                    background: 'linear-gradient(135deg, #e040fb, #c77dff)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>
                                    UI/UX<br />DESIGNER
                                </h2>
                                <p style={{
                                    fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', color: 'rgba(206,190,228,0.7)',
                                    margin: 0, marginTop: '0.4rem', fontWeight: 400, letterSpacing: '0.04em',
                                }}>
                                    & Product Associate
                                </p>
                            </motion.div>
                        </React.Fragment>
                    )}

                    {phase === 2 && (
                        <React.Fragment key="phase2">
                            {/* About Me — slides in from the right */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)',
                                    color: '#fff', maxWidth: '420px', pointerEvents: 'auto',
                                }}
                            >
                                <h3 style={{
                                    fontSize: '0.85rem', letterSpacing: '0.2em', color: '#e040fb',
                                    textTransform: 'uppercase', marginBottom: '1.2rem', fontWeight: 600,
                                }}>
                                    About Me
                                </h3>
                                <p style={{
                                    fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7,
                                    color: 'rgba(220,210,240,0.85)', margin: 0, fontWeight: 300,
                                }}>
                                    Passionate about crafting intuitive, scalable, and human-centric digital experiences.
                                    I blend structural design systems with premium aesthetics, taking ideas from concept
                                    all the way to deployment.
                                </p>

                                <motion.button
                                    onClick={handleEnter}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1, duration: 0.6 }}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: '0 0 30px rgba(185,140,232,0.4)',
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        marginTop: '2.5rem', padding: '16px 36px',
                                        background: 'linear-gradient(135deg, rgba(185,140,232,0.2), transparent)',
                                        color: '#fff',
                                        border: '1px solid rgba(185,140,232,0.4)',
                                        borderRadius: '30px', cursor: 'pointer',
                                        fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Enter Portfolio →
                                </motion.button>
                            </motion.div>
                        </React.Fragment>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// Preload the model
useGLTF.preload(MODEL_PATH);

export default AvatarIntro;
