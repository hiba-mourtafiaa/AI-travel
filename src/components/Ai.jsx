import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // NEW: For catching profile page routing parameters
import { 
  FiArrowLeft, FiArrowRight, FiHeart, FiShare2, FiPrinter, 
  FiMapPin, FiCompass, FiUsers, FiCalendar, FiBriefcase, 
  FiClock, FiSun, FiMoon, FiRotateCcw, FiSliders, FiCheck
} from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import "./Ai.css";

// (Keep your destinationDatabase object exactly here as you had it before)
const destinationDatabase = {
  Morocco: {
    city: "Marrakech",
    hotels: [
      { area: "OLD TOWN", name: "Riad Saharaa Marrakech", stars: 4, price: 80 },
      { area: "CENTER", name: "Marrakech Boutique Hotel", stars: 4, price: 64 },
      { area: "OUTSKIRTS", name: "Atlas Garden Lodge", stars: 3, price: 56 }
    ],
    restaurants: [
      { name: "Nomad", type: "Modern Moroccan", cost: "$$$" },
      { name: "Le Jardin", type: "Mediterranean", cost: "$$" },
      { name: "Café Clock", type: "Fusion", cost: "$$" },
      { name: "Dar Yacout", type: "Traditional Tasting", cost: "$$$$" }
    ],
    days: [
      { morning: "Sunrise view over Medina", afternoon: "Lunch at hand-picked rooftop", evening: "Sunset dinner with live oud music" },
      { morning: "Guided medina walk", afternoon: "Museum & historical district", evening: "Night souk experience" },
      { morning: "Coastal photography session", afternoon: "Desert excursion with 4x4", evening: "Stargazing dinner in the dunes" },
      { morning: "Artisan workshop visit", afternoon: "Hidden viewpoint hike", evening: "Fine-dining tasting menu" },
      { morning: "Local hammam & breakfast", afternoon: "Free time + spa relaxation", evening: "Local family-style mezze" }
    ]
  },
  Algeria: {
    city: "Algiers",
    hotels: [
      { area: "CASBAH", name: "Dar El Set Algiers", stars: 4, price: 95 },
      { area: "DOWNTOWN", name: "Albert Premier Luxury", stars: 4, price: 75 },
      { area: "COASTAL", name: "Sheraton Club Algiers", stars: 5, price: 140 }
    ],
    restaurants: [
      { name: "Le Redoubtable", type: "Seafood Fine-Dining", cost: "$$$$" },
      { name: "Restaurant El Jenina", type: "Traditional Algerian", cost: "$$$" },
      { name: "Tantra", type: "Modern Fusion", cost: "$$" },
      { name: "Café de la Gare", type: "Bistro", cost: "$" }
    ],
    days: [
      { morning: "Casbah historic walking tour", afternoon: "Traditional harbor lunch", evening: "Sunset walk on the esplanade" },
      { morning: "Jardin d'Essai botanical walk", afternoon: "Martyrs Memorial views", evening: "Traditional Algerian live music dinner" },
      { morning: "Tipaza Roman ruins excursion", afternoon: "Seafood lunch at the port", evening: "Stargazing over the Mediterranean coastal cliffs" },
      { morning: "Palace of the Rais exploration", afternoon: "Local art gallery walks", evening: "Fine cuisine tasting experience" },
      { morning: "Local traditional hammam", afternoon: "Souk shopping & tea tasting", evening: "Family-style couscous feast" }
    ]
  },
  Tunisia: {
    city: "Sidi Bou Said",
    hotels: [
      { area: "CLIFFSIDE", name: "Dar Said Boutique", stars: 5, price: 120 },
      { area: "BEACHFRONT", name: "The Residence Tunis", stars: 4, price: 90 },
      { area: "MEDINA", name: "Dar El Jeld Hotel", stars: 4, price: 70 }
    ],
    restaurants: [
      { name: "Café des Nattes", type: "Traditional Tea & Pastry", cost: "$" },
      { name: "Au Bon Vieux Temps", type: "Tunisian & French", cost: "$$$" },
      { name: "Le Pirat", type: "Seafood catch of the day", cost: "$$$$" },
      { name: "Dar Belhadj", type: "Authentic Medina feast", cost: "$$$" }
    ],
    days: [
      { morning: "Blue-white architectural stroll", afternoon: "Cliffside ocean lunch", evening: "Sunset mint tea with live Malouf music" },
      { morning: "Carthage Roman amphitheater ruins", afternoon: "Bardo Mosaic museum", evening: "Seaside promenade lounge dining" },
      { morning: "Sidi Bou Said beach swim", afternoon: "Artisan pottery workshop", evening: "Fine dining olive-crusted lamb dinner" },
      { morning: "Tunis Medina market tour", afternoon: "Zaytuna Mosque surroundings", evening: "Traditional Tunisian shakshuka dinner" },
      { morning: "Thermal spa wellness treatment", afternoon: "Free time walking local galleries", evening: "Family-style Mediterranean seafood banquet" }
    ]
  },
  Egypt: {
    city: "Cairo",
    hotels: [
      { area: "NILE VIEW", name: "The Nile Ritz-Carlton", stars: 5, price: 160 },
      { area: "PYRAMIDS", name: "Marriott Mena House", stars: 5, price: 140 }
    ],
    restaurants: [
      { name: "Abou El Sid", type: "Authentic Egyptian", cost: "$$$" },
      { name: "Koshary Abou Tarek", type: "Street Food Legendary", cost: "$" }
    ],
    days: [
      { morning: "Giza Pyramids & Sphinx tour", afternoon: "Traditional Koshary lunch", evening: "Felucca boat ride on the Nile at sunset" },
      { morning: "Grand Egyptian Museum", afternoon: "Khan El Khalili bazaar shopping", evening: "Dinner overlooking the illuminated Citadel" }
    ]
  },
  Libya: {
    city: "Tripoli",
    hotels: [
      { area: "OLD PORT", name: "Dar El Medina Tripoli", stars: 4, price: 85 }
    ],
    restaurants: [
      { name: "Al-Athar", type: "Traditional Seafood", cost: "$$$" }
    ],
    days: [
      { morning: "Red Castle (Assaraya al-Hamra) tour", afternoon: "Medina archway lunch", evening: "Sunset walk along Martyr's Square" }
    ]
  },
  Mauritania: {
    city: "Nouakchott",
    hotels: [
      { area: "CENTER", name: "Hotel Azalaï Nouakchott", stars: 4, price: 95 }
    ],
    restaurants: [
      { name: "Le Prince", type: "Middle Eastern & Local", cost: "$$" }
    ],
    days: [
      { morning: "Port de Pêche early fish market auction", afternoon: "Local crafts market exploration", evening: "Traditional mint tea in a Saharan tent setup" }
    ]
  }
};

