import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/api";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      toast.success("Logged out successfully!");
      window.location.href = "/login";
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

        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              style={{
                color: "white",
                background: "#ef4444",
                border: "none",
                padding: "0.5rem 1.2rem",
                borderRadius: "25px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
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
        )}
      </div>
    </nav>
  );
}

export default Navbar;
