import express from "express";
import { body } from "express-validator";
import {
  AdminLogin,
  AdminLogout,
  VerifyAuth,
  CreateBooking,
  GetBookings,
} from "../controller/booking.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Auth Routes
router.post("/login", AdminLogin);
router.post("/logout", AdminLogout); 
router.get("/verify", auth, VerifyAuth);

// Booking Routes
router.post(
  "/bookings",
  [
    body("name", "Name is required").trim().notEmpty(),
    body("email", "Invalid email format").isEmail().normalizeEmail(),
    body("phone", "Phone number is required").trim().notEmpty(),
    body("checkIn", "Check-in date is required").notEmpty(),
    body("checkOut", "Check-out date is required").notEmpty(),
    body("guests", "Guests must be at least 1").isInt({ min: 1 }),
    body("message").optional().trim(),
  ],
  CreateBooking
);
router.get("/bookings", auth, GetBookings);

export default router;