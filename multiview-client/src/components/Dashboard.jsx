import { useEffect, Suspense, useState, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { useScene } from '../context/SceneContext';


export function Dashboard() {


  const { handleFile } = useScene()

  async function fileUpload(e) {
    handleFile(e)
  }

  return (
    <div className='html-container'>
      <input type="file" id="model-upload" name="model" onChange={fileUpload} multiple="multiple" />
    </div>
  );
}

