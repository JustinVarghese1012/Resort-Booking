import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import Booking from "../models/booking.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@abc.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "W8z6Y4GLa9X/YRhmPmyxcBuAkJb3tXEW3lj0fIJx5GjdA6xzbIl6ywyA3E3VKPyXuQ3Mmw0dRoRjdTZi7BONiA==";

export const AdminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("Login successful!");
    return res.json({ message: "Login successful" });
  }

  console.log(" Login failed - credentials don't match");
  res.status(401).json({ message: "Invalid credentials" });
};

export const VerifyAuth = (req, res) => {
  res.json({
    authenticated: true,
    role: req.user.role,
  });
};

export const AdminLogout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    expires: new Date(0),
  });
  res.json({ message: "Logout successful" });
};

export const CreateBooking = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {
    // Parse dates - handle both string and Date formats
    const checkInDate = new Date(req.body.checkIn);
    const checkOutDate = new Date(req.body.checkOut);

    // Validate dates are valid
    if (isNaN(checkInDate.getTime())) {
      return res.status(400).json({
        message: "Invalid check-in date format",
      });
    }

    if (isNaN(checkOutDate.getTime())) {
      return res.status(400).json({
        message: "Invalid check-out date format",
      });
    }

    // Get today at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Set check-in date to midnight for fair comparison
    const checkInMidnight = new Date(checkInDate);
    checkInMidnight.setHours(0, 0, 0, 0);

    // Check if check-in is in the past (allow today)
    if (checkInMidnight < today) {
      return res.status(400).json({
        message: "Check-in date cannot be in the past",
      });
    }

    // Check if check-out is after check-in
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        message: "Check-out date must be after check-in date",
      });
    }

    // Create booking with the data
    const bookingData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: parseInt(req.body.guests),
      message: req.body.message || "",
    };

    console.log("Creating booking with data:", bookingData);

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({
      message: "Failed to create booking. Please try again.",
      error: error.message,
    });
  }
};

export const GetBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};
