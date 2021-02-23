import React, { useEffect, useRef, useState } from 'react';
import { Engine } from 'matter-js';
import { createInteractiveTiles } from './puzzlesPhysics';
import { getBackgroundTiles, getTextTiles } from './tiles';
import { render } from './render';
import { backgroundCanvas } from './puzzlesOverlayStyles';

export const PuzzlesCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isWaiting, setIsWaiting] = useState<boolean>(true);
    const [matterEngine, setMatterEngine] = useState<Engine | null>(null);

    function runEngine() {
        if (isWaiting && matterEngine) {
            Engine.run(matterEngine);
            setIsWaiting(false);
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context) {
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;

            context.lineWidth = 2;
            context.strokeStyle = '#000';

            const { engine, physicalBackgroundTiles, physicalTextTiles } = createInteractiveTiles(
                context,
                getBackgroundTiles(),
                getTextTiles(),
            );

            console.log(physicalTextTiles);

            setMatterEngine(engine);
            render(context, [...physicalBackgroundTiles, ...physicalTextTiles]);
        }
    }, []);

    return <canvas css={backgroundCanvas} ref={canvasRef} onClick={runEngine}></canvas>;
};
