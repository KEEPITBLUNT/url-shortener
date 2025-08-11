import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { RedirectPage } from './pages/RedirectPage';
import { URLProvider } from './context/URLContext';

function App() {
  return (
    <URLProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/:shortCode" element={<RedirectPage />} />
          </Routes>
        </div>
      </Router>
    </URLProvider>
  );
}

export default App;