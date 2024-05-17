import React, { useState } from 'react';
import './App.css';
import fotochat from './chatyipiti.png';
import apol from './apol.png';
import meta from './meta.png';


const imageUrls = [
  { src: fotochat, title: 'Chatyipiti', description: 'Descripción de Chatyipiti' },
  { src: apol, title: 'Apol', description: 'Descripción de Apol' },
  { src: meta, title: 'Meta', description: 'Descripción de Meta' },
];

const ImageCard = ({ imageUrl }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-inner">
        <div className="card-front">
          <img src={imageUrl.src} alt="Imagen" />
        </div>
        <div className="card-back">
          <h2>{imageUrl.title}</h2>
          <p>{imageUrl.description}</p>
          {/* <img src={imageUrl.qrCode} alt="Código QR" /> */}
        </div>
      </div>
    </div>
  );
};

const getRandomImageUrl = () => {
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
};

const VideoWall = () => {
  return (
    <div className="video-wall">
      {[...Array(8)].map((_, columnIndex) => (
        <div key={columnIndex} className="column">
          {[...Array(3)].map((_, cardIndex) => (
            <ImageCard key={cardIndex} imageUrl={getRandomImageUrl()} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default VideoWall;