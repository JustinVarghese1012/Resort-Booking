import React from "react";
import heroImage from "../assets/heroImage.jpg";

export default function Hero() {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Welcome to ABC Resort
        </h1>
        <p className="text-xl md:text-3xl mb-8">Escape to Paradise</p>
        <button 
          onClick={scrollToBooking}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl px-10 py-4 rounded-full shadow-lg transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}