// Receive Files
// Split them up
// Create separate geometries
// return geometries

import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';



// First step to loading meshes: Function housing all other functions
async function returnArrayOfGeometries(event) {


  let items = [] // Array of objs {file name, file type, plain file, geometry data}
  let files = event.target.files

  for (const file of files) {
    const name = file.name.split('.')[0]
    const type = file.name.split('.')[1].toLowerCase()
    const geometry = await loadGeometry(file, type, name)

    items.push({ name, type, file: file, geometry: geometry })
  }
  console.log("items", items)
  return items

}


// Go through list of arrayBuffer objects and generate geometries and include in array
function loadGeometry(file, type, name) {
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
            console.log("working!", geometry)
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

      default:
        reject(new Error("Unsupported file type"));
    }
  });
}





export { returnArrayOfGeometries };
