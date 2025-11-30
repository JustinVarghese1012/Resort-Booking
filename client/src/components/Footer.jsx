import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} - ABC Resort. All rights reserved.
        </p>
        <div className="flex justify-center space-x-8 mt-4 text-2xl">
          <a href="#" className="hover:text-emerald-300 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-emerald-300 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-emerald-300 transition">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}
