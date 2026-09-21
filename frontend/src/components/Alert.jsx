export default function Alert({ type = "error", children }) {
  return <div className={`alert ${type}`} role="alert">{children}</div>;
}