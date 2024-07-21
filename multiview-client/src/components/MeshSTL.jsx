
import React from 'react';
import { MeshStandardMaterial } from 'three';


export const MeshSTL = ({ geometry }) => {
  const material = new MeshStandardMaterial({ color: 0xff0000 });

  return (
    <>
      <mesh scale={[1, 1, 1]} geometry={geometry} material={material} />
    </>
  );
};
