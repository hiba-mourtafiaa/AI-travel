import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");


    const serviceId = "service_xsaqyf8";
    const publicKey = "IUhr_bp4A8DKg5lCz";
    const templateId = "template_4zc6bl8";

    const templateParams = {
      from_name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, { publicKey: publicKey })
      .then(() => {
        setIsSent(true);
        setIsSubmitting(false);
        setFormData({ name: "", email: "", message: "" }); // Reset fields
      })
      .catch((error) => {
        console.error("Contact form error:", error);
        setErrorMessage("Something went wrong. Please try again directly via email.");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact-view-wrapper">
      <div className="contact-bg-watermark">CONTACT</div>
      
      <div className="contact-content-grid">
        
        {/* Left Side: Brand Text Stack & Cards */}
        <div className="contact-info-column">
          <span className="contact-pre-title">CONTACT US</span>
          <h1 className="contact-main-heading">Get in touch</h1>
          <p className="contact-description">
            Have questions or ready to plan your next AI-powered journey across North Africa? 
            Our team is here to help you customize the perfect itinerary.
          </p>

          <div className="contact-cards-stack">
            <a href="mailto:contact@saharaa.com" className="contact-info-card">
              <div className="card-left-section">
                <div className="icon-wrapper"><FiMail /></div>
                <div className="card-text-metadata">
                  <span className="card-label">Email us</span>
                  <span className="card-detail">contact@saharaa.com</span>
                </div>
              </div>
              <FiArrowUpRight className="card-arrow-icon" />
            </a>

            <a href="tel:+212500123456" className="contact-info-card">
              <div className="card-left-section">
                <div className="icon-wrapper"><FiPhone /></div>
                <div className="card-text-metadata">
                  <span className="card-label">Call us</span>
                  <span className="card-detail">+212 (0) 522 123 456</span>
                </div>
              </div>
              <FiArrowUpRight className="card-arrow-icon" />
            </a>

            <div className="contact-info-card static-card">
              <div className="card-left-section">
                <div className="icon-wrapper"><FiMapPin /></div>
                <div className="card-text-metadata">
                  <span className="card-label">Our location</span>
                  <span className="card-detail">Casablanca, Morocco</span>
                </div>
              </div>
              <FiArrowUpRight className="card-arrow-icon" />
            </div>
          </div>
        </div>

        {/* Right Side: Unified Form / Success Screen State Module */}
        <div className="contact-form-column">
          {isSent ? (
            <div className="contact-success-card">
              <FiCheckCircle className="success-check-icon" />
              <h2>Message Sent!</h2>
              <p>Thank you for reaching out. North Africa AI travel specialist will review your inquiry and get back to you within 24 hours.</p>
              <button onClick={() => setIsSent(false)} className="form-reset-btn">
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-unified-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message"
                  placeholder="Message" 
                  rows="6" 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                ></textarea>
              </div>
              
              {errorMessage && <p className="contact-error-text">{errorMessage}</p>}
              
              <button type="submit" disabled={isSubmitting} className="form-submit-btn">
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default Contact;