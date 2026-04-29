import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/api";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch {
      toast.error("Error logging out!");
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "linear-gradient(to right, #1a1a2e, #16213e)",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "white",
          textDecoration: "none",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        <MapPin color="#f97316" size={28} />
        TourNest
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link
          to="/tours"
          style={{ color: "white", textDecoration: "none", fontWeight: "500" }}
        >
          Explore Tours
        </Link>
        <Link
          to="/dashboard"
          style={{ color: "white", textDecoration: "none", fontWeight: "500" }}
        >
          Dashboard
        </Link>
        <Link
          to="/login"
          style={{
            color: "white",
            textDecoration: "none",
            background: "#f97316",
            padding: "0.5rem 1.2rem",
            borderRadius: "25px",
            fontWeight: "600",
          }}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
