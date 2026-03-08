import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── Coordinates ───────────────────────────────────────────────────────────────
const latLonToVec3 = (lat, lon, radius = 1.01) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
};

const HYDERABAD = { lat: 17.2403, lon: 78.4294 }; // RGIA Airport
const DUBLIN = { lat: 53.4264, lon: -6.2499 }; // Dublin Airport

// ── Build great-circle arc ────────────────────────────────────────────────────
const buildArc = (startCoord, endCoord, segments = 120, maxAlt = 0.05) => { // Lowered maxAlt for a flat route
    const startV = latLonToVec3(startCoord.lat, startCoord.lon, 1.005);
    const endV = latLonToVec3(endCoord.lat, endCoord.lon, 1.005);
    const points = [];
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        // Slerp for proper great-circle interpolation
        const point = new THREE.Vector3().copy(startV).lerp(endV, t).normalize();
        const alt = 1.005 + maxAlt * Math.sin(t * Math.PI);
        point.multiplyScalar(alt);
        points.push(point);
    }
    return points;
};

// ── Textured Globe ────────────────────────────────────────────────────────────
const Globe = ({ textureUrl }) => {
    const texture = useLoader(THREE.TextureLoader, textureUrl);
    return (
        <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial map={texture} metalness={0.05} roughness={0.85} />
        </mesh>
    );
};

// ── Atmosphere glow ring ──────────────────────────────────────────────────────
const Atmosphere = () => (
    <mesh>
        <sphereGeometry args={[1.025, 64, 64]} />
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.06} side={THREE.BackSide} />
    </mesh>
);

// ── City dot ──────────────────────────────────────────────────────────────────
const CityDot = ({ lat, lon }) => {
    const pos = useMemo(() => latLonToVec3(lat, lon, 1.012), [lat, lon]);
    return (
        <group position={pos}>
            <mesh>
                <sphereGeometry args={[0.012, 16, 16]} />
                <meshBasicMaterial color="#e040fb" />
            </mesh>
            <pointLight color="#e040fb" intensity={0.6} distance={0.2} />
        </group>
    );
};

// ── 3D Tube Flight Arc ────────────────────────────────────────────────────────
const FlightArc = ({ arcPoints, progress }) => {
    // Generate a tube along the flight path
    const curve = useMemo(() => new THREE.CatmullRomCurve3(arcPoints), [arcPoints]);
    const maxSegments = 100;

    return (
        <mesh>
            <tubeGeometry args={[curve, maxSegments, 0.003, 8, false]} />
            <meshStandardMaterial
                color="#e040fb"
                emissive="#e040fb"
                emissiveIntensity={1.5}
                transparent
                opacity={0.8}
            />
        </mesh>
    );
};

// ── Basic Plane Shape (Dart-like Jet) ─────────────────────────────────────────────────────────
const Airplane = ({ curve, progress }) => {
    const groupRef = useRef();

    useFrame(() => {
        if (!groupRef.current || !curve) return;

        // Use continuous curve evaluation for perfectly smooth position
        const p = Math.max(0, Math.min(progress, 0.999));
        const pos = curve.getPointAt(p);

        // Get continuous tangent (direction) for smooth rotation
        const tangent = curve.getTangentAt(p).normalize();

        groupRef.current.position.copy(pos);

        const up = pos.clone().normalize();

        // We look AT the direction we came from so the nose (Z+) points forward
        const target = pos.clone().sub(tangent);
        const mat = new THREE.Matrix4().lookAt(pos, target, up);
        groupRef.current.quaternion.setFromRotationMatrix(mat);
    });

    return (
        <group ref={groupRef} scale={[3, 3, 3]}>
            {/* Very simple dart/jet shape pointing forward */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.003, 0.02, 16]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} roughness={0.1} />
            </mesh>

            {/* Simple swept wings */}
            <mesh position={[0, 0, 0.005]}>
                <boxGeometry args={[0.03, 0.0005, 0.008]} />
                <meshStandardMaterial color="#dddddd" />
            </mesh>

            {/* Rear Engine Glow */}
            <pointLight position={[0, -0.001, -0.01]} color="#e040fb" intensity={1.5} distance={0.2} />
        </group>
    );
};

