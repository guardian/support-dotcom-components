import { Body, Constraint } from 'matter-js';
import { PhysicalTile } from './tilePhysics';
import { BACKGROUND, TEXT, TILE_SHADOW } from './constants';

function enableShadow(context: CanvasRenderingContext2D) {
    context.shadowColor = TILE_SHADOW.COLOR;
    context.shadowOffsetX = TILE_SHADOW.OFFSET;
    context.shadowOffsetY = TILE_SHADOW.OFFSET;
    context.shadowBlur = TILE_SHADOW.BLUR;
}

function disableShadow(context: CanvasRenderingContext2D) {
    context.shadowColor = '0';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
}

export function lineTo(context: CanvasRenderingContext2D, vertix: { x: number; y: number }): void {
    context.lineTo(vertix.x, vertix.y);
}

function renderLongText(context: CanvasRenderingContext2D, tile: PhysicalTile) {
    if (tile.image) {
        const { angle, vertices } = tile.body;
        const x = vertices[0]?.x || 0;
        const y = vertices[0]?.y || 0;

        context.translate(x, y);
        context.rotate(angle);
        context.drawImage(tile.image, 0, 0);
        context.rotate(-angle);
        context.translate(-x, -y);
    }
}

function renderNumber(context: CanvasRenderingContext2D, tile: PhysicalTile) {
    if (tile.color && tile.text) {
        const { angle, position } = tile.body;

        context.font = TEXT.LARGE.FONT;
        context.textAlign = TEXT.LARGE.ALIGN;
        context.textBaseline = TEXT.LARGE.BASELINE;
        context.translate(position.x, position.y);
        context.rotate(angle);
        context.fillStyle = tile.color;
        context.fillText(tile.text, 0, 0);
        context.rotate(-angle);
        context.translate(-position.x, -position.y);
    }
}

export function render(context: CanvasRenderingContext2D, tiles: PhysicalTile[]): void {
    const { canvas } = context;
    window.requestAnimationFrame(() => render(context, tiles));

    context.fillStyle = BACKGROUND.COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);

    tiles.forEach(tile => {
        const { vertices } = tile.body;

        context.beginPath();
        context.moveTo(vertices[0]?.x ?? 0, vertices[0]?.y ?? 0);

        vertices.forEach(vertix => {
            lineTo(context, vertix);
        });

        vertices[0] && lineTo(context, vertices[0]);

        context.closePath();
        context.stroke();

        enableShadow(context);

        context.fillStyle = tile.background;
        context.fill();
        disableShadow(context);

        if (tile.isText) {
            renderLongText(context, tile);
        } else {
            renderNumber(context, tile);
        }
    });
}

export function debugRender(context: CanvasRenderingContext2D, bodies: Body[]): void {
    window.requestAnimationFrame(() => debugRender(context, bodies));

    bodies.forEach(body => {
        const { vertices } = body;

        context.beginPath();
        context.moveTo(vertices[0]?.x ?? 0, vertices[0]?.y ?? 0);

        vertices.forEach(vertix => {
            lineTo(context, vertix);
        });

        vertices[0] && lineTo(context, vertices[0]);

        context.closePath();
        context.stroke();
    });
}

export function debugRenderConstraints(
    context: CanvasRenderingContext2D,
    constraints: Constraint[],
): void {
    window.requestAnimationFrame(() => debugRenderConstraints(context, constraints));

    constraints.forEach(constraint => {
        const { pointA, pointB } = constraint;

        context.beginPath();
        context.moveTo(pointA.x, pointA.y);

        pointB && lineTo(context, pointB);

        context.closePath();
        context.stroke();
    });
}
