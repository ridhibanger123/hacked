// src/components/Prizes/Prizes.tsx
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './prizes.css';

gsap.registerPlugin(ScrollTrigger);

interface Prize {
  id: number;
  position: string;
  amount: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  benefits: string[];
}

const prizesData: Prize[] = [
  {
    id: 1,
    position: '2nd',
    amount: '₹50,000',
    title: 'Runner Up',
    description: 'Excellence in innovation and execution',
    icon: '🥈',
    color: '#C0C0C0',
    benefits: [
      'Cash Prize',
      'Internship Opportunities',
      'Mentorship Sessions',
      'Swag Kit'
    ]
  },
  {
    id: 2,
    position: '1st',
    amount: '₹1,00,000',
    title: 'Grand Champion',
    description: 'The ultimate hacker who conquered all challenges',
    icon: '🏆',
    color: '#FFD700',
    benefits: [
      'Cash Prize',
      'Fast-track Interviews',
      'Premium Mentorship',
      'Exclusive Swag Kit',
      'Conference Tickets'
    ]
  },
  {
    id: 3,
    position: '3rd',
    amount: '₹25,000',
    title: 'Second Runner Up',
    description: 'Outstanding performance and creativity',
    icon: '🥉',
    color: '#CD7F32',
    benefits: [
      'Cash Prize',
      'Mentorship Sessions',
      'Swag Kit'
    ]
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
          <p ref={subheadingRef} className="prizes-subheading">
            Compete for glory and incredible rewards worth over ₹2,00,000
          </p>
        </div>

        <div ref={cardsContainerRef} className="prizes-cards">
          {prizesData.map((prize, index) => (
            <div
              key={prize.id}
              ref={getCardRef(index)}
              className={getCardClass(index)}
              style={{ '--card-color': prize.color } as React.CSSProperties}
            >
              <div className="card-header">
                <span className="prize-icon">{prize.icon}</span>
                <span className="prize-position">{prize.position}</span>
              </div>

              <div className="card-content">
                <h3 className="prize-title">{prize.title}</h3>
                <div className="prize-amount">{prize.amount}</div>
                <p className="prize-description">{prize.description}</p>

                <div className="prize-benefits">
                  <div className="benefits-label">What you get:</div>
                  <ul className="benefits-list">
                    {prize.benefits.map((benefit, i) => (
                      <li key={i} className="benefit-item">
                        <span className="benefit-check">✓</span>
                        <span className="benefit-text">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="prizes-footer">
          <div className="total-prize">
            <span className="total-label">Total Prize Pool</span>
            <span className="total-amount">₹2,00,000+</span>
          </div>
          <p className="prizes-note">
            *Additional sponsor prizes and goodies to be announced
          </p>
        </div>
      </div>
    </section>
  );
};

export default Prizes;