const destinationData = [
  { id: 1, name: "Chefchaouen", location: "Chefchaouen", country: "Morocco", rating: "4.9", image: "/1.jfif" },
  { id: 2, name: "Marrakech Medina", location: "Marrakech", country: "Morocco", rating: "4.8", image: "/4.jfif" },
  { id: 3, name: "Fes El Bali", location: "Fes", country: "Morocco", rating: "4.7", image: "/7.webp" },
  { id: 4, name: "Ait Benhaddou", location: "Ouarzazate", country: "Morocco", rating: "4.9", image: "/8.webp" },
  { id: 5, name: "Essaouira Citadel", location: "Essaouira", country: "Morocco", rating: "4.6", image: "/9.webp" },
  { id: 6, name: "Tassili n'Ajjer", location: "Djanet", country: "Algeria", rating: "4.9", image: "/10.webp" },
  { id: 7, name: "Casbah of Algiers", location: "Algiers", country: "Algeria", rating: "4.5", image: "/11.webp" },
  { id: 8, name: "Ghardaïa M'zab Valley", location: "Ghardaïa", country: "Algeria", rating: "4.8", image: "/12.webp" },
  { id: 9, name: "Roman Ruins of Timgad", location: "Batna", country: "Algeria", rating: "4.7", image: "/13.webp" },
  { id: 10, name: "Constantine Suspension Bridges", location: "Constantine", country: "Algeria", rating: "4.8", image: "/14.webp" },
  { id: 11, name: "Sidi Bou Said", location: "Tunis", country: "Tunisia", rating: "4.8", image: "/15.webp" },
  { id: 12, name: "Amphitheatre of El Jem", location: "El Jem", country: "Tunisia", rating: "4.9", image: "/16.webp" },
  { id: 13, name: "Medina of Tunis", location: "Tunis", country: "Tunisia", rating: "4.6", image: "/17.webp" },
  { id: 14, name: "Djerba Island", location: "Djerba", country: "Tunisia", rating: "4.7", image: "/18.webp" },
  { id: 15, name: "Sahara Dunes of Douz", location: "Douz", country: "Tunisia", rating: "4.8", image: "/19.webp" },
  { id: 16, name: "Pyramids of Giza", location: "Cairo", country: "Egypt", rating: "4.9", image: "/3.jfif" },
  { id: 17, name: "Karnak Temple", location: "Luxor", country: "Egypt", rating: "4.9", image: "/20.webp" },
  { id: 18, name: "Abu Simbel Temples", location: "Aswan", country: "Egypt", rating: "4.9", image: "/21.webp" },
  { id: 19, name: "White Desert", location: "Farafra", country: "Egypt", rating: "4.8", image: "/22.webp" },
  { id: 20, name: "Siwa Oasis", location: "Siwa", country: "Egypt", rating: "4.7", image: "/23.webp" },
  { id: 21, name: "Leptis Magna", location: "Khoms", country: "Libya", rating: "4.9", image: "/24.webp" },
  { id: 22, name: "Cyrene Ruins", location: "Shahat", country: "Libya", rating: "4.7", image: "/25.webp" },
  { id: 23, name: "Ghadames Old Town", location: "Ghadames", country: "Libya", rating: "4.8", image: "/26.webp" },
  { id: 24, name: "Acacus Mountains", location: "Ghat", country: "Libya", rating: "4.9", image: "/27.webp" },
  { id: 25, name: "Arch of Marcus Aurelius", location: "Tripoli", country: "Libya", rating: "4.5", image: "/28.webp" },
  { id: 26, name: "Chinguetti Mosque", location: "Chinguetti", country: "Mauritania", rating: "4.6", image: "/29.webp" },
  { id: 27, name: "Banc d'Arguin", location: "Nouamghar", country: "Mauritania", rating: "4.7", image: "/30.webp" },
  { id: 28, name: "Eye of the Sahara", location: "Ouadane", country: "Mauritania", rating: "4.8", image: "/31.webp" },
  { id: 29, name: "Ouadane Old Town", location: "Ouadane", country: "Mauritania", rating: "4.5", image: "/32.webp" },
  { id: 30, name: "Terjit Oasis", location: "Atar", country: "Mauritania", rating: "4.8", image: "/33.webp" }
];

