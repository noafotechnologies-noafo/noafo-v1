import React, { useState } from 'react';
import { submitSurvey } from '../services/surveyService';
import './Survey.css';

const Survey = () => {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!q1 || !q2) return;
    
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      console.log("Submitting survey from UI:", { answer_one: q1, answer_two: q2 });
      
      const payload = {
        answer_one: q1,
        answer_two: q2
      };

      const result = await submitSurvey(payload);
      
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error("Caught error in Survey.jsx:", err);
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const options = ['Yes', 'Maybe', 'No'];

  return (
    <section className="survey-section">
      <div className="survey-container">
        {submitted ? (
          <div className="survey-success fade-in">
            <h3>Thank you 💛</h3>
            <p>This will help us build something meaningful for women.</p>
          </div>
        ) : (
          <form className="survey-form" onSubmit={handleSubmit}>
            <h3 className="survey-title">Help us shape NOAFO</h3>
            
            {errorMsg && <div className="survey-error">{errorMsg}</div>}
            
            <div className="survey-question">
              <p>1. Would you use a platform where you can see recommendations from other women?</p>
              <div className="survey-options">
                {options.map((opt) => (
                  <label key={`q1-${opt}`} className="survey-label">
                    <input 
                      type="radio" 
                      name="q1" 
                      value={opt} 
                      checked={q1 === opt}
                      onChange={(e) => setQ1(e.target.value)} 
                    />
                    <span className="survey-custom-radio">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="survey-question">
              <p>2. Would you contribute your own recommendations?</p>
              <div className="survey-options">
                {options.map((opt) => (
                  <label key={`q2-${opt}`} className="survey-label">
                    <input 
                      type="radio" 
                      name="q2" 
                      value={opt} 
                      checked={q2 === opt}
                      onChange={(e) => setQ2(e.target.value)} 
                    />
                    <span className="survey-custom-radio">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="survey-submit-btn"
              disabled={!q1 || !q2 || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Survey;
