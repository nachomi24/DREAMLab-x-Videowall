import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

const VideoWall = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [fechaActual, setFechaActual] = useState("");

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

    return () => clearInterval(interval);
  }, []);

  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
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

      <div className="grid grid-cols-8 flex-1 bg-gray-300">
        <div className="col-span-1 bg-gray-400">Columna 1</div>
        <div className="col-span-1 bg-gray-500">Columna 2</div>
        <div className="col-span-1 bg-gray-400">Columna 3</div>
        <div className="col-span-1 bg-gray-500">Columna 4</div>
        <div className="col-span-1 bg-gray-400">Columna 5</div>
        <div className="col-span-1 bg-gray-500">Columna 6</div>
        <div className="col-span-1 bg-gray-400">Columna 7</div>
        <div className="col-span-1 bg-gray-500">Columna 8</div>
      </div>
    </div>
  );
};

export default VideoWall;
