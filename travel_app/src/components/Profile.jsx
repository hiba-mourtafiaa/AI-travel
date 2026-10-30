import React, { useState, useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Profile.css";

// Set your Laravel base URL
const API_BASE_URL = "http://127.0.0.1:8000/api";

function Profile() {
  const navigate = useNavigate();

  const [generatedTrips, setGeneratedTrips] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const storedUser = localStorage.getItem("userData");
      if (!storedUser) return;

      const userObj = JSON.parse(storedUser);
      const userId = userObj?.id;

      // Send the user_id as a parameter so the backend knows whose trips to find
      const tripsResponse = await axios.get(`${API_BASE_URL}/trips`, {
        params: { user_id: userId }
      });
      
      setGeneratedTrips(tripsResponse.data);
    } catch (error) {
      console.error("Error fetching user profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfileData();
}, []);


  // 2. Delete permanently from the Database AND update local UI state
  const handleDeleteTrip = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this trip permanently?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      
      const config = {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}` // Protects deletion route on backend
        }
      };

      // Send the authorized DELETE request to your Laravel API endpoint
      const response = await axios.delete(`${API_BASE_URL}/trips/${id}`, config);

      if (response.status === 200 || response.status === 204) {
        // ONLY remove from UI if backend database deletion was completely successful
        setGeneratedTrips(prevTrips => prevTrips.filter(trip => trip.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete trip from MySQL database:", error);
      alert("Could not complete deletion. Make sure you are authorized.");
    }
  };

  // 3. Open selected trip configurations directly inside the AI view wrapper
  const handleOpenTrip = (trip) => {
    navigate("/Ai", { 
      state: { 
        planData: trip, 
        autoOpen: true,
        formDataSettings: {
          budget: trip.budget || "Smart",
          vibes: trip.vibes ? JSON.parse(trip.vibes) : [], 
          duration: trip.duration || "1 Week", 
          group: trip.group || "Solo",
          rating: trip.rating || 3,
          country: trip.country || "Morocco",
          period: trip.period || "Spring (Mar - May)",
          transport: trip.transport || "Rental Car",
          activities: trip.activities ? JSON.parse(trip.activities) : [],
        }
      } 
    });
  };

  if (loading) {
    return (
      <div className="profile-page-container" style={{ textAlign: "center", paddingTop: "150px" }}>
        <div className="spinner" style={{ margin: "0 auto 20px" }}></div>
        <p style={{ fontFamily: "sans-serif", color: "#64748b" }}>Loading your custom itineraries...</p>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      
      {/* SECTION 1: Generated Trips */}
      <section className="profile-section">
        <div className="section-header">
          <h2>Generated trips</h2>
          <span className="view-all-link">{generatedTrips.length} Saved Plans</span>
        </div>
        
        {generatedTrips.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", border: "2px dashed #e2e8f0", borderRadius: "16px" }}>
            <p style={{ color: "#64748b", margin: 0 }}>No itineraries found. Create one in the AI planner view!</p>
          </div>
        ) : (
          <div className="cards-grid">
            {generatedTrips.map((trip) => (
              <div className="trip-card" key={trip.id}>
                <div className="card-image-wrapper">
                  <img 
                    src={trip.image || `https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=600`} 
                    alt={trip.title} 
                    className="card-img" 
                  />
                </div>
                <div className="card-content">
                  <p className="card-subtitle">{trip.country} · {trip.duration || "Custom duration"}</p>
                  <h3 className="card-title">{trip.title || `${trip.country} Adventure`}</h3>
                  <p className="card-meta">Budget Tier: {trip.budget} · {trip.group}</p>
                  
                  <div className="card-actions">
                    <button className="btn-action open-btn" onClick={() => handleOpenTrip(trip)}>
                      <FaEye /> Open
                    </button>
                    <button className="btn-action delete-btn" onClick={() => handleDeleteTrip(trip.id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: Favorite Destinations */}
      <section className="profile-section">
        <div className="section-header">
          <h2>Favorite destinations</h2>
        </div>

        {favorites.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", border: "2px dashed #e2e8f0", borderRadius: "16px" }}>
            <p style={{ color: "#64748b", margin: 0 }}>Your favorite spots collection will show up here.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {favorites.map((fav) => (
              <div className="favorite-card" key={fav.id}>
                <div className="card-image-wrapper">
                  <img src={fav.image} alt={fav.title} className="card-img" />
                </div>
                <div className="fav-card-content">
                  <p className="card-subtitle">{fav.country}</p>
                  <h3 className="card-title">{fav.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default Profile;