import { TEXT } from './constants';

export function getTileTextAsImage(text: string, color: string, size: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    if (context) {
        const lines = text.split('\n');

        context.font = TEXT.SMALL.FONT;
        context.textAlign = TEXT.SMALL.ALIGN;
        context.textBaseline = TEXT.SMALL.BASELINE;
        context.translate(4, 4);
        context.fillStyle = color;
        lines.forEach((line, index) => {
            const yPosition = index * TEXT.SMALL.LINE_HEIGHT;
            context.fillText(line, 0, yPosition, size);
        });
    }
    return canvas;
}
