import dotenv from "dotenv";
dotenv.config();

console.log("Testing environment variables:");
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("All env vars:", process.env);