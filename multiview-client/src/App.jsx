import { Viewer } from './components/viewer/Viewer';
import { Dashboard } from './components/dashboard/Dashboard';
import { SceneProvider } from './context/SceneContext';
import { SceneModels } from './components/viewer/SceneModels';

function App() {

  return (
    <>
      <SceneProvider>
        <Dashboard />
        <Viewer>
          <SceneModels />
        </Viewer>
      </SceneProvider>
    </>
  );
}

export default App;
