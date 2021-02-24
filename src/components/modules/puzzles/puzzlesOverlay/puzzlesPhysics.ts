import { Body, Bodies, Common, Composite, Engine, Mouse, MouseConstraint, World } from 'matter-js';
import { Tile } from './tiles';
import { BOUNDS, FORCES, TILE_SIZE, TILE_PROPERTIES, TIME } from './constants';

export type PhysicalTile = Tile & {
    body: Body;
};

function percentage(percent: number, ofNumber: number) {
    return (percent / 100) * ofNumber;
}

function createWorldBounds(canvas: HTMLCanvasElement) {
    const boundSize = BOUNDS.SIZE;
    const halfBound = boundSize / 2;
    const width = canvas.width * 2;
    const height = canvas.height * 2;

    const groundOffset = canvas.height + halfBound / 2;
    const ceilingOffset = -halfBound;
    const leftOffset = -halfBound;
    const rightOffset = canvas.width + halfBound;

    return {
        ground: Bodies.rectangle(0, groundOffset, width, halfBound, { isStatic: true }),
        ceiling: Bodies.rectangle(0, ceilingOffset, width, boundSize, { isStatic: true }),
        left: Bodies.rectangle(leftOffset, 0, boundSize, height, { isStatic: true }),
        right: Bodies.rectangle(rightOffset, 0, boundSize, height, { isStatic: true }),
    };
}

function createTileBodies(tiles: Tile[], canvas: HTMLCanvasElement): PhysicalTile[] {
    return tiles.map(tile => {
        const size = tile.size || TILE_SIZE.SMALL;
        const xPosition = percentage(tile.position.xPercentage, canvas.width);
        const yPosition = percentage(tile.position.yPercentage, canvas.height);
        const angle = tile.position.angle;

        const body = Bodies.rectangle(xPosition, yPosition, size, size, {
            angle,
            density:
                size == TILE_SIZE.SMALL
                    ? TILE_PROPERTIES.DENSITY.LIGHT
                    : TILE_PROPERTIES.DENSITY.HEAVY,
            friction: TILE_PROPERTIES.FRICTION,
            restitution: TILE_PROPERTIES.RESTITUTION,
        });

        return {
            ...tile,
            body,
        };
    });
}

type InteractiveElements = {
    engine: Engine;
    mouseConstraint: MouseConstraint;
    physicalBackgroundTiles: PhysicalTile[];
    physicalTextTiles: PhysicalTile[];
};

export function createInteractiveTiles(
    context: CanvasRenderingContext2D,
    backgroundTiles: Tile[],
    textTiles: Tile[],
): InteractiveElements {
    const engine = Engine.create({
        timing: {
            timestamp: 0,
            timeScale: TIME.SLOW,
        },
    });

    const mouse = Mouse.create(context.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
    });

    const { ground, ceiling, left, right } = createWorldBounds(context.canvas);

    const physicalBackgroundTiles = createTileBodies(backgroundTiles, context.canvas);
    const physicalTextTiles = createTileBodies(textTiles, context.canvas);

    World.add(engine.world, [
        ground,
        ceiling,
        left,
        right,
        ...physicalBackgroundTiles.map(tile => tile.body),
        ...physicalTextTiles.map(tile => tile.body),
    ]);
    World.add(engine.world, mouseConstraint);

    return {
        engine,
        mouseConstraint,
        physicalBackgroundTiles,
        physicalTextTiles,
    };
}

export function explosion(engine: Engine): void {
    const bodies = Composite.allBodies(engine.world).filter(body => !body.isStatic);

    bodies.forEach(body => {
        const forceMagnitude = FORCES.EXPLOSION * body.mass;

        Body.applyForce(body, body.position, {
            x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
            y: -forceMagnitude + Common.random() * -forceMagnitude,
        });
    });
}
