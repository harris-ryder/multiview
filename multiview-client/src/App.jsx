import { useEffect, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { returnArrayOfGeometries } from './components/MeshLoader';
import { ImportObject } from './components/ImportObject';

function App() {
  const [activeGeometries, setActiveGeometries] = useState([]);



  async function handleFile(e) {
    let geoms = await returnArrayOfGeometries(e)
    setActiveGeometries((prevGeometries) => [...geoms, ...prevGeometries])
  }


  return (
    <>

      <div className='html-container'>
        <input type="file" id="model-upload" name="model" onChange={handleFile} multiple="multiple" />
      </div>



      <div className='canvas-container'>


        <Canvas gl={{ preserveDrawingBuffer: true }} shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 150], fov: 50 }}>
          <ambientLight intensity={0.25} />
          <Suspense fallback={null}>
            <Stage
              shadows
              adjustCamera
            >
              {activeGeometries && activeGeometries.map((object, index) => (
                <ImportObject key={index} geometry={object.geometry} />
              ))}
            </Stage>
          </Suspense>
          <OrbitControls />
        </Canvas>

      </div>
    </>
  );
}

export default App;
