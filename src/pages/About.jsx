import { useEffect, useState } from "react";
import "../all_css/About.css";
import { useLanguage } from "../context/LanguageContext";

const BASE_URL = "http://localhost:4000";

export default function About() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage(); // 👈 will be "en" or "ta"

  useEffect(() => {
    fetch(`${BASE_URL}/aboutus/public/about_us`)
      .then((res) => res.json())
      .then((data) => {
        const published = data.filter((item) => item.publish === 1);
        setItems(published);

        if (published.length > 0) {
          setActive(published[0].id);
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
            {/* 👇 Show Tamil or English title */}
            {language === "ta" ? item.titleTa : item.titleEn}
          </button>
        ))}
      </aside>

      {/* Right Content */}
      <section className="about-content">
        {activeItem ? (
          <>
            <h1>{language === "ta" ? activeItem.titleTa : activeItem.titleEn}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  language === "ta" ? activeItem.descTa : activeItem.descEn,
              }}
            />
          </>
        ) : (
          <p>{language === "ta" ? "உள்ளடக்கம் இல்லை" : "No content available"}</p>
        )}
      </section>
    </div>
  );
}
