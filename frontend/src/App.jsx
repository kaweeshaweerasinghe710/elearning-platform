import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Landing from './pages/Landing'; 

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;