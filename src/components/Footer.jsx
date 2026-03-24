import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-left">
          <p className="footer-company">NOAFO Technologies Private Limited</p>
          <p>Trivandrum, Kerala</p>
          <p>+91 9746278029</p>
          <p><a href="mailto:info@noafo.com">info@noafo.com</a></p>
        </div>
        <div className="footer-right">
          <div className="recognition-badge">Startup India and Kerala Startup Mission recognised startup</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
