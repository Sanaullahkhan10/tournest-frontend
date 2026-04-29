import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMe, logout } from "../services/api";
import toast from "react-hot-toast";
import { MapPin, User, LogOut, Settings } from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMe()
      .then((res) => {
        setUser(res.data?.data?.data || res.data?.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out!");
      navigate("/login");
    } catch {
      toast.error("Error logging out!");
    }
  };

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f0f1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#f97316", fontSize: "1.5rem" }}>Loading...</p>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f1a",
        color: "white",
        padding: "3rem 2rem",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
            borderRadius: "20px",
            padding: "2.5rem",
            marginBottom: "2rem",
            border: "1px solid #2d2d5e",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div
              style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "800" }}>
                Welcome, {user?.name?.split(" ")[0] || "Adventurer"}! 👋
              </h1>
              <p style={{ margin: 0, color: "#9ca3af" }}>{user?.email}</p>
              <span
                style={{
                  background: "#f97316",
                  color: "white",
                  padding: "0.2rem 0.8rem",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  marginTop: "0.3rem",
                  display: "inline-block",
                }}
              >
                {user?.role}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(239,68,68,0.2)",
              color: "#ef4444",
              border: "1px solid #ef4444",
              padding: "0.7rem 1.5rem",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Quick Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {[
            {
              icon: <MapPin size={28} color="#f97316" />,
              title: "Explore Tours",
              desc: "Find your next adventure",
              link: "/tours",
            },
            {
              icon: <User size={28} color="#f97316" />,
              title: "My Profile",
              desc: "View and edit your profile",
              link: "/dashboard",
            },
            {
              icon: <Settings size={28} color="#f97316" />,
              title: "Settings",
              desc: "Manage your account",
              link: "/dashboard",
            },
          ].map((item, i) => (
            <Link key={i} to={item.link} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "linear-gradient(145deg, #1e1e3a, #16213e)",
                  borderRadius: "16px",
                  padding: "2rem",
                  border: "1px solid #2d2d5e",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {item.icon}
                <h3 style={{ color: "white", margin: "0.8rem 0 0.3rem" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#9ca3af", margin: 0, fontSize: "0.9rem" }}>
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* User Info */}
        <div
          style={{
            background: "linear-gradient(145deg, #1e1e3a, #16213e)",
            borderRadius: "16px",
            padding: "2rem",
            border: "1px solid #2d2d5e",
          }}
        >
          <h2 style={{ color: "#f97316", marginBottom: "1.5rem" }}>
            Account Details
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {[
              { label: "Full Name", value: user?.name },
              { label: "Email", value: user?.email },
              { label: "Role", value: user?.role },
              {
                label: "Member Since",
                value: user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                  background: "#0f0f1a",
                  borderRadius: "10px",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "#9ca3af" }}>{item.label}</span>
                <span
                  style={{
                    color: "white",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
