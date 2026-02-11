// src/components/Hero/Hero.tsx
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import './hero.css';

gsap.registerPlugin(ScrollTrigger);

// Color palette - formal and cohesive
const COLORS = {
  primary: 0x49e3fb,      // Cyan - #49e3fb
  secondary: 0xb5a1e3,    // Lavender - #b5a1e3
  accent: 0xf789dd,       // Pink - #f789dd
  dark: 0x0f151a,         // Dark background - #0f151a
  muted: 0x60b8c2,        // Muted teal - #60b8c2
  deepPurple: 0x5a3050,   // Deep purple - #5a3050
  darkTeal: 0x18424a,     // Dark teal - #18424a
};

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

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-link-2"
  >
    {icon}
  </a>
);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isInHeroSection, setIsInHeroSection] = useState(true);

  // Countdown timer state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer effect
  useEffect(() => {
    const targetDate = new Date('2026-03-13T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);


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

      // Animate social links
      if (socialLinksRef.current) {
        const links = socialLinksRef.current.querySelectorAll('.social-link-2');
        tl.fromTo(
          links,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          0.8
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
      refs.scene.fog = new THREE.FogExp2(0x0f151a, 0.0004);

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
      refs.renderer.toneMappingExposure = 0.5;

      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.5,
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

      const starCount = 5000;

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

          // Formal color palette - mostly cyan and lavender with subtle accents
          if (colorChoice < 0.5) {
            // Primary cyan - #49e3fb
            color.setHex(COLORS.primary);
            color.multiplyScalar(0.6 + Math.random() * 0.4);
          } else if (colorChoice < 0.8) {
            // Lavender - #b5a1e3
            color.setHex(COLORS.secondary);
            color.multiplyScalar(0.5 + Math.random() * 0.5);
          } else {
            // Muted teal - #60b8c2
            color.setHex(COLORS.muted);
            color.multiplyScalar(0.4 + Math.random() * 0.4);
          }

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;
          sizes[j] = Math.random() * 2 + 0.3;
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
              
              float angle = time * 0.02 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xz = rot * pos.xz;
              
              vOpacity = 0.5 + 0.3 * sin(time * 2.0 + position.x * 0.05 + position.y * 0.05);
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (280.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            varying float vOpacity;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = (1.0 - smoothstep(0.0, 0.5, dist)) * vOpacity * 0.8;
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

      // Refined wheel layers with formal colors
      const wheelLayers = [
        { radius: 100, tubeRadius: 2.5, color: COLORS.primary, opacity: 0.4 },
        { radius: 85, tubeRadius: 1.8, color: COLORS.secondary, opacity: 0.35 },
        { radius: 70, tubeRadius: 1.3, color: COLORS.muted, opacity: 0.3 },
        { radius: 55, tubeRadius: 1, color: COLORS.primary, opacity: 0.25 },
        { radius: 40, tubeRadius: 0.7, color: COLORS.secondary, opacity: 0.2 }
      ];

      wheelLayers.forEach((layer, index) => {
        const geometry = new THREE.TorusGeometry(layer.radius, layer.tubeRadius, 32, 100);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.userData = { rotationSpeed: 0.015 * (index % 2 === 0 ? 1 : -1) * (1 + index * 0.15) };
        refs.wheelOfTime.add(ring);
      });

      // Spokes with primary color
      for (let i = 0; i < 8; i++) {
        const spokeGeometry = new THREE.BoxGeometry(200, 1.5, 1.5);
        const spokeMaterial = new THREE.MeshBasicMaterial({
          color: COLORS.primary,
          transparent: true,
          opacity: 0.25
        });
        const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);
        spoke.rotation.z = (i * Math.PI) / 4;
        refs.wheelOfTime.add(spoke);
      }

      // Hub with secondary color
      const hubGeometry = new THREE.SphereGeometry(12, 32, 32);
      const hubMaterial = new THREE.MeshBasicMaterial({
        color: COLORS.secondary,
        transparent: true,
        opacity: 0.5
      });
      const hub = new THREE.Mesh(hubGeometry, hubMaterial);
      refs.wheelOfTime.add(hub);

      // Runes with primary cyan
      const runeCount = 80;
      const runeGeometry = new THREE.BufferGeometry();
      const runePositions = new Float32Array(runeCount * 3);

      for (let i = 0; i < runeCount; i++) {
        const angle = (i / runeCount) * Math.PI * 2;
        const radius = 30 + Math.random() * 70;
        runePositions[i * 3] = Math.cos(angle) * radius;
        runePositions[i * 3 + 1] = Math.sin(angle) * radius;
        runePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }

      runeGeometry.setAttribute('position', new THREE.BufferAttribute(runePositions, 3));

      const runeMaterial = new THREE.PointsMaterial({
        color: COLORS.primary,
        size: 2.5,
        transparent: true,
        opacity: 0.6,
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
        { radius: 40, color: COLORS.primary, z: -80, rotationX: 0.4 },
        { radius: 60, color: COLORS.secondary, z: -150, rotationX: 0.6 },
        { radius: 35, color: COLORS.muted, z: -220, rotationX: 0.3 },
        { radius: 80, color: COLORS.primary, z: -300, rotationX: 0.5 }
      ];

      ringConfigs.forEach((config, i) => {
        const geometry = new THREE.TorusGeometry(config.radius, 0.6, 16, 100);
        const material = new THREE.MeshBasicMaterial({
          color: config.color,
          transparent: true,
          opacity: 0.2
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.position.z = config.z;
        ring.rotation.x = Math.PI * config.rotationX;
        ring.userData = {
          speed: 0.12 + i * 0.06,
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

      const particleCount = 2500;
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
        const color = new THREE.Color();

        if (colorChoice < 0.6) {
          // Primary cyan
          color.setHex(COLORS.primary);
        } else if (colorChoice < 0.85) {
          // Lavender
          color.setHex(COLORS.secondary);
        } else {
          // Muted teal
          color.setHex(COLORS.muted);
        }

        color.multiplyScalar(0.7 + Math.random() * 0.3);

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        speeds[i] = Math.random() * 1.5 + 0.3;
        sizes[i] = Math.random() * 1.8 + 0.8;
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
            
            pos.y = mod(pos.y - time * speed * 25.0, 500.0) - 250.0;
            
            vOpacity = smoothstep(-250.0, -100.0, pos.y) * smoothstep(250.0, 100.0, pos.y);
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (230.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vOpacity;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            float alpha = (1.0 - dist * 2.0) * vOpacity * 0.6;
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
        const z = Math.sin(t * 3) * 15;
        curve.points.push(new THREE.Vector3(x, y, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(200));
      const material = new THREE.LineBasicMaterial({
        color: COLORS.secondary,
        transparent: true,
        opacity: 0.3
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
        refs.wheelOfTime.rotation.z = time * 0.025;

        refs.wheelOfTime.children.forEach((child) => {
          if (child.userData.rotationSpeed) {
            child.rotation.z += child.userData.rotationSpeed * 0.016;
          }
        });

        const pulse = 1 + Math.sin(time * 1.2) * 0.02;
        refs.wheelOfTime.scale.set(pulse, pulse, pulse);
      }

      refs.timeRings.forEach((ring) => {
        ring.rotation.z = time * ring.userData.speed * ring.userData.direction;
        ring.rotation.y = Math.sin(time * 0.25 + ring.userData.baseZ * 0.01) * 0.12;
      });

      if (refs.codeParticles) {
        (refs.codeParticles.material as THREE.ShaderMaterial).uniforms.time.value = time;
      }

      if (refs.serpent) {
        refs.serpent.rotation.z = time * 0.04;
        refs.serpent.rotation.y = Math.sin(time * 0.15) * 0.08;
      }

      if (refs.camera && refs.targetCameraX !== undefined) {
        const smoothingFactor = 0.04;

        smoothCameraPos.current.x +=
          (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y +=
          (refs.targetCameraY! - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z +=
          (refs.targetCameraZ! - smoothCameraPos.current.z) * smoothingFactor;

        const floatX = Math.sin(time * 0.12) * 2;
        const floatY = Math.cos(time * 0.08) * 1.5;

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

  const titleText = 'HACKED 4.0';
  const titleChars = titleText.split('').map((char, index) => (
    <span key={index} className="title-char">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  const sectionData = [
    {
      title: 'ABOUT',
      line1: 'A 24-hour flagship hackathon where innovation meets creativity,',
      line2: 'Empowering participants to build groundbreaking solutions to real-world problems'
    },
    {
      title: 'THEME',
      line1: 'An open theme empowering creative solutions—explore any problem, any vision',
      line2: 'Judged on Execution and Learning: Implementation quality meets innovative thinking'
    }
  ];

  return (
    <div ref={containerRef} className={`hero-container ${!isInHeroSection ? 'hero-hidden' : ''}`}>
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="scanlines"></div>
      <div className="vignette"></div>

      {/* Social Links - Only visible in hero section */}
      <div
        ref={socialLinksRef}
        className={`social-link-2s-container ${!isInHeroSection ? 'hidden' : ''}`}
      >
        <SocialLink
          icon={<Linkedin size={32} strokeWidth={1.5} />}
          href="https://www.linkedin.com/in/acic-bmu-foundation-719561220/"
        />
        <SocialLink
          icon={<Instagram size={32} strokeWidth={1.5} />}
          href="https://www.instagram.com/propel_bmu?igsh=OHllZWFpODNxOXdz"
        />
        <SocialLink
          icon={<Facebook size={32} strokeWidth={1.5} />}
          href="https://www.facebook.com/profile.php?id=61584250505226"
        />
      </div>

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

            {/* Countdown Timer */}
            <div className="countdown-container">
              <div className="countdown-box">
                <div className="countdown-value">{String(countdown.days).padStart(2, '0')}</div>
                <div className="countdown-label">Days</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-box">
                <div className="countdown-value">{String(countdown.hours).padStart(2, '0')}</div>
                <div className="countdown-label">Hours</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-box">
                <div className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</div>
                <div className="countdown-label">Minutes</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-box">
                <div className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</div>
                <div className="countdown-label">Seconds</div>
              </div>
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

              {/* Download Brochure Button - Only for ABOUT section */}
              {i === 0 && (
                <div className="hero-button-container">
                  {/* Anchor that downloads the event prospectus placed in public/pdf */}
                  <a
                    className="hero-brochure-button"
                    href="/pdf/Event%20prospectus%20hacked%204.0.pdf"
                    download="Event prospectus hacked 4.0.pdf"
                    aria-label="Download Event Brochure"
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
                    Download Event Brochure
                  </a>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;