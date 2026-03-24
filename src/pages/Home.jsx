import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTotalRecommendationsCount } from '../services/recommendationService';
import Survey from '../components/Survey';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [statsCount, setStatsCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const count = await getTotalRecommendationsCount();
      setStatsCount(count);
    };
    fetchStats();
  }, []);

  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <img src="/logo.png" alt="NOAFO" className="brand-logo" />
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/places">Explore Places</Link>
          <Link to="/add">Add Recommendation</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <img src="/logo.png" alt="NOAFO Logo" className="hero-logo-img" />
          <h1 className="hero-title">Travel recommendations by women, for women</h1>
          <p className="hero-subtext">Discover safe and trusted places shared by real women</p>
          <button className="primary-btn" onClick={() => navigate('/places')}>
            Explore Places
          </button>
          
          {statsCount > 0 && (
            <div className="stats-banner">
              <span className="stats-highlight">{statsCount}</span> recommendations shared so far 💛
            </div>
          )}
        </div>
      </header>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How it works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <p>Women share places they love</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <p>We organize them by location</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <p>You discover trusted recommendations</p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="who-we-are-section">
        <div className="who-we-are-content">
          <h2 className="section-title">Who we are</h2>
          <p className="who-we-are-text">
            We're building something to make travel decisions easier and more trustworthy for women.
          </p>
        </div>
      </section>

      {/* Survey Section */}
      <Survey />

      {/* Social CTA Section */}
      <section className="social-cta-section">
        <div className="social-cta-content">
          <h3>If you're interested in what we're building, follow us</h3>
          <div className="social-links">
            <a href="https://www.linkedin.com/company/noafo-tribe/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span>LinkedIn</span>
            </a>
            <a href="https://www.instagram.com/noafo_tribe" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="url(#ig-grad)"><defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              <span>Instagram</span>
            </a>
            <a href="https://www.facebook.com/share/1No17o8LCk/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
