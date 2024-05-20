// Card.js
import React, { useState } from "react";
import "./Card.css";

const Card = ({ image, onClick, isFlipped, isPaused }) => {
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
        <img src={image.src} alt={image.title} className="card-image" />
      </div>
      <div className="card-back">
        <h3 className="image-title">{image.title}</h3>
        <p className="image-description">{image.description}</p>
      </div>
    </div>
  );
};

export default Card;
