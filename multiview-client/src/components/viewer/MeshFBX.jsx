
import React from 'react';
import { MeshStandardMaterial } from 'three';
import { useLayoutEffect } from 'react'

export const MeshFBX = ({ geometry }) => {
  const material = new MeshStandardMaterial({ color: 0xff0000 });

  geometry.traverse(function(child) {
    if (child.isMesh) {

      child.material = material;
    }

  })
  return (
    <>
      <primitive object={geometry} material={material} />
    </>
  );
};
