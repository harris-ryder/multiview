
import { useEffect, Suspense, useState, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { MeshSTL } from './MeshSTL';
import { MeshGLTF } from './MeshGLTF';
import { useScene } from '../../context/SceneContext'
import { useControls } from 'leva'
export function Viewer({ children }) {


  const controls = useControls({ position: -2 })

  return (
    <>
      <div className='canvas-container'>
        <Canvas gl={{ preserveDrawingBuffer: true }} shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 150], fov: 50 }}>
          <ambientLight intensity={0.25} />
          <Stage
            shadows
            adjustCamera
          >
            {children}
          </Stage>

          <axesHelper args={[200, 200, 200]} />
          <OrbitControls />
        </Canvas>

      </div >
    </>
  );
}

