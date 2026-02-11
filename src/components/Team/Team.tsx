// src/components/Team/Team.tsx
import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './team.css';

gsap.registerPlugin(ScrollTrigger);

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  instagram?: string;
  website?: string;
}

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  socials: SocialLinks;
}

interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

const teamsData: Team[] = [
  {
    id: 'lead-organizers',
    name: 'Lead Organizers',
    members: [
      {
        id: 1,
        name: 'Tanya',
        designation: 'Lead Organizer',
        image: 'https://media.licdn.com/dms/image/v2/D4E03AQE2xKO71FoJfA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710251118504?e=1772668800&v=beta&t=TNgSzi9nDVDpeFmBR9kV7LOvynlGdYgn1VoZYvLwXwE',
        socials: {
          linkedin: 'https://www.linkedin.com/in/tanya0610?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        },
      },
      {
        id: 2,
        name: 'Divisha Goel',
        designation: 'Lead Organizer',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQG9LW71bRFVXw/profile-displayphoto-scale_400_400/B56Ztwxg0EK8Ak-/0/1767123589112?e=1772668800&v=beta&t=MKiiCM_0w0SoaT8F5gJ7Jj6Tb8YDG0RevxT5bvCXosg',
        socials: {
          linkedin: 'https://www.linkedin.com/in/divisha-goel-b00197320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        },
      },
      {
        id: 3,
        name: 'Mehak',
        designation: 'Lead Organizer',
        image: 'https://media.licdn.com/dms/image/v2/D4D03AQE8bmHjHTlzpg/profile-displayphoto-scale_400_400/B4DZhxn.EvGkAo-/0/1754252963478?e=1772668800&v=beta&t=g2PsOnz274khen8xfhVc1j07vIPft-66BURNp6abn9M',
        socials: {
          linkedin: 'https://www.linkedin.com/in/mehak-bhardwaj',
        },
      },
      {
        id: 4,
        name: 'Suvansh',
        designation: 'Lead Organizer',
        image: 'https://media.licdn.com/dms/image/v2/D4E03AQH6imQf_FwgLg/profile-displayphoto-shrink_400_400/B4EZQtY6v0HEAk-/0/1735928296012?e=1772668800&v=beta&t=5THGQT64gtP5rEQzVQhN9e_pxRTu3ShfelmC8kGmhlE',
        socials: {
          linkedin: 'https://www.linkedin.com/in/suvansh-sehgal',
        },
      },
    ],
  },
  {
    id: 'operations',
    name: 'Operations',
    members: [
      {
        id: 5,
        name: 'Karttikey',
        designation: 'Operations Team Lead',
        image: 'https://media.licdn.com/dms/image/v2/D4D03AQFz1YDINwSJtw/profile-displayphoto-scale_400_400/B4DZwzb9j4JEAg-/0/1770389497317?e=1772668800&v=beta&t=7x7tXDmpRTQEhgM-bh3qtuXXfoXShsXjgrTZn2X5TO4',
        socials: {
          linkedin: 'https://www.linkedin.com/in/karttikey-singh-24ab5b273',
        },
      },
      {
        id: 6,
        name: 'Vedansh Mathur',
        designation: 'Operations Team Lead',
        image: 'https://media.licdn.com/dms/image/v2/D4D03AQFqs6vp5HEUwg/profile-displayphoto-scale_400_400/B4DZfQY32uHkAg-/0/1751547871875?e=1772668800&v=beta&t=3_PVZsHcFikZgA88sa0HzK0nv-VnW91z_8PRpHURYec',
        socials: {
          linkedin: 'https://www.linkedin.com/in/vedansh-mathur-86767a300',
        },
      },
      {
        id: 7,
        name: 'Harshul Saini',
        designation: 'Entry Management Lead',
        image: 'https://media.licdn.com/dms/image/v2/D4D03AQFMDbB7KStRIw/profile-displayphoto-shrink_400_400/B4DZY.4sq2G8Ag-/0/1744811773651?e=1772668800&v=beta&t=d_Tu6mQ6r9t8OkBabDPZ90XX4heZTcLwjOQBhw7dytk',
        socials: {
          linkedin: 'https://www.linkedin.com/in/harshul-saini-701057322',
        },
      },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    members: [
      {
        id: 8,
        name: 'Parth Bansal',
        designation: 'Design Lead',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQGFBpAC-oN3ow/profile-displayphoto-scale_400_400/B56ZtFPGI1LEAg-/0/1766393145858?e=1772668800&v=beta&t=CpUoKmMaaZ6yw9fWNuywp-Wiciabb_tl9QRid4Qx9aA',
        socials: {
          linkedin: 'https://www.linkedin.com/in/parth-bansal-5b2825305',
        },
      },
      {
        id: 9,
        name: 'Khushi Vijay',
        designation: 'Design Lead',
        image: 'https://media.licdn.com/dms/image/v2/D4E03AQEh4iDvacUVOg/profile-displayphoto-scale_400_400/B4EZss8lIGHgAk-/0/1765985638475?e=1772668800&v=beta&t=QJvZf_Hub-1I8GivhzWgig6vsVq6fdstc1HJEZOXPAk',
        socials: {
          linkedin: 'https://www.linkedin.com/in/khushi-vijay-2268a4336',
        },
      },
    ],
  },
  {
    id: 'technical',
    name: 'Technical',
    members: [
      {
        id: 10,
        name: 'Mehul Vig',
        designation: 'Technical Lead',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQFu-bq4YWJphA/profile-displayphoto-scale_400_400/B56ZtqENtaHAAg-/0/1767011050416?e=1772668800&v=beta&t=w7SU6UcE0Po_0vi4TVgLA3S7RyO4N4U-1K-8X9z6NNQ',
        socials: {
          linkedin: 'https://www.linkedin.com/in/mehul-vig/',
        },
      },
      {
        id: 11,
        name: 'Namandeep Singh',
        designation: 'Technical Lead',
        image: 'https://via.placeholder.com/400',
        socials: {
          linkedin: 'https://www.linkedin.com/in/namandeep-singh',
        },
      },
    ],
  },
  {
    id: 'sponsorship',
    name: 'Sponsorship',
    members: [
      {
        id: 12,
        name: 'Parth Sharma',
        designation: 'Sponsorship Lead',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQHb_QUcWiO24w/profile-displayphoto-scale_400_400/B56ZxCkTyzGYAg-/0/1770643341032?e=1772668800&v=beta&t=LTwMqD3F1mji3F3LMr2584PFdEbNwZN55jec3XJB3kc',
        socials: {
          linkedin: 'https://www.linkedin.com/in/parth-sharma-cs/',
        },
      },
      {
        id: 13,
        name: 'Harshita Tewani',
        designation: 'Sponsorship Lead',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQGWOxKnceBaFw/profile-displayphoto-scale_400_400/B56ZujOAqQJsAk-/0/1767969918362?e=1772668800&v=beta&t=lVoCpt1aJnTwFTStAbQA-cjTzTPr0JeUKhxd5llC23g',
        socials: {
          linkedin: 'https://www.linkedin.com/in/harshitatewani0103',
        },
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    members: [
      {
        id: 14,
        name: 'Manish Sihag',
        designation: 'Offline Marketing Lead',
        image: 'https://media.licdn.com/dms/image/v2/D4E03AQH3exBnV4SCZQ/profile-displayphoto-scale_400_400/B4EZgND.1NHoAk-/0/1752565806061?e=1772668800&v=beta&t=Zb_bPqcqR_HPoc1BwmXN7EEoN_9uwYTtpKo0N9Klk-I',
        socials: {
          linkedin: 'https://www.linkedin.com/in/manish-sihag-014144328',
        },
      },
      {
        id: 15,
        name: 'Harsh Pratap Singh',
        designation: 'Offline Marketing Lead',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQFKOGKfpOi5CA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730132409858?e=1772668800&v=beta&t=7DWcW-HtP4T5uJxkJQ47M7BGZh_mtI2YA8NlWi9wv_s',
        socials: {
          linkedin: 'https://www.linkedin.com/in/harshpratapsingh333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        },

      },
    ],
  },
  {
    id: 'Judges & PR Lead',
    name: 'Judges & PR Lead',
    members: [
      {
        id: 16,
        name: 'Manasvi Bansal',
        designation: 'Judges & PR Lead',
        image: 'https://media.licdn.com/dms/image/v2/D4E03AQFSXq5fc3Uc_w/profile-displayphoto-shrink_400_400/B4EZSHIyIgGwAo-/0/1737434015679?e=1772668800&v=beta&t=dRyOUyMdqKins0OZpO7-KoI80jLH9QJ-cz25SJgkDMc',
        socials: {
          linkedin: 'https://www.linkedin.com/in/manasvi-bansal-4679a1339',
        },
      },
    ],
  },
];

// Social Icons Components
const LinkedInIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const WebsiteIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z" />
  </svg>
);

const Teams: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>(teamsData[0].id);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const teamContentRef = useRef<HTMLDivElement | null>(null);
  const teamGridRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  const currentTeam = teamsData.find((team) => team.id === selectedTeam) || teamsData[0];

  const resetCardsRef = () => {
    cardsRef.current = [];
  };

  const handleTeamChange = (teamId: string) => {
    if (teamId === selectedTeam || isAnimating) return;

    setIsAnimating(true);

    gsap.to(cardsRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.25,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        resetCardsRef();
        setSelectedTeam(teamId);

        setTimeout(() => {
          gsap.fromTo(
            cardsRef.current,
            { opacity: 0, y: 30, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.35,
              stagger: 0.04,
              ease: 'back.out(1.2)',
              onComplete: () => {
                setIsAnimating(false);
              },
            }
          );
        }, 50);
      },
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Initial states
      gsap.set(headingRef.current, { opacity: 0, scale: 0.3, visibility: 'hidden' });
      gsap.set(teamContentRef.current, { opacity: 0, visibility: 'hidden' });
      gsap.set(buttonsRef.current, { opacity: 0, y: 30 });
      gsap.set(teamGridRef.current, { opacity: 0, y: 100 });
      gsap.set(cardsRef.current, { opacity: 0, y: 50, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=3000',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      tl
        // "Our Team" zooms in
        .set(headingRef.current, { visibility: 'visible' })
        .fromTo(
          headingRef.current,
          { opacity: 0, scale: 0.3 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }
        )
        // "Our Team" zooms out and fades
        .to(headingRef.current, {
          opacity: 0,
          scale: 5,
          duration: 1.5,
          ease: 'power2.in',
        })
        // Team content appears
        .set(teamContentRef.current, { visibility: 'visible' })
        .to(teamContentRef.current, { opacity: 1, duration: 0.5 }, '-=0.3')
        .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
        .to(teamGridRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
        .to(
          cardsRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.06, ease: 'back.out(1.2)' },
          '-=0.5'
        )
        .to({}, { duration: 1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null): void => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const getGridClass = (memberCount: number): string => {
    if (memberCount === 1) return 'grid-cols-1';
    if (memberCount === 2) return 'grid-cols-2';
    if (memberCount === 3) return 'grid-cols-3';
    if (memberCount === 4) return 'grid-cols-4';
    return 'grid-cols-4';
  };

  const renderSocialLinks = (socials: SocialLinks) => {
    const links = [];

    if (socials.linkedin) {
      links.push(
        <a key="linkedin" href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
      );
    }
    if (socials.twitter) {
      links.push(
        <a key="twitter" href={socials.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter" aria-label="Twitter">
          <TwitterIcon />
        </a>
      );
    }
    if (socials.github) {
      links.push(
        <a key="github" href={socials.github} target="_blank" rel="noopener noreferrer" className="social-link github" aria-label="GitHub">
          <GitHubIcon />
        </a>
      );
    }
    if (socials.instagram) {
      links.push(
        <a key="instagram" href={socials.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram" aria-label="Instagram">
          <InstagramIcon />
        </a>
      );
    }
    if (socials.website) {
      links.push(
        <a key="website" href={socials.website} target="_blank" rel="noopener noreferrer" className="social-link website" aria-label="Website">
          <WebsiteIcon />
        </a>
      );
    }

    return links;
  };

  return (
    <div className="wrapper">


      <section ref={sectionRef} className="team-section">
        <div className="team-inner">
          {/* Only "Our Team" heading with zoom animation */}
          <h2 ref={headingRef} className="heading heading-main">
            Our
            <br />
            <span className="contrast">Team</span>
          </h2>

          <div ref={teamContentRef} className="team-content">
            <div ref={buttonsRef} className="team-buttons">
              {teamsData.map((team) => (
                <button
                  key={team.id}
                  className={`team-button ${selectedTeam === team.id ? 'active' : ''}`}
                  onClick={() => handleTeamChange(team.id)}
                  disabled={isAnimating}
                >
                  <span className="button-text">{team.name}</span>
                </button>
              ))}
            </div>

            <div
              ref={teamGridRef}
              className={`team-grid ${getGridClass(currentTeam.members.length)}`}
            >
              {currentTeam.members.map((member: TeamMember) => (
                <div key={member.id} ref={addToCardsRef} className="team-card">
                  <div className="card-image-wrapper">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="card-image"
                      loading="lazy"
                    />
                    <div className="card-overlay"></div>
                    <div className="social-overlay">
                      <div className="social-links">
                        {renderSocialLinks(member.socials)}
                      </div>
                    </div>
                  </div>
                  <div className="card-content-team">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-designation">{member.designation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-glow"></div>
      </section>
    </div>
  );
};

export default Teams;