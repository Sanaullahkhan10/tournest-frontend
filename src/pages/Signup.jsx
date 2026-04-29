import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await signup(form);
      toast.success("Account created! Welcome to TourNest!");
      navigate("/dashboard");
    } catch {
      toast.error("Error creating account!");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.9rem 1rem",
    background: "#0f0f1a",
    border: "1px solid #2d2d5e",
    borderRadius: "10px",
    color: "white",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
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
            Create Account
          </h2>
          <p style={{ color: "#9ca3af" }}>Start your adventure today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            {
              label: "Full Name",
              name: "name",
              type: "text",
              placeholder: "John Doe",
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              placeholder: "you@example.com",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              placeholder: "••••••••",
            },
            {
              label: "Confirm Password",
              name: "passwordConfirm",
              type: "password",
              placeholder: "••••••••",
            },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: "1.2rem" }}>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.9rem",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                placeholder={field.placeholder}
                style={inputStyle}
              />
            </div>
          ))}

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
              marginTop: "0.5rem",
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p
          style={{ textAlign: "center", marginTop: "1.5rem", color: "#9ca3af" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#f97316",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
