import { Bodies, Engine, Mouse, MouseConstraint, World } from 'matter-js';

function createWorldBounds(canvas: HTMLCanvasElement) {
    const boundSize = 200;
    const width = canvas.width * 2;
    const height = canvas.height * 2;

    const groundOffset = canvas.height + boundSize / 2;
    const ceilingOffset = canvas.height - boundSize / 2;
    const leftOffset = -boundSize / 2;
    const rightOffset = canvas.width + boundSize / 2;

    return {
        ground: Bodies.rectangle(0, groundOffset, width, boundSize, { isStatic: true }),
        ceiling: Bodies.rectangle(0, ceilingOffset, width, boundSize, { isStatic: true }),
        left: Bodies.rectangle(leftOffset, 0, boundSize, height, { isStatic: true }),
        right: Bodies.rectangle(rightOffset, 0, boundSize, height, { isStatic: true }),
    };
}

export function createInteractiveTiles(context: CanvasRenderingContext2D): Engine {
    const engine = Engine.create({
        timing: {
            timestamp: 0,
            timeScale: 0.7,
        },
    });

    const mouse = Mouse.create(context.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
    });

    const { ground, ceiling, left, right } = createWorldBounds(context.canvas);

    const box = Bodies.rectangle(0, 0, 120, 120, {
        density: 0.01,
        friction: 0.5,
        restitution: 0.7,
    });

    World.add(engine.world, [ground, ceiling, left, right, box]);
    World.add(engine.world, mouseConstraint);

    return engine;
}
