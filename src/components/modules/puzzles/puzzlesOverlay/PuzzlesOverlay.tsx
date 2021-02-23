import React from 'react';
import { PuzzlesCanvas } from './PuzzlesCanvas';
import { container, contentContainer, heading } from './puzzlesOverlayStyles';

export const PuzzlesOverlay: React.FC = () => {
    return (
        <section css={container}>
            <PuzzlesCanvas />
            <div css={contentContainer}>
                <h1 css={heading}>Discover The&nbsp;Guardian Puzzles&nbsp;App</h1>
            </div>
        </section>
    );
};
