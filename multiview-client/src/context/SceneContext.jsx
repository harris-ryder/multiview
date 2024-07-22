import React, { useState, useContext } from 'react'
import { returnArrayOfGeometries } from '../utils/MeshLoader'

const SceneContext = React.createContext()

export function useScene() {
  return useContext(SceneContext)
}

export function SceneProvider({ children }) {

  const [activeGeometries, setActiveGeometries] = useState([])

  const values = { activeGeometries, handleFile }


  async function handleFile(e) {
    let geoms = await returnArrayOfGeometries(e)
    setActiveGeometries((prevGeometries) => [...geoms, ...prevGeometries])
  }

  return (
    <SceneContext.Provider value={values}>
      {children}
    </SceneContext.Provider>
  )
}
