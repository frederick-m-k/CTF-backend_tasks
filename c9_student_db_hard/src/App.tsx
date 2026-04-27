import React, { useState, useRef } from 'react';
import './App.css';
import logo from './assets/farning_logo.svg';

interface Student {
  id: number;
  name: string;
  class: string;
  level: string;
}

const App: React.FC = () => {
  // // Login state
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showFlag, setShowFlag] = useState<string | null>(null);

  // Search State
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!username.trim() || !password.trim()) {
    return;
  }


  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
        setIsLoggedIn(true);

        // 🔥 HIER PASSIERT DIE FLAG
        if (data.role === 'admin' && data.flag) {
          setShowFlag(data.flag);

          // Flag nach 10s ausblenden
          setTimeout(() => setShowFlag(null), 10000);
        }

        setUsername('');
        setPassword('');
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const response = await fetch('/search_hard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: searchTerm }),
      });

      const data = await response.json();

      if (response.ok) {
        setStudents(Array.isArray(data) ? data : []);
      } else {
        setError(data.error || 'Ein Fehler ist aufgetreten.');
        setStudents([]);
      }
    } catch (err) {
      setError('Verbindungsfehler. Bitte versuche es später erneut.');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const getLevelBadgeClass = (level: string) => {
    switch(level.toLowerCase()) {
      case 'beginner': return 'level-beginner';
      case 'intermediate': return 'level-intermediate';
      case 'advanced': return 'level-advanced';
      case 'expert': return 'level-expert';
      case 'immeasurably': return 'level-legendary';
      default: return 'level-default';
    }
  };

  const getLevelDisplay = (level: string) => {
    if (level === 'Immeasurably') return '🏆 Legendary';
    return level;
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>Farning Student Database</h1>
            {showFlag && (
              <div className="flag-banner">
                CTF Flag gefunden: <strong>{showFlag}</strong>
              </div>
            )}
          </div>

          {/* Login Button */}
          <div className="login-area">
            {isLoggedIn ? (
              <span className="welcome">Welcome, {username}</span>
            ) : <span className='welcome'></span>}
          </div>
        </div>
      </header>

      <nav className="nav">
        <div className="nav-inner">
          <a href="https://farning.de" className="brand">
            <img src={logo} alt="Farning Logo" className="brand-logo" />
            <span className="brand-text">Farning</span>
          </a>

          <ul>
            <li>
              <a
                href="#search"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => searchInputRef.current?.focus(), 300);
                }}
              >
                Search
              </a>
            </li>
            <li><a href="#results">Results</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowLogin(true); }}>Login</a></li>
          </ul>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="login-modal">
          <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="login-actions">
                <button type="submit">Login</button>
                <button type="button" onClick={() => setShowLogin(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="main">
        <div className="search-section" id='search'>
          <div className="search-card">
            <h2>Find Students</h2>
            <p className="search-description">
              Search for students by name to view their course enrollment and skill level.
            </p>
            <form onSubmit={handleSearch} className="search-form">
              <div className="input-wrapper">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter student name..."
                  className="search-input"
                />
                <button type="submit" disabled={loading} className="search-button">
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="results-section" id='results'>
          {!searched ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>Search for students</h3>
              <p>Enter a name above to view student information</p>
            </div>
          ) : loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading student data...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <div className="error-icon">⚠️</div>
              <h3>Search Error</h3>
              <p>{error}</p>
            </div>
          ) : students.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👤</div>
              <h3>No students found</h3>
              <p>Try a different search term</p>
            </div>
          ) : (
            <div className="students-grid">
              <div className="results-header">
                <h2>Search Results</h2>
                <span className="result-count">{students.length} student{students.length !== 1 ? 's' : ''} found</span>
              </div>
              <div className="students-list">
                {students.map((student) => (
                  <div key={student.id} className="student-card">
                    <div className="student-avatar">
                      {student.name.charAt(0)}
                    </div>
                    <div className="student-info">
                      <div className="student-name">{student.name}</div>
                      <div className="student-details">
                        <span className="detail-item">
                          <span className="detail-label">Class:</span>
                          <span className="detail-value">{student.class}</span>
                        </span>
                        <span className="detail-item">
                          <span className="detail-label">Level:</span>
                          <span className={`level-badge ${getLevelBadgeClass(student.level)}`}>
                            {getLevelDisplay(student.level)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 All student data is confidential</p>

        <p className="footer-brand">
          Developed by
          <a href="https://farning.de" className="farning-link">
            <img src={logo} alt="Farning Logo" className="footer-logo-inline" />
            Farning
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;