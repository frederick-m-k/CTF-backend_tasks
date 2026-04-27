import { useState, useEffect } from 'react';
import './App.css';

import { API_KEY } from './secrets';

import logo from './assets/farning_logo.svg';

interface WeatherData {
  temperature: number;
  temperatureF: number;
  condition: string;
  humidity: number;
}

const App = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'attractions' | 'culture'>('home');
  const [weather, setWeather] = useState<WeatherData>({
    temperature: Math.floor(Math.random() * 15) + 20,
    temperatureF: 0,
    condition: ['Sunny', 'Partly Cloudy', 'Humid', 'Light Rain', 'Typhoon Season'][Math.floor(Math.random() * 5)],
    humidity: Math.floor(Math.random() * 30) + 65,
  });
  const [currentFact, setCurrentFact] = useState<string>('Click here for an interesting fact!');
  const [factAnimating, setFactAnimating] = useState<boolean>(false);

  const facts: string[] = [
    "Taipei 101 was the world's tallest building from 2004 to 2010, standing at 508 meters.",
    "The city has the highest density of convenience stores in the world - you're never more than a few minutes from a 7-Eleven or FamilyMart!",
    "Taipei's MRT system is famous for its 'quiet carriage' culture and is considered one of the cleanest in the world.",
    "The National Palace Museum in Taipei houses over 700,000 artifacts, making it one of the largest collections of Chinese art.",
    "Taipei is surrounded by mountains, with Yangmingshan National Park just a 30-minute drive from the city center.",
    "The city has over 1,000 night markets, with Shilin Night Market being the largest and most famous.",
    "Bubble tea (boba tea) was invented in Taiwan in the 1980s, and Taipei is the best place to try it!",
    "The city experiences around 2-3 typhoons per year, with residents well-prepared for the season.",
    "Taipei's red-light districts are famous for their vibrant street food scene, not what the name suggests!",
    "The city has one of the most efficient recycling programs in Asia, with over 50% of waste recycled.",
    "Taipei 101's damper is the world's largest tuned mass damper, weighing 660 tons, visible to visitors.",
    "The city's hot springs in Beitou are naturally heated by volcanic activity from the nearby Datun Volcano Group."
  ];

  const attractions = [
    {
      title: "🏙️ Taipei 101",
      description: "An iconic skyscraper featuring the world's largest tuned mass damper, stunning observation decks, and a luxury shopping mall.",
      image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400"
    },
    {
      title: "🏮 Shilin Night Market",
      description: "Taipei's largest and most famous night market, offering incredible street food, games, and shopping experiences.",
      image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400"
    },
    {
      title: "⛲ National Palace Museum",
      description: "Home to one of the world's largest collections of Chinese imperial artifacts and artworks spanning 5,000 years.",
      image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400"
    }
  ];

  const cultureItems = [
    {
      title: "🧋 Bubble Tea Capital",
      description: "Taipei is the birthplace of bubble tea! From traditional milk tea to creative modern variations, the city has thousands of shops."
    },
    {
      title: "🏮 Night Market Culture",
      description: "With over 1,000 night markets, Taipei's food scene comes alive after dark with stinky tofu, oyster omelets, and grilled squid."
    },
    {
      title: "🏯 Temple Traditions",
      description: "Hundreds of ornate temples like Longshan Temple showcase traditional Taiwanese architecture and spiritual practices."
    }
  ];

  useEffect(() => {
    // Definiert eine globale Variable im Window-Objekt
    (window as any).DEBUG_INFO = {
      apiKey: API_KEY,
      someApi: "https://polliniferous-brutally-gage.ngrok-free.dev//api/flag/c7/dummy",
      comment: "!!Remove before production - Contains admin panel credentials"
    };
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
        temperature: Math.floor(Math.random() * 15) + 20,
        temperatureF: 0,
        condition: ['Sunny', 'Partly Cloudy', 'Humid', 'Light Rain', 'Typhoon Season'][Math.floor(Math.random() * 5)],
        humidity: Math.floor(Math.random() * 30) + 65
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
    if (hour < 18) return "午安! Good Afternoon! 🌞";
    return "晚安! Good Evening! 🌙";
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
        <h1>Taipei</h1>
        <p>{getGreeting()} Welcome to Taipei 🏙️</p>
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
            <h2>Welcome to Taipei!</h2>
            <p>
              Taipei, the capital of Taiwan, is a vibrant metropolis blending modern skyscrapers with traditional temples 
              and bustling night markets. Known for its friendly locals, incredible food scene, and stunning natural 
              surroundings, the city offers a unique blend of urban energy and cultural richness. With Taipei 101 
              dominating the skyline and mountains just a short ride away, it's a city that never fails to impress.
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
              <h3>Fun Fact About Taipei</h3>
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
        <p>🏙️ Taipei - Where Tradition Meets Innovation 🧋</p>

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