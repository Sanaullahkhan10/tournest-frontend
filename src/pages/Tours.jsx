import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllTours } from "../services/api";
import { MapPin, Star, Clock, Users } from "lucide-react";

function Tours() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tours"],
    queryFn: getAllTours,
  });

  const tours = data?.data?.data?.data || data?.data?.data || [];

  if (isLoading)
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
        <p style={{ color: "#f97316", fontSize: "1.5rem" }}>Loading tours...</p>
      </div>
    );

  if (isError)
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
        <p style={{ color: "red", fontSize: "1.5rem" }}>Error loading tours!</p>
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
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "800",
            marginBottom: "0.5rem",
            color: "white",
          }}
        >
          All Tours
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            marginBottom: "3rem",
          }}
        >
          {tours.length} amazing adventures waiting for you
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {tours.map((tour) => (
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
              <div
                style={{
                  background: "linear-gradient(135deg, #f97316, #0f3460)",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                }}
              >
                🏔️
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
                    <span style={{ color: "#6b7280" }}>
                      ({tour.ratingsQuantity})
                    </span>
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
                    flexWrap: "wrap",
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
                    ${tour.price}{" "}
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#9ca3af",
                        fontWeight: "400",
                      }}
                    >
                      per person
                    </span>
                  </span>
                  <Link
                    to={`/tours/${tour._id}`}
                    style={{
                      background: "linear-gradient(to right, #f97316, #ea580c)",
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
      </div>
    </div>
  );
}

export default Tours;
