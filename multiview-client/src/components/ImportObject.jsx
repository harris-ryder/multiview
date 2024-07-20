import React from 'react';
import { MeshStandardMaterial } from 'three';

import { useLayoutEffect } from 'react'


//<mesh scale={[1, 1, 1]} geometry={geometry} material={material} />
export const ImportObject = ({ geometry }) => {
  const material = new MeshStandardMaterial({ color: 0xff0000 });

  useLayoutEffect(() => {
    geometry.traverse((child) => {
      if (child.isMesh) {
        console.log("mesh", child)
        child.material = material
      }
    })
  }, [geometry])

  console.log("import geometryect", geometry)
  return (
    <>

      <primitive object={geometry} material={material} />
    </>
  );
};
