"use client";
import { useState, useEffect } from "react";

export default function FavoriteButton({ name }: { name: string }) {
  const [fav, setFav] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const storageKey = `cafe-favorite-${name}`;
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      const savedFav = localStorage.getItem(storageKey) === 'true';
      setFav(savedFav);
    }
  }, [storageKey, isClient]);
  
  const toggleFavorite = () => {
    const newFav = !fav;
    setFav(newFav);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, String(newFav));
    }
  };

  if (!isClient) {
    return (
      <button
        disabled
        style={{
          padding: "10px 14px",
          borderRadius: "10px",
          border: "none",
          background: "#e9f1ee",
          color: "#00462A",
          fontWeight: 600,
          cursor: "not-allowed",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          opacity: 0.7,
          fontSize: "0.9rem"
        }}
      >
        <span style={{ fontSize: "1em" }}>☆</span>
        <span>즐겨찾기 추가</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleFavorite}
      style={{
        padding: "10px 14px",
        borderRadius: "10px",
        border: "none",
        background: fav ? "#00462A" : "#e9f1ee",
        color: fav ? "#fff" : "#00462A",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: fav ? "0 3px 8px rgba(0, 70, 42, 0.2)" : "none",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.9rem"
      }}
    >
      <span style={{ fontSize: "1em" }}>{fav ? "★" : "☆"}</span>
      <span>{fav ? "즐겨찾기됨" : "즐겨찾기 추가"}</span>
    </button>
  );
}
