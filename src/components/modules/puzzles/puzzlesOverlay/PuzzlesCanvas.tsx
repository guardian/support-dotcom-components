import React, { useEffect, useRef } from 'react';
import { Body, Engine } from 'matter-js';
import { createInteractiveTiles } from './puzzlesPhysics';
import { backgroundCanvas } from './puzzlesOverlayStyles';

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

function render(context: CanvasRenderingContext2D, bodies: Body[]) {
    const { canvas } = context;
    window.requestAnimationFrame(() => render(context, bodies));

    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    bodies.forEach(body => {
        const { angle, position, vertices } = body;

        context.beginPath();
        context.moveTo(vertices[0]?.x ?? 0, vertices[0]?.y ?? 0);

        vertices.forEach(vertix => {
            lineTo(context, vertix);
        });

        vertices[0] && lineTo(context, vertices[0]);

        context.closePath();
        context.stroke();
        enableShadow(context);

        context.fillStyle = 'white';
        context.fill();
        disableShadow(context);

        context.translate(position.x, position.y);
        context.rotate(angle);
        context.strokeText('2', 0, 0);
        context.rotate(-angle);
        context.translate(-position.x, -position.y);
    });
}

export const PuzzlesCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context) {
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;

            context.font = '100px GuardianTextSans, sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.lineWidth = 2;
            context.strokeStyle = '#000';

            const matterEngine = createInteractiveTiles(context);

            Engine.run(matterEngine);

            render(
                context,
                matterEngine.world.bodies.filter(body => !body.isStatic),
            );
        }
    }, []);

    return <canvas css={backgroundCanvas} ref={canvasRef}></canvas>;
};
