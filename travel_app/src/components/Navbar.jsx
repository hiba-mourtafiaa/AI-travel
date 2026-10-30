import React, { useEffect, useState, useRef } from "react";
import { FaGlobe, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // NEW: added useNavigate for redirection
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userToken")
  );
  const [dropdownOpen, setDropdownOpen] = useState(false); // NEW: dropdown open state

  const dropdownRef = useRef(null); // NEW: for closing dropdown when clicking outside
  const navigate = useNavigate();   // NEW: hook to redirect after logout

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "ar,en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    const scriptId = "google-translate-script";
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    }

    const checkCookie = () => {
      const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
      if (match && match[1]) {
        setCurrentLang(match[1]);
      }

      setIsLoggedIn(!!localStorage.getItem("userToken"));
    };

    const interval = setInterval(checkCookie, 500);

    // NEW: Close dropdown if user clicks anywhere else on the screen
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
      document.removeEventListener("mousedown", handleClickOutside); // Clean up click listener
    };
  }, []);

  const toggleLanguage = () => {
    const nextLang = currentLang === "en" ? "ar" : "en";
    const googleCombo = document.querySelector(".goog-te-combo");

    if (googleCombo) {
      googleCombo.value = nextLang;
      googleCombo.dispatchEvent(new Event("change"));
      setCurrentLang(nextLang);
    } else {
      alert("Google Translate is initializing. Please wait...");
    }
  };

  // NEW: Handle Logout Action
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear authentication token
    setIsLoggedIn(false);                 // Update state instantly
    setDropdownOpen(false);               // Close dropdown menu
    navigate("/");                        // Redirect user to home page
  };

  return (
    <section className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <span className="north">NORTH AFRICA</span>
        <span className="travel">AI TRAVEL</span>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/Ai">AI Planner</Link>
        <Link to="/About">About</Link>
        <Link to="/Contact">Contact</Link>
      </nav>

      <div className="nav-actions">
        <button className="language-btn" onClick={toggleLanguage}>
          <FaGlobe />
          <span>{currentLang === "en" ? "ENG" : "ARB"}</span>
        </button>

        <div
          id="google_translate_element"
          className="offscreen-google-widget"
        ></div>

        {isLoggedIn ? (
          /* NEW: Wrapped Profile icon and custom dropdown list inside a container container */
          <div className="profile-container" ref={dropdownRef}>
            <button 
              className="profile-icon-btn" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Toggle user menu"
            >
              <FaUserCircle size={34} />
            </button>
            
            {dropdownOpen && (
              <div className="profile-dropdown">
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>My Profile</Link>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/SignIn/signin"
              className="signin-btn"
              style={{ textDecoration: "none" }}
            >
              Sign In
            </Link>

            <Link
              to="/SignUp"
              className="start-btn"
              style={{ textDecoration: "none" }}
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default Navbar;