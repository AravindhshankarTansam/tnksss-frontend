import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import "../all_css/Navbar.css";

// Define BASE_URL at the top (can move to a config file if needed)
const BASE_URL = "http://localhost:4000";

export default function Navbar() {
  const [fontSize, setFontSize] = useState(16);
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // State for welcome message fetched from API
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const handleFontIncrease = () => setFontSize((prev) => prev + 2);
  const handleFontDecrease = () =>
    setFontSize((prev) => Math.max(prev - 2, 10));
  const handleFontReset = () => setFontSize(16);

  // Fetch the latest published notification from API
  useEffect(() => {
    async function fetchWelcome() {
      try {
        // ✅ Use public endpoint to only get published notifications
        const url = `${BASE_URL}/slider/public/notification`;
        const res = await fetch(url);
        if (!res.ok) {
          console.error("Failed to fetch notifications");
          setWelcomeMessage("");
          return;
        }
        const data = await res.json();

        if (data.length > 0) {
          // ✅ Corrected bug: use data[0].textEn, not data.textEn
          const text =
            language === "ta" ? data[0].textTa || "" : data[0].textEn || "";
          setWelcomeMessage(text);
        } else {
          setWelcomeMessage("");
        }
      } catch (error) {
        console.error("Error fetching welcome message:", error);
        setWelcomeMessage("");
      }
    }
    fetchWelcome();
  }, [language]);

    const goToRegister = () => {
    navigate("/register");
  };


  return (
    <header style={{ fontSize: `${fontSize}px` }}>
      {/* Top bar */}
      <div className="top-bar">
        <div className="contact">📞 +91-9876543210</div>
        <marquee
          className="marquee"
          dangerouslySetInnerHTML={{ __html: welcomeMessage }}
        />
        <div className="top-controls">
          <div className="font-controls">
            <button onClick={handleFontIncrease}>A+</button>
            <button onClick={handleFontReset}>A</button>
            <button onClick={handleFontDecrease}>A-</button>
          </div>

          <div className="signupbtn">
            <button className="button" onClick={goToRegister}>sign up</button>
          </div>

          <div className="lang-toggle-wrapper">
            <label className="lang-switch">
              <input
                type="checkbox"
                checked={language === "ta"}
                onChange={toggleLanguage}
              />
              <span className="lang-slider">
                <span className="lang-label">
                  {language === "en" ? "அ" : "A"}
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Mobile nav header */}
      <div className="mobile-nav-header">
        <div className="logo">TNKSSS</div>
        <button
          className="hamburger-btn"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Main nav */}
      <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
        <div className="desktop-logo">TNKSSS</div>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setMenuOpen(false)}
        >
          {language === "ta" ? "முகப்பு" : "Home"}
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setMenuOpen(false)}
        >
          {language === "ta" ? "எங்களை பற்றி" : "About"}
        </NavLink>

        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setMenuOpen(false)}
        >
          {language === "ta" ? "புகைப்படங்கள்" : "Gallery"}
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setMenuOpen(false)}
        >
          {language === "ta" ? "தொடர்பு" : "Contact"}
        </NavLink>
      </nav>
    </header>
  );
}
