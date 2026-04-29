import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTour } from "../services/api";
import { MapPin, Star, Clock, Users, Calendar, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => getTour(id),
  });

  const tour = data?.data?.data?.data || data?.data?.data;
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
        <p style={{ color: "#f97316", fontSize: "1.5rem" }}>Loading tour...</p>
      </div>
    );

  if (isError || !tour)
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
        <p style={{ color: "red", fontSize: "1.5rem" }}>Tour not found!</p>
      </div>
    );

  const handleBook = () => {
    toast.success("Redirecting to booking...");
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", color: "white" }}>
      {/* Hero */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          padding: "4rem 2rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            background: "#f97316",
            color: "white",
            padding: "0.3rem 1rem",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: "600",
            textTransform: "uppercase",
            marginBottom: "1rem",
            display: "inline-block",
          }}
        >
          {tour.difficulty}
        </span>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            margin: "1rem 0",
            color: "white",
          }}
        >
          {tour.name}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            color: "#9ca3af",
          }}
        >
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Star size={18} fill="#fbbf24" color="#fbbf24" />{" "}
            {tour.ratingsAverage} ({tour.ratingsQuantity} reviews)
          </span>
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <MapPin size={18} color="#f97316" />{" "}
            {tour.startLocation?.description}
          </span>
        </div>
      </div>

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem" }}
      >
        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {[
            {
              icon: <Clock size={24} color="#f97316" />,
              label: "Duration",
              value: `${tour.duration} days`,
            },
            {
              icon: <Users size={24} color="#f97316" />,
              label: "Group Size",
              value: `${tour.maxGroupSize} people`,
            },
            {
              icon: <TrendingUp size={24} color="#f97316" />,
              label: "Difficulty",
              value: tour.difficulty,
            },
            {
              icon: <Calendar size={24} color="#f97316" />,
              label: "Next Date",
              value: tour.startDates?.[0]
                ? new Date(tour.startDates[0]).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "TBD",
            },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(145deg, #1e1e3a, #16213e)",
                borderRadius: "12px",
                padding: "1.5rem",
                border: "1px solid #2d2d5e",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {stat.icon}
              <div>
                <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: 0 }}>
                  {stat.label}
                </p>
                <p
                  style={{
                    color: "white",
                    fontWeight: "700",
                    margin: 0,
                    textTransform: "capitalize",
                  }}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div
          style={{
            background: "linear-gradient(145deg, #1e1e3a, #16213e)",
            borderRadius: "16px",
            padding: "2rem",
            border: "1px solid #2d2d5e",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ color: "#f97316", marginBottom: "1rem" }}>
            About This Tour
          </h2>
          <p style={{ color: "#9ca3af", lineHeight: "1.8", fontSize: "1rem" }}>
            {tour.description}
          </p>
        </div>

        {/* Locations */}
        {tour.locations?.length > 0 && (
          <div
            style={{
              background: "linear-gradient(145deg, #1e1e3a, #16213e)",
              borderRadius: "16px",
              padding: "2rem",
              border: "1px solid #2d2d5e",
              marginBottom: "2rem",
            }}
          >
            <h2 style={{ color: "#f97316", marginBottom: "1rem" }}>
              Tour Stops
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              {tour.locations.map((loc, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    color: "#9ca3af",
                  }}
                >
                  <MapPin size={18} color="#f97316" />
                  <span>
                    Day {loc.day} — {loc.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking CTA */}
        <div
          style={{
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            borderRadius: "16px",
            padding: "2.5rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "white", marginBottom: "0.5rem" }}>
            Ready for this Adventure?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>
            Book now for only{" "}
            <strong style={{ fontSize: "1.5rem" }}>${tour.price}</strong> per
            person
          </p>
          <button
            onClick={handleBook}
            style={{
              background: "white",
              color: "#f97316",
              border: "none",
              padding: "1rem 3rem",
              borderRadius: "50px",
              fontSize: "1.1rem",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            Book This Tour!
          </button>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;
