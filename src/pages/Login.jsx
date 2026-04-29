import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "linear-gradient(145deg, #1e1e3a, #16213e)",
          borderRadius: "20px",
          padding: "3rem",
          width: "100%",
          maxWidth: "420px",
          border: "1px solid #2d2d5e",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <MapPin color="#f97316" size={32} />
            <span
              style={{ fontSize: "1.8rem", fontWeight: "bold", color: "white" }}
            >
              TourNest
            </span>
          </div>
          <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: "700" }}>
            Welcome Back!
          </h2>
          <p style={{ color: "#9ca3af" }}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.9rem",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "0.9rem 1rem",
                background: "#0f0f1a",
                border: "1px solid #2d2d5e",
                borderRadius: "10px",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.9rem",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.9rem 1rem",
                background: "#0f0f1a",
                border: "1px solid #2d2d5e",
                borderRadius: "10px",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              background: loading
                ? "#6b7280"
                : "linear-gradient(to right, #f97316, #ea580c)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.3s",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p
          style={{ textAlign: "center", marginTop: "1.5rem", color: "#9ca3af" }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#f97316",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
