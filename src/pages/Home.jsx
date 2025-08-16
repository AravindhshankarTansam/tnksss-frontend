// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { getSlider } from "../apiconfig/apiService";
import "./../all_css/Home.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useLanguage  } from "./../context/LanguageContext";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();
  // Modal states for enlarged image
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSlide, setModalSlide] = useState(null); // ✅ store full slide object

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getSlider();
        const visibleSlides = data.filter(
          (item) =>
            item.publicStatus === 1 ||
            item.publish === true ||
            item.publish === 1
        );
        setSlides(visibleSlides);
      } catch (error) {
        console.error("❌ Failed to fetch slider:", error.message);
      }
    };
    fetchSlides();
  }, []);

  // Auto move every 5 seconds
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
    if (!slide.images || !Array.isArray(slide.images) || slide.images.length === 0)
      return "/fallback.jpg";
    return slide.images[0];
  };

  // Handle image popup modal open
  const handleImgClick = (slide) => {
    setModalSlide(slide); // ✅ store slide details
    setModalOpen(true);
  };

  // Handle close modal
  const closeModal = () => {
    setModalOpen(false);
    setModalSlide(null);
  };

  return (
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
                alt={slide.titleEn || "Slider image"}
                onClick={() => handleImgClick(slide)} 
                style={{ cursor: "pointer" }}
              />

              {/* Caption overlay on hover */}
              <div className="caption">
                <h2>{language === "en" ? slide.titleEn : slide.titleTa}</h2>
                {slide.descEn && (
                  <div
                    className="desc"
                     dangerouslySetInnerHTML={{ __html: language === "en" ? slide.descEn : slide.descTa }}
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

{/* Image Modal with description + date */}
{modalOpen && modalSlide && (
  <div className="img-modal-overlay" onClick={closeModal}>
    <div
      className="img-modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ✅ Image centered */}
      <div className="modal-image-wrapper">
        <img
          src={getImageUrl(modalSlide)}
          alt={modalSlide.titleEn || "Modal enlarged"}
        />
      </div>

      {/* ✅ Info section */}
      <div className="modal-info">
        <h2>{language === "en" ? modalSlide.titleEn : modalSlide.titleTa}</h2>

        {/* Left aligned date */}
        {modalSlide.date && (
          <p className="modal-date">
            📅 {new Date(modalSlide.date).toLocaleDateString()}
          </p>
        )}

        {/* Description in justified alignment */}
        {modalSlide.descEn && (
          <div
            className="modal-desc"
            dangerouslySetInnerHTML={{ __html: language === "en" ? modalSlide.descEn : modalSlide.descTa }}
          />
        )}
      </div>

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
  );
}
