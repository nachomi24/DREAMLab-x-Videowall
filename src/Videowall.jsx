import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import fotochat from "./chatyipiti.png";
import apol from "./apol.png";
import meta from "./meta.png";

const imageUrls = [
  {
    src: fotochat,
    title: "Chatyipiti",
    description: "Descripción de Chatyipiti",
  },
  { src: apol, title: "Apol", description: "Descripción de Apol" },
  { src: meta, title: "Meta", description: "Descripción de Meta" },
];

const VideoWall = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [fechaActual, setFechaActual] = useState("");
  const [flippedCards, setFlippedCards] = useState({});
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const fetchReservaciones = async () => {
      try {
        const response = await axios.get(
          "https://devspaceapi2.azurewebsites.net/api/info_reservaciones"
        );
        setReservaciones(response.data);
      } catch (error) {
        console.error("Error fetching reservaciones:", error);
      }
    };

    fetchReservaciones();

    const actualizarFecha = () => {
      const fecha = new Date();
      const diasSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const diaSemana = diasSemana[fecha.getDay()];
      const dia = fecha.getDate();
      const mes = meses[fecha.getMonth()];
      const año = fecha.getFullYear();
      const hora = fecha.getHours();
      const minutos = fecha.getMinutes().toString().padStart(2, "0");
      const ampm = hora >= 12 ? "PM" : "AM";
      const hora12 = hora % 12 || 12;

      setFechaActual({
        diaSemana,
        fecha: `${dia} de ${mes} de ${año}`,
        hora: `${hora12}:${minutos} ${ampm}`,
      });
    };

    actualizarFecha();
    const interval = setInterval(actualizarFecha, 1000); // Actualiza cada minuto

    setShuffledImages(
      [...Array(15)].map(
        () => imageUrls[Math.floor(Math.random() * imageUrls.length)]
      )
    );

    return () => clearInterval(interval);
  }, []);

  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const handleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderSwiper = (colIndex) => {
    const isEven = colIndex % 2 === 0;
    const direction = "vertical";

    return (
      <Swiper
        modules={[FreeMode, Autoplay]}
        direction={direction}
        slidesPerView={4}
        spaceBetween={10}
        loop={true}
        freeMode={true}
        speed={5000}
        autoplay={{
          delay: 2,
          disableOnInteraction: false,
          reverseDirection: isEven,
        }}
        className="mySwiper"
        style={{ height: "75vh" }}
      >
        {shuffledImages.map((imageUrl, index) => (
          <SwiperSlide key={index} className="swiper-slide-custom">
            <div
              className={`card ${
                flippedCards[index] ? "flipped" : ""
              } overflow-hidden`}
              onClick={() => handleFlip(index)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <img src={imageUrl.src} alt={imageUrl.title} />
                </div>
                <div className="card-back">
                  <h2>{imageUrl.title}</h2>
                  <p>{imageUrl.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-cols-8">
        <div className="col-span-7">
          <div className="bg-black overflow-hidden">
            <Swiper
              modules={[FreeMode, Autoplay]}
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
              freeMode={true}
              speed={7000}
              autoplay={{
                delay: 2,
                disableOnInteraction: false,
              }}
              className="mySwiper"
            >
              {reservaciones.map((reservacion, index) => {
                const textLength = reservacion.NombreEstudiante.length;
                const percentage = Math.min(textLength * 0.5, 100); // Porcentaje máximo de 100%
                const duration = Math.min(textLength * 0.25, 10); // Duración mínima de 10 segundos

                return (
                  <SwiperSlide key={index}>
                    <div className="reservation-card">
                      <p
                        className="student-name animated-text"
                        style={{
                          "--duration": `${duration}s`,
                          "--percentage": `${percentage}%`,
                        }}
                      >
                        {reservacion.NombreEstudiante}
                      </p>
                      <p className="room-name">{reservacion.NombreSala}</p>
                      <p className="time-range">
                        {convertirHora(reservacion.HoraInicio)} -{" "}
                        {convertirHora(reservacion.HoraFin)}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className="col-span-1 bg-black flex items-center justify-center relative">
          <div className="text-white text-center p-4 z-10">
            <p className="fecha-dia">{fechaActual.diaSemana}</p>
            <p className="fecha-fecha">{fechaActual.fecha}</p>
            <p className="fecha-hora">{fechaActual.hora}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 flex-1 background-gradient">
        {Array.from({ length: 7 }, (_, colIndex) => (
          <div className="col-span-1 overflow-hidden" key={colIndex}>
            {renderSwiper(colIndex + 1)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoWall;
