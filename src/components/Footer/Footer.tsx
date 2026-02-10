import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Globe,
  Calendar,
  Users,
  Code,
} from "lucide-react";
import "./Footer.css";

// ============ TextHoverEffect Component ============
interface TextHoverEffectProps {
  text: string;
  duration?: number;
  className?: string;
}

const TextHoverEffect: React.FC<TextHoverEffectProps> = ({
  text,
  duration,
  className = "",
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`text-hover-svg ${className}`}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="25%" stopColor="#00d4ff" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="75%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fbbf24" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="text-stroke-light"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="text-stroke-accent"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="text-gradient-mask"
      >
        {text}
      </text>
    </svg>
  );
};

// ============ FooterBackgroundGradient Component ============
const FooterBackgroundGradient: React.FC = () => {
  return <div className="footer-bg-gradient" />;
};

// ============ Main Footer Component ============
const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: "Event",
      links: [
        { label: "Schedule", href: "#schedule", icon: <Calendar size={14} /> },
        { label: "Tracks & Themes", href: "#tracks" },
        { label: "Prizes", href: "#prizes" },
        { label: "Judging Criteria", href: "#judging" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "FAQs", href: "#faq" },
        { label: "Code of Conduct", href: "#conduct" },
        {
          label: "Discord Server",
          href: "https://discord.gg/hacked4",
          pulse: true,
        },
        { label: "Sponsor Kit", href: "#sponsors" },
      ],
    },
    {
      title: "Participate",
      links: [
        { label: "Register Now", href: "#register", icon: <Users size={14} /> },
        { label: "Submit Project", href: "#submit", icon: <Code size={14} /> },
        { label: "Mentor Application", href: "#mentors" },
        { label: "Volunteer", href: "#volunteer" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="icon-accent" />,
      text: "hello@hacked4.dev",
      href: "mailto:hello@hacked4.dev",
    },
    {
      icon: <Phone size={18} className="icon-accent" />,
      text: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <MapPin size={18} className="icon-accent" />,
      text: "Virtual & In-Person",
    },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/hacked4" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "https://twitter.com/hacked4" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "https://instagram.com/hacked4" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://linkedin.com/company/hacked4" },
    { icon: <Globe size={20} />, label: "Website", href: "https://hacked4.dev" },
  ];

  return (
    <footer className="footer">
      {/* Background - lowest layer */}
      <FooterBackgroundGradient />

      {/* Text hover effect - middle layer */}
      <div className="text-hover-container">
        <TextHoverEffect text="HACKED" />
      </div>

      {/* Main content - highest layer */}
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand section */}
          <div className="brand-section">
            <div className="brand-logo">
              <span className="brand-icon">&lt;/&gt;</span>
              <span className="brand-name">Hacked 4.0</span>
            </div>
            <p className="brand-description">
              The ultimate 48-hour hackathon experience. Build, innovate, and 
              connect with developers from around the world.
            </p>
            <div className="brand-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">April 2025 • Registration Open</span>
            </div>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="link-section">
              <h4 className="section-title">{section.title}</h4>
              <ul className="link-list">
                {section.links.map((link) => (
                  <li
                    key={link.label}
                    className={link.pulse ? "link-item-pulse" : ""}
                  >
                    <a href={link.href} className="footer-link">
                      {link.icon && <span className="link-icon">{link.icon}</span>}
                      {link.label}
                    </a>
                    {link.pulse && <span className="pulse-dot"></span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div className="contact-section">
            <h4 className="section-title">Contact Us</h4>
            <ul className="contact-list">
              {contactInfo.map((item, i) => (
                <li key={i} className="contact-item">
                  {item.icon}
                  {item.href ? (
                    <a href={item.href} className="footer-link">
                      {item.text}
                    </a>
                  ) : (
                    <span className="footer-link">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Footer bottom */}
        <div className="footer-bottom">
          {/* Social icons */}
          <div className="social-links">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-link"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="copyright">
            &copy; {new Date().getFullYear()} Hacked 4.0 | All rights reserved.
          </p>

          {/* Additional links */}
          <div className="legal-links">
            <a href="#privacy" className="legal-link">Privacy Policy</a>
            <span className="legal-separator">•</span>
            <a href="#terms" className="legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;