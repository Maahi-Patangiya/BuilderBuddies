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
    appearance: "none" as const, // Removes the default browser arrow
  };

  return (
    <select
      onChange={(e) => {
        const lng = e.target.value;
        i18n.changeLanguage(lng);
        try {
          localStorage.setItem('lng', lng);
        } catch (e) {
          // ignore in non-browser environments
        }
      }}
      value={i18n.language}
      style={selectStyle}
    >
      <option value="en" style={{ color: "black" }}>English</option>
      <option value="bn" style={{ color: "black" }}>বাংলা</option>
      <option value="ta" style={{ color: "black" }}>தமிழ்</option>
      <option value="zh" style={{ color: "black" }}>中文</option>
    </select>
  );
}
