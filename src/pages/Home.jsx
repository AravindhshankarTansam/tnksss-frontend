// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { getSlider } from "../apiconfig/apiService";
import "./../all_css/Home.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useLanguage } from "./../context/LanguageContext";
import Hero from "./home_pages/Hero";
import StepsSection from "./home_pages/StepsSection";
import TestimonialSlider from "./home_pages/TestimonialSlider";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSlide, setModalSlide] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await getSlider();

        // ✅ Fix: API returns { success: true, data: [...] }
        const slidesArray = Array.isArray(res.data) ? res.data : res.data?.data;

        // ✅ Only include public slides
        const visibleSlides = (slidesArray || []).filter(
          (item) => item.is_public === true
        );

        setSlides(visibleSlides);
      } catch (error) {
        console.error("❌ Failed to fetch slider:", error.message);
      }
    };
    fetchSlides();
  }, []);

  // Auto move every 5 sec
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  // Manual navigation
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Center to current slide
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: currentIndex * slideWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  // Safe image url
  const getImageUrl = (slide) => {
    if (!slide.images || slide.images.length === 0) return "/fallback.jpg";
    return slide.images[0];
  };

  // Modal open
  const handleImgClick = (slide) => {
    setModalSlide(slide);
    setModalOpen(true);
  };

  // Modal close
  const closeModal = () => {
    setModalOpen(false);
    setModalSlide(null);
  };

  return (
    <div>
      <Hero />
      <div className="slider-container">
        {/* Slider */}
        {slides.length > 0 ? (
          <div className="slider" ref={sliderRef}>
            {slides.map((slide, idx) => (
              <div
                className="slide"
                key={idx}
                style={{ display: idx === currentIndex ? "block" : "none" }}
              >
                <img
                  src={getImageUrl(slide)}
                  alt={slide.title_en || "Slider image"}
                  onClick={() => handleImgClick(slide)}
                  style={{ cursor: "pointer" }}
                />

                {/* Caption overlay */}
                <div className="caption">
                  <h2>{language === "en" ? slide.title_en : slide.title_ta}</h2>
                  {slide.desc_en && (
                    <div
                      className="desc"
                      dangerouslySetInnerHTML={{
                        __html:
                          language === "en" ? slide.desc_en : slide.desc_ta,
                      }}
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Arrows */}
            <button className="arrow left-arrow" onClick={prevSlide}>
              <MdArrowBack size={30} />
            </button>
            <button className="arrow right-arrow" onClick={nextSlide}>
              <MdArrowForward size={30} />
            </button>
          </div>
        ) : (
          <h2>Currently NO slider Data...</h2>
        )}

        {/* Dots */}
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`dot${idx === currentIndex ? " active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>

        {/* Middle Sections */}
        <StepsSection />
        <TestimonialSlider />

        {/* Image Modal */}
        {modalOpen && modalSlide && (
          <div className="img-modal-overlay" onClick={closeModal}>
            <div
              className="img-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="modal-image-wrapper">
                <img
                  src={getImageUrl(modalSlide)}
                  alt={modalSlide.title_en || "Modal enlarged"}
                />
              </div>

              {/* Info */}
              <div className="modal-info">
                <h2>
                  {language === "en"
                    ? modalSlide.title_en
                    : modalSlide.title_ta}
                </h2>

                {/* Date */}
                {modalSlide.created_at && (
                  <p className="modal-date">
                    📅{" "}
                    {new Date(modalSlide.created_at).toLocaleDateString()}
                  </p>
                )}

                {/* Description */}
                {modalSlide.desc_en && (
                  <div
                    className="modal-desc"
                    dangerouslySetInnerHTML={{
                      __html:
                        language === "en"
                          ? modalSlide.desc_en
                          : modalSlide.desc_ta,
                    }}
                  />
                )}
              </div>

              {/* Close button */}
              <button
                className="img-modal-close"
                onClick={closeModal}
                title="Close"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
