import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addRecommendation } from '../services/recommendationService';
import './AddRecommendation.css';

const AddRecommendation = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    safety: 'Safe',
  });
  
  const [stay, setStay] = useState({ placeName: '', description: '' });
  const [cafe, setCafe] = useState({ placeName: '', description: '' });
  const [thingsToDo, setThingsToDo] = useState({ placeName: '', description: '' });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const hasStay = stay.placeName.trim() && stay.description.trim();
    const hasCafe = cafe.placeName.trim() && cafe.description.trim();
    const hasThingsToDo = thingsToDo.placeName.trim() && thingsToDo.description.trim();

    if (!hasStay && !hasCafe && !hasThingsToDo) {
      setErrorMsg('Please fill out at least one recommendation category fully (Place Name and Description).');
      return;
    }

    if (!formData.city.trim()) {
      setErrorMsg('Please provide a city.');
      return;
    }

    const itemsToSubmit = [];
    if (hasStay) {
      itemsToSubmit.push({
        placeName: stay.placeName,
        city: formData.city,
        state: formData.state,
        category: 'Stays',
        description: stay.description,
        safety: formData.safety,
      });
    }
    if (hasCafe) {
      itemsToSubmit.push({
        placeName: cafe.placeName,
        city: formData.city,
        state: formData.state,
        category: 'Cafes',
        description: cafe.description,
        safety: formData.safety,
      });
    }
    if (hasThingsToDo) {
      itemsToSubmit.push({
        placeName: thingsToDo.placeName,
        city: formData.city,
        state: formData.state,
        category: 'Things to Do',
        description: thingsToDo.description,
        safety: formData.safety,
      });
    }

    setIsSubmitting(true);
    
    try {
      await addRecommendation(itemsToSubmit);
      setIsSubmitted(true);
    } catch (error) {
      setErrorMsg("There was an error saving your recommendations. See browser console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddAnother = () => {
    setIsSubmitted(false);
    setFormData({ name: '', city: '', state: '', safety: 'Safe' });
    setStay({ placeName: '', description: '' });
    setCafe({ placeName: '', description: '' });
    setThingsToDo({ placeName: '', description: '' });
  };

  return (
    <div className="add-rec-container">
      <nav className="navbar-simple">
        <Link to="/" className="nav-brand-link">
          <img src="/logo.png" alt="NOAFO" className="brand-logo" />
        </Link>
        <Link to="/" className="nav-back">← Back to Home</Link>
      </nav>

      <main className="add-rec-main">
        <header className="add-rec-header">
          <h1 className="page-title">Add a Recommendation</h1>
          <p className="page-subtext">Help other women travel safely by sharing your experiences</p>
        </header>

        {isSubmitted ? (
          <div className="success-message">
            <h2>Thank You!</h2>
            <p>Your recommendations help other women travel better 💛</p>
            <button className="secondary-btn" onClick={handleAddAnother}>Add More Places</button>
          </div>
        ) : (
          <form className="add-rec-form" onSubmit={handleSubmit}>
            {errorMsg && <div className="error-banner">{errorMsg}</div>}

            <section className="form-section general-section">
              <h3 className="section-heading">General Details</h3>
              <div className="form-group">
                <label htmlFor="name">Your Name (Optional)</label>
                <input 
                  type="text" id="name" name="name" 
                  value={formData.name} onChange={handleGeneralChange}
                  placeholder="How should we refer to you?"
                />
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="city">City *</label>
                  <input 
                    type="text" id="city" name="city" 
                    value={formData.city} onChange={handleGeneralChange}
                    placeholder="e.g. Varkala, Kochi"
                    required
                  />
                </div>
                <div className="form-group half-width">
                  <label htmlFor="state">State <span className="optional-badge">(Optional)</span></label>
                  <input 
                    type="text" id="state" name="state" 
                    value={formData.state} onChange={handleGeneralChange}
                    placeholder="e.g. Kerala"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="safety">Overall Safety Feeling *</label>
                <select id="safety" name="safety" value={formData.safety} onChange={handleGeneralChange} required>
                  <option value="Safe">Safe</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Unsafe">Unsafe</option>
                </select>
              </div>
            </section>

            <div className="section-divider"></div>
            <p className="instruction-text">Fill in at least one of the categories below to share your finds.</p>

            <section className="form-section optional-section">
              <h3 className="section-heading">A. Stay <span className="optional-badge">(Optional)</span></h3>
              <div className="form-group">
                <label>Place Name</label>
                <input 
                  type="text" name="placeName" value={stay.placeName} 
                  onChange={handleSectionChange(setStay)} placeholder="Name of the stay or hostel"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" value={stay.description} onChange={handleSectionChange(setStay)} 
                  placeholder="What made this stay special?" rows="3"
                />
              </div>
            </section>

            <section className="form-section optional-section">
              <h3 className="section-heading">B. Cafe <span className="optional-badge">(Optional)</span></h3>
              <div className="form-group">
                <label>Place Name</label>
                <input 
                  type="text" name="placeName" value={cafe.placeName} 
                  onChange={handleSectionChange(setCafe)} placeholder="Name of the cafe or restaurant"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" value={cafe.description} onChange={handleSectionChange(setCafe)} 
                  placeholder="What did you love about this cafe?" rows="3"
                />
              </div>
            </section>

            <section className="form-section optional-section">
              <h3 className="section-heading">C. Things to Do <span className="optional-badge">(Optional)</span></h3>
              <div className="form-group">
                <label>Activity / Place Name</label>
                <input 
                  type="text" name="placeName" value={thingsToDo.placeName} 
                  onChange={handleSectionChange(setThingsToDo)} placeholder="Name of the activity or place"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" value={thingsToDo.description} onChange={handleSectionChange(setThingsToDo)} 
                  placeholder="Any tips for this activity?" rows="3"
                />
              </div>
            </section>

            <button type="submit" className="primary-btn submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Recommendations'}
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default AddRecommendation;
