import jwt from "jsonwebtoken";
import User from "../models/User.js";

function tokenFor(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

export async function register(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  if (!name?.trim() || !email?.trim() || !password) return res.status(400).json({ message: "Name, email, and password are required." });
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: "Please enter a valid email address." });
  if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });
  if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match." });
  if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: "An account with that email already exists." });
  const user = await User.create({ name, email, password });
  res.status(201).json({ token: tokenFor(user), user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password || ""))) return res.status(401).json({ message: "Incorrect email or password." });
  res.json({ token: tokenFor(user), user: publicUser(user) });
}

export async function me(req, res) {
  res.json({ user: publicUser(req.user) });
}