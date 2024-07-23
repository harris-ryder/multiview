
import React from 'react';
import { MeshStandardMaterial } from 'three';
import { TransformControls } from '@react-three/drei';


export const MeshSTL = ({ geometry }) => {
  const material = new MeshStandardMaterial({ color: 0xff0000 });

  return (
    <>
      <TransformControls>
        <mesh scale={[1, 1, 1]} geometry={geometry} material={material} />
      </TransformControls>

    </>
  );
};
