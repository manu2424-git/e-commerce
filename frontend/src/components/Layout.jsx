import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Menu, Package, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function signOut() { logout(); setOpen(false); navigate("/"); }
  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link className="brand" to="/" onClick={() => setOpen(false)}>
            <span className="brand-mark">N</span><span>northstar<span className="brand-dot">.</span></span>
          </Link>
          <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          <nav className={open ? "main-nav open" : "main-nav"}>
            <NavLink to="/" end onClick={() => setOpen(false)}>Shop</NavLink>
            {user && <NavLink to="/orders" onClick={() => setOpen(false)}>My orders</NavLink>}
            {user?.role === "admin" && <NavLink to="/admin" onClick={() => setOpen(false)}>Admin</NavLink>}
          </nav>
          <div className="nav-actions">
            <Link className="icon-link" to="/cart" aria-label="Shopping cart"><ShoppingBag size={19} /><span className="cart-count">{count}</span></Link>
            {user ? <button className="user-menu" onClick={signOut} title="Log out"><span className="avatar">{user.name[0]}</span><span className="hide-mobile">Log out</span><LogOut size={16} /></button> : <Link className="login-link" to="/login"><UserRound size={17} /> Log in</Link>}
          </div>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div><Link className="brand footer-brand" to="/"><span className="brand-mark">N</span><span>northstar<span className="brand-dot">.</span></span></Link><p>Considered goods for everyday living.</p></div>
          <div><span className="footer-label">Explore</span><Link to="/">Shop all</Link><Link to="/cart">Your bag</Link></div>
          <div><span className="footer-label">Support</span><span>Delivery & returns</span><span>Contact us</span></div>
          <div><span className="footer-label">Stay in the know</span><p className="footer-note">New pieces, useful ideas, no noise.</p><div className="subscribe"><input placeholder="Your email" aria-label="Email address" /><button aria-label="Subscribe"><Search size={15} /></button></div></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Northstar Market</span><span>Built for better everyday.</span></div>
      </footer>
    </>
  );
}