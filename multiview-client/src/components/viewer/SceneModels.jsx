import { useEffect, Suspense, useState, useContext } from 'react';
import { MeshSTL } from './MeshSTL';
import { MeshGLTF } from './MeshGLTF';
import { useScene } from '../../context/SceneContext';
import { useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshGroup } from './MeshGroup';

export function SceneModels() {
  const { activeGeometries } = useScene();

  const model = (activeGeometries.length < 1) ? useLoader(GLTFLoader, './2CylinderEngine.gltf') : null

  return (
    <>

      <Suspense>
        {activeGeometries.map((object, index) => {
          switch (object.type) {
            case 'stl':
              return <MeshSTL key={index} geometry={object.geometry} />;
            case 'gltf':
            case 'glb':
            case 'obj':
            case 'fbx':
              return <MeshGroup key={index} geometry={object.geometry} />;
            default:
              return null;
          }
        })}
        {(activeGeometries.length < 1) && (
          <Float rotationIntensity={5} >
            <primitive object={model.scene} />
          </Float>
        )}

      </Suspense >
    </>
  );
}
