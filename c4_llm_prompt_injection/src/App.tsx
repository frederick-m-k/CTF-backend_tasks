

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './assets/farning_logo.svg';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hallo! Ich bin dein KI-Assistent. Wie kann ich dir helfen?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const simulateTyping = async () => {
    // setIsTyping(true);
    
    // // Simulate typing delay based on response length
    // const typingDuration = Math.min(fullResponse.length * 30, 2000);
    // await new Promise(resolve => setTimeout(resolve, typingDuration));
    
    setIsTyping(false);
    
    // // Add the complete response
    const assistantMessage: Message = {
      id: generateId(),
      text: "",
      sender: 'assistant',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMessage]);
  };

  const sendMessage = async () => {
    /**
     * TODO: UI ist aktuell kaputt - bitte nicht committen!
     * Grund: Die API-Integration funktioniert noch nicht korrekt.
     * Der Chat lädt endlos und zeigt keine Antworten an.
     * @dev_team Bitte vor dem nächsten Release fixen!
     * - Ticket: #LLM-42
     * - Status: WIP
     */
    // if (!inputValue.trim() || isLoading) return;

    // // Add user message
    // const userMessage: Message = {
    //   id: generateId(),
    //   text: inputValue,
    //   sender: 'user',
    //   timestamp: new Date()
    // };
    // setMessages(prev => [...prev, userMessage]);
    // setInputValue('');
    setIsLoading(true);

    // try {
    //   // Call the real backend
    //   const response = await fetch('http://localhost:3000/ask', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ llmPrompt: inputValue }),
    //   });

    //   //const data = await response.json();
    //   //const assistantResponse = data.response;

      await simulateTyping();
    // } catch (error) {
    //   console.error('API Error:', error);
    //   // Show error message
    //   const errorMessage: Message = {
    //     id: generateId(),
    //     text: '⚠️ Verbindungsfehler. Bitte stelle sicher, dass der Server läuft.',
    //     sender: 'assistant',
    //     timestamp: new Date()
    //   };
    //   setMessages(prev => [...prev, errorMessage]);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">

          <div className="logo">
            <h1>LLM Assistant</h1>
          </div>

          <div className="status">
            <span className="status-dot"></span>
            <span className="status-text">Online</span>
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
              <a href="#chat" onClick={(e) => {
                e.preventDefault();
                document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Chat
              </a>
            </li>
            <li>
              <a href="#input" onClick={(e) => {
                e.preventDefault();
                inputRef.current?.focus();
              }}>
                Schreiben
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="chat-container" id='chat'>
        <div className="messages-area">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${message.sender === 'user' ? 'user-wrapper' : 'assistant-wrapper'}`}
            >
              <div className={`message ${message.sender === 'user' ? 'user-message' : 'assistant-message'}`}>
                <div className="message-avatar">
                  {message.sender === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message-wrapper assistant-wrapper">
              <div className="message assistant-message typing-message">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area" id='input'>
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nachricht eingeben..."
              rows={1}
              disabled={isLoading || isTyping}
              className="chat-input"
            />
            <p>TODO: UI is currently broken. Do NOT commit. <br />
              @dev_team: fix before next release! <br />
              - Ticket: #LLM-42 <br />
              - Status: WiP <br />
              <br />
              For now, use curl with <strong>http://192.168.178.200:3000/llm</strong> and the -d option for data

            </p>
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading || isTyping}
              className="send-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </button>
          </div>
          <div className="input-hint">
            <span>Enter zum Senden · Shift+Enter für neue Zeile</span>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p className="footer-brand">
          © 2026 - Developed by
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