import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [fontSize, setFontSize] = useState(16);

  const handleFontIncrease = () => setFontSize((prev) => prev + 2);
  const handleFontDecrease = () => setFontSize((prev) => Math.max(prev - 2, 10));
  const handleFontReset = () => setFontSize(16);

  return (
    <header style={{ fontSize: `${fontSize}px` }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#333",
          color: "#fff",
          padding: "5px 10px",
        }}
      >
        {/* Left: Contact */}
        <div>📞 +91-9876543210</div>

        {/* Middle: Marquee */}
        <marquee style={{ flex: 1, margin: "0 10px" }}>
          Welcome to TNKSSS Website — Your trusted source for information!
        </marquee>

        {/* Right: Font controls */}
        <div style={{ display: "flex", gap: "5px" }}>
          <button onClick={handleFontIncrease}>A+</button>
          <button onClick={handleFontReset}>A</button>
          <button onClick={handleFontDecrease}>A-</button>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          background: "#eee",
        }}
      >
        {/* Left: Logo */}
        <div style={{ fontWeight: "bold", fontSize: "1.5em" }}>TNKSSS</div>

        {/* Right: Menu */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
