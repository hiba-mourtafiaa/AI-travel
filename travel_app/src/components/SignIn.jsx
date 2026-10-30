import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Incorrect email or password.");
      }

      // Save login information
      localStorage.setItem("userToken", data.token || "logged_in");
      localStorage.setItem("userData", JSON.stringify(data.user));

      // Go back to the home page
      navigate("/");
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

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">
          Sign in to continue planning.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

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

          <div className="recovery-wrapper">
            <a href="#forgot" className="forgot-password-link">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="auth-submit-btn">
            <span>Sign In</span>
            <ArrowRight size={16} className="btn-arrow-icon" />
          </button>
        </form>

        <div className="auth-footer-text">
          <span>New here? </span>
          <a href="/SignUp" className="signup-redirect-link">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;