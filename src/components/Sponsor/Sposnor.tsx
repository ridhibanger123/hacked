import { motion } from "framer-motion";
import "./Sponsor.css";

interface PlanProps {
  tier: string;
  price: string;
  description: string;
  // features removed
  color: string;
  accentColor: string;
  isPopular?: boolean;
}

const plans: PlanProps[] = [
  {
    tier: "Gold",
    price: "₹50,000",
    description: "Step into the limelight as a Gold Sponsor, gaining prominent exposure and valuable engagement opportunities.",
    color: "rgba(20, 28, 30, 0.95)", // Dark teal background
    accentColor: "#49e3fb", // Cyan accent from Hero
    isPopular: false,
  },
  {
    tier: "Title",
    price: "₹70,000",
    description: "Be the face of Hacked 4.0 as the Title Sponsor, enjoying top-tier benefits and the highest visibility.",
    color: "rgba(30, 25, 22, 0.9)", // Dark warm background
    accentColor: "#CD7F32", // Bronze accent
    isPopular: true,
  },
  {
    tier: "Silver",
    price: "₹30,000",
    description: "Make your mark as a Silver Sponsor, connecting with participants and audience in a meaningful way.",
    color: "rgba(20, 20, 30, 0.95)", // Dark cool background
    accentColor: "#b5a1e3", // Lavender accent from Hero
    isPopular: false,
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

  // All cards now have dark backgrounds, so use white text
  const textColor = "#ffffff";

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
        style={{
          backgroundColor: plan.color,
          borderColor: plan.accentColor,
          boxShadow: `0 0 0 1px ${plan.accentColor}20`
        }}
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
                backgroundColor: `${plan.accentColor}20`,
                color: plan.accentColor,
                borderColor: `${plan.accentColor}40`,
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
          </motion.span>

          <p className="description" style={{ color: textColor }}>
            {plan.description}
          </p>

          {/* Features list removed */}
        </div>

        <button
          className="sponsor-button"
          style={{
            backgroundColor: plan.accentColor,
            borderColor: plan.accentColor,
            color: "#1a1a1a",
          }}
        >
          Become a Sponsor
        </button>

        <Background />
      </motion.div>
    </motion.div>
  );
};

const Background = () => {
  const shapeColor = "rgba(255, 255, 255, 0.03)";

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
      </div>
      <div className="sponsor-cards-container">
        {plans.map((plan, index) => (
          <SponsorCard key={plan.tier} plan={plan} index={index} />
        ))}
      </div>

      <div className="brochure-section">
        {/* Anchor that triggers download of the sponsorship brochure placed in public/pdf */}
        <a
          className="brochure-button"
          href="/pdf/SPONSORSHIP%20HACKED%204.0.pdf"
          download="SPONSORSHIP HACKED 4.0.pdf"
          aria-label="Download Sponsorship Brochure"
          rel="noopener noreferrer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Sponsorship Brochure
        </a>
      </div>
    </section>
  );
};

export default Sponsor;