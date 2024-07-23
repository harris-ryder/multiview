
import { useEffect, Suspense, useState, useContext } from 'react';
import { MeshOBJ } from './MeshOBJ';
import { MeshSTL } from './MeshSTL';
import { MeshFBX } from './MeshFBX';
import { MeshGLTF } from './MeshGLTF';
import { useScene } from '../../context/SceneContext';

export function SceneModels() {
  const { activeGeometries } = useScene();

  return (
    <>
      <Suspense>
        {activeGeometries.map((object, index) => {
          switch (object.type) {
            case 'stl':
              return <MeshSTL key={index} geometry={object.geometry} />;
            case 'obj':
              return <MeshOBJ key={index} geometry={object.geometry} />;
            case 'fbx':
              return <MeshFBX key={index} geometry={object.geometry} />;
            case 'glb':
              return <MeshGLTF key={index} scene={object.geometry} />;
            case 'gltf':
              return <MeshGLTF key={index} scene={object.geometry} />;
            default:
              return null;
          }
        })}
      </Suspense>
    </>
  );
}
