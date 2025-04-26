
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/Context/AuthContext';
import Login from './Components/pages/Login';
import Signup from './Components/pages/Signup';
import SubmitFeedback from './Components/pages/SubmitFeedback';
import AdminDashboard from './Components/pages/AdminDashboard';
import PrivateRoute from './Components/utils/PrivateRoute';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <SubmitFeedback />
          </PrivateRoute>
        } />
        
        <Route path="/admin" element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        } />

        <Route path="/submit-feedback" element={<PrivateRoute><SubmitFeedback /></PrivateRoute>} />
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
