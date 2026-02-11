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
    id: 'leadership',
    name: 'Leadership',
    members: [
      {
        id: 1,
        name: 'Alexandra Wright',
        designation: 'Chief Executive Officer',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          website: 'https://example.com',
        },
      },
      {
        id: 2,
        name: 'Michael Chen',
        designation: 'Chief Technology Officer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          github: 'https://github.com',
        },
      },
      {
        id: 3,
        name: 'Sarah Johnson',
        designation: 'Chief Operating Officer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          instagram: 'https://instagram.com',
        },
      },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    members: [
      {
        id: 4,
        name: 'Emma Rodriguez',
        designation: 'Head of Design',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          instagram: 'https://instagram.com',
        },
      },
      {
        id: 5,
        name: 'David Kim',
        designation: 'Senior UI Designer',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 6,
        name: 'Sophie Turner',
        designation: 'UX Researcher',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          website: 'https://example.com',
        },
      },
      {
        id: 7,
        name: 'James Wilson',
        designation: 'Motion Designer',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          instagram: 'https://instagram.com',
        },
      },
      {
        id: 8,
        name: 'Olivia Martinez',
        designation: 'Visual Designer',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          instagram: 'https://instagram.com',
        },
      },
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    members: [
      {
        id: 9,
        name: 'Ryan Mitchell',
        designation: 'Engineering Lead',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 10,
        name: 'Jessica Park',
        designation: 'Senior Frontend Developer',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
        },
      },
      {
        id: 11,
        name: 'Chris Anderson',
        designation: 'Senior Backend Developer',
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 12,
        name: 'Nina Patel',
        designation: 'Full Stack Developer',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
        },
      },
      {
        id: 13,
        name: 'Tom Harrison',
        designation: 'DevOps Engineer',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
        },
      },
      {
        id: 14,
        name: 'Amanda Foster',
        designation: 'Mobile Developer',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 15,
        name: 'Kevin Zhang',
        designation: 'Cloud Architect',
        image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
        },
      },
      {
        id: 16,
        name: 'Rachel Green',
        designation: 'QA Engineer',
        image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
        },
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    members: [
      {
        id: 17,
        name: 'Lisa Thompson',
        designation: 'Marketing Director',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          instagram: 'https://instagram.com',
        },
      },
      {
        id: 18,
        name: 'Robert Garcia',
        designation: 'Content Strategist',
        image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 19,
        name: 'Emily Davis',
        designation: 'Social Media Manager',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          instagram: 'https://instagram.com',
        },
      },
      {
        id: 20,
        name: 'Daniel Brown',
        designation: 'SEO Specialist',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
    ],
  },
  {
    id: 'product',
    name: 'Product',
    members: [
      {
        id: 21,
        name: 'Jennifer Lee',
        designation: 'VP of Product',
        image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 22,
        name: 'Marcus Williams',
        designation: 'Senior Product Manager',
        image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 23,
        name: 'Ashley Cooper',
        designation: 'Product Manager',
        image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
        },
      },
      {
        id: 24,
        name: 'Brian Taylor',
        designation: 'Product Analyst',
        image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 25,
        name: 'Megan White',
        designation: 'Associate PM',
        image: 'https://images.unsplash.com/photo-1502323777036-f29e3972f5e7?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
        },
      },
      {
        id: 26,
        name: 'Steven Clark',
        designation: 'Technical PM',
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
        },
      },
    ],
  },
  {
    id: 'sales',
    name: 'Sales',
    members: [
      {
        id: 27,
        name: 'Victoria Adams',
        designation: 'Sales Director',
        image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 28,
        name: 'George Miller',
        designation: 'Enterprise AE',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
        },
      },
      {
        id: 29,
        name: 'Christina Hall',
        designation: 'Account Executive',
        image: 'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          instagram: 'https://instagram.com',
        },
      },
      {
        id: 30,
        name: 'Patrick Moore',
        designation: 'Sales Dev Rep',
        image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
        },
      },
      {
        id: 31,
        name: 'Natalie Young',
        designation: 'Sales Dev Rep',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
    ],
  },
  {
    id: 'support',
    name: 'Support',
    members: [
      {
        id: 32,
        name: 'Catherine Lewis',
        designation: 'Head of CS',
        image: 'https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 33,
        name: 'Andrew Scott',
        designation: 'Tech Support Lead',
        image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
        },
      },
      {
        id: 34,
        name: 'Michelle King',
        designation: 'CS Manager',
        image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 35,
        name: 'Jason Wright',
        designation: 'Support Specialist',
        image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
        },
      },
      {
        id: 36,
        name: 'Laura Martinez',
        designation: 'Support Specialist',
        image: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
        },
      },
      {
        id: 37,
        name: 'Eric Johnson',
        designation: 'Support Specialist',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
        },
      },
      {
        id: 38,
        name: 'Diana Ross',
        designation: 'Onboarding',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          instagram: 'https://instagram.com',
        },
      },
    ],
  },
  {
    id: 'hr',
    name: 'HR',
    members: [
      {
        id: 39,
        name: 'Rebecca Stone',
        designation: 'Head of People',
        image: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        id: 40,
        name: 'William Baker',
        designation: 'HR Manager',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
        },
      },
      {
        id: 41,
        name: 'Samantha Cole',
        designation: 'Talent Acquisition',
        image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          instagram: 'https://instagram.com',
        },
      },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    members: [
      {
        id: 42,
        name: 'Thomas Reed',
        designation: 'CFO',
        image: 'https://images.unsplash.com/photo-1556157382-97edd2d71df6?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
        },
      },
      {
        id: 43,
        name: 'Karen Phillips',
        designation: 'Finance Manager',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
    ],
  },
  {
    id: 'legal',
    name: 'Legal',
    members: [
      {
        id: 44,
        name: 'Jonathan Pierce',
        designation: 'General Counsel',
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop',
        socials: {
          linkedin: 'https://linkedin.com',
        },
      },
    ],
  },
];

// Social Icons Components
const LinkedInIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const GitHubIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WebsiteIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
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
                  <span className="button-count">{team.members.length}</span>
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
                  <div className="card-content">
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