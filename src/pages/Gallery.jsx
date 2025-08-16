import { useEffect, useState } from "react";
import "../all_css/Gallery.css";
import { useLanguage } from "./../context/LanguageContext";

const BASE_URL = "http://localhost:4000";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const itemsPerPage = 16;

  useEffect(() => {
    fetch(`${BASE_URL}/gallery/public/gallery`)
      .then((res) => res.json())
      .then((data) => {
        const published = data.filter((item) => item.publish === 1);
        setItems(published);
      })
      .catch((err) => console.error("Error fetching gallery:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  // Pagination
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {currentItems.map((item) => (
          <div className="gallery-card" key={item.id}>
            <div className="image-wrapper">
              <img src={item.images[0]} alt={language === "en" ? item.titleEn : item.titleTa} />
              <div className="overlay">
                <h3>{language === "en" ? item.titleEn : item.titleTa}</h3>
              </div>
              <div className="date">
                {new Date(item.date).toLocaleDateString("en-GB")}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
