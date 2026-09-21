import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { apiError } from "../api";
import Alert from "../components/Alert";
import { useCart } from "../context/CartContext";

const money = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  useEffect(() => { api.get(`/products/${id}`).then(({ data }) => setProduct(data.product)).catch((err) => setError(apiError(err))); }, [id]);
  if (error) return <div className="page-center"><Alert>{error}</Alert></div>;
  if (!product) return <div className="page-center"><span className="loader" /></div>;
  return <div className="container detail-page"><Link to="/" className="back-link"><ArrowLeft size={16} /> Back to collection</Link><div className="detail-grid"><div className="detail-image-wrap"><img src={product.image} alt={product.name} /></div><div className="detail-copy"><div className="eyebrow">{product.category}</div><h1>{product.name}</h1><div className="detail-price">{money(product.price)}</div><p className="detail-description">{product.description}</p><div className="detail-rule" /><div className="stock-line"><span className={product.stock < 5 ? "low-stock" : ""}>{product.stock ? `${product.stock} available` : "Currently unavailable"}</span><span>Free delivery on orders over ₹5,000</span></div>{product.stock > 0 && <div className="buy-row"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}><Plus size={15} /></button></div><button className="button button-dark grow" onClick={() => { addToCart(product, quantity); navigate("/cart"); }}><ShoppingBag size={17} /> Add to bag</button></div>}<div className="detail-note"><strong>Made to last</strong><span>Each piece is selected for its materials, function, and ability to age beautifully.</span></div></div></div></div>;
}