import React, { useState } from "react";
import "./Card.css";

const Card = ({ publicacion, onClick }) => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped(!flipped);
    onClick();
  };

  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      <div className="card-front">
        <img src={publicacion.imagen} alt={publicacion.titulo} className="card-image" />
      </div>
      <div className="card-back">
        <h3 className="image-title">{publicacion.titulo}</h3>
        <p className="image-author">{publicacion.autor}</p>
        <p className="image-description">{publicacion.descripcion}</p>
        <p className="image-date">{new Date(publicacion.fecha).toLocaleDateString()}</p>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${publicacion.liga}&size=100x100`}
          alt="QR Code"
          className="qr-code"
        />
      </div>
    </div>
  );
};

export default Card;