import { motion } from "framer-motion";
import "./Sponsor.css";

interface PlanProps {
  tier: string;
  price: string;
  description: string;
  features: string[];
  color: string;
  isPopular?: boolean;
}

const plans: PlanProps[] = [
  {
    tier: "Bronze",
    price: "$99",
    description: "Perfect for small supporters who want to make a difference.",
    features: ["Logo on website", "Social media mention", "Newsletter feature"],
    color: "#CD7F32", // Bronze color
    isPopular: false,
  },
  {
    tier: "Gold",
    price: "$599",
    description: "Ultimate package for maximum brand exposure and impact.",
    features: [
      "All Silver benefits",
      "Keynote mention",
      "Premium placement",
      "Custom collaboration",
    ],
    color: "#FFD700", // Gold color
    isPopular: false,
  },
  {
    tier: "Silver",
    price: "$299",
    description: "Great for growing businesses looking for more visibility.",
    features: [
      "All Bronze benefits",
      "Logo on merchandise",
      "Event booth space",
      "VIP access",
    ],
    color: "#C0C0C0", // Silver color
    isPopular: true,
  },
  
];

const SponsorCard = ({
  plan,
  index,
}: {
  plan: PlanProps;
  index: number;
}) => {
  const getRotation = () => {
    if (index === 0) return -8;
    if (index === 2) return 8;
    return 0;
  };

  const getZIndex = () => {
    if (index === 1) return 10;
    return 5;
  };

  // Determine text color based on background brightness
  const getTextColor = () => {
    // Silver and Gold are bright, so use dark text
    if (plan.tier === "Silver" || plan.tier === "Gold") {
      return "#1a1a1a";
    }
    return "#ffffff";
  };

  const textColor = getTextColor();

  return (
    <motion.div
      className="sponsor-card-wrapper"
      style={{
        "--rotation": `${getRotation()}deg`,
        "--z-index": getZIndex(),
      } as React.CSSProperties}
      whileHover="hover"
      initial="initial"
      animate="initial"
    >

      <motion.div
        className={`sponsor-card ${plan.isPopular ? "popular" : ""}`}
        style={{ backgroundColor: plan.color }}
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.05, zIndex: 20 },
        }}
        transition={{
          duration: 0.6,
          ease: "backInOut",
        }}
      >
        <div className="card-content" style={{ color: textColor }}>
          <div className="tier-header">
            <span
              className="tier-badge"
              style={{
                backgroundColor:
                  textColor === "#1a1a1a"
                    ? "rgba(0, 0, 0, 0.15)"
                    : "rgba(255, 255, 255, 0.25)",
                color: textColor,
              }}
            >
              {plan.tier}
            </span>
          </div>

          <motion.span
            className="price"
            style={{ color: textColor }}
            variants={{
              initial: { scale: 0.85 },
              hover: { scale: 1 },
            }}
            transition={{
              duration: 0.6,
              ease: "backInOut",
            }}
          >
            {plan.price}
            <span className="price-period">/Month</span>
          </motion.span>

          <p className="description" style={{ color: textColor }}>
            {plan.description}
          </p>

          <ul className="features-list">
            {plan.features.map((feature, i) => (
              <li
                key={i}
                className="feature-item"
                style={{ color: textColor }}
              >
                <svg
                  className="check-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={textColor}
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="sponsor-button"
          style={{
            backgroundColor: textColor === "#1a1a1a" ? "#1a1a1a" : "#ffffff",
            borderColor: textColor === "#1a1a1a" ? "#1a1a1a" : "#ffffff",
            color: textColor === "#1a1a1a" ? "#ffffff" : "#1a1a1a",
          }}
        >
          Become a Sponsor
        </button>

        <Background darkShapes={textColor === "#1a1a1a"} />
      </motion.div>
    </motion.div>
  );
};

const Background = ({ darkShapes }: { darkShapes: boolean }) => {
  const shapeColor = darkShapes ? "rgba(0, 0, 0, 0.15)" : "#262626";

  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="card-background"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.5 },
      }}
      transition={{
        duration: 0.6,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          initial: { scaleY: 1, y: 0 },
          hover: { scaleY: 0.5, y: -25 },
        }}
        transition={{
          duration: 0.6,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill={shapeColor}
      />
      <motion.ellipse
        variants={{
          initial: { scaleY: 1, y: 0 },
          hover: { scaleY: 2.25, y: -25 },
        }}
        transition={{
          duration: 0.6,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill={shapeColor}
      />
    </motion.svg>
  );
};

const Sponsor = () => {
  return (
    <section className="sponsor-section">
      <div className="sponsor-header">
        <h2 className="sponsor-title">Become a Sponsor</h2>
        <p className="sponsor-subtitle">
          Support our mission and get amazing visibility for your brand
        </p>
      </div>
      <div className="sponsor-cards-container">
        {plans.map((plan, index) => (
          <SponsorCard key={plan.tier} plan={plan} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Sponsor;