import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './navbar.css';

export type NavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface NavbarProps {
  logo: string;
  logoAlt?: string;
  items: NavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onNavClick?: (href: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.out',
  baseColor = '#000',
  pillColor = '#fff',
  hoveredPillTextColor = '#fff',
  pillTextColor = '#000',
  onNavClick,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentActive, setCurrentActive] = useState(activeHref || '');

  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoRef = useRef<HTMLButtonElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const capsuleRef = useRef<HTMLDivElement | null>(null);

  // Layout calculation for pill animations
  const layoutPills = () => {
    circleRefs.current.forEach((circle, index) => {
      if (!circle?.parentElement) return;

      const pill = circle.parentElement as HTMLElement;
      const rect = pill.getBoundingClientRect();
      const { width: w, height: h } = rect;

      if (w === 0 || h === 0) return;

      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`
      });

      const label = pill.querySelector<HTMLElement>('.pill-label');
      const hoverLabel = pill.querySelector<HTMLElement>('.pill-label-hover');

      if (label) gsap.set(label, { y: 0 });
      if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

      tlRefs.current[index]?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

      if (label) {
        tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
      }

      if (hoverLabel) {
        gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
      }

      tlRefs.current[index] = tl;
    });
  };

  useEffect(() => {
    const capsule = capsuleRef.current;
    if (capsule) {
      gsap.set(capsule, {
        width: 0,
        opacity: 0,
        paddingLeft: 0,
        paddingRight: 0
      });
    }

    // Set initial state for nav items
    itemRefs.current.forEach((item) => {
      if (item) {
        gsap.set(item, { opacity: 0, scale: 0.8, x: -10 });
      }
    });

    const onResize = () => {
      if (isNavOpen) {
        layoutPills();
      }
    };

    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (isNavOpen) layoutPills();
      }).catch(() => { });
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease]);

  // Handle nav open/close animations
  useEffect(() => {
    const capsule = capsuleRef.current;
    const logoImg = logoImgRef.current;
    if (!capsule) return;

    if (isNavOpen) {
      // Logo tilt animation
      if (logoImg) {
        gsap.to(logoImg, {
          rotate: -15,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      // Calculate target width based on content
      gsap.set(capsule, { width: 'auto', opacity: 1, paddingLeft: 16, paddingRight: 4 });
      const targetWidth = capsule.scrollWidth;
      gsap.set(capsule, { width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 });

      // Animate capsule opening
      gsap.to(capsule, {
        width: targetWidth,
        opacity: 1,
        paddingLeft: 16,
        paddingRight: 4,
        duration: 0.5,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(capsule, { width: 'auto' });
          layoutPills();
        }
      });

      // Stagger animate nav items
      itemRefs.current.forEach((item, index) => {
        if (item) {
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.4,
            delay: 0.15 + index * 0.06,
            ease: 'power2.out'
          });
        }
      });
    } else {
      // Logo return to normal
      if (logoImg) {
        gsap.to(logoImg, {
          rotate: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        });
      }

      // Reverse stagger animate nav items first
      const totalItems = itemRefs.current.length;
      itemRefs.current.forEach((item, index) => {
        if (item) {
          gsap.to(item, {
            opacity: 0,
            scale: 0.8,
            x: -10,
            duration: 0.2,
            delay: (totalItems - index - 1) * 0.03,
            ease: 'power2.in'
          });
        }
      });

      // Calculate current width before animating
      const currentWidth = capsule.scrollWidth;
      gsap.set(capsule, { width: currentWidth });

      // Animate capsule closing
      gsap.to(capsule, {
        width: 0,
        opacity: 0,
        paddingLeft: 0,
        paddingRight: 0,
        duration: 0.4,
        delay: 0.1,
        ease: 'power3.inOut'
      });
    }
  }, [isNavOpen, ease]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoClick = () => {
    const logoBtn = logoRef.current;

    // Logo pulse animation
    if (logoBtn) {
      gsap.to(logoBtn, {
        scale: 0.9,
        duration: 0.1,
        ease: 'power2.in',
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.set(logoBtn, { scale: 1 });
        }
      });
    }

    setIsNavOpen(!isNavOpen);
  };

  const handleLogoHover = () => {
    const logoBtn = logoRef.current;
    if (!logoBtn || isNavOpen) return;

    gsap.to(logoBtn, {
      scale: 1.05,
      duration: 0.2,
      ease
    });
  };

  const handleLogoLeave = () => {
    const logoBtn = logoRef.current;
    if (!logoBtn) return;

    gsap.to(logoBtn, {
      scale: 1,
      duration: 0.2,
      ease
    });
  };

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    setCurrentActive(href);
    setIsNavOpen(false);

    scrollToSection(href);
    onNavClick?.(href);
  };

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': resolvedPillTextColor
  } as React.CSSProperties;

  return (
    <div className="navbar-container" ref={navContainerRef} style={cssVars}>
      <nav className={`navbar ${className}`} aria-label="Primary">
        {/* Unified Capsule Container */}
        <div className={`navbar-capsule ${isNavOpen ? 'is-open' : ''}`}>
          {/* Logo Button */}
          <button
            className={`navbar-logo ${isNavOpen ? 'is-open' : ''}`}
            onClick={handleLogoClick}
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
            aria-label={isNavOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isNavOpen}
            ref={logoRef}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} />
          </button>

          {/* Navigation Items */}
          <div className="navbar-items" ref={capsuleRef}>
            <ul className="pill-list" role="menubar" ref={navItemsRef}>
              {items.map((item, i) => (
                <li
                  key={item.href}
                  role="none"
                  ref={el => { itemRefs.current[i] = el; }}
                >
                  <a
                    role="menuitem"
                    href={item.href}
                    className={`pill${currentActive === item.href ? ' is-active' : ''}`}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                    onClick={(e) => handleNavItemClick(e, item.href)}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={el => { circleRefs.current[i] = el; }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Backdrop for closing nav when clicking outside */}
      {isNavOpen && (
        <div
          className="navbar-backdrop"
          onClick={() => setIsNavOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Navbar;