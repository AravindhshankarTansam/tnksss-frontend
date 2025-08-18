import React from "react";
import "../all_css/ContactPage.css";

export default function ContactPage() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Left Content */}
        <div className="contact-left">
          <h2>
            It’s time to build <br /> something exciting!
          </h2>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis.
          </p>

          {/* Testimonial */}
          <div className="testimonial">
            <div className="stars">★★★★★</div>
            <p>
              You made it so simple. My new site is so much faster and easier to
              work with than my old site. I just choose the page, make the
              change and click save.
            </p>
            <div className="author">
              <img
                src="https://i.pravatar.cc/50"
                alt="Jenny Wilson"
                className="author-img"
              />
              <div>
                <h4>Jenny Wilson</h4>
                <span>Product Designer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="contact-right">
          <h3>Get a free quote</h3>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint.
          </p>
          <form>
            <label>Your name</label>
            <input type="text" placeholder="Enter your full name" />

            <label>Email address</label>
            <input type="email" placeholder="Enter your email" />

            <label>Project brief</label>
            <textarea placeholder="Enter your project brief"></textarea>

            <button type="submit">Get Free Quote</button>
          </form>
        </div>
      </div>
    </section>
  );
}
