import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "../services/api";
import { MapPin, Star, Clock, Users } from "lucide-react";

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: getAllTours,
  });

  const tours = data?.data?.data?.data || data?.data?.data || [];

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", color: "white" }}>
      {/* Hero Section */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          padding: "6rem 2rem",
          textAlign: "center",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
            fontWeight: "800",
            marginBottom: "1rem",
            background: "linear-gradient(to right, #f97316, #fb923c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.3",
            padding: "0.2rem 0",
          }}
        >
          Discover Your Next Adventure
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#9ca3af",
            marginBottom: "2rem",
            maxWidth: "600px",
            margin: "0 auto 2rem",
          }}
        >
          Explore breathtaking destinations with expert guides. Book your dream
          tour today!
        </p>
        <Link
          to="/tours"
          style={{
            background: "linear-gradient(to right, #f97316, #ea580c)",
            color: "white",
            padding: "1rem 2.5rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "1.1rem",
            display: "inline-block",
            marginTop: "1rem",
            boxShadow: "0 4px 20px rgba(249,115,22,0.4)",
          }}
        >
          Explore All Tours →
        </Link>
      </div>

      {/* Featured Tours */}
      <div
        style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "0.5rem",
            color: "white",
          }}
        >
          Featured Tours
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            marginBottom: "3rem",
          }}
        >
          Hand-picked adventures just for you
        </p>

        {isLoading ? (
          <p style={{ textAlign: "center", color: "#9ca3af" }}>
            Loading tours...
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {tours.slice(0, 6).map((tour) => (
              <div
                key={tour._id}
                style={{
                  background: "linear-gradient(145deg, #1e1e3a, #16213e)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #2d2d5e",
                  transition: "transform 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {/* Tour Image */}
                {/* Tour Image */}
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={`${import.meta.env.VITE_API_URL.replace("/api/v1", "")}/img/tours/${tour.imageCover}`}
                    alt={tour.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.background =
                        "linear-gradient(135deg, #f97316, #0f3460)";
                      e.target.parentElement.innerHTML =
                        "<div style='height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem'>🏔️</div>";
                    }}
                  />
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        background: "#f97316",
                        color: "white",
                        padding: "0.2rem 0.8rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                      }}
                    >
                      {tour.difficulty}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        color: "#fbbf24",
                      }}
                    >
                      <Star size={16} fill="#fbbf24" />
                      <span>{tour.ratingsAverage}</span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      marginBottom: "0.5rem",
                      color: "white",
                    }}
                  >
                    {tour.name}
                  </h3>
                  <p
                    style={{
                      color: "#9ca3af",
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {tour.summary}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginBottom: "1rem",
                      color: "#9ca3af",
                      fontSize: "0.85rem",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <Clock size={14} /> {tour.duration} days
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <Users size={14} /> {tour.maxGroupSize} people
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <MapPin size={14} /> {tour.startLocation?.description}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "800",
                        color: "#f97316",
                      }}
                    >
                      ${tour.price}
                    </span>
                    <Link
                      to={`/tours/${tour._id}`}
                      style={{
                        background:
                          "linear-gradient(to right, #f97316, #ea580c)",
                        color: "white",
                        padding: "0.5rem 1.2rem",
                        borderRadius: "25px",
                        textDecoration: "none",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                      }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            to="/tours"
            style={{
              border: "2px solid #f97316",
              color: "#f97316",
              padding: "0.8rem 2rem",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            View All Tours →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
