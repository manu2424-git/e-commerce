import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiError } from "../api";
import Alert from "../components/Alert";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) { e.preventDefault(); setBusy(true); setError(""); try { await login(form); navigate(location.state?.from || "/"); } catch (err) { setError(apiError(err)); } finally { setBusy(false); } }
  return <AuthShell title="Welcome back." text="Your next good thing is waiting."><form className="auth-form" onSubmit={submit}><Field icon={<Mail size={17} />} label="Email address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /><Field icon={<LockKeyhole size={17} />} label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />{error && <Alert>{error}</Alert>}<button className="button button-dark full" disabled={busy}>{busy ? "Signing in..." : <>Sign in <ArrowRight size={17} /></>}</button><p className="auth-switch">New to Northstar? <Link to="/register">Create an account</Link></p></form></AuthShell>;
}

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) { e.preventDefault(); setBusy(true); setError(""); try { await register(form); navigate("/"); } catch (err) { setError(apiError(err)); } finally { setBusy(false); } }
  return <AuthShell title="Make it yours." text="Create an account to save your bag and follow every order."><form className="auth-form" onSubmit={submit}><Field icon={<UserRound size={17} />} label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /><Field icon={<Mail size={17} />} label="Email address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /><Field icon={<LockKeyhole size={17} />} label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength="6" required /><Field icon={<LockKeyhole size={17} />} label="Confirm password" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} minLength="6" required />{error && <Alert>{error}</Alert>}<button className="button button-dark full" disabled={busy}>{busy ? "Creating account..." : <>Create account <ArrowRight size={17} /></>}</button><p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p></form></AuthShell>;
}

function Field({ icon, label, type = "text", ...props }) {
  const [visible, setVisible] = useState(false);
  const password = type === "password";
  return <label className="field"><span>{label}</span><div className="input-wrap">{icon}<input type={password && !visible ? "password" : "text"} {...props} />{password && <button type="button" className="password-toggle" onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={16} /> : <Eye size={16} />}</button>}</div></label>;
}

function AuthShell({ title, text, children }) {
  return <div className="auth-page"><div className="auth-aside"><div className="auth-aside-inner"><div className="kicker">Northstar market</div><h1>Good things,<br /><em>well chosen.</em></h1><p>Useful objects and considered design for everyday living.</p></div></div><div className="auth-panel"><Link className="brand auth-brand" to="/"><span className="brand-mark">N</span><span>northstar<span className="brand-dot">.</span></span></Link><div className="auth-content"><div className="kicker dark">Your account</div><h2>{title}</h2><p>{text}</p>{children}</div></div></div>;
}