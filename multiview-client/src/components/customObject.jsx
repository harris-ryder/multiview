import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import React from 'react';
import { MeshBasicMaterial } from 'three';


export const CustomObject = ({ file }) => {

  var geometry = new STLLoader().parse(file);
  geometry.sourceType = "stl";
  geometry.sourceFile = file.name;
  console.log(geometry)
  const material = new MeshBasicMaterial({ color: 0xff0000 });

  return (
    <>
      <mesh scale={[0.1, 0.1, 0.1]} geometry={geometry} material={material} />
    </>
  );
};
