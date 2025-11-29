import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CheckIn from './pages/CheckIn';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import Mindfulness from './pages/Mindfulness';
import Community from './pages/Community';
import Resources from './pages/Resources';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="container-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/check-in" element={<CheckIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/mindfulness" element={<Mindfulness />} />
            <Route path="/community" element={<Community />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
