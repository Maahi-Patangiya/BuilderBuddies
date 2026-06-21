'use client';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  // This style object matches your dashboard button
  const selectStyle = {
    backgroundColor: "transparent",
    border: "2px solid white",
    borderRadius: "8px",
    color: "white",
    padding: "8px 14px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    appearance: "none", // Removes the default browser arrow
  };

  return (
    <select 
      onChange={(e) => i18n.changeLanguage(e.target.value)} 
      value={i18n.language}
      style={selectStyle}
    >
      <option value="en" style={{ color: "black" }}>🌐 English ✓</option>
      <option value="bn" style={{ color: "black" }}>Bengali</option>
      <option value="ta" style={{ color: "black" }}>Tamil</option>
      <option value="zh" style={{ color: "black" }}>Chinese</option>
    </select>
  );
}
