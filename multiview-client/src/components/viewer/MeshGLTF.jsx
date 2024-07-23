import React, { useState, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';

export const MeshGLTF = ({ scene }) => {
  const [mesh, setMesh] = useState(null);

  useLayoutEffect(() => {

    if (scene && scene.isMesh) {
      const worldPosition = new THREE.Vector3();
      const worldRotation = new THREE.Quaternion();
      const worldScale = new THREE.Vector3();

      scene.updateMatrixWorld(true);
      scene.getWorldPosition(worldPosition);
      scene.getWorldQuaternion(worldRotation);
      scene.getWorldScale(worldScale);

      const newMesh = new THREE.Mesh(scene.geometry, scene.material);
      newMesh.position.copy(worldPosition);
      newMesh.quaternion.copy(worldRotation);
      newMesh.scale.copy(worldScale);

      setMesh(newMesh);
    }
  }, [scene]);

  return mesh ? <primitive object={mesh} /> : null;
};
