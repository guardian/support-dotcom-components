import React, { useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { a } from '@react-spring/three';
import { useDrag } from 'react-use-gesture';
import THREE from 'three';
import { SerializedStyles, css } from '@emotion/react';

const canvasContainer = css`
    width: 100%;
    height: 100%;
`;

function DraggableMesh() {
  const [position, setPosition] = useState<[x: number, y: number, z: number]>([0, 0, 0]);
  const ref = useRef<THREE.Mesh>(null);

  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  useFrame(() => {
    if(ref.current) {
      ref.current.rotation.z += 0.005;
    }
  });

  const bind = useDrag(
    ({ offset: [x, y] }) => {
      const [,, z] = position;
      setPosition([x / aspect, -y / aspect, z]);
    },
    { pointerEvents: true }
  );

  return (
    <a.mesh
      position={position}
      {...bind()}
      ref={ref}
      // onPointerOver={(e: any) => console.log('hover')}
      // onPointerOut={(e: any) => console.log('unhover')}
    >
      <dodecahedronGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={'blue'} />
    </a.mesh>
  );
};

export function DraggableOverlay({
  cssOverrides,
}: {
  cssOverrides?: SerializedStyles;
}): JSX.Element {
  return (
    <div css={[canvasContainer, cssOverrides]}>
      <Canvas>
        <spotLight
          intensity={1.2}
          position={[30, 30, 50]}
          angle={0.2}
          penumbra={1}
          castShadow
        />
        <DraggableMesh />
      </Canvas>
    </div>
  )
};