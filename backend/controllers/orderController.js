import Order from "../models/Order.js";
import Product from "../models/Product.js";

const statuses = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

export async function createOrder(req, res) {
  const { items, shippingAddress, paymentMethod } = req.body;
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: "Your cart is empty." });
  const decremented = [];
  try {
    const savedItems = [];
    let totalAmount = 0;
    for (const item of items) {
      const quantity = Number(item.quantity);
      if (!Number.isInteger(quantity) || quantity < 1) throw Object.assign(new Error("One of the selected products is invalid."), { statusCode: 400 });
      const product = await Product.findOneAndUpdate(
        { _id: item.product, stock: { $gte: quantity } },
        { $inc: { stock: -quantity } },
        { new: true }
      );
      if (!product) {
        const requested = await Product.findById(item.product).select("name");
        throw Object.assign(new Error(requested ? `${requested.name} does not have enough stock.` : "One of the selected products is unavailable."), { statusCode: 400 });
      }
      decremented.push({ id: product._id, quantity });
      savedItems.push({ product: product._id, name: product.name, image: product.image, price: product.price, quantity });
      totalAmount += product.price * quantity;
    }
    const order = await Order.create({ user: req.user._id, items: savedItems, shippingAddress, paymentMethod: paymentMethod || "Cash on Delivery", totalAmount });
    res.status(201).json({ order });
  } catch (error) {
    await Promise.all(decremented.map(({ id, quantity }) => Product.findByIdAndUpdate(id, { $inc: { stock: quantity } })));
    throw error;
  }
}

export async function myOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ orders });
}

export async function getOrder(req, res) {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) return res.status(404).json({ message: "Order not found." });
  if (req.user.role !== "admin" && order.user._id.toString() !== req.user._id.toString()) return res.status(403).json({ message: "You cannot view this order." });
  res.json({ order });
}

export async function allOrders(req, res) {
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json({ orders });
}

export async function updateOrderStatus(req, res) {
  const { status } = req.body;
  if (!statuses.includes(status)) return res.status(400).json({ message: "Invalid order status." });
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate("user", "name email");
  if (!order) return res.status(404).json({ message: "Order not found." });
  res.json({ order });
}