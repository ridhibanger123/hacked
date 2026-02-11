// src/components/Prizes/Prizes.tsx
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Medal, Award } from 'lucide-react';
import './prizes.css';

gsap.registerPlugin(ScrollTrigger);

interface Prize {
  id: number;
  position: string;
  designation: string;
  icon: React.ElementType;
  color: string;
}

const prizesData: Prize[] = [
  {
    id: 1,
    position: '2nd',
    designation: 'Runner Up',
    icon: Medal,
    color: '#b5a1e3' // Secondary color from Hero
  },
  {
    id: 2,
    position: '1st',
    designation: 'Winner',
    icon: Trophy,
    color: '#49e3fb' // Primary color from Hero
  },
  {
    id: 3,
    position: '3rd',
    designation: 'Second Runner Up',
    icon: Award,
    color: '#60b8c2' // Muted color from Hero
  }
];

const Prizes: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const middleCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Subheading animation
      if (subheadingRef.current) {
        gsap.fromTo(
          subheadingRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: subheadingRef.current,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Left card - comes from left
      if (leftCardRef.current) {
        gsap.fromTo(
          leftCardRef.current,
          {
            opacity: 0,
            x: -150
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 75%',
              end: 'top 30%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Middle card - comes from bottom
      if (middleCardRef.current) {
        gsap.fromTo(
          middleCardRef.current,
          {
            opacity: 0,
            y: 100
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 75%',
              end: 'top 30%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Right card - comes from right
      if (rightCardRef.current) {
        gsap.fromTo(
          rightCardRef.current,
          {
            opacity: 0,
            x: 150
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 75%',
              end: 'top 30%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCardRef = (index: number) => {
    if (index === 0) return leftCardRef;
    if (index === 1) return middleCardRef;
    return rightCardRef;
  };

  const getCardClass = (index: number) => {
    if (index === 0) return 'prize-card left-card';
    if (index === 1) return 'prize-card middle-card featured';
    return 'prize-card right-card';
  };

  return (
    <section ref={sectionRef} className="prizes-section">
      <div className="prizes-container">
        <div className="prizes-header">
          <h2 ref={headingRef} className="prizes-heading">
            Prizes & Rewards
          </h2>
        </div>

        <div ref={cardsContainerRef} className="prizes-cards">
          {prizesData.map((prize, index) => (
            <div
              key={prize.id}
              ref={getCardRef(index)}
              className={getCardClass(index)}
              style={{ '--card-color': prize.color } as React.CSSProperties}
            >
              <div className="card-content">
                <div className="prize-icon">
                  <prize.icon strokeWidth={1.5} />
                </div>
                <div className="prize-position">{prize.position}</div>
                <div className="prize-designation">{prize.designation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prizes;