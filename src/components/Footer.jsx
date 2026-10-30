import React from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-brand-column">
          <div className="logo">
            <span className="north">NORTH AFRICA</span>
            <span className="travel">AI TRAVEL</span>
          </div>

          <p className="footer-tagline">Your North Africa, intelligently planned.</p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-links-columns">
          <div className="links-column">
            <h3>Product</h3>
            <ul>
              <li><Link to="/Ai">Plan a Trip</Link></li>
              <li><Link to="/Destinations">Destinations</Link></li>
            </ul>
          </div>

          <div className="links-column">
            <h3>Company</h3>
            <ul>
              <li><Link to="/About">About</Link></li>
              <li><Link to="/Contact">Contact</Link></li>
              <li><Link to="/Contact">FAQ</Link></li>
            </ul>
          </div>

          <div className="links-column">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/PrivacyTerms">Privacy</Link></li>
              <li><Link to="/PrivacyTerms">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p>© 2026 North Africa. All rights reserved.</p>
          <p>Made by Hiba Mourtafiaa.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;