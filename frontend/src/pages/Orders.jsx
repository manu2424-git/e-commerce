import { ArrowRight, PackageCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { apiError } from "../api";
import Alert from "../components/Alert";

const money = (value) => `₹${Number(value).toLocaleString("en-IN")}`;
const date = (value) => new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  useEffect(() => { api.get("/orders/my").then(({ data }) => setOrders(data.orders)).catch((err) => setError(apiError(err))); }, []);
  return <div className="container orders-page"><div className="page-heading"><div className="kicker dark">Your account</div><h1>Order history.</h1><p>Everything you have chosen, all in one place.</p></div>{location.state?.placed && <Alert type="success">Your order is confirmed. We’ll take it from here.</Alert>}{error && <Alert>{error}</Alert>}{!orders.length && !error ? <div className="empty-state"><div className="empty-icon"><PackageCheck /></div><h2>No orders yet.</h2><p>Your first considered purchase is just a few clicks away.</p><Link className="button button-dark" to="/">Explore the collection <ArrowRight size={17} /></Link></div> : <div className="orders-list">{orders.map((order) => <article className="order-card" key={order._id}><div className="order-top"><div><span className="eyebrow">Order #{order._id.slice(-8).toUpperCase()}</span><h3>{date(order.createdAt)}</h3></div><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span></div><div className="order-products">{order.items.map((item) => <div className="order-product" key={item.product}><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>Qty {item.quantity}</span></div><span>{money(item.price * item.quantity)}</span></div>)}</div><div className="order-bottom"><span>{order.paymentMethod}</span><strong>Total {money(order.totalAmount)}</strong></div></article>)}</div>}</div>;
}