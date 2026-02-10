// src/components/Hero/Hero.tsx
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import './hero.css';

gsap.registerPlugin(ScrollTrigger);

interface ThreeRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points[];
  wheelOfTime: THREE.Group | null;
  timeRings: THREE.Mesh[];
  codeParticles: THREE.Points | null;
  serpent: THREE.Line | null;
  animationId: number | null;
  targetCameraX?: number;
  targetCameraY?: number;
  targetCameraZ?: number;
  locations?: number[];
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const socialMenuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [statusText, setStatusText] = useState('INITIALIZING...');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);

  const totalSections = 3;

  const threeRefs = useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    wheelOfTime: null,
    timeRings: [],
    codeParticles: null,
    serpent: null,
    animationId: null
  });

  // Social links data
  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/hackedbmu',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon-svg">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/hackedbmu',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon-svg">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/hackedbmu',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon-svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/hackedbmu',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon-svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/hackedbmu',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon-svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animate logo H to X transformation
  useEffect(() => {
    if (logoImgRef.current) {
      if (isMenuOpen) {
        // Transform logo to X
        gsap.to(logoImgRef.current, {
          rotation: 135,  // Rotate 135 degrees to form X
          scale: 0.8,
          duration: 0.4,
          ease: 'back.out(1.7)'
        });
      } else {
        // Transform back to normal
        gsap.to(logoImgRef.current, {
          rotation: 0,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        });
      }
    }
  }, [isMenuOpen]);

  // Animate social menu
  useEffect(() => {
    if (socialMenuRef.current) {
      const socialItems = socialMenuRef.current.querySelectorAll('.social-item');

      if (isMenuOpen) {
        gsap.to(socialMenuRef.current, {
          opacity: 1,
          visibility: 'visible',
          duration: 0.3,
          ease: 'power2.out'
        });

        gsap.fromTo(
          socialItems,
          { opacity: 0, x: -20, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'back.out(1.7)'
          }
        );
      } else {
        gsap.to(socialItems, {
          opacity: 0,
          x: -20,
          scale: 0.8,
          duration: 0.2,
          stagger: 0.03,
          ease: 'power2.in'
        });

        gsap.to(socialMenuRef.current, {
          opacity: 0,
          visibility: 'hidden',
          duration: 0.3,
          delay: 0.2,
          ease: 'power2.in'
        });
      }
    }
  }, [isMenuOpen]);

  // Close menu on scroll
  useEffect(() => {
    const handleScrollClose = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScrollClose);
    return () => window.removeEventListener('scroll', handleScrollClose);
  }, [isMenuOpen]);

  // Terminal typing effect
  useEffect(() => {
    const messages = [
      '> Initializing TRINITY protocol...',
      '> Accessing BMU secure network...',
      '> Decrypting temporal signatures...',
      '> WARNING: Wheel of Time detected...',
      '> The Pattern is unraveling...',
      '> BREACH SUCCESSFUL',
      '> Welcome, Hacker...'
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const fullMessage = messages[messageIndex];

      if (!isDeleting) {
        setTerminalText(fullMessage.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === fullMessage.length) {
          isDeleting = true;
          timeout = setTimeout(type, 2500);
          return;
        }
      } else {
        setTerminalText(fullMessage.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          messageIndex = (messageIndex + 1) % messages.length;
        }
      }

      timeout = setTimeout(type, isDeleting ? 25 : 60);
    };

    const startDelay = setTimeout(() => {
      type();
    }, 1000);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearTimeout(timeout);
      clearTimeout(startDelay);
      clearInterval(cursorInterval);
    };
  }, []);

  // Status text rotation
  useEffect(() => {
    const statuses = [
      'SYSTEM BREACH: ACTIVE',
      'TEMPORAL FLUX: DETECTED',
      'PATTERN INTEGRITY: COMPROMISED',
      'TRINITY PROTOCOL: ENGAGED',
      'WHEEL STATUS: TURNING',
      'ENCRYPTION: BYPASSED'
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setStatusText(statuses[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Initial text animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (terminalRef.current) {
        tl.fromTo(
          terminalRef.current,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, visibility: 'visible', duration: 0.8, ease: 'power3.out' },
          0
        );
      }

      if (menuRef.current) {
        tl.fromTo(
          menuRef.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, visibility: 'visible', duration: 1, ease: 'power3.out' },
          0.2
        );
      }

      if (statusRef.current) {
        tl.fromTo(
          statusRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, visibility: 'visible', duration: 0.8, ease: 'power3.out' },
          0.3
        );
      }

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.title-char');
        gsap.set(titleRef.current, { visibility: 'visible' });

        tl.fromTo(
          chars,
          { y: 150, opacity: 0, rotationX: -90 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.04,
            ease: 'power4.out'
          },
          0.4
        );

        tl.to(chars, {
          keyframes: [
            { x: -2, duration: 0.05 },
            { x: 2, duration: 0.05 },
            { x: -1, duration: 0.05 },
            { x: 0, duration: 0.05 }
          ],
          stagger: 0.02
        }, 1.6);
      }

      if (subtitleRef.current) {
        const lines = subtitleRef.current.querySelectorAll('.subtitle-line');
        gsap.set(subtitleRef.current, { visibility: 'visible' });

        tl.fromTo(
          lines,
          { y: 40, opacity: 0, skewX: -3 },
          { y: 0, opacity: 1, skewX: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          1.0
        );
      }

      if (scrollProgressRef.current) {
        tl.fromTo(
          scrollProgressRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, visibility: 'visible', duration: 1, ease: 'power2.out' },
          1.2
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Scroll-based animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroSectionRef.current && titleRef.current && subtitleRef.current) {
        gsap.to(titleRef.current, {
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          },
          y: -200,
          opacity: 0,
          scale: 0.8,
          filter: 'blur(10px)',
          ease: 'none'
        });

        gsap.to(subtitleRef.current, {
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: '50% top',
            scrub: 1
          },
          y: -100,
          opacity: 0,
          ease: 'none'
        });

        if (terminalRef.current) {
          gsap.to(terminalRef.current, {
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: 'top top',
              end: '30% top',
              scrub: 1
            },
            opacity: 0,
            y: -50,
            ease: 'none'
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    const initThree = () => {
      const { current: refs } = threeRefs;

      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000508, 0.0003);

      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.6;

      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.2,
        0.4,
        0.85
      );
      refs.composer.addPass(bloomPass);

      createStarField();
      createWheelOfTime();
      createTimeRings();
      createCodeParticles();
      createSerpent();
      getLocation();
      animate();
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;

      const starCount = 6000;

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.4) {
            color.setHSL(0.35, 0.9, 0.5 + Math.random() * 0.3);
          } else if (colorChoice < 0.7) {
            color.setHSL(0.5, 0.8, 0.5 + Math.random() * 0.3);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.12, 0.95, 0.5 + Math.random() * 0.3);
          } else {
            color.setHSL(0.85, 0.8, 0.5 + Math.random() * 0.3);
          }

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;
          sizes[j] = Math.random() * 2.5 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            varying float vOpacity;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              float angle = time * 0.03 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xz = rot * pos.xz;
              
              vOpacity = 0.6 + 0.4 * sin(time * 3.0 + position.x * 0.1 + position.y * 0.1);
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            varying float vOpacity;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = (1.0 - smoothstep(0.0, 0.5, dist)) * vOpacity;
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createWheelOfTime = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;

      refs.wheelOfTime = new THREE.Group();

      const wheelLayers = [
        { radius: 100, tubeRadius: 3, color: 0xffd700, opacity: 0.5 },
        { radius: 85, tubeRadius: 2, color: 0x00ff88, opacity: 0.4 },
        { radius: 70, tubeRadius: 1.5, color: 0x00ffff, opacity: 0.3 },
        { radius: 55, tubeRadius: 1, color: 0xffd700, opacity: 0.25 },
        { radius: 40, tubeRadius: 0.8, color: 0xff00aa, opacity: 0.2 }
      ];

      wheelLayers.forEach((layer, index) => {
        const geometry = new THREE.TorusGeometry(layer.radius, layer.tubeRadius, 32, 100);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.userData = { rotationSpeed: 0.02 * (index % 2 === 0 ? 1 : -1) * (1 + index * 0.2) };
        refs.wheelOfTime.add(ring);
      });

      for (let i = 0; i < 8; i++) {
        const spokeGeometry = new THREE.BoxGeometry(200, 2, 2);
        const spokeMaterial = new THREE.MeshBasicMaterial({
          color: 0xffd700,
          transparent: true,
          opacity: 0.35
        });
        const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);
        spoke.rotation.z = (i * Math.PI) / 4;
        refs.wheelOfTime.add(spoke);
      }

      const hubGeometry = new THREE.SphereGeometry(15, 32, 32);
      const hubMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.6
      });
      const hub = new THREE.Mesh(hubGeometry, hubMaterial);
      refs.wheelOfTime.add(hub);

      const runeCount = 100;
      const runeGeometry = new THREE.BufferGeometry();
      const runePositions = new Float32Array(runeCount * 3);

      for (let i = 0; i < runeCount; i++) {
        const angle = (i / runeCount) * Math.PI * 2;
        const radius = 30 + Math.random() * 70;
        runePositions[i * 3] = Math.cos(angle) * radius;
        runePositions[i * 3 + 1] = Math.sin(angle) * radius;
        runePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }

      runeGeometry.setAttribute('position', new THREE.BufferAttribute(runePositions, 3));

      const runeMaterial = new THREE.PointsMaterial({
        color: 0x00ffff,
        size: 3,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });

      const runes = new THREE.Points(runeGeometry, runeMaterial);
      refs.wheelOfTime.add(runes);

      refs.wheelOfTime.position.z = -600;
      refs.wheelOfTime.rotation.x = Math.PI * 0.15;
      refs.scene.add(refs.wheelOfTime);
    };

    const createTimeRings = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;

      const ringConfigs = [
        { radius: 40, color: 0x00ff88, z: -80, rotationX: 0.4 },
        { radius: 60, color: 0x00ffff, z: -150, rotationX: 0.6 },
        { radius: 35, color: 0xffd700, z: -220, rotationX: 0.3 },
        { radius: 80, color: 0xff00aa, z: -300, rotationX: 0.5 }
      ];

      ringConfigs.forEach((config, i) => {
        const geometry = new THREE.TorusGeometry(config.radius, 0.8, 16, 100);
        const material = new THREE.MeshBasicMaterial({
          color: config.color,
          transparent: true,
          opacity: 0.25
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.position.z = config.z;
        ring.rotation.x = Math.PI * config.rotationX;
        ring.userData = {
          speed: 0.15 + i * 0.08,
          direction: i % 2 === 0 ? 1 : -1,
          baseZ: config.z
        };
        refs.timeRings.push(ring);
        refs.scene.add(ring);
      });
    };

    const createCodeParticles = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;

      const particleCount = 3000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const speeds = new Float32Array(particleCount);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 500;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 500 - 100;

        const colorChoice = Math.random();
        if (colorChoice < 0.7) {
          colors[i * 3] = 0;
          colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
          colors[i * 3 + 2] = 0.4 + Math.random() * 0.2;
        } else {
          colors[i * 3] = 0;
          colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
          colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
        }

        speeds[i] = Math.random() * 2 + 0.5;
        sizes[i] = Math.random() * 2 + 1;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          attribute vec3 color;
          attribute float speed;
          attribute float size;
          varying vec3 vColor;
          varying float vOpacity;
          uniform float time;
          
          void main() {
            vColor = color;
            vec3 pos = position;
            
            pos.y = mod(pos.y - time * speed * 30.0, 500.0) - 250.0;
            
            vOpacity = smoothstep(-250.0, -100.0, pos.y) * smoothstep(250.0, 100.0, pos.y);
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (250.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vOpacity;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            float alpha = (1.0 - dist * 2.0) * vOpacity * 0.7;
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      refs.codeParticles = new THREE.Points(geometry, material);
      refs.scene.add(refs.codeParticles);
    };

    const createSerpent = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;

      const curve = new THREE.CatmullRomCurve3([]);
      const points = 100;

      for (let i = 0; i <= points; i++) {
        const t = (i / points) * Math.PI * 2;
        const radius = 120;
        const x = Math.cos(t) * radius;
        const y = Math.sin(t) * radius;
        const z = Math.sin(t * 3) * 20;
        curve.points.push(new THREE.Vector3(x, y, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(200));
      const material = new THREE.LineBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.4
      });

      refs.serpent = new THREE.Line(geometry, material);
      refs.serpent.position.z = -400;
      refs.serpent.rotation.x = Math.PI * 0.2;
      refs.scene.add(refs.serpent);
    };

    const animate = () => {
      const { current: refs } = threeRefs;
      refs.animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      refs.stars.forEach((starField) => {
        if ((starField.material as THREE.ShaderMaterial).uniforms) {
          (starField.material as THREE.ShaderMaterial).uniforms.time.value = time;
        }
      });

      if (refs.wheelOfTime) {
        refs.wheelOfTime.rotation.z = time * 0.03;

        refs.wheelOfTime.children.forEach((child) => {
          if (child.userData.rotationSpeed) {
            child.rotation.z += child.userData.rotationSpeed * 0.016;
          }
        });

        const pulse = 1 + Math.sin(time * 1.5) * 0.03;
        refs.wheelOfTime.scale.set(pulse, pulse, pulse);
      }

      refs.timeRings.forEach((ring) => {
        ring.rotation.z = time * ring.userData.speed * ring.userData.direction;
        ring.rotation.y = Math.sin(time * 0.3 + ring.userData.baseZ * 0.01) * 0.15;
      });

      if (refs.codeParticles) {
        (refs.codeParticles.material as THREE.ShaderMaterial).uniforms.time.value = time;
      }

      if (refs.serpent) {
        refs.serpent.rotation.z = time * 0.05;
        refs.serpent.rotation.y = Math.sin(time * 0.2) * 0.1;
      }

      if (refs.camera && refs.targetCameraX !== undefined) {
        const smoothingFactor = 0.04;

        smoothCameraPos.current.x +=
          (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y +=
          (refs.targetCameraY! - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z +=
          (refs.targetCameraZ! - smoothCameraPos.current.z) * smoothingFactor;

        const floatX = Math.sin(time * 0.15) * 3;
        const floatY = Math.cos(time * 0.1) * 2;

        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 0, -200);
      }

      if (refs.composer) {
        refs.composer.render();
      }
    };

    initThree();

    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      const { current: refs } = threeRefs;

      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      refs.stars.forEach((starField) => {
        starField.geometry.dispose();
        (starField.material as THREE.Material).dispose();
      });

      refs.timeRings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });

      if (refs.wheelOfTime) {
        refs.wheelOfTime.children.forEach((child) => {
          if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
        });
      }

      if (refs.codeParticles) {
        refs.codeParticles.geometry.dispose();
        (refs.codeParticles.material as THREE.Material).dispose();
      }

      if (refs.serpent) {
        refs.serpent.geometry.dispose();
        (refs.serpent.material as THREE.Material).dispose();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  const getLocation = () => {
    const { current: refs } = threeRefs;
    const locations: number[] = [];
    refs.timeRings.forEach((ring, i) => {
      locations[i] = ring.position.z;
    });
    refs.locations = locations;
  };

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const heroHeight = container.offsetHeight;
      
      const inHero = scrollY < heroHeight;
      setIsInHeroSection(inHero);

      const progress = Math.min(scrollY / heroHeight, 1);
      setScrollProgress(progress);

      const { current: refs } = threeRefs;

      const cameraPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 10, y: 20, z: 50 },
        { x: -10, y: 40, z: -200 }
      ];

      const sectionHeight = windowHeight;
      const currentSectionIndex = Math.min(
        Math.floor(scrollY / sectionHeight),
        totalSections - 1
      );
      
      const sectionProgress = (scrollY % sectionHeight) / sectionHeight;
      const currentPos = cameraPositions[currentSectionIndex] || cameraPositions[0];
      const nextPos = cameraPositions[Math.min(currentSectionIndex + 1, totalSections - 1)] || currentPos;

      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

      if (refs.wheelOfTime) {
        refs.wheelOfTime.position.z = -600 + progress * 400;
      }

      if (refs.serpent) {
        refs.serpent.position.z = -400 + progress * 200;
      }

      refs.timeRings.forEach((ring, i) => {
        if (progress > 0.7) {
          ring.position.z = 10000;
        } else if (refs.locations) {
          ring.position.z = refs.locations[i];
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  const titleText = 'HACKED BMU';
  const titleChars = titleText.split('').map((char, index) => (
    <span key={index} className="title-char">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  const sectionData = [
    {
      title: 'TRINITY',
      line1: 'The One who breaks the code,',
      line2: 'The Pattern cannot hold what is destined to be free'
    },
    {
      title: 'WHEEL OF TIME',
      line1: 'Time is a wheel with neither beginning nor end,',
      line2: 'The threads weave together in the eternal Pattern'
    }
  ];

  return (
    <div ref={containerRef} className={`hero-container ${!isInHeroSection ? 'hero-hidden' : ''}`}>
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="scanlines"></div>
      <div className="vignette"></div>

      <div ref={statusRef} className="status-indicator">
        <div className="status-dot"></div>
        <span className="status-text">{statusText}</span>
      </div>

      <div ref={menuRef} className="side-menu">
        {/* Logo Image that transforms */}
        <div
          className={`logo-container ${isMenuOpen ? 'open' : ''}`}
          onClick={handleMenuToggle}
          role="button"
          tabIndex={0}
          aria-label="Toggle social menu"
          onKeyDown={(e) => e.key === 'Enter' && handleMenuToggle()}
        >
          <img 
            ref={logoImgRef}
            src="./images/logo.png" // Replace with your logo path
            alt="Hacked BMU Logo"
            className="logo-image"
          />
          <div className="x-overlay">
            <span className="x-line x-line-1"></span>
            <span className="x-line x-line-2"></span>
          </div>
        </div>

        <div ref={socialMenuRef} className="social-menu">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
              aria-label={social.name}
              title={social.name}
            >
              <span className="social-icon">{social.icon}</span>
              <span className="social-name">{social.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="corner top-left"><span>◢</span></div>
      <div className="corner top-right"><span>◣</span></div>
      <div className="corner bottom-left"><span>◥</span></div>
      <div className="corner bottom-right"><span>◤</span></div>

      <div className="scroll-content">
        <section ref={heroSectionRef} className="content-section first-section">
          <div className="section-content">
            <h1 ref={titleRef} className="hero-title">
              {titleChars}
            </h1>
            <div className="title-underline">
              <span className="underline-segment"></span>
              <span className="underline-dot"></span>
              <span className="underline-segment"></span>
            </div>
            <div ref={subtitleRef} className="hero-subtitle">
              <p className="subtitle-line">
                <span className="prompt">▶</span>
                <span className="subtitle-text">Welcome to the breach...</span>
              </p>
              <p className="subtitle-line">
                <span className="prompt">▶</span>
                <span className="subtitle-text">Where time bends and code breaks</span>
              </p>
            </div>
          </div>
        </section>

        {sectionData.map((section, i) => (
          <section key={i} className="content-section">
            <div className="section-content">
              <h1 className="hero-title visible">{section.title}</h1>
              <div className="title-underline">
                <span className="underline-segment"></span>
                <span className="underline-dot"></span>
                <span className="underline-segment"></span>
              </div>
              <div className="hero-subtitle visible">
                <p className="subtitle-line">
                  <span className="prompt">▶</span>
                  <span className="subtitle-text">{section.line1}</span>
                </p>
                <p className="subtitle-line">
                  <span className="prompt">▶</span>
                  <span className="subtitle-text">{section.line2}</span>
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;