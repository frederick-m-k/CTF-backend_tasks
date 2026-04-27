import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/farning_logo.svg';

interface Fact {
  id: number;
  title: string;
  preview: string;
  category: string;
}

interface FactDetail {
  id: number;
  title: string;
  content: string;
  source: string;
  year?: number;
}

const App: React.FC = () => {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFact, setSelectedFact] = useState<FactDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load facts on mount
  useEffect(() => {
    fetchFacts();
  }, []);

  const fetchFacts = async () => {
    try {
      const response = await fetch('/api/facts');
      const data = await response.json();
      setFacts(data);
    } catch (err) {
      console.error('Failed to fetch facts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFactDetail = async (factId: number) => {
    setDetailLoading(true);
    setSelectedFact(null);
    setErrorMessage(null);
    
    try {
      const response = await fetch(`/api/facts/${factId}`);
      
      if (!response.ok) {
        // The error response contains the stack trace, but we only show a generic message
        // The stack trace is ONLY visible in the Network tab of DevTools
        const errorData = await response.json();
        console.error('API Error:', errorData); // Log to console for debugging
        setErrorMessage('Failed to load fact details. Please try again.');
        return;
      }
      
      const data = await response.json();
      setSelectedFact(data);
    } catch (err) {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setDetailLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'history': return '🏛️';
      case 'science': return '🔬';
      case 'culture': return '🎭';
      case 'nature': return '🌿';
      default: return '📜';
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading curiosities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Curiosity Cabinet</h1>
        <p>Explore fascinating facts from around the world</p>
      </header>

      <nav className="nav">
        <div className="nav-inner">
          <a href="https://farning.de" className="brand">
            <img src={logo} alt="Farning Logo" className="brand-logo" />
            <span className="brand-text">Farning</span>
          </a>

          <ul>
            <li><a href="#facts">Facts</a></li>
            <li><a href="#details">Details</a></li>
          </ul>
        </div>
      </nav>

      <div className="container">
        {/* Facts Grid */}
        <div className="facts-grid" id='facts'>
          {facts.map((fact) => (
            <div 
              key={fact.id} 
              className="fact-card"
              onClick={() => fetchFactDetail(fact.id)}
            >
              <div className="fact-icon">{getCategoryIcon(fact.category)}</div>
              <h3>{fact.title}</h3>
              <p>{fact.preview}</p>
              <div className="fact-footer">
                <span className="category-badge">{fact.category}</span>
                <span className="read-more">Click to explore →</span>
              </div>
            </div>
          ))}
        </div>

        <div id='details'>
          {/* Loading Indicator for Detail */}
          {detailLoading && (
            <div className="detail-loading">
              <div className="spinner-small"></div>
              <p>Loading details...</p>
            </div>
          )}

          {/* Generic Error Message (no stack trace visible) */}
          {errorMessage && (
            <div className="error-message-generic">
              <span className="error-icon">⚠️</span>
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Selected Fact Detail */}
          {selectedFact && !detailLoading && (
            <div className="fact-detail">
              <div className="detail-header">
                <h2>{selectedFact.title}</h2>
                {selectedFact.year && <span className="detail-year">{selectedFact.year}</span>}
              </div>
              <div className="detail-content">
                <p>{selectedFact.content}</p>
              </div>
              <div className="detail-source">
                <strong>Source:</strong> {selectedFact.source}
              </div>
            </div>
          )}
          </div>
      </div>

      <footer className="footer">
        <p>2026 - Curiosity Cabinet - Where knowledge meets wonder</p>

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