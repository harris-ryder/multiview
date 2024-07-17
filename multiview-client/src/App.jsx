
import { CustomObject } from './components/customObject';
import { useEffect, useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'; // Import STLLoader from correct path

function App() {
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    console.log(fileContent);
  }, [fileContent]);

  async function handleFile(e) {
    const file = e.target.files[0];
    const tempFile = await readFileAsArrayBuffer(file);
    setFileContent(tempFile);
  }

  function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (event) => {
        reject(event.target.error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  return (
    <>
      <input type="file" id="model-upload" name="model" onChange={handleFile} />

      <div className='test'>
        <Canvas style={{ background: '#ffffff' }}>
          <ambientLight intensity={1} />
          <directionalLight color="blue" position={[0, 0, 100]} />
          {fileContent && <CustomObject file={fileContent} />}
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" />
          </mesh>
          <OrbitControls />
          <Stats />
        </Canvas>
      </div>
    </>
  );
}

export default App;
