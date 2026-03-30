import React, { useState, useEffect, useRef } from 'react';
import PlaceCard from '../components/PlaceCard';
import { Link } from 'react-router-dom';
import { getRecommendations } from '../services/recommendationService';
import './Places.css';

const Places = () => {
  const [locationSearch, setLocationSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      const data = await getRecommendations();
      setPlaces(data);
      setLoading(false);
    };
    fetchPlaces();
  }, []);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Extract unique locations for suggestions
  const uniqueLocations = Array.from(new Set(places.map(p => {
    if (p.city) return p.state ? `${p.city}, ${p.state}` : p.city;
    return p.location;
  }))).filter(Boolean);

  // Filter locations based on user input
  const locationSuggestions = uniqueLocations.filter(loc => 
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredPlaces = places.filter(place => {
    const locString = place.city 
      ? (place.state ? `${place.city}, ${place.state}` : place.city)
      : place.location;
    const matchLocation = !locationSearch || (locString && locString.toLowerCase().includes(locationSearch.toLowerCase()));
    const matchCategory = category === 'All' || place.category === category;
    return matchLocation && matchCategory;
  });

  const handleSuggestionClick = (loc) => {
    setLocationSearch(loc);
    setShowSuggestions(false);
  };

  return (
    <div className="places-container">
      <nav className="navbar-simple">
        <Link to="/" className="nav-brand-link">
          <img src="/logo.png" alt="NOAFO" className="brand-logo" />
        </Link>
        <Link to="/" className="nav-back">← Back to Home</Link>
      </nav>

      <header className="places-header">
        <h1 className="page-title">Explore Places</h1>
        <p className="page-subtext">Discover places recommended by women</p>
      </header>

      <main className="places-main">
        {/* Filters */}
        <section className="filters-section">
          <div className="filter-group location-search-group" ref={dropdownRef}>
            <label htmlFor="location-input">Location:</label>
            <div className="search-wrapper">
              <input 
                id="location-input"
                type="text"
                placeholder="Search location (e.g. Goa, Kochi, Bangalore)"
                value={locationSearch}
                onChange={(e) => {
                  setLocationSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="filter-input"
                autoComplete="off"
              />
              {showSuggestions && locationSearch && locationSuggestions.length > 0 && (
                <ul className="suggestions-list">
                  {locationSuggestions.map((loc, index) => (
                    <li 
                      key={index} 
                      onClick={() => handleSuggestionClick(loc)}
                      className="suggestion-item"
                    >
                      {loc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="filter-group category-group">
            <label htmlFor="category-select">Category:</label>
            <select 
              id="category-select" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Categories</option>
              <option value="Cafes">Cafes</option>
              <option value="Stays">Stays</option>
              <option value="Things to Do">Things to Do</option>
            </select>
          </div>
        </section>

        {/* Results */}
        <section className="results-section">
          <h2 className="results-count">
            Showing {filteredPlaces.length} places {locationSearch ? `for "${locationSearch}"` : ''}
          </h2>
          
          {loading ? (
             <div className="no-results"><p>Loading recommendations from Supabase...</p></div>
          ) : filteredPlaces.length > 0 ? (
            <div className="places-grid">
              {filteredPlaces.map(place => (
                <PlaceCard 
                  key={place.id} 
                  place={{
                    id: place.id,
                    name: place.place_name,
                    city: place.city,
                    state: place.state,
                    location: place.location,
                    category: place.category,
                    shortDescription: place.description,
                    recommendationsCount: place.recommended_by,
                    safetyTag: place.safety
                  }} 
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No recommendations found <strong>{locationSearch ? `for "${locationSearch}"` : 'for the selected filters'}</strong>.</p>
              <button 
                className="clear-filters-btn"
                onClick={() => { setLocationSearch(''); setCategory('All'); setShowSuggestions(false); }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Places;
