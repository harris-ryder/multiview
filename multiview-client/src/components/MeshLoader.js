// Receive Files
// Split them up
// Create separate geometries
// return geometries

import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// First step to loading meshes: Function housing all other functions
async function returnArrayOfGeometries(event) {


  let items = [] // Array of objs {file name, file type, plain file, geometry data}
  let files = event.target.files
  let buffers = new Map()


  // Function to read file and return a promise
  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        buffers.set(file.name, event.target.result);
        resolve();
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Create an array of promises
  const readPromises = Array.from(files)
    .filter(file => file.name.endsWith('.bin'))
    .map(readFileAsArrayBuffer);

  // Wait for all promises to complete
  await Promise.all(readPromises);


  console.log("Buffy ", buffers);




  for (const file of files) {
    const name = file.name.split('.')[0]
    const type = file.name.split('.')[1].toLowerCase()
    if (!(type === "gltf" || type === "glb" || type === "stl" || type === "obj" || type === "fbx")) continue
    const geometry = await loadGeometry(file, type, name, buffers)
    console.log(geometry)
    items.push({ name, type, file: file, geometry: geometry })
  }
  console.log("items", items)
  return items

}


// Go through list of arrayBuffer objects and generate geometries and include in array
function loadGeometry(file, type, name, buffers) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    switch (type) {
      case 'stl':
        reader.onload = (event) => {
          try {
            const geometry = new STLLoader().parse(event.target.result);
            geometry.sourceType = "stl";
            geometry.sourceFile = name;
            resolve(geometry);
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = (error) => {
          reject(error);
        };

        if (reader.readAsBinaryString !== undefined) {
          reader.readAsBinaryString(file);
        } else {
          reader.readAsArrayBuffer(file);
        }
        break;

      case 'obj':
        reader.onload = (event) => {
          try {
            const geometry = new OBJLoader().parse(event.target.result);
            geometry.name = name
            resolve(geometry);
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsText(file)
        break;

      case 'fbx':
        reader.onload = (event) => {
          try {
            const geometry = new FBXLoader().parse(event.target.result)
            resolve(geometry)
          } catch (error) {
            reject(error)
          }

        }
        reader.readAsArrayBuffer(file)
        break

      case 'glb':

        reader.onload = (event) => {
          try {
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('/draco/')

            const gltfLoader = new GLTFLoader()
            gltfLoader.setDRACOLoader(dracoLoader)

            gltfLoader.parse(event.target.result, '', (result) => {
              let scene = result.scene
              resolve(scene)
            })

          } catch (error) {
            reject(error)
          }

        }
        reader.readAsArrayBuffer(file)

        break

      case 'gltf':

        loadGLTF(file, buffers).then((scene) => {
          console.log('Loaded GLTF scene:', scene);
          resolve(scene)
        }).catch((error) => {
          console.error('Error loading GLTF:', error);
          reject(error)
        });
        break

      default:
        reject(new Error("Unsupported file type"));
    }
  });
}



const loadGLTF = (file, buffers) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');

        const loadingManager = new THREE.LoadingManager();
        const gltfLoader = new GLTFLoader(loadingManager);
        gltfLoader.setDRACOLoader(dracoLoader);


        // Set URL modifier to intercept resource requests and provide Blob URLs
        loadingManager.setURLModifier((url) => {
          console.log("Desired url", url)
          const buffer = buffers.get(url);
          console.log("retrieved buffer", buffer)
          if (buffer) {
            const resourceBlob = new Blob([buffer], { type: 'application/octet-stream' });
            return URL.createObjectURL(resourceBlob);
          }
          return url; // Return the original URL if not found in buffers
        });

        gltfLoader.parse(event.target.result, '', (result) => {
          let scene = result.scene;
          resolve(scene);
        });

      } catch (error) {
        reject(error);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};


export { returnArrayOfGeometries };
