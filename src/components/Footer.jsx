import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <footer
      style={{
        background: "linear-gradient(to right, #1a1a2e, #16213e)",
        color: "white",
        padding: "3rem 2rem 1.5rem",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <MapPin color="#f97316" size={24} />
            <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
              TourNest
            </span>
          </div>
          <p style={{ color: "#9ca3af", maxWidth: "250px", lineHeight: "1.6" }}>
            Your gateway to the world's most breathtaking adventures.
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: "1rem", color: "#f97316" }}>Explore</h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link
              to="/tours"
              style={{ color: "#9ca3af", textDecoration: "none" }}
            >
              All Tours
            </Link>
            <Link
              to="/dashboard"
              style={{ color: "#9ca3af", textDecoration: "none" }}
            >
              Dashboard
            </Link>
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  style={{ color: "#9ca3af", textDecoration: "none" }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{ color: "#9ca3af", textDecoration: "none" }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "1rem", color: "#f97316" }}>Contact</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              color: "#9ca3af",
            }}
          >
            <span>📧 hello@tournest.com</span>
            <span>📞 +1 (555) 000-0000</span>
            <span>📍 Adventure Street, World</span>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #374151",
          color: "#6b7280",
        }}
      >
        © 2024 TourNest. All rights reserved. &nbsp;|&nbsp; Made with ❤️ by
        Sanaullah Khan
      </div>
    </footer>
  );
}

export default Footer;