// ── Animated Scene ────────────────────────────────────────────────────────────
const Scene = ({ onProgress, textureUrl }) => {
    const { camera } = useThree();
    const startRef = useRef(null);
    const arcPoints = useMemo(() => buildArc(HYDERABAD, DUBLIN, 200), []); // Higher resolution arc points
    const curve = useMemo(() => new THREE.CatmullRomCurve3(arcPoints), [arcPoints]);
    const [progress, setProgress] = useState(0);

    const DURATION = 8; // seconds of flight

    // Set initial camera directly behind the plane over India looking towards Ireland
    useEffect(() => {
        const hydPos = latLonToVec3(HYDERABAD.lat, HYDERABAD.lon, 1);
        const dubPos = latLonToVec3(DUBLIN.lat, DUBLIN.lon, 1);
        const up = hydPos.clone().normalize();
        const initForward = new THREE.Vector3().subVectors(dubPos, hydPos).normalize();

        // Start from high above and behind the plane (Zoomed in closer)
        const camStart = hydPos.clone()
            .add(up.multiplyScalar(0.4))  // Closer to surface
            .add(initForward.multiplyScalar(-0.8)); // Closer behind

        camera.position.copy(camStart);

        // Look directly ahead along the flight path
        const lookStart = hydPos.clone().add(initForward.multiplyScalar(1.0));
        camera.lookAt(lookStart);
    }, [camera]);

    useFrame((state) => {
        if (!startRef.current) startRef.current = state.clock.elapsedTime;
        const elapsed = state.clock.elapsedTime - startRef.current;

        // Eased progress (smoother easing for cinematic feel)
        const raw = Math.min(elapsed / DURATION, 1);
        // easeInOutSine
        const eased = -(Math.cos(Math.PI * raw) - 1) / 2;

        setProgress(eased);
        onProgress(eased, elapsed);

        // Continuous perfect smoothly evaluated position and direction
        const p = Math.max(0, Math.min(eased, 0.99));
        const planePos = curve.getPointAt(p);
        const forward = curve.getTangentAt(p).normalize();
        const up = planePos.clone().normalize();

        // ── Cinematic Camera Tracking ──
        const right = new THREE.Vector3().crossVectors(forward, up).normalize();

        // Start behind and elevate, then smoothly transition out to a side view (Closer/Zoomed in)
        const sideOffsetAmount = 1.0 * eased; // 0 at start, 1.0 at end (tighter side view)
        const backwardOffsetAmount = -0.8 + (0.15 * eased); // -0.8 at start, -0.65 at end
        const upwardOffsetAmount = 0.4 - (0.1 * eased); // 0.4 at start, 0.3 at end

        const sideOffset = right.multiplyScalar(sideOffsetAmount);
        const backwardOffset = forward.clone().multiplyScalar(backwardOffsetAmount);
        const upwardOffset = up.clone().multiplyScalar(upwardOffsetAmount);

        // Combine offsets to place camera
        const camTarget = planePos.clone()
            .add(sideOffset)
            .add(backwardOffset)
            .add(upwardOffset);

        // High-frequency interpolation for butter smooth camera movement
        camera.position.lerp(camTarget, 0.1);

        // Look smoothly just ahead of the plane, angling down slightly towards the earth
        const lookTarget = planePos.clone()
            .add(forward.multiplyScalar(1.0))
            .sub(up.multiplyScalar(0.2 * eased)); // Slowly point down as it flies

        camera.lookAt(lookTarget);
    });

    return (
        <>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />

            <Globe textureUrl={textureUrl} />
            <Atmosphere />

            {/* Draw flight arc UP TO current progress */}
            <FlightArc arcPoints={arcPoints.slice(0, Math.max(2, Math.floor(progress * arcPoints.length)))} progress={progress} />

            <Airplane curve={curve} progress={progress} />
            <CityDot lat={HYDERABAD.lat} lon={HYDERABAD.lon} />
            <CityDot lat={DUBLIN.lat} lon={DUBLIN.lon} />
        </>
    );
};

// ── Fallback loading screen ───────────────────────────────────────────────────
const LoadingFallback = () => (
    <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', color: '#fff',
        fontFamily: "'Inter',sans-serif", zIndex: 5,
    }}>
        <div style={{
            width: 40, height: 40, border: '2px solid rgba(255,255,255,0.1)',
            borderTopColor: '#e040fb', borderRadius: '50%',
            animation: 'spin 1s linear infinite',
        }} />
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', letterSpacing: '0.2em', opacity: 0.6 }}>
            LOADING FLIGHT...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
);

// ── Main Export ───────────────────────────────────────────────────────────────
const FlightIntro = ({ onComplete, onFadeStart }) => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const doneRef = useRef(false);

    const handleProgress = useCallback((p, elapsed) => {
        setProgress(p);
        if (p >= 1 && !doneRef.current) {
            doneRef.current = true;
            setTimeout(() => {
                setVisible(false);
                if (onFadeStart) onFadeStart(); // Tells App to mount homepage immediately

                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 2500); // Exact length of CSS opacity transition
            }, 1000); // Pause briefly at Dublin
        }
    }, [onComplete, onFadeStart]);

    let label = 'Departing Hyderabad, India';
    let showProgress = true;

    if (progress > 0.05 && progress < 0.85) {
        label = 'In flight...';
    } else if (progress >= 0.85 && progress < 1) {
        label = 'Approaching Dublin, Ireland';
    } else if (progress >= 1) {
        label = 'Welcome to Dublin';
        showProgress = false;
    }

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#000',
            opacity: visible ? 1 : 0,
            transition: 'opacity 2.5s ease-in-out', // Extremely long, slow natural fade
            pointerEvents: visible ? 'auto' : 'none',
        }}>
            <Canvas
                camera={{ position: [0, 0, 3], fov: 45 }}
                style={{ width: '100%', height: '100%' }}
                gl={{ antialias: true }}
                dpr={[1, 2]}
            >
                <React.Suspense fallback={null}>
                    <Scene onProgress={handleProgress} textureUrl="./intro/earth_night_texture.png" />
                </React.Suspense>
            </Canvas>

            {/* HUD */}
            <div style={{
                position: 'absolute', bottom: '10%', width: '100%',
                textAlign: 'center', zIndex: 10, pointerEvents: 'none',
            }}>
                <p style={{
                    color: '#fff', fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
                    fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase',
                    textShadow: '0 2px 20px rgba(0,0,0,0.9)',
                    fontFamily: "'Inter','Outfit',sans-serif", margin: 0,
                }}>
                    {label}
                </p>

                {/* Only show progress bar and distance during actual flight */}
                <div style={{
                    opacity: showProgress ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                }}>
                    <div style={{
                        margin: '1rem auto 0', width: '200px', height: '2px',
                        background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${progress * 100}%`, height: '100%',
                            background: 'linear-gradient(90deg, #e040fb, #b98ce8)',
                            transition: 'width 0.1s linear',
                        }} />
                    </div>

                    <p style={{
                        color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem',
                        fontFamily: 'monospace', marginTop: '0.5rem', letterSpacing: '0.1em',
                    }}>
                        HYD → DUB • {Math.round(progress * 7600)} km
                    </p>
                </div>
            </div>

        </div>
    );
};

export default FlightIntro;
