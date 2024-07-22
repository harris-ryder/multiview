
import { useEffect, Suspense, useState, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { MeshOBJ } from './MeshOBJ';
import { MeshSTL } from './MeshSTL';
import { MeshFBX } from './MeshFBX';
import { MeshGLTF } from './MeshGLTF';
import { useScene } from '../context/SceneContext'



export function Viewer() {

  const { activeGeometries } = useScene()

  function updateMeshes() {
    let arr = [];

    for (const [index, object] of activeGeometries.entries()) {
      switch (object.type) {
        case 'stl':
          arr.push(<MeshSTL key={index} geometry={object.geometry} />)
          break;
        case 'obj':
          arr.push(<MeshOBJ key={index} geometry={object.geometry} />)
          break;
        case 'fbx':
          arr.push(<MeshFBX key={index} geometry={object.geometry} />)
          break
        case 'glb':
          arr.push(<MeshGLTF key={index} scene={object.geometry} />)
          break
        case 'gltf':
          arr.push(<MeshGLTF key={index} scene={object.geometry} />)
        default:
          break;
      }
    }

    return arr;
  }

  return (
    <>
      <div className='canvas-container'>
        <Canvas gl={{ preserveDrawingBuffer: true }} shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 150], fov: 50 }}>
          <ambientLight intensity={0.25} />
          <Stage
            shadows
            adjustCamera
          >
            {updateMeshes()}
          </Stage>
          <OrbitControls />
        </Canvas>

      </div >
    </>
  );
}

