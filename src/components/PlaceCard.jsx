import React from 'react';
import './PlaceCard.css';

const PlaceCard = ({ place }) => {
  const getSafetyTagClass = (tag) => {
    switch (tag.toLowerCase()) {
      case 'safe': return 'tag-safe';
      case 'neutral': return 'tag-neutral';
      case 'unsafe': return 'tag-unsafe';
      default: return '';
    }
  };

  const locString = place.city 
    ? (place.state ? `${place.city}, ${place.state}` : place.city)
    : place.location;
    
  const locationText = locString ? `📍 ${locString}` : '📍 Location not specified';

  return (
    <div className="place-card">
      <div className="card-header">
        <h3 className="place-name">{place.name}</h3>
        <span className={`safety-tag ${getSafetyTagClass(place.safetyTag)}`}>
          {place.safetyTag}
        </span>
      </div>
      <p className="place-location">{locationText}</p>
      <p className="place-category">{place.category}</p>
      <p className="place-description">{place.shortDescription}</p>
      <div className="card-footer">
        <span className="recommendation-count">
          ♥ Recommended by {place.recommendationsCount} women
        </span>
      </div>
    </div>
  );
};

export default PlaceCard;
