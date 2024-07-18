import React from 'react';
import { MeshBasicMaterial } from 'three';


export const ImportObject = ({ geometry }) => {
  const material = new MeshBasicMaterial({ color: 0xff0000 });
  return (
    <>
      <mesh scale={[1, 1, 1]} geometry={geometry.data} material={material} />
    </>
  );
};
