import Product from "../models/Product.js";

export async function listProducts(req, res) {
  const { search, category } = req.query;
  const filter = {};
  if (search) filter.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
  if (category && category !== "All") filter.category = category;
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json({ products });
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ product });
}

export async function createProduct(req, res) {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
}

export async function updateProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ product });
}

export async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ message: "Product deleted." });
}