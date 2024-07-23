
import { useRef, useEffect, Suspense, useState, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { useScene } from '../../context/SceneContext';

export function Modal(props) {


  const fileInput = useRef(null)
  const modalRef = useRef(null)
  const { handleFile } = useScene()

  async function fileUpload(e) {
    handleFile(e)
    hideModal()
  }

  function hideModal() {
    props.setEditorActive(true)
  }


  return (
    <div className='modal' ref={modalRef}>

      <input
        type='file'
        ref={fileInput}
        onChange={fileUpload}
        style={{ display: 'none' }}
        multiple={true}
      />

      <button
        className='upload-btn'
        onClick={() => fileInput.current.click()}
      >Upload Models</button>


      <p>or try <a onClick={hideModal}>example</a></p>
    </div>
  );
}
