import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Destinations from "./components/Destinations";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Ai from "./components/Ai"; 
import About from "./components/About";
import Contact from "./components/Contact";
import PrivacyTerms from "./components/PrivacyTerms";
import SignIn from "./components/SignIn"; 
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/Ai" element={<Ai />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/PrivacyTerms" element={<PrivacyTerms />} />
        <Route path="/SignIn/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/SignUp" element={<SignUp />} />
        
      </Routes>
      <Footer />

    </Router>
  );
}

export default App;