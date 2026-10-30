import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page-wrapper">
      
      {/* Top Intro Section */}
      <div className="about-intro-section">
        <span className="about-pre-title">ABOUT US</span>
        <h1 className="about-main-heading">
          Designed for the new generation of travelers.
        </h1>
        <p className="about-description">
          Saharaa was born from a simple idea: planning a meaningful trip across North Africa shouldn't 
          take weeks of research. We combine local expertise with AI-driven personalization to deliver 
          itineraries that feel like they were built by a friend who happens to live there.
        </p>
      </div>

      {/* Stats Grid Layout */}
      <div className="about-stats-grid">
        <div className="stat-box-card">
          <span className="stat-gold-number">6</span>
          <span className="stat-label-text">Countries</span>
        </div>
        <div className="stat-box-card">
          <span className="stat-gold-number">320+</span>
          <span className="stat-label-text">Destinations</span>
        </div>
        <div className="stat-box-card">
          <span className="stat-gold-number">12K+</span>
          <span className="stat-label-text">Travelers</span>
        </div>
      </div>

      {/* Mission Section */}
      <div className="about-mission-section">
        <h2 className="about-sub-heading">Our mission</h2>
        <p className="about-description">
          To make North Africa's culture, landscapes and hospitality accessible to every traveler, while supporting the 
          local economies and artisans that make these journeys unforgettable.
        </p>
      </div>

    </div>
  );
}

export default About;