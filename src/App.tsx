import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProjectSetup from './components/ProjectSetup';
import MoodBoardWorkspace from './components/MoodBoardWorkspace';
import './App.css';

function App() {
  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/smart-boards' : ''}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/project/new" replace />} />
          <Route path="/project/new" element={<ProjectSetup />} />
          <Route path="/project/:id" element={<MoodBoardWorkspace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
