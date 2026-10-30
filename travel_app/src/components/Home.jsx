import { useEffect, useState } from "react";
import "./Home.css";
import { FaGlobe, FaSearch, FaStar, FaMapMarkerAlt, FaArrowRight, FaMagic, FaMap, FaShieldAlt, FaWallet, FaCompass, FaHeart, FaQuoteLeft, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';


function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  


  const destinations = [
    {
      id: 1,
      country: "MOROCCO",
      rating: "4.9",
      title: "Chefchaouen",
      location: "Chefchaouen",
      image: "/1.jfif"
    },
    {
      id: 2,
      country: "ALGERIA",
      rating: "4.8",
      title: "Hoggar Mountains",
      location: "Tamanrasset",
      image: "/2.jfif"
    },
    {
      id: 3,
      country: "EGYPT",
      rating: "4.9",
      title: "Pyramids of Giza",
      location: "Cairo",
      image: "/3.jfif"
    }
  ];


  const topCities = [
    { id: 1, name: "Marrakech", trips: "1,284", image: "/4.jfif" },
    { id: 2, name: "Cairo", trips: "1,842", image: "/3.jfif" },
    { id: 3, name: "Tunis", trips: "642", image: "/5.jfif" },
    { id: 4, name: "Chefchaouen", trips: "521", image: "/1.jfif" },
    { id: 5, name: "Tamanrasset", trips: "184", image: "/2.jfif" },
    { id: 6, name: "Atar", trips: "92", image: "/6.jfif" }
  ];

  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = 'service_xsaqyf8';
    const templateId = 'template_4zc6bl8';
    const publicKey = 'IUhr_bp4A8DKg5lCz';

    const templateParams = {
      email: email,
    };
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        alert('Subscribed successfully! 🎉');
        setEmail('');
      })
      .catch((error) => {
        console.error('Subscription error:', error);
        alert('Subscription failed. Please try again later.');
      });
    };

  return (
    <div className="home">

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            DISCOVER
            <br />
            <span className="north-africa">
              NORTH AFRICA
            </span>
            <br />
            designed around you.
          </h1>

          <p>
            From the Sahara dunes to the Mediterranean coast —
            answer a few questions and we craft a complete,
            premium itinerary in seconds.
          </p>

          <div className="hero-search">

            <div className="search-input">
              <FaSearch />
              <input
                type="text"
                placeholder="Where do you want to go?"
              />
            </div>

            <button className="plan-btn" onClick={() => navigate('/Ai')}>
              Plan my trip
            </button>

          </div>

          <button className="explore-btn" onClick={() => navigate('/destinations')}>
            Explore destinations
          </button>

        </div>

        <div className="hero-stats">

          <div className="stat-card">
            <h2>12,480+</h2>
            <span>Travelers planned</span>
          </div>

          <div className="stat-card">
            <h2>320+</h2>
            <span>Curated destinations</span>
          </div>

          <div className="stat-card">
            <h2>84,200</h2>
            <span>AI itineraries built</span>
          </div>

          <div className="stat-card">
            <h2>49/50</h2>
            <span>Average rating</span>
          </div>

        </div>
      </section>

        {/* POPULAR DESTINATIONS SECTION */}
      <section className="popular-destinations">
        <div className="section-header">
          <span className="country-count-badge">6 COUNTRIES</span>
          <h2>Popular destinations</h2>
          <p>Hand-picked across the Maghreb and the Nile.</p>
        </div>

        <div className="destinations-grid">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="destination-card"
              style={{ backgroundImage: `url(${dest.image})` }}
            >
              {/* Gradient Overlay for text readability */}
              <div className="card-overlay"></div>

              <div className="card-top">
                <span className="country-badge">{dest.country}</span>
                <span className="rating-badge">
                  <FaStar className="star-icon" /> {dest.rating}
                </span>
              </div>

              <div className="card-bottom">
                <h3>{dest.title}</h3>
                <div className="location">
                  <FaMapMarkerAlt className="pin-icon" />
                  <span>{dest.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-container">
          <a href="/destinations" className="view-all-btn">
            View all <FaArrowRight className="arrow-icon" />
          </a>
        </div>

      </section>


      <section className="how-it-works">
        <div className="section-header-wrapper">
          <span className="steps-badge">3 STEPS</span>
          <h2>How it works</h2>
          <p>From idea to itinerary in under a minute.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Tell us about you</h3>
            <p>Budget, mood, dates, who you're traveling with.</p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>We design the trip</h3>
            <p>Our model assembles a complete day-by-day plan.</p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Refine & save</h3>
            <p>Tweak anything, save it, share it, book when you're ready.</p>
          </div>
        </div>
      </section>


      <section className="why-choose-us">
        <div className="section-header-wrapper">
          <span className="premium-badge">PREMIUM BY DEFAULT</span>
          <h2>Why travelers choose us</h2>
          <p>A premium, end-to-end planning experience.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-box">
              <FaMagic />
            </div>
            <h3>AI-crafted itineraries</h3>
            <p>Ten short questions, one perfectly sequenced trip — accommodation, food, transport, all of it.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <FaMap />
            </div>
            <h3>Six countries, one map</h3>
            <p>Curated coverage of Morocco, Algeria, Tunisia, Egypt, Libya and Mauritania.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <FaShieldAlt />
            </div>
            <h3>Local & cultural intelligence</h3>
            <p>Etiquette, prayer times, safe routes, dress codes — context that matters.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <FaWallet />
            </div>
            <h3>Budget-true planning</h3>
            <p>Real prices, transparent totals, no surprise add-ons.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <FaCompass />
            </div>
            <h3>Hidden gems included</h3>
            <p>Beyond the postcards — neighborhood cafés, viewpoints, artisan ateliers.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <FaHeart />
            </div>
            <h3>Save, share, refine</h3>
            <p>Bookmark trips, share with friends, regenerate until it's perfect.</p>
          </div>
        </div>
      </section>


      <section className="top-cities-section">
        <div className="section-header-wrapper">
          <span className="trending-badge">TRENDING</span>
          <h2>Top cities</h2>
        </div>

        <div className="cities-grid">
          {topCities.map((city) => (
            <div 
              key={city.id} 
              className="city-card"
              style={{ backgroundImage: `url(${city.image})` }}
            >
              <div className="city-overlay"></div>
              <div className="city-info">
                <h3>{city.name}</h3>
                <span>{city.trips} trips</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="testimonials-section">
        <div className="section-header-wrapper">
          <span className="rating-score-badge">4.9 / 5</span>
          <h2>Loved by modern travelers</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="quote-icon-box">
              <FaQuoteLeft />
            </div>
            <p className="testimonial-text">
              "The most thoughtful itinerary I've ever received. Every restaurant, every viewpoint — perfectly timed."
            </p>
            <div className="testimonial-divider"></div>
            <div className="author-info">
              <h4>Amélie R.</h4>
              <span>Photographer · Paris</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon-box">
              <FaQuoteLeft />
            </div>
            <p className="testimonial-text">
              "I planned a 10-day trip across Morocco in 4 minutes. The riads they chose were stunning."
            </p>
            <div className="testimonial-divider"></div>
            <div className="author-info">
              <h4>Yusuf K.</h4>
              <span>Architect · Istanbul</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon-box">
              <FaQuoteLeft />
            </div>
            <p className="testimonial-text">
              "Felt like a private travel concierge. The cultural tips alone were worth it."
            </p>
            <div className="testimonial-divider"></div>
            <div className="author-info">
              <h4>Sara M.</h4>
              <span>Founder · Cairo</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon-box">
              <FaQuoteLeft />
            </div>
            <p className="testimonial-text">
              "Saharaa nailed the balance between iconic sites and hidden gems. Five stars."
            </p>
            <div className="testimonial-divider"></div>
            <div className="author-info">
              <h4>James O.</h4>
              <span>Writer · London</span>
            </div>
          </div>
        </div>
      </section>


      <section className="cta-section">
        <div className="cta-banner">
          <h2>Your next chapter <span className="gold-highlight">begins</span> in North Africa.</h2>
          <p>Plan a personalized journey in seconds. No credit card required.</p>
          
          <div className="cta-actions">
            <Link to="/Ai" className="cta-btn-white">
              Plan my trip <FaArrowRight className="cta-arrow-icon" />
            </Link>

            <Link to="/destinations" className="cta-btn-outline">
              Explore destinations
            </Link>
            
            
          </div>
        </div>
      </section>


      <section className="newsletter-section">
        <div className="newsletter-container">
          <h2>Stay inspired</h2>
          <p>Monthly stories, deals and itineraries — no spam.</p>
          
          <form 
            className="newsletter-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input" 
              required 
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default Home;