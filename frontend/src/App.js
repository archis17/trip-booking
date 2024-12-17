import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/HomePage';
import PackageDetails from './pages/PackageDetails';
import AdminDashboard from './pages/AdminDashboard';
import Invoice from './components/Invoice';

function App() {
  // Simple admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Admin login handler
  const handleAdminLogin = (username, password) => {
    // Hardcoded admin credentials as per original assignment
    if (username === 'admin' && password === 'adminpassword') {
      setIsAdminAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  // Admin Login Component
  const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
      username: '',
      password: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleAdminLogin(credentials.username, credentials.password);
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form 
          onSubmit={handleSubmit} 
          className="bg-white p-8 rounded shadow-md w-96"
        >
          <h2 className="text-2xl mb-6 text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({
              ...credentials, 
              username: e.target.value
            })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({
              ...credentials, 
              password: e.target.value
            })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  };

  // Navigation Component
  const Navigation = () => {
    return (
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl font-bold">Inceptioner Travels</a>
          <div>
            <a href="/" className="mr-4 hover:underline">Home</a>
            <a href="/admin" className="hover:underline">Admin</a>
          </div>
        </div>
      </nav>
    );
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              isAdminAuthenticated ? (
                <AdminDashboard />
              ) : (
                <AdminLogin />
              )
            } 
          />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;