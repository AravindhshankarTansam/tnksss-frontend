// src/components/TestimonialSlider.jsx
import React, { useState, useEffect } from "react";
import "../../all_css/TestimonialSlider.css";

const testimonials = [
  {
    name: "Leslie Alexander",
    role: "Freelance React Developer",
    text: "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jacob Jones",
    role: "Digital Marketer",
    text: "Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Jenny Wilson",
    role: "Graphic Designer",
    text: "I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="testimonial-container">
      <h2 className="testimonial-title">What people say about us</h2>
      <div className="testimonial-card">
        <p className="testimonial-text">“{testimonials[current].text}”</p>
        <div className="testimonial-author">
          <img src={testimonials[current].image} alt={testimonials[current].name} />
          <div>
            <h4>{testimonials[current].name}</h4>
            <p>{testimonials[current].role}</p>
          </div>
        </div>
      </div>

      {/* dots navigation */}
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
