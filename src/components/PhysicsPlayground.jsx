import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const PhysicsPlayground = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);

    useEffect(() => {
        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Config
        const width = sceneRef.current.clientWidth;
        const height = 400;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                background: 'transparent',
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        Render.run(render);

        // Create runner
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Add walls
        const wallOptions = {
            isStatic: true,
            render: { visible: false } // invisible boundaries
        };

        const ground = Bodies.rectangle(width / 2, height + 25, width + 100, 50, wallOptions);
        const ceiling = Bodies.rectangle(width / 2, -100, width + 100, 50, wallOptions);
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height + 200, wallOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height + 200, wallOptions);

        World.add(world, [ground, ceiling, leftWall, rightWall]);

        // Add interactive skill blocks
        const skills = ['React', 'Three.js', 'Framer Motion', 'Node.js', 'UI/UX Design', 'WebGL', 'CSS3', 'Jira', 'Figma'];

        const colors = ['#b98ce8', '#8778da', '#f0e5ff', '#c77dff', '#e040fb'];

        skills.forEach((skill, i) => {
            const x = 50 + Math.random() * (width - 100);
            const y = -100 - (i * 60);

            // Estimate width based on text length
            const textWidth = skill.length * 10 + 40;

            const body = Bodies.rectangle(x, y, textWidth, 40, {
                chamfer: { radius: 20 },
                render: {
                    fillStyle: colors[i % colors.length],
                    strokeStyle: '#ffffff',
                    lineWidth: 1
                },
                restitution: 0.8, // Bouncy
                friction: 0.05
            });

            body.label = skill;
            World.add(world, body);
        });

        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        World.add(world, mouseConstraint);
        render.mouse = mouse;

        // Custom drawing for the text labels
        Matter.Events.on(render, 'afterRender', () => {
            const context = render.context;
            context.font = "600 14px 'Inter', sans-serif";
            context.textAlign = 'center';
            context.textBaseline = 'middle';

            const bodies = Composite.allBodies(world);

            for (let i = 0; i < bodies.length; i++) {
                const body = bodies[i];
                if (body.label && body.label !== 'Rectangle Body') {
                    context.translate(body.position.x, body.position.y);
                    context.rotate(body.angle);

                    // Dark text for light pill, light text for dark pill
                    context.fillStyle = body.render.fillStyle === '#f0e5ff' ? '#141126' : '#ffffff';
                    context.fillText(body.label, 0, 0);

                    context.rotate(-body.angle);
                    context.translate(-body.position.x, -body.position.y);
                }
            }
        });

        // Handle resize
        const handleResize = () => {
            if (!sceneRef.current || !renderRef.current || !engineRef.current) return;
            const newWidth = sceneRef.current.clientWidth;

            renderRef.current.canvas.width = newWidth;
            renderRef.current.options.width = newWidth;

            // Move walls
            Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 25 });
            Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -100 });
            Matter.Body.setPosition(rightWall, { x: newWidth + 25, y: height / 2 });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            if (engineRef.current) {
                World.clear(engineRef.current.world);
                Engine.clear(engineRef.current);
            }
            if (renderRef.current && renderRef.current.canvas) {
                renderRef.current.canvas.remove();
            }
        };
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Interactive Skills</h2>
                <p style={styles.subtitle}>Grab, drag, and throw these skill tags around.</p>
            </div>
            <div
                ref={sceneRef}
                style={styles.scene}
                className="physics-playground"
            />
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        marginTop: '6rem',
        marginBottom: '2rem',
        position: 'relative',
        zIndex: 10,
    },
    header: {
        marginBottom: '2rem',
    },
    title: {
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        marginBottom: '0.5rem',
        color: 'var(--text-primary)',
    },
    subtitle: {
        fontSize: '1rem',
        color: 'var(--accent-color)',
        opacity: 0.8,
    },
    scene: {
        width: '100%',
        height: '400px',
        background: 'rgba(185, 140, 232, 0.03)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'grab',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.2)',
    }
};

export default PhysicsPlayground;
