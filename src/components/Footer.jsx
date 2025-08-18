import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import "../all_css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      {/* Top row */}
      <div className="footer-top">
        {/* Logo */}
        <div className="footer-logo">
          <span className="logo-slash">/</span>TNKSSS <span className="logo-slash">/</span>
        </div>

        {/* Navigation */}
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Social Media */}
        <div className="footer-socials">
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
        <a href="#" aria-label="X (Twitter)">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
            >
            <path d="M18.244 2H21.5l-7.5 8.56L22 22h-6.557l-5.115-6.713L4.5 22H1.243l7.96-9.087L2 2h6.642l4.64 6.147L18.244 2z" />
            </svg>
        </a>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* Bottom row */}
      <div className="footer-bottom">
        <p>© Copyright {new Date().getFullYear()}, All Rights Reserved</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
