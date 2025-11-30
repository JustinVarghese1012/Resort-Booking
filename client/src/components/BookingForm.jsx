import React from "react";

export default function BookingForm({ formData, setFormData, handleSubmit, status }) {
  return (
    <section className="py-20 bg-emerald-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">Book Your Stay</h2>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-4 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-4 border rounded-lg"
            />

            <input
              type="tel"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="p-4 border rounded-lg"
            />

            <input
              type="number"
              placeholder="Guests"
              min="1"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="p-4 border rounded-lg"
            />

            <input
              type="date"
              placeholder="From"
              required
              value={formData.checkIn}
              onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
              className="p-4 border rounded-lg"
            />

            <input
              type="date"
              placeholder="To"
              required
              value={formData.checkOut}
              onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
              className="p-4 border rounded-lg"
            />
          </div>

          <textarea
            placeholder="Special Requests"
            rows="4"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-4 border rounded-lg mt-6"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg mt-6 text-xl font-semibold"
          >
            Submit Booking
          </button>

          {status && (
            <p className="text-center mt-4 text-lg font-medium">{status}</p>
          )}
        </form>
      </div>
    </section>
  );
}
