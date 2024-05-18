/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 60s linear infinite', // Aumenta la duración para que sea más lenta
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' }, // Empieza fuera de la pantalla a la izquierda
          '100%': { transform: 'translateX(-50%)' }, // Termina fuera de la pantalla a la derecha
        },
      },
      colors: {
        primary: '#E7F1FF',
      },
      boxShadow: {
        custom: '0 0 10px 0 #E7F1FF',
      },
      width: {
        '15vw': '15vw',
      },
      height: {
        '20vh': '20vh',
      },
    },
  },
  variants: {
    extend: {
      fontSize: ['responsive'],
      margin: ['responsive'],
    },
  },
  plugins: [],
}