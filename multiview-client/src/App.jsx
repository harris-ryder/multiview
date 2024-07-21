import { useEffect, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { returnArrayOfGeometries } from './components/MeshLoader';
import { MeshOBJ } from './components/MeshOBJ';
import { MeshSTL } from './components/MeshSTL';
import { MeshFBX } from './components/MeshFBX';
import { MeshGLTF } from './components/MeshGLTF';

function App() {
  const [activeGeometries, setActiveGeometries] = useState([]);


  async function handleFile(e) {
    let geoms = await returnArrayOfGeometries(e)
    setActiveGeometries((prevGeometries) => [...geoms, ...prevGeometries])
  }


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
        default:
          break;
      }
    }

    return arr;
  }

  return (
    <>

      <div className='html-container'>
        <input type="file" id="model-upload" name="model" onChange={handleFile} multiple="multiple" />
      </div>



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

export default App;
