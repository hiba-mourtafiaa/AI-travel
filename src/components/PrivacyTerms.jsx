import React from "react";
import { Link } from "react-router-dom";
import { FiShield, FiFileText, FiLock, FiAlertCircle } from "react-icons/fi";
import "./PrivacyTerms.css";

function PrivacyTerms() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="legal-view-wrapper">
      
      {/* Header Layout Stack */}
      <div className="legal-header-section">
        <span className="legal-pre-title">LEGAL FRAMEWORK</span>
        <h1 className="legal-main-heading">Privacy & Terms</h1>
        <p className="legal-last-updated">Last Updated: June 2026</p>
      </div>

      <div className="legal-content-container">
        
        {/* Navigation/Summary Box */}
        <div className="legal-summary-box">
          <div className="summary-item">
            <FiShield className="summary-icon" />
            <div>
              <strong>Your Privacy Matters:</strong> We never sell your travel behavior data or personal details to third parties.
            </div>
          </div>
          <div className="summary-item">
            <FiFileText className="summary-icon" />
            <div>
              <strong>Service Intent:</strong> Our AI generation features are tools to inspire itineraries; local bookings are fulfilled by you independently.
            </div>
          </div>
        </div>

        {/* --- PRIVACY POLICY SECTION --- */}
        <section className="legal-section">
          <div className="section-title-wrapper">
            <FiLock className="section-icon" />
            <h2>1. Privacy Policy</h2>
          </div>
          
          <h3>1.1 Information We Collect</h3>
          <p>
            To build custom itineraries, Saharaa processes the information you intentionally provide through our 
            AI portal, including your target destination, travel dates, trip durations, budgets, and personal travel preferences. 
            If you subscribe to our newsletter, we store your email address safely within our delivery pipeline.
          </p>

          <h3>1.2 How We Use Your Data</h3>
          <p>
            Your specific travel details are analyzed exclusively to train, refine, and produce tailored day-by-day itineraries. 
            We do not use tracking tokens to monitor your behavior outside our web platform parameters.
          </p>

          <h3>1.3 Data Security</h3>
          <p>
            We deploy standard secure sockets layer (SSL) encryption protocols to securely handle client payloads. 
            Your historical trips are kept secure under private database buckets that you can delete at any moment via your travel hub.
          </p>
        </section>

        <hr className="legal-divider" />

        {/* --- TERMS OF SERVICE SECTION --- */}
        <section className="legal-section">
          <div className="section-title-wrapper">
            <FiAlertCircle className="section-icon" />
            <h2>2. Terms of Service</h2>
          </div>

          <h3>2.1 Use of AI Itinerary Tools</h3>
          <p>
            Saharaa supplies automated itinerary generations for recreational planning purposes. While our models incorporate 
            cultural context and real pricing averages, schedules, routes, and operational details are subject to immediate 
            local changes. You maintain full responsibility for verifying regional travel warnings, transport availability, and entry mandates.
          </p>

          <h3>2.2 Platform Boundaries & Liability</h3>
          <p>
            Saharaa is an independent software tool and does not act as a direct tour operator, booking merchant, or contracted 
            travel agency. Any reservations, stays, or excursions you make with external vendors encountered throughout your generated 
            itineraries are completed entirely at your own discretion and risk.
          </p>

          <h3>2.3 Intellectual Property</h3>
          <p>
            The custom design frameworks, branding markers, custom database matrices, layout styles, and software logic elements 
            on this platform are the protected property of Saharaa. You are granted a limited, personal, non-transferable license 
            to generate, print, and share your individual trip documents.
          </p>
        </section>

        {/* --- CONTACT FOOTER LINK --- */}
        <div className="legal-footer-note">
          <p>
            Have legal questions or compliance inquiries regarding our data handling principles? 
            Please jump over to our <Link to="/contact" className="legal-inline-link">Contact Page</Link> to connect directly with our compliance lead.
          </p>
          <span className="legal-copyright">© {currentYear} North Africa AI Travel Platform. All rights reserved.</span>
        </div>

      </div>
    </div>
  );
}

export default PrivacyTerms;