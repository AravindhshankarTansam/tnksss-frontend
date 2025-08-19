import { useEffect, useState } from "react";
import "../all_css/Gallery.css";
import { useLanguage } from "./../context/LanguageContext";
import { getGallery } from "../apiconfig/apiService";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const itemsPerPage = 16;

  useEffect(() => {
    async function fetchGallery() {
      try {
        const data = await getGallery();
        if (data.success && Array.isArray(data.data)) {
          const published = data.data.filter((item) => item.is_public === true);
          setItems(published);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
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
              <img
                src={item.image}
                alt={language === "en" ? item.title_en : item.title_ta}
              />
              <div className="overlay">
                <h3>{language === "en" ? item.title_en : item.title_ta}</h3>
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
