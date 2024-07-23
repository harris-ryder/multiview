import React, { useLayoutEffect } from 'react';
import { MeshStandardMaterial } from 'three'; // Importing this in case you need a default material
import { MeshGLTF } from './MeshGLTF'; // Make sure to import your MeshGLTF component

export const MeshGroup = ({ geometry }) => {

  //useLayoutEffect(() => {
  //  geometry.traverse((child) => {
  //    if (child.isMesh) {
  //      console.log("mesh", child);
  //      // Define a material if needed, or use the existing child material
  //      const material = new MeshStandardMaterial(); // Remove or adjust if using existing material
  //      child.material = material;
  //    }
  //  });
  //}, [geometry]);
  console.log("group :", geometry)
  return (
    <>
      {geometry.children.map((child, index) => {
        if (child.isMesh) {
          return <MeshGLTF key={index} scene={child} />;
        } else {
          return <MeshGroup key={index} geometry={child} />;
        }
      })}
    </>
  );
};
