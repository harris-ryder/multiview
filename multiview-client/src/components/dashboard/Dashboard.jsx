import { useEffect, Suspense, useState, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import '../../styles/style.scss'
import { Modal } from './Modal';


export function Dashboard() {

  const [editorActive, setEditorActive] = useState(false)

  return (
    <>
      {!editorActive && (<Modal setEditorActive={setEditorActive} />)}
    </>
  );
}
