import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 140 },
    description: { type: String, required: true, trim: true, maxlength: 1200 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);