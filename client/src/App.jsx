import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;