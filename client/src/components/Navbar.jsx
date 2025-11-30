import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenu, HiX, HiHome, HiShieldCheck, HiLogout } from "react-icons/hi";
import axios from "../api/api";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        await axios.get("/verify");
        if (isMounted) {
          setIsAdmin(true);
        }
      } catch (error) {
        if (isMounted) {
          setIsAdmin(false);
        }
        console.log("Error in checkauth", error);
      }
    };
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [location]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      setIsAdmin(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsAdmin(false);
      navigate("/");
    }
  };

  return (
    <nav className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-bold bg-linear-to-r from-white to-emerald-100 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            ABC Resort
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <HiHome className="text-xl" />
              <span>Home</span>
            </Link>
            
            {isAdmin ? (
              <>
                <Link 
                  to="/admin" 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <HiShieldCheck className="text-xl" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-linear-to-r from-red-600 to-red-700 px-6 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <HiLogout className="text-xl" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/admin" 
                className="bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-3">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <HiHome className="text-2xl" />
              <span className="text-lg">Home</span>
            </Link>
            
            {isAdmin ? (
              <>
                <Link 
                  to="/admin" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <HiShieldCheck className="text-2xl" />
                  <span className="text-lg">Admin</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 bg-linear-to-r from-red-600 to-red-700 px-4 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg"
                >
                  <HiLogout className="text-2xl" />
                  <span className="text-lg">Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/admin" 
                className="block w-full text-center bg-linear-to-r from-emerald-600 to-teal-600 px-4 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg text-lg"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}