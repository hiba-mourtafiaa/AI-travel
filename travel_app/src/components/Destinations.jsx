import React, { useState } from "react";
import { FaSearch, FaSlidersH, FaTh, FaList, FaStar, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import "./Destinations.css";

const Destinations = () => {
  const [activeCountry, setActiveCountry] = useState("Any country");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const countries = ["Any country", "Morocco", "Algeria", "Tunisia", "Egypt", "Libya", "Mauritania"];

  
    const destinationData = [
  {
    id: 1,
    name: "Chefchaouen",
    location: "Chefchaouen",
    country: "Morocco",
    rating: "4.9",
    image: "/1.jfif"
  },
  {
    id: 2,
    name: "Marrakech Medina",
    location: "Marrakech",
    country: "Morocco",
    rating: "4.8",
    image: "/4.jfif"
  },
  {
    id: 3,
    name: "Fes El Bali",
    location: "Fes",
    country: "Morocco",
    rating: "4.7",
    image: "/7.webp"
  },
  {
    id: 4,
    name: "Ait Benhaddou",
    location: "Ouarzazate",
    country: "Morocco",
    rating: "4.9",
    image: "/8.webp"
  },
  {
    id: 5,
    name: "Essaouira Citadel",
    location: "Essaouira",
    country: "Morocco",
    rating: "4.6",
    image: "/9.webp"
  },
  {
    id: 6,
    name: "Tassili n'Ajjer",
    location: "Djanet",
    country: "Algeria",
    rating: "4.9",
    image: "/10.webp"
  },
  {
    id: 7,
    name: "Casbah of Algiers",
    location: "Algiers",
    country: "Algeria",
    rating: "4.5",
    image: "/11.webp"
  },
  {
    id: 8,
    name: "Ghardaïa M'zab Valley",
    location: "Ghardaïa",
    country: "Algeria",
    rating: "4.8",
    image: "/12.webp"
  },
  {
    id: 9,
    name: "Roman Ruins of Timgad",
    location: "Batna",
    country: "Algeria",
    rating: "4.7",
    image: "/13.webp"
  },
  {
    id: 10,
    name: "Constantine Suspension Bridges",
    location: "Constantine",
    country: "Algeria",
    rating: "4.8",
    image: "/14.webp"
  },
  {
    id: 11,
    name: "Sidi Bou Said",
    location: "Tunis",
    country: "Tunisia",
    rating: "4.8",
    image: "/15.webp"
  },
  {
    id: 12,
    name: "Amphitheatre of El Jem",
    location: "El Jem",
    country: "Tunisia",
    rating: "4.9",
    image: "/16.webp"
  },
  {
    id: 13,
    name: "Medina of Tunis",
    location: "Tunis",
    country: "Tunisia",
    rating: "4.6",
    image: "/17.webp"
  },
  {
    id: 14,
    name: "Djerba Island",
    location: "Djerba",
    country: "Tunisia",
    rating: "4.7",
    image: "/18.webp"
  },
  {
    id: 15,
    name: "Sahara Dunes of Douz",
    location: "Douz",
    country: "Tunisia",
    rating: "4.8",
    image: "/19.webp"
  },
  {
    id: 16,
    name: "Pyramids of Giza",
    location: "Cairo",
    country: "Egypt",
    rating: "4.9",
    image: "/3.jfif"
  },
  {
    id: 17,
    name: "Karnak Temple",
    location: "Luxor",
    country: "Egypt",
    rating: "4.9",
    image: "/20.webp"
  },
  {
    id: 18,
    name: "Abu Simbel Temples",
    location: "Aswan",
    country: "Egypt",
    rating: "4.9",
    image: "/21.webp"
  },
  {
    id: 19,
    name: "White Desert",
    location: "Farafra",
    country: "Egypt",
    rating: "4.8",
    image: "/22.webp"
  },
  {
    id: 20,
    name: "Siwa Oasis",
    location: "Siwa",
    country: "Egypt",
    rating: "4.7",
    image: "/23.webp"
  },
  {
    id: 21,
    name: "Leptis Magna",
    location: "Khoms",
    country: "Libya",
    rating: "4.9",
    image: "/24.webp"
  },
  {
    id: 22,
    name: "Cyrene Ruins",
    location: "Shahat",
    country: "Libya",
    rating: "4.7",
    image: "/25.webp"
  },
  {
    id: 23,
    name: "Ghadames Old Town",
    location: "Ghadames",
    country: "Libya",
    rating: "4.8",
    image: "/26.webp"
  },
  {
    id: 24,
    name: "Acacus Mountains",
    location: "Ghat",
    country: "Libya",
    rating: "4.9",
    image: "/27.webp"
  },
  {
    id: 25,
    name: "Arch of Marcus Aurelius",
    location: "Tripoli",
    country: "Libya",
    rating: "4.5",
    image: "/28.webp"
  },
  {
    id: 26,
    name: "Chinguetti Mosque",
    location: "Chinguetti",
    country: "Mauritania",
    rating: "4.6",
    image: "/29.webp"
  },
  {
    id: 27,
    name: "Banc d'Arguin",
    location: "Nouamghar",
    country: "Mauritania",
    rating: "4.7",
    image: "/30.webp"
  },
  {
    id: 28,
    name: "Eye of the Sahara",
    location: "Ouadane",
    country: "Mauritania",
    rating: "4.8",
    image: "/31.webp"
  },
  {
    id: 29,
    name: "Ouadane Old Town",
    location: "Ouadane",
    country: "Mauritania",
    rating: "4.5",
    image: "/32.webp"
  },
  {
    id: 30,
    name: "Terjit Oasis",
    location: "Atar",
    country: "Mauritania",
    rating: "4.8",
    image: "/33.webp"
  }

  ];

  const filteredDestinations = destinationData.filter((item) => {
    const matchesCountry = activeCountry === "Any country" || item.country === activeCountry;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="destinations-page">
      <header className="destinations-header">
        <span className="destinations-badge">DESTINATIONS</span>
        <h1>Explore North Africa</h1>
      </header>

      <div className="search-filter-card">
        <div className="filter-top-row">
          <div className="search-input-wrapper">
            <FaSearch className="search-bar-icon" />
            <input 
              type="text" 
              placeholder="Search city or place..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-actions-right">
            <button className="utility-filter-btn">
              <FaSlidersH /> <span>Filters</span>
            </button>
            <div className="view-toggle-group">
              <button 
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <FaTh />
              </button>
              <button 
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        <div className="country-pills-row">
          {countries.map((country) => (
            <button
              key={country}
              className={`country-pill ${activeCountry === country ? "active" : ""}`}
              onClick={() => setActiveCountry(country)}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      <main className="destinations-section-wrapper">
        <div className="section-title-container">
          <span className="sub-badge">6 COUNTRIES</span>
          <h2>Popular destinations</h2>
          <p>Hand-picked across the Maghreb and the Nile.</p>
        </div>

        <div className={`destinations-layout-${viewMode}`}>
          {filteredDestinations.map((dest) => (
            <div 
              key={dest.id} 
              className="destination-showcase-card"
              style={{ backgroundImage: `url(${dest.image})` }}
            >
              <div className="card-top-badges">
                <span className="country-tag">{dest.country}</span>
                <span className="rating-tag">
                  <FaStar className="star-icon" /> {dest.rating}
                </span>
              </div>
              <div className="card-bottom-info">
                <h3>{dest.name}</h3>
                <div className="location-line">
                  <FaMapMarkerAlt /> <span>{dest.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="no-results">
            <p>No locations match your search criteria.</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default Destinations;