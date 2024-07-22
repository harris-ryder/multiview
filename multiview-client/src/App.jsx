import { Viewer } from './components/Viewer';
import { Dashboard } from './components/Dashboard';
import { SceneProvider } from './context/SceneContext';


function App() {

  return (
    <>
      <SceneProvider>
        <Dashboard />
        <Viewer />
      </SceneProvider>
    </>
  );
}

export default App;
