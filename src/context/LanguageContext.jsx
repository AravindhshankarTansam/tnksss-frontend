import React, { createContext, useState, useContext } from "react";
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const toggleLanguage = () => setLanguage((prev) => (prev === "en" ? "ta" : "en"));
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
  
export function useLanguage() {
  return useContext(LanguageContext);
}
