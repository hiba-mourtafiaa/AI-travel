import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import "./SignIn.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      navigate("/SignIn");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signin-page-wrapper">
      <div className="auth-card">
        <div className="brand-badge-icon">
          <Sparkles size={20} className="sparkle-svg" />
        </div>

        <h1 className="auth-title">Get started</h1>
        <p className="auth-subtitle">Create an account to start planning.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label className="input-label">FULL NAME</label>
            <div className="input-field-container">
              <User size={18} className="inner-field-icon" />
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">EMAIL</label>
            <div className="input-field-container">
              <Mail size={18} className="inner-field-icon" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">PASSWORD</label>
            <div className="input-field-container">
              <Lock size={18} className="inner-field-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" style={{ marginTop: "24px" }} className="auth-submit-btn">
            <span>Create account</span>
            <ArrowRight size={16} className="btn-arrow-icon" />
          </button>
        </form>

        <div className="auth-footer-text">
          <span>Already registered? </span>
          <a href="/SignIn" className="signup-redirect-link">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;