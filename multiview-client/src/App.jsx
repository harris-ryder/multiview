import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
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
      <input type="file" id="model-upload" name="model" onChange={handleFile} multiple="multiple" />

      <div className='test'>
        <Canvas style={{ background: '#ffffff' }}>
          <ambientLight intensity={1} />
          <directionalLight color="blue" position={[0, 0, 100]} />
          {activeGeometries && activeGeometries.map((geometry, index) => (
            <ImportObject key={index} geometry={geometry} />
          ))}
          <OrbitControls />
          <Stats />
        </Canvas>
      </div>
    </>
  );
}

export default App;
