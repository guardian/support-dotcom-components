import React, { Suspense } from 'react';
import * as THREE from 'three';
import '../types/threeExtension';
import { GLTF } from 'three-stdlib/loaders/GLTFLoader';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Hands } from './Hands';
import { Logo } from './Logo';
import { css, SerializedStyles } from '@emotion/react';
import { SoftShadows } from '@react-three/drei';
import { from } from '@guardian/src-foundations/mq';

const canvasContainer = css`
    width: 100%;
    height: 100%;
`;

const canvasOverlay = css`
    &:after {
        content: '';
        display: block;
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        top: 75%;
        height: 25%;
        background-color: #005689;
    }

    ${from.tablet} {
        &:after {
            top: 85%;
        }
    }
`;
export type GLTFResult = GLTF & {
    nodes: {
        Curve: THREE.Mesh;
        Curve176: THREE.Mesh;
    };
    materials: {
        ['SVGMat.002']: THREE.MeshStandardMaterial;
        SVGMat: THREE.MeshStandardMaterial;
    };
};

export interface GuardianLogoWithHandsVisualState {
    logoTransitionCompleted: boolean;
    handsTransitionCompleted: boolean;
}

export function LogoWithHands(): JSX.Element {
    const [state, setState] = useState<GuardianLogoWithHandsVisualState>({
        logoTransitionCompleted: false,
        handsTransitionCompleted: false,
    });

    const containerRef = useRef<THREE.Group | null>(null);

    const [currentPosY, setCurrentPosY] = useState(0);

    useFrame(() => {
        if (!currentPosY) {
            setCurrentPosY(containerRef.current?.position.y ?? 0);
        }

        if (containerRef.current && containerRef.current.position.y <= currentPosY + 0.4) {
            if (state.handsTransitionCompleted && state.logoTransitionCompleted) {
                containerRef.current.translateY(0.009);
            }
        }
    });

    return (
        <group ref={containerRef} position={[0, 0, 0]} scale={1.3}>
            <Logo setState={setState} />
            <Hands state={state} setState={setState} />
        </group>
    );
}

export function GuardianLogoWithHandsVisual({
    cssOverrides,
}: {
    cssOverrides?: SerializedStyles;
}): JSX.Element {
    return (
        <div css={[canvasContainer, cssOverrides]}>
            <Canvas css={canvasOverlay}>
                <SoftShadows />
                <color attach="background" args={['#005689']} />
                <ambientLight intensity={0.3} />
                <directionalLight castShadow position={[-2.5, 12, -12]} intensity={0.9} />
                <pointLight position={[15, 15, 15]} />
                <pointLight position={[-12, 200, -12]} intensity={3} />

                <Suspense fallback={null}>
                    <LogoWithHands />
                </Suspense>
            </Canvas>
        </div>
    );
}