function Ai() {
  const location = useLocation(); // NEW: captures router state hooks

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [formData, setFormData] = useState({
    budget: "Smart",
    vibes: [],
    duration: "1 Week",
    group: "Solo",
    rating: 3,
    country: "Morocco",
    period: "Spring (Mar - May)",
    transport: "Rental Car",
    activities: [],
  });

  // NEW: Catch incoming travel data from profile page
  useEffect(() => {
    if (location.state && location.state.autoOpen) {
      const incomingMeta = location.state.formDataSettings;
      
      // If profile sends form meta details, sync them to recreate accurate costs
      if (incomingMeta) {
        setFormData(incomingMeta);
      } else {
        // Fallback or static mapping if profiles only target country names
        setFormData(prev => ({
          ...prev,
          country: location.state.planData.country || "Morocco",
          duration: location.state.planData.duration || "1 Week",
          group: location.state.planData.type || "Solo"
        }));
      }
      
      setIsSaved(true);       // Since they loaded it from their saved profile items
      setShowResult(true);    // Open the generated itinerary screen instantly
    }
  }, [location]);

  const totalSteps = 10;

  const budgetOptions = [
    { label: "Smart", desc: "Authentic, well-priced", value: "Smart", price: "$ - ~$80/day" },
    { label: "Comfort", desc: "Premium boutique", value: "Comfort", price: "$$ - ~$160/day" },
    { label: "Luxury", desc: "5-star riads & lodges", value: "Luxury", price: "$$$ - $320+/day" },
  ];

  const vibeOptions = ["Beach", "Mountains", "Desert", "Historical", "Adventure", "Cultural", "Food", "Luxury"];

  const durationOptions = [
    { label: "Day trip", detail: "1 day", value: 1 },
    { label: "Weekend", detail: "3 days", value: 3 },
    { label: "1 Week", detail: "7 days", value: 7 },
    { label: "2 Weeks", detail: "14 days", value: 14 },
    { label: "3 Weeks", detail: "21 days", value: 21 },
  ];

  const groupOptions = ["Solo", "Couple", "Family", "Friends"];
  const countryOptions = ["Morocco", "Algeria", "Tunisia", "Egypt", "Libya", "Mauritania"];
  const periodOptions = ["Spring (Mar - May)", "Summer (Jun - Aug)", "Autumn (Sep - Nov)", "Winter (Dec - Feb)"];
  const transportOptions = ["Public Transport", "Rental Car", "Private Driver", "Domestic Flights"];
  const activityOptions = ["Hiking", "Camel trek", "Surfing", "Cooking class", "Sandboarding", "Diving", "Souk shopping", "Museums"];

  const handleSingleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => {
      const currentList = prev[field];
      const newList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];
      return { ...prev, [field]: newList };
    });
  };

  const nextStep = () => currentStep < totalSteps && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

