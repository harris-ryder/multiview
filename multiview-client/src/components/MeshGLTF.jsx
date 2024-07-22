import React from 'react';
import { MeshStandardMaterial } from 'three';
import { useLayoutEffect } from 'react'

export const MeshGLTF = ({ scene }) => {
  const material = new MeshStandardMaterial({ color: 0xff0000 });

  console.log("scene is:", scene)
  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log("mesh", child)
        //child.material = material
      }
    })
  }, [scene])

  return (
    <>
      <primitive object={scene} />
    </>
  );
};
