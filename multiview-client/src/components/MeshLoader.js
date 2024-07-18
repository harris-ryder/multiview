// Receive Files
// Split them up
// Create separate geometries
// return geometries

import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

// First step to loading meshes: Function housing all other functions
async function returnArrayOfGeometries(event) {


  let geometries = await eventFileToBufferArray(event) // returns {name, type, file(arrayBuffer)}[]

  for (const [index, geometry] of geometries.entries()) {
    const loadedGeometryData = loadGeometry(geometry);
    geometries[index]['data'] = loadedGeometryData;
  }

  console.log("geoms", geometries)
  return geometries;

}

// Take the file(s) user has given us -> returns array of objects that is the file name, type and bufferArray
async function eventFileToBufferArray(event) {
  let items = [] // Array of objs {file name, file type, file arrayBuffer}
  let files = event.target.files

  for (const file of files) {
    const tempFile = await readFileAsArrayBuffer(file)
    const name = file.name.split('.')[0]
    const type = file.name.split('.')[1].toLowerCase()
    items.push({ name, type, file: tempFile })
  }
  console.log("items", items)
  return items

  // Converts a raw file to a arrayBuffer, return this arrayBuffer 
  function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target.result)
      }
      reader.onerror = (event) => {
        reject(event.target.error)
      }
      reader.readAsArrayBuffer(file)
    });
  }
}


// Go through list of arrayBuffer objects and generate geometries and include in array
function loadGeometry(item) {
  switch (item.type) {
    case 'stl':

      var geometry = new STLLoader().parse(item.file);
      geometry.sourceType = "stl";
      geometry.sourceFile = item.file.name;
      return geometry
  }
}





export { returnArrayOfGeometries };