const handleGenerate = async () => {
  const storedUser = localStorage.getItem("userData");
  if (!storedUser) {
    alert("You must be logged in to generate and save a trip!");
    return;
  }

  const userObj = JSON.parse(storedUser);
  const userId = userObj?.id;

  if (!userId) {
      alert("User verification key is invalid. Please log in again.");
      return;
    }
    
  // 1. Get the chosen country safely, defaulting to "Morocco" if it's missing
  const selectedCountry = formData?.country || "Morocco";

  // 2. SAFE LOOKUP: Use optional chaining (?.) and a fallback value
  const matchedDestination = destinationData?.find(
    (dest) => dest.country.trim().toLowerCase() === selectedCountry.trim().toLowerCase()
  );

  // If it finds a match, use its image. If not, safely fall back to "/1.jfif"
  const dynamicTripImage = matchedDestination ? matchedDestination.image : "/1.jfif";

  setIsLoading(true);

  const tripPayload = {
    user_id: userId,
    title: formData?.duration ? `${formData.duration} Trip` : "My AI Trip",
    country: selectedCountry,
    duration: formData?.duration || "Custom",
    budget: formData?.budget || "Standard",
    group: formData?.group || "Solo",
    vibes: JSON.stringify(formData?.vibes || []),
    activities: JSON.stringify(formData?.activities || []),
    rating: Number(formData?.rating || 5),
    period: formData?.period || "Anytime",
    transport: formData?.transport || "Public",
    image: dynamicTripImage 
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(tripPayload),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("SUCCESS! Row written to database:", data);
      setIsSaved(true);
    } else {
      console.error("Laravel rejected the save request:", data);
      alert("Validation failed on backend: " + JSON.stringify(data.message || data));
    }
  } catch (error) {
    console.error("Network crash connecting to API:", error);
    alert("Could not talk to backend.");
  } finally {
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 3500);
  }
};


  const activeDest = destinationDatabase[formData.country] || destinationDatabase["Morocco"];
  const currentDurationObj = durationOptions.find(d => d.label === formData.duration) || { value: 7 };
  const totalDays = currentDurationObj.value;

  const budgetTier = budgetOptions.find(b => b.value === formData.budget) || { label: "Smart" };
  const baseMultiplier = budgetTier.label === "Smart" ? 1 : budgetTier.label === "Comfort" ? 2 : 4;
  
  const costBreakdown = {
    accommodation: 560 * baseMultiplier,
    food: 245 * baseMultiplier,
    transport: 595 * baseMultiplier,
    activities: 350 * baseMultiplier
  };
  const totalCost = costBreakdown.accommodation + costBreakdown.food + costBreakdown.transport + costBreakdown.activities;


  if (isLoading) {
    return (
      <div className="ai-loading-container">
        <div className="loader-box">
          <div className="spinner"></div>
          <h2>Assembling Your Perfect Journey</h2>
          <p>Our AI is crafting custom sequencing across maps, authentic accommodations, transportation routes, and curated local gems...</p>
          <div className="loading-status-bar">
            <div className="loading-status-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="dashboard-view-wrapper">
        {toastMessage && <div className="app-toast-alert">{toastMessage}</div>}

        <div className="dashboard-meta-section">
          <h1 className="dash-main-title">{totalDays}-day journey through {activeDest.city}</h1>
          <div className="dash-breadcrumbs-row">
            <span>{activeDest.city}, {formData.country}</span>
            <span className="dash-dot">·</span>
            <span>{totalDays} days</span>
            <span className="dash-dot">·</span>
            <span>{formData.group}</span>
            <span className="dash-dot">·</span>
            <span>${costBreakdown.accommodation}</span>
          </div>

          <div className="dash-actions-toolbar no-print">
            <button className={`toolbar-btn ${isSaved ? "saved" : ""}`} onClick={() => { setIsSaved(!isSaved); triggerToast(isSaved ? "Trip removed from saved!" : "✓ Trip saved to your account!"); }}>
              <FiHeart className={isSaved ? "filled" : ""} />
              <span>{isSaved ? "Saved" : "Save trip"}</span>
            </button>
            <button className="toolbar-btn" onClick={() => { navigator.clipboard.writeText(window.location.href); triggerToast("✓ Link copied to clipboard!"); }}>
              <FiShare2 />
              <span>Share</span>
            </button>
            <button className="toolbar-btn" onClick={() => window.print()}>
              <FiPrinter />
              <span>Print</span>
            </button>
          </div>
        </div>

        <div className="dashboard-content-grid">
          
          <div className="left-stream-panel">
            
            <div className="panel-card-widget">
              <h2 className="widget-card-heading"><FiSun className="head-icon" /> Daily schedule</h2>
              
              <div className="daily-schedule-timeline-list">
                {Array.from({ length: totalDays }).map((_, idx) => {
                  const dayText = activeDest.days[idx % activeDest.days.length];
                  return (
                    <div key={idx} className="timeline-day-row-item">
                      <div className="timeline-day-header">
                        <div className="timeline-day-badge">{String(idx + 1).padStart(2, '0')}</div>
                        <span className="timeline-day-title">Day {idx + 1}</span>
                      </div>
                      
                      <div className="timeline-day-capsules-row">
                        <div className="time-capsule-box">
                          <span className="capsule-label"><FiSun /> MORNING</span>
                          <p className="capsule-content">{dayText.morning}</p>
                        </div>
                        <div className="time-capsule-box">
                          <span className="capsule-label"><FiCompass /> AFTERNOON</span>
                          <p className="capsule-content">{dayText.afternoon}</p>
                        </div>
                        <div className="time-capsule-box">
                          <span className="capsule-label"><FiMoon /> EVENING</span>
                          <p className="capsule-content">{dayText.evening}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="panel-card-widget">
              <h2 className="widget-card-heading"><FiBriefcase className="head-icon" /> Recommended hotels</h2>
              <div className="hotels-horizontal-grid">
                {activeDest.hotels.map((hotel, index) => (
                  <div key={index} className="sub-hotel-card">
                    <span className="sub-card-tag">{hotel.area}</span>
                    <h3 className="sub-card-title">{hotel.name}</h3>
                    <div className="sub-card-stars">
                      {Array.from({ length: hotel.stars }).map((_, sIdx) => <span key={sIdx}>★</span>)}
                    </div>
                    <span className="sub-card-price">${hotel.price}/night</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-card-widget">
              <h2 className="widget-card-heading"><FiCompass className="head-icon" /> Recommended restaurants</h2>
              <div className="restaurants-double-grid">
                {activeDest.restaurants.map((rest, index) => (
                  <div key={index} className="sub-restaurant-item-row">
                    <div className="rest-info-left">
                      <h4>{rest.name}</h4>
                      <span>{rest.type}</span>
                    </div>
                    <span className="rest-cost-indicator">{rest.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-card-widget">
              <h2 className="widget-card-heading"><FiBriefcase className="head-icon" /> Transportation plan</h2>
              <div className="transport-plan-list">
                <div className="transport-item-line">
                  <div className="trans-desc-left"><h4>Airport ➔ Hotel</h4><span>Private transfer</span></div>
                  <span className="trans-price-right">${Math.round(35 * baseMultiplier)}</span>
                </div>
                <div className="transport-item-line">
                  <div className="trans-desc-left"><h4>City tours</h4><span>Local guide + driver</span></div>
                  <span className="trans-price-right">${Math.round(420 * baseMultiplier)}</span>
                </div>
                <div className="transport-item-line">
                  <div className="trans-desc-left"><h4>Day excursion</h4><span>4x4 desert transit</span></div>
                  <span className="trans-price-right">${Math.round(140 * baseMultiplier)}</span>
                </div>
              </div>
            </div>

            <div className="panel-card-widget">
              <h2 className="widget-card-heading"><FiMapPin className="head-icon" /> Map</h2>
              <div className="dashed-map-placeholder-box">
                <span>Interactive map — coming next release</span>
              </div>
            </div>

          </div>

          <div className="right-sidebar-panel">
            
            <div className="panel-card-widget">
              <h2 className="widget-card-heading"><FiCompass className="head-icon" /> Estimated costs</h2>
              <div className="donut-chart-flex-container">
                <div className="css-donut-chart-graphic">
                  <div className="donut-inner-cutout"></div>
                </div>
              </div>
              <table className="costs-breakdown-table">
                <tbody>
                  <tr>
                    <td><span className="bullet-indicator color-1">●</span> Accommodation</td>
                    <td className="cost-val-bold">${costBreakdown.accommodation}</td>
                  </tr>
                  <tr>
                    <td><span className="bullet-indicator color-2">●</span> Food & drinks</td>
                    <td className="cost-val-bold">${costBreakdown.food}</td>
                  </tr>
                  <tr>
                    <td><span className="bullet-indicator color-3">●</span> Transport</td>
                    <td className="cost-val-bold">${costBreakdown.transport}</td>
                  </tr>
                  <tr>
                    <td><span className="bullet-indicator color-4">●</span> Activities</td>
                    <td className="cost-val-bold">${costBreakdown.activities}</td>
                  </tr>
                  <tr className="total-master-row">
                    <td>Total</td>
                    <td className="total-gold-price">${totalCost}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="panel-card-widget">
              <h2 className="widget-card-heading"><FiSun className="head-icon" /> Weather</h2>
              <div className="weather-forecast-days-row">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, idx) => (
                  <div key={idx} className="weather-forecast-node-item">
                    <span className="forecast-day-lbl">{day}</span>
                    <FiSun className="forecast-sun-icon" />
                    <span className="forecast-temp-val">{24 + idx}°</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-card-widget">
              <h2 className="widget-card-heading"><FiClock className="head-icon" /> Local tips</h2>
              <ul className="sidebar-bullet-list">
                <li>Carry small denominations for souks and tipping.</li>
                <li>The best light for photography is 30 minutes before sunset.</li>
                <li>Many shops close on Friday afternoons.</li>
              </ul>
            </div>

            <div className="panel-card-widget">
              <h2 className="widget-card-heading"><FiUsers className="head-icon" /> Cultural tips</h2>
              <ul className="sidebar-bullet-list">
                <li>Greet with 'Salam alaykum' — it goes a long way.</li>
                <li>Ask before photographing people, especially in markets.</li>
                <li>During Ramadan, eat and drink discreetly during daylight.</li>
              </ul>
            </div>

            <div className="panel-card-widget">
              <h2 className="widget-card-heading"><FiBriefcase className="head-icon" /> Safety tips</h2>
              <ul className="sidebar-bullet-list">
                <li>Use official red 'petit taxis' inside cities; insist on the meter.</li>
                <li>Drink bottled or filtered water; check seals carefully.</li>
                <li>Keep a digital copy of your passport in your email.</li>
              </ul>
            </div>

            <div className="dark-tweak-action-card no-print">
              <h3>Not quite right?</h3>
              <p>Regenerate with one tap, or tweak your preferences.</p>
              <div className="dark-card-buttons-flex">
                <button className="tweak-btn secondary" onClick={handleGenerate}>
                  <FiRotateCcw /> <span>Regenerate</span>
                </button>
                <button 
  className={`toolbar-btn ${isSaved ? "saved" : ""}`} 
  onClick={async () => { 
    const previousSavedStatus = isSaved;
    setIsSaved(!previousSavedStatus); 
    
    try {
      if (!previousSavedStatus) {
        // If favoriting/saving, send a POST request
        await fetch("http://127.0.0.1:8000/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: `${totalDays}-day journey through ${activeDest.city}`,
            country: formData.country,
            image: `https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=600`
          })
        });
        triggerToast("✓ Trip saved to your account!");
      } else {
        // Optional: Send a DELETE request if they untoggle it
        triggerToast("Trip removed from saved!");
      }
    } catch (error) {
      console.error("Error toggling favorite state:", error);
    }
  }}
>
  <FiHeart className={isSaved ? "filled" : ""} />
  <span>{isSaved ? "Saved" : "Save trip"}</span>
</button>

              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  
  return (
    <div className="ai-planner-wrapper">
      <div className="progress-header">
        <span className="step-counter">{String(currentStep).padStart(2, "0")} OF {totalSteps}</span>
        <span className="percent-counter">{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
      </div>

      <div className="wizard-card animate-fade-in">
        {currentStep === 1 && (
          <div>
            <h1 className="step-title">Tell us your budget</h1>
            <div className="options-grid grid-3">
              {budgetOptions.map((opt) => (
                <div key={opt.value} className={`selection-card ${formData.budget === opt.value ? "active" : ""}`} onClick={() => handleSingleSelect("budget", opt.value)}>
                  <FaWallet className="card-icon" />
                  <h3>{opt.label}</h3>
                  <p className="desc">{opt.desc}</p>
                  <p className="price-tag">{opt.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h1 className="step-title">Pick a vibe</h1>
            <div className="pills-container">
              {vibeOptions.map((vibe) => (
                <button key={vibe} className={`pill-btn ${formData.vibes.includes(vibe) ? "active" : ""}`} onClick={() => handleMultiSelect("vibes", vibe)}>
                  {vibe}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h1 className="step-title">How long?</h1>
            <div className="options-grid grid-3">
              {durationOptions.map((opt) => (
                <div key={opt.label} className={`selection-card ${formData.duration === opt.label ? "active" : ""}`} onClick={() => handleSingleSelect("duration", opt.label)}>
                  <FiCalendar className="card-icon" />
                  <h3>{opt.label}</h3>
                  <p className="desc">{opt.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h1 className="step-title">Who's coming?</h1>
            <div className="options-grid grid-4">
              {groupOptions.map((opt) => (
                <div key={opt} className={`selection-card ${formData.group === opt ? "active" : ""}`} onClick={() => handleSingleSelect("group", opt)}>
                  <FiUsers className="card-icon" />
                  <h3>{opt}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="center-content">
            <h1 className="step-title">Quality bar</h1>
            <div className="stars-wrapper">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`star ${formData.rating >= star ? "filled" : ""}`} onClick={() => handleSingleSelect("rating", star)}>★</span>
              ))}
            </div>
            <p className="quality-subtext">Only show places rated {formData.rating} stars and above.</p>
          </div>
        )}

        {currentStep === 6 && (
          <div>
            <h1 className="step-title">Pick a country</h1>
            <div className="options-grid grid-3">
              {countryOptions.map((country) => (
                <div key={country} className={`selection-card ${formData.country === country ? "active" : ""}`} onClick={() => handleSingleSelect("country", country)}>
                  <FiMapPin className="card-icon" />
                  <h3>{country}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div>
            <h1 className="step-title">When are you traveling?</h1>
            <div className="options-grid grid-2">
              {periodOptions.map((p) => (
                <div key={p} className={`selection-card ${formData.period === p ? "active" : ""}`} onClick={() => handleSingleSelect("period", p)}>
                  <FiClock className="card-icon" />
                  <h3>{p}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 8 && (
          <div>
            <h1 className="step-title">Preferred transport mode</h1>
            <div className="options-grid grid-2">
              {transportOptions.map((t) => (
                <div key={t} className={`selection-card ${formData.transport === t ? "active" : ""}`} onClick={() => handleSingleSelect("transport", t)}>
                  <FiBriefcase className="card-icon" />
                  <h3>{t}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 9 && (
          <div>
            <h1 className="step-title">Pick activities</h1>
            <div className="options-grid grid-3">
              {activityOptions.map((act) => (
                <div key={act} className={`selection-card compact ${formData.activities.includes(act) ? "active" : ""}`} onClick={() => handleMultiSelect("activities", act)}>
                  <FiCompass className="card-icon" />
                  <h3>{act}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 10 && (
          <div>
            <h1 className="step-title">Ready to Generate</h1>
            <div className="summary-block-container">
              <div className="summary-row">
                <div className="summary-item"><span className="sum-label">BUDGET</span><span className="sum-value">{formData.budget}</span></div>
                <div className="summary-item"><span className="sum-label">DURATION</span><span className="sum-value">{formData.duration}</span></div>
              </div>
              <div className="summary-row">
                <div className="summary-item"><span className="sum-label">GROUP</span><span className="sum-value">{formData.group}</span></div>
                <div className="summary-item"><span className="sum-label">COUNTRY</span><span className="sum-value">{formData.country}</span></div>
              </div>
            </div>

            <button className="generate-btn-action" onClick={handleGenerate}>
              <span>✨ Generate my trip</span>
              <FiArrowRight />
            </button>
          </div>
        )}

        {currentStep < 10 && (
          <div className="wizard-controls">
            <button className={`back-control ${currentStep === 1 ? "disabled" : ""}`} onClick={prevStep} disabled={currentStep === 1}>
              <FiArrowLeft /><span>Back</span>
            </button>
            <button className="next-control" onClick={nextStep}>
              <span>Next</span><FiArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ai;