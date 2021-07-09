import React, { useState, useEffect } from 'react';

const NUM_ANIMATION_STAGES = 4;
const ANIMATION_STAGE_DURATION_MS = 1000;

const AusBannerAnimation: React.FC = () => {
    const [animationStage, setAnimationStage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationStage(stage => (stage + 1) % NUM_ANIMATION_STAGES);
        }, ANIMATION_STAGE_DURATION_MS);

        return () => clearInterval(interval);
    }, []);

    const fill = (isOn: boolean) => (isOn ? 'red' : 'black');

    return (
        <div className="App">
            <svg viewBox="0 0 100 100">
                <g fill={fill(animationStage >= 1)}>
                    <rect x="0" y="0" width="10" height="100" />
                    <rect x="15" y="0" width="10" height="100" />
                </g>

                <g fill={fill(animationStage >= 2)}>
                    <rect x="30" y="0" width="10" height="100" />
                    <rect x="45" y="0" width="10" height="100" />
                </g>

                <g fill={fill(animationStage >= 3)}>
                    <rect x="60" y="0" width="10" height="100" />
                    <rect x="75" y="0" width="10" height="100" />
                </g>
            </svg>
        </div>
    );
};

export default AusBannerAnimation;
