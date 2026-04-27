import React, { useState, useEffect } from 'react';
import './App.css';

import { API_KEY } from './secrets';

import logo from './assets/farning_logo.svg';

interface WeatherData {
  temperature: number;
  temperatureF: number;
  condition: string;
  humidity: number;
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'attractions' | 'culture'>('home');
  const [weather, setWeather] = useState<WeatherData>({
    temperature: Math.floor(Math.random() * 15) + 15,
    temperatureF: 0,
    condition: ['Foggy', 'Humid', 'Cloudy', 'Light Rain', 'Hazy'][Math.floor(Math.random() * 5)],
    humidity: Math.floor(Math.random() * 30) + 60,
  });
  const [currentFact, setCurrentFact] = useState<string>('Click here for an interesting fact!');
  const [factAnimating, setFactAnimating] = useState<boolean>(false);

  const facts: string[] = [
    "Chongqing is the largest municipality in China with over 30 million people!",
    "The city has a monorail that literally runs through a residential building at Liziba Station.",
    "Chongqing hot pot originated from boatmen on the Yangtze River over 100 years ago.",
    "The city is known as the 'Fog Capital of China' with over 100 foggy days per year.",
    "Chongqing was once the wartime capital of China during World War II.",
    "The city has more than 10,000 bridges, earning it the nickname 'City of Bridges'.",
    "You can't use GPS effectively in Chongqing because of its complex 3D road network!",
    "The Dazu Rock Carvings, a UNESCO World Heritage site, are located near Chongqing."
  ];

  const attractions = [
    {
      title: "Hongya Cave",
      description: "A stunning stilt-house complex built into the cliffside, offering spectacular night views and traditional architecture.",
      image: "https://images.unsplash.com/photo-1594641774870-b2efb9c4d78d?w=400"
    },
    {
      title: "Yangtze River Cruise",
      description: "Take a cruise along the mighty Yangtze River and see the city's dramatic skyline from the water.",
      image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=400"
    },
    {
      title: "Ciqikou Ancient Town",
      description: "A historic town with traditional architecture, street food, and cultural experiences.",
      image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400"
    }
  ];

  const cultureItems = [
    {
      title: "Hot Pot Capital",
      description: "Chongqing is famous worldwide for its numbing, spicy hot pot. The city has over 30,000 hot pot restaurants!"
    },
    {
      title: "Mountain City",
      description: "The city's nickname comes from its dramatic hills, stairs, and the famous monorail that runs through buildings."
    },
    {
      title: "Bayu Culture",
      description: "Rich in ancient Ba and Yu culture, with traditional opera, folk music, and festivals."
    }
  ];

  useEffect(() => {
    // Definiert eine globale Variable im Window-Objekt
    (window as any).DEBUG_INFO = {
      apiKey: API_KEY,
      baseApi: "https://polliniferous-brutally-gage.ngrok-free.dev/api/",
      comment: "!!Remove before production"
    };

    console.log("DEBUG_INFO gesetzt!");
  }, []);

  // Update Fahrenheit when Celsius changes
  useEffect(() => {
    setWeather(prev => ({
      ...prev,
      temperatureF: Math.floor((prev.temperature * 9) / 5 + 32)
    }));
  }, []);

  // Auto-update weather every 5 minutes
  useEffect(() => {
    const updateWeather = () => {
      setWeather({
        temperature: Math.floor(Math.random() * 15) + 15,
        temperatureF: 0,
        condition: ['Foggy', 'Humid', 'Cloudy', 'Light Rain', 'Hazy'][Math.floor(Math.random() * 5)],
        humidity: Math.floor(Math.random() * 30) + 60
      });
    };
    
    const interval = setInterval(updateWeather, 300000);
    return () => clearInterval(interval);
  }, []);

  const showRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setFactAnimating(true);
    setTimeout(() => {
      setCurrentFact(facts[randomIndex]);
      setFactAnimating(false);
    }, 200);
  };

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "早安! Good Morning! 🌅";
    if (hour < 18) return "下午好! Good Afternoon! 🌞";
    return "晚上好! Good Evening! 🌙";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionChange = (section: 'home' | 'attractions' | 'culture') => {
    setActiveSection(section);
    scrollToTop();
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Chongqing</h1>
        <p>{getGreeting()} Welcome to Chongqing 🏔️</p>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="https://farning.de" className="brand">
            <img src={logo} alt="Farning Logo" className="brand-logo" />
            <span className="brand-text">Farning</span>
          </a>

          <ul>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSectionChange('home'); }}>
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSectionChange('attractions'); }}>
                Attractions
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSectionChange('culture'); }}>
                Culture
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container">
        {/* Home Section */}
        {activeSection === 'home' && (
          <div className="section">
            <h2>Welcome to Chongqing!</h2>
            <p>
              Chongqing is a sprawling metropolis in southwestern China, known for its mountainous terrain, 
              spicy cuisine, and unique urban landscape. As one of China's four direct-controlled municipalities, 
              it's a city of over 30 million people with a distinct character.
            </p>

            {/* Weather Section */}
            <div className="weather-section">
              <h2>Current Weather</h2>
              <div className="weather-info">
                <div className="weather-item">
                  <h4>Temperature</h4>
                  <div className="value">{weather.temperature}°C / {weather.temperatureF}°F</div>
                </div>
                <div className="weather-item">
                  <h4>Conditions</h4>
                  <div className="value">{weather.condition}</div>
                </div>
                <div className="weather-item">
                  <h4>Humidity</h4>
                  <div className="value">{weather.humidity}%</div>
                </div>
              </div>
            </div>

            {/* Fun Fact Section */}
            <div className="fun-fact" onClick={showRandomFact}>
              <h3>Fun Fact About Chongqing</h3>
              <div className={`fact-text ${factAnimating ? 'fade-out' : 'fade-in'}`}>
                {currentFact}
              </div>
            </div>
          </div>
        )}

        {/* Attractions Section */}
        {activeSection === 'attractions' && (
          <div className="section">
            <h2>Top Attractions</h2>
            <div className="cards">
              {attractions.map((attraction, index) => (
                <div key={index} className="card">
                  <img src={attraction.image} alt={attraction.title} />
                  <div className="card-content">
                    <h3>{attraction.title}</h3>
                    <p>{attraction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Culture Section */}
        {activeSection === 'culture' && (
          <div className="section">
            <h2>Culture & Lifestyle</h2>
            <div className="cards">
              {cultureItems.map((item, index) => (
                <div key={index} className="card">
                  <div className="card-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>🏔️ Chongqing - The Mountain City 🌶️</p>
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