import { Body, Bodies, Engine, Mouse, MouseConstraint, World } from 'matter-js';
import { Tile } from './tiles';

const TILE_SIZE = 120;

export type PhysicalTile = Tile & {
    body: Body;
};

function randomNumberBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function createWorldBounds(canvas: HTMLCanvasElement) {
    const boundSize = 200;
    const halfBound = boundSize / 2;
    const width = canvas.width * 2;
    const height = canvas.height * 2;

    const groundOffset = height;
    const ceilingOffset = canvas.height - halfBound;
    const leftOffset = -halfBound;
    const rightOffset = canvas.width + halfBound;

    console.log(groundOffset);

    return {
        ground: Bodies.rectangle(0, groundOffset, width, boundSize, { isStatic: true }),
        ceiling: Bodies.rectangle(0, ceilingOffset, width, boundSize, { isStatic: true }),
        left: Bodies.rectangle(leftOffset, 0, boundSize, height, { isStatic: true }),
        right: Bodies.rectangle(rightOffset, 0, boundSize, height, { isStatic: true }),
    };
}

function createTileBodies(tiles: Tile[], canvas: HTMLCanvasElement): PhysicalTile[] {
    const xOffset = canvas.width / tiles.length;
    const minY = canvas.height / 3;
    const minRadianAngle = -0.6;
    const maxRadianAngle = 0.6;

    return tiles.map((tile, index) => {
        const size = tile.size || TILE_SIZE;
        const xPosition = index * xOffset;
        const yPosition = randomNumberBetween(minY, canvas.height - TILE_SIZE * 3);
        const angle = randomNumberBetween(minRadianAngle, maxRadianAngle);

        const body = Bodies.rectangle(xPosition, yPosition, size, size, {
            angle,
            density: 0.01,
            friction: 0.5,
            restitution: 0.7,
        });

        return {
            ...tile,
            body,
        };
    });
}

export function createInteractiveTiles(
    context: CanvasRenderingContext2D,
    backgroundTiles: Tile[],
    textTiles: Tile[],
): { engine: Engine; physicalBackgroundTiles: PhysicalTile[]; physicalTextTiles: PhysicalTile[] } {
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
        physicalBackgroundTiles,
        physicalTextTiles,
    };
}
