import { brandAlt } from '@guardian/src-foundations/palette';
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
        context.translate(3, 6);
        context.fillStyle = color;
        lines.forEach((line, index) => {
            const yPosition = index * TEXT.SMALL.LINE_HEIGHT;

            if (line.includes('crosswords')) {
                context.fillStyle = brandAlt[400];
                context.fillRect(-1, yPosition - 1, 110, 21);
                context.fillStyle = color;
            } else if (line.includes('sudokus')) {
                context.fillStyle = brandAlt[400];
                context.fillRect(42, yPosition - 1, 80, 21);
                context.fillStyle = color;
            }

            context.fillText(line, 0, yPosition, size);
        });
    }
    return canvas;
}
