import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import logo from './assets/farning_logo.svg';

interface CommentData {
  comments: string[];
}

const App: React.FC = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [flag, setFlag] = useState<string | null>(null);

  const opinionRef = useRef<HTMLTextAreaElement>(null);

  // Fetch all comments on load
  useEffect(() => {
    fetchComments();
  }, []);

  // Fetch comments from server (using new_comment endpoint)
  const fetchComments = async () => {
    try {
      const response = await fetch('/api/new_comment/posts');
      const data: CommentData = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  // Post comment (using new_comment endpoint)
  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      setMessage('Bitte gib einen Kommentar ein');
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setSubmitting(true);
    setMessage(null);
    setFlag(null);
    
    try {
      const response = await fetch('/api/new_comment/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setNewComment('');
        await fetchComments();
        
        if (data.flag) {
          setFlag(data.flag);
          setMessage('XSS erkannt! Flagge erhalten!');
        } else {
          setMessage('Kommentar erfolgreich gepostet!');
        }
        
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage('Fehler beim Posten des Kommentars');
      }
    } catch (error) {
      setMessage('Verbindungsfehler. Bitte später erneut versuchen.');
      console.error('Failed to post comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Meinungsforum</h1>
        <p>Diskutiere mit anderen Schülern</p>
        <div className="topic-badge">
          Aktuelles Thema: Nutzung von LLMs in der informatischen Bildung
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
                href="#opinion"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('opinion')?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => opinionRef.current?.focus(), 300);
                }}
              >
                Meinung
              </a>
            </li>
            <li><a href="#comments">Kommentare</a></li>
          </ul>
        </div>
      </nav>

      <div className="container">
        {/* Flag Display */}
        {flag && (
          <div className="flag-banner">
            <div className="flag-content">
              <strong>Flagge gefunden!</strong>
              <code className="flag-code">{flag}</code>
            </div>
            <button className="close-flag" onClick={() => setFlag(null)}>×</button>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className={`message ${message.includes('🎉') ? 'success' : message.includes('❌') ? 'error' : 'info'}`}>
            {message}
          </div>
        )}

        {/* Comment Form */}
        <div className="comment-form-container" id='opinion'>
          <h2>Deine Meinung</h2>
          <p className="form-description">
            Sollten Large Language Models und andere KI-Techniken in der informatischen Bildung genutzt werden?
          </p>
          
          <form onSubmit={handlePostComment}>
            <textarea
              ref={opinionRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Schreibe deine Meinung hier..."
              rows={5}
              disabled={submitting}
            />
            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? 'Wird gesendet...' : 'Kommentar posten'}
              </button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="comments-section" id='comments'>
          <h2>📖 Kommentare ({comments.length})</h2>
          {comments.length === 0 ? (
            <div className="no-comments">
              <p>Noch keine Kommentare. Sei der Erste!</p>
            </div>
          ) : (
            <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={index} className="comment-card">
                  <div className="comment-header">
                    <span className="comment-number">Kommentar #{comments.length - index}</span>
                    <span className="comment-date">Gerade eben</span>
                  </div>
                  <div className="comment-content">
                    {comment}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>© 2026 Meinungsforum</p>

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