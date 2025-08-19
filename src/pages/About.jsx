import { useEffect, useState } from "react";
import "../all_css/About.css";
import { useLanguage } from "../context/LanguageContext";
import API from "../apiconfig/api.config"; // 👈 use your api.config.js

export default function About() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage(); // "en" or "ta"

  useEffect(() => {
    fetch(API.ABOUTUS) // 👈 use correct API endpoint
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const published = data.data.filter((item) => item.is_public === true);
          setItems(published);

          if (published.length > 0) {
            setActive(published[0].id);
          }
        }
      })
      .catch((err) => console.error("Error fetching about us:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const activeItem = items.find((item) => item.id === active);

  return (
    <div className="about-container">
      {/* Left Menu */}
      <aside className="about-menu">
        {items.map((item) => (
          <button
            key={item.id}
            className={active === item.id ? "menu-item active" : "menu-item"}
            onClick={() => setActive(item.id)}
          >
            {/* 👇 Use correct field names */}
            {language === "ta" ? item.menu_title_ta : item.menu_title_en}
          </button>
        ))}
      </aside>

      {/* Right Content */}
      <section className="about-content">
        {activeItem ? (
          <>
            <h1>
              {language === "ta"
                ? activeItem.menu_title_ta
                : activeItem.menu_title_en}
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  language === "ta"
                    ? activeItem.desc_ta
                    : activeItem.desc_en,
              }}
            />
          </>
        ) : (
          <p>
            {language === "ta"
              ? "உள்ளடக்கம் இல்லை"
              : "No content available"}
          </p>
        )}
      </section>
    </div>
  );
}
