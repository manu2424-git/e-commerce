import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

const products = [
  { name: "Aero Wireless Headphones", description: "Immersive over-ear audio with adaptive noise cancellation and a 35-hour battery.", price: 12999, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80", stock: 18 },
  { name: "Terra Everyday Backpack", description: "A weather-resistant 22L daypack with a padded laptop sleeve and considered organization.", price: 4499, category: "Lifestyle", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80", stock: 32 },
  { name: "Orbit Smart Watch", description: "A bright AMOLED display, health tracking, and a full week of battery in a slim body.", price: 8999, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80", stock: 12 },
  { name: "Studio Mechanical Keyboard", description: "Tactile hot-swappable switches, warm backlight, and a compact aluminum frame.", price: 6799, category: "Desk", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80", stock: 24 },
  { name: "Lumen Desk Lamp", description: "A sculptural, dimmable lamp that brings soft, focused light to your workspace.", price: 3199, category: "Home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80", stock: 40 },
  { name: "Noma Ceramic Set", description: "Hand-finished stoneware cups designed for slow mornings and long conversations.", price: 2299, category: "Home", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80", stock: 26 }
];

await connectDB();
await User.deleteMany({});
await Product.deleteMany({});
await User.create({ name: "Store Admin", email: "admin@example.com", password: await bcrypt.hash("admin123", 12), role: "admin" });
await Product.insertMany(products);
console.log("Seed complete. Admin login: admin@example.com / admin123");
await mongoose.connection.close();