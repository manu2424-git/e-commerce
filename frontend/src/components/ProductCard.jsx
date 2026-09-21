import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const money = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="view-product"><ArrowUpRight size={16} /></span>
        {product.stock === 0 && <span className="sold-out">Sold out</span>}
      </Link>
      <div className="product-copy">
        <div className="eyebrow">{product.category}</div>
        <Link to={`/products/${product._id}`}><h3>{product.name}</h3></Link>
        <p>{product.description}</p>
        <div className="product-meta"><strong>{money(product.price)}</strong><span className={product.stock < 5 ? "low-stock" : ""}>{product.stock ? `${product.stock} in stock` : "Unavailable"}</span></div>
        <button className="add-button" disabled={!product.stock} onClick={() => addToCart(product)}><ShoppingBag size={16} /> {product.stock ? "Add to bag" : "Out of stock"}</button>
      </div>
    </article>
  );
}