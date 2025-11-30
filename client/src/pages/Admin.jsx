import { useEffect, useState } from "react";
import axios from "../api/api";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    try {
      await axios.get("/verify");
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchBookings();
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/login", login);
      setIsLoggedIn(true);
      setLogin({ email: "", password: "" });
    } catch (error) {
      alert("Login failed – Wrong email/password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await axios.post("/logout");
    setIsLoggedIn(false);
  };

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-emerald-700">
        Checking authentication...
      </div>
    );
  }

  // login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md p-10 rounded-2xl bg-white/80 backdrop-blur-lg shadow-2xl border border-white/50 animate-fadeIn"
        >
          <h2 className="text-4xl font-extrabold text-center text-emerald-700 mb-6">
            Admin Login
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-lg rounded-lg shadow-lg transition active:scale-[0.98]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm text-gray-600 pt-2">
              Demo: admin@abc.com / admin123
            </p>
          </div>
        </form>
      </div>
    );
  }

  // admin dashboard
  return (
    <div className="min-h-screen bg-gray-50 py-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4">
        {/* header */}
        <div className="flex justify-between items-center mb-10 bg-white p-5 rounded-xl shadow-md border">
          <h1 className="text-3xl font-bold text-emerald-700">
            Bookings Overview
            <span className="text-gray-500 text-lg ml-2">
              ({bookings.length})
            </span>
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow transition"
          >
            Logout
          </button>
        </div>

        {/* booking */}
        {bookings.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No bookings yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-semibold text-emerald-700">
                  {booking.name}
                </h3>

                <p className="text-gray-600 text-sm mb-2">
                  {booking.email} • {booking.phone}
                </p>

                <div className="mt-3 space-y-1 text-gray-700">
                  <p>
                    <strong>Check-in:</strong>{" "}
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Check-out:</strong>{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Guests:</strong> {booking.guests}
                  </p>
                </div>

                {booking.message && (
                  <p className="mt-4 italic text-gray-700 bg-gray-100 p-3 rounded-lg border-l-4 border-emerald-500">
                    "{booking.message}"
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-4">
                  Booked on: {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
