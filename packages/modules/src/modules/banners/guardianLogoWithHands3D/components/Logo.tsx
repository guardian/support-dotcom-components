import React from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { a } from '@react-spring/three';
import { GLTFResult, GuardianLogoWithHandsVisualState } from './GuardianLogoWithHandsVisual';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import glogoGLTF from '../assets/glogo.gltf';

export function Logo({
    setState,
}: {
    setState: React.Dispatch<React.SetStateAction<GuardianLogoWithHandsVisualState>>;
}): JSX.Element {
    const logoRef = useRef<THREE.Mesh>(null);

    const { nodes, materials } = useLoader(GLTFLoader, glogoGLTF) as GLTFResult;

    useFrame(() => {
        if (logoRef.current && logoRef.current.rotation.x >= 1.7) {
            setState((state: GuardianLogoWithHandsVisualState) => ({
                ...state,
                logoTransitionCompleted: true,
            }));
            return;
        }

        if (logoRef.current) {
            logoRef.current.rotation.x += 0.02;
        }
    });

    return (
        <group dispose={null}>
            <a.mesh
                ref={logoRef}
                castShadow
                receiveShadow
                geometry={nodes.Curve.geometry}
                material={materials['SVGMat.002']}
                scale={60}
                position={[0.15, 0.41, 0]}
            />
        </group>
    );
}
