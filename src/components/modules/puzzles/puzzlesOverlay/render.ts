import { PhysicalTile } from './puzzlesPhysics';

function enableShadow(context: CanvasRenderingContext2D) {
    context.shadowColor = 'rgba(0, 0, 0, 0.25)';
    context.shadowOffsetX = 6;
    context.shadowOffsetY = 6;
    context.shadowBlur = 3;
}

function disableShadow(context: CanvasRenderingContext2D) {
    context.shadowColor = '0';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
}

function lineTo(context: CanvasRenderingContext2D, vertix: { x: number; y: number }) {
    context.lineTo(vertix.x, vertix.y);
}

function renderLongText(context: CanvasRenderingContext2D, tile: PhysicalTile) {
    if (tile.color && tile.text) {
        const { angle, vertices } = tile.body;
        const x = vertices[0]?.x || 0;
        const y = vertices[0]?.y || 0;

        context.font = 'bold 20px GH Guardian Headline, serif';
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.translate(x, y);
        context.rotate(angle);
        context.fillStyle = tile.color;
        context.fillText(tile.text, 0, 0);
        context.rotate(-angle);
        context.translate(-x, -y);
    }
}

function renderNumber(context: CanvasRenderingContext2D, tile: PhysicalTile) {
    if (tile.color && tile.text) {
        const { angle, position } = tile.body;

        context.font = '100px GuardianTextSans, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
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

    context.fillStyle = '#fff';
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
