import React from 'react';
import { MeshStandardMaterial } from 'three';
import { useLayoutEffect } from 'react'

export const MeshOBJ = ({ geometry }) => {
  const material = new MeshStandardMaterial({ color: 0xff0000 });

  useLayoutEffect(() => {
    geometry.traverse((child) => {
      if (child.isMesh) {
        console.log("mesh", child)
        child.material = material
      }
    })
  }, [geometry])

  return (
    <>
      <primitive object={geometry} material={material} />
    </>
  );
};
