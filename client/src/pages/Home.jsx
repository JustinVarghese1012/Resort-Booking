import React, { useState } from "react";
import Hero from "../components/Hero";
import { FiHome, FiCompass, FiHeart } from "react-icons/fi";
import axios from "../api/api";
import BookingForm from "../components/BookingForm";
import Footer from "../components/Footer";
import { galleryImages } from "../constants/ConstantsData";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    checkIn: "",
    checkOut: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/bookings", formData);
      setStatus("Booking submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
        message: "",
      });
    } catch (error) {
      setStatus("Error submitting booking. Please try again.");
      console.error("Booking error:", error);
    }
  };

  return (
    <>
      {/* Hero */}
      <section>
        <Hero />
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-10 rounded-xl shadow-lg">
              <FiHome className="text-6xl text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">
                Luxury Accommodation
              </h3>
              <p>Elegant villas with ocean views</p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-lg">
              <FiCompass className="text-6xl text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">
                Adventure Activities
              </h3>
              <p>Scuba, hiking, kayaking & more</p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-lg">
              <FiHeart className="text-6xl text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Wellness & Spa</h3>
              <p>Yoga, meditation, and spa retreats</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="relative group overflow-hidden rounded-2xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold">{image.alt}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-section" >
        <BookingForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          status={status}
        />
      </section>

      <section>
        <Footer />
      </section>
    </>
  );
}