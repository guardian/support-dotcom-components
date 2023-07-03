import React from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import { a } from '@react-spring/three';
import { GLTFResult, GuardianLogoWithHandsVisualState } from './GuardianLogoWithHandsVisual';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import handsGLTF from '../assets/hands.gltf';

export function Hands({
    state,
    setState,
}: {
    state: GuardianLogoWithHandsVisualState;
    setState: React.Dispatch<React.SetStateAction<GuardianLogoWithHandsVisualState>>;
}): JSX.Element {
    const handsRef = useRef<THREE.Mesh>(null);

    const { nodes, materials } = useLoader(GLTFLoader, handsGLTF) as GLTFResult;

    useMemo(() => {
        materials.SVGMat.transparent = true;
        materials.SVGMat.opacity = 0;
    }, [materials]);

    const showHands = state.logoTransitionCompleted;

    const [currentPosY, setCurrentPosY] = useState(0);

    const fadeTransitionInProgress = materials.SVGMat.opacity < 1;
    const fadeTransitionCompleted = materials.SVGMat.opacity > 1;

    const handsTransitionInProgress =
        handsRef.current && handsRef.current.position.z > -(currentPosY - 0.08);
    const handsTransitionCompleted =
        handsRef.current && handsRef.current.position.z < -(currentPosY - 0.08);

    useFrame(() => {
        if (!showHands) {
            return;
        }

        if (!currentPosY) {
            setCurrentPosY(handsRef.current?.position.y ?? 0);
        }

        if (fadeTransitionInProgress) {
            materials.SVGMat.opacity += 0.01;
        }

        if (handsTransitionInProgress && fadeTransitionCompleted) {
            handsRef.current.translateZ(-0.009);
        }

        if (handsTransitionCompleted && fadeTransitionCompleted) {
            setState((state: GuardianLogoWithHandsVisualState) => ({
                ...state,
                handsTransitionCompleted: true,
            }));
            return;
        }
    });

    return (
        <group dispose={null}>
            <a.mesh
                ref={handsRef}
                castShadow
                receiveShadow
                geometry={nodes.Curve176.geometry}
                material={materials.SVGMat}
                scale={32}
                rotation={[14, 0, 0]}
                position={[-0.03, -0.9, 1]}
            />
        </group>
    );
}

// useGLTF.preload(handsGLTF);