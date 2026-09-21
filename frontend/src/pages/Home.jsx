import { ArrowRight, ChevronDown, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api, { apiError } from "../api";
import Alert from "../components/Alert";
import ProductCard from "../components/ProductCard";

const categories = ["All", "Audio", "Desk", "Home", "Lifestyle", "Wearables"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/products", { params: { search, category } })
      .then(({ data }) => setProducts(data.products))
      .catch((err) => setError(apiError(err)))
      .finally(() => setLoading(false));
  }, [search, category]);

  const totalLabel = useMemo(() => `${products.length} ${products.length === 1 ? "piece" : "pieces"}`, [products.length]);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy"><div className="kicker"><Sparkles size={14} /> The everyday edit / 01</div><h1>Good things,<br /><em>well chosen.</em></h1><p>A collection of useful, beautiful objects for a life lived with intention. Find your next everyday essential.</p><a className="button button-light" href="#collection">Browse the collection <ArrowRight size={17} /></a></div>
          <div className="hero-art"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><img src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1100&q=85" alt="Minimal living room with a curated chair and lamp" /><div className="hero-stamp">MADE<br />FOR<br /><span>NOW</span></div></div>
        </div>
      </section>
      <section className="collection container" id="collection">
        <div className="section-heading"><div><div className="kicker dark">The collection</div><h2>Objects with a point of view.</h2></div><p>Thoughtful design, lasting materials, and the little details that make daily rituals better.</p></div>
        <div className="catalog-toolbar"><div className="search-box"><Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search the collection..." /></div><div className="category-tabs">{categories.map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="result-count">{totalLabel}</span></div>
        {error && <Alert>{error}</Alert>}
        {loading ? <div className="product-grid">{[1, 2, 3].map((item) => <div className="skeleton-card" key={item}><div className="skeleton skeleton-image" /><div className="skeleton skeleton-line" /><div className="skeleton skeleton-line short" /></div>)}</div> : products.length ? <div className="product-grid">{products.map((product) => <ProductCard product={product} key={product._id} />)}</div> : <div className="empty-state"><h3>No pieces found.</h3><p>Try a different search or category.</p><button className="button button-dark" onClick={() => { setSearch(""); setCategory("All"); }}>Reset filters</button></div>}
      </section>
    </>
  );
}