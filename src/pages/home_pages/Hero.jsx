import React from "react";
import "../../all_css/Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">Made by Developers, for Developers</span>
        <h1 className="hero-title">
          Quality resources shared <br /> by the community
        </h1>
        <p className="hero-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Vehicula massa in enim luctus. Rutrum arcu.
        </p>
        <button className="hero-btn">
          Get access to 4,958 resources
        </button>
      </div>
    </section>
  );
}
