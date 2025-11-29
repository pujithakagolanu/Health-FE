import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Home, CheckCircle, BarChart3, BookOpen, Heart, Users, BookMarked, Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const checkIns = JSON.parse(localStorage.getItem('dailyCheckIns') || '[]');
    const calculatedStreak = calculateStreak(checkIns);
    setStreak(calculatedStreak);
  }, [location]);

  const calculateStreak = (checkIns: any[]) => {
    if (checkIns.length === 0) return 0;

    let streakCount = 0;
    const today = new Date();

    for (let i = 0; i < checkIns.length; i++) {
      const checkInDate = new Date(checkIns[i].date);
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);

      if (checkInDate.toDateString() === expectedDate.toDateString()) {
        streakCount++;
      } else {
        break;
      }
    }

    return streakCount;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/check-in', label: 'Check-in', icon: CheckCircle },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/exams', label: 'Exams', icon: BookOpen },
    { path: '/mindfulness', label: 'Mindfulness', icon: Heart },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/resources', label: 'Resources', icon: BookMarked },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <Brain className="inline-block mr-2" size={28} />
          StudentWell
        </Link>

        {streak > 0 && (
          <div className="streak-badge">
            🔥 {streak} day streak
          </div>
        )}

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={isActive ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="inline-block mr-1" size={18} />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
