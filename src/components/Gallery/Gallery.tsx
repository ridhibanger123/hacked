// gallery.tsx
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import './gallery.css';

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth fade in at start (0 -> 0.1) and fade out at end (0.9 -> 1)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.85, 0.95, 1],
    [0, 0.5, 1, 1, 0.5, 0]
  );

  // Smooth visibility - keeps element in DOM but hidden
  const display = useTransform(scrollYProgress, (value) => {
    return value <= 0 || value >= 1 ? 'none' : 'flex';
  });

  // Create scale transforms with eased values for smoother animation
  // Start scaling from a smaller base for smoother entry
  const scale1 = useTransform(scrollYProgress, [0, 0.1, 1], [0.8, 1, 4]);
  const scale2 = useTransform(scrollYProgress, [0, 0.1, 1], [0.8, 1, 5]);
  const scale3 = useTransform(scrollYProgress, [0, 0.1, 1], [0.8, 1, 6]);
  const scale4 = useTransform(scrollYProgress, [0, 0.1, 1], [0.8, 1, 5]);
  const scale5 = useTransform(scrollYProgress, [0, 0.1, 1], [0.8, 1, 6]);
  const scale6 = useTransform(scrollYProgress, [0, 0.1, 1], [0.8, 1, 8]);
  const scale7 = useTransform(scrollYProgress, [0, 0.1, 1], [0.8, 1, 9]);

  const scales = [scale1, scale2, scale3, scale4, scale5, scale6, scale7];

  // Individual image opacity - fade out as they scale up and move off screen
  const imageOpacities = [
    useTransform(scrollYProgress, [0, 0.05, 0.7, 0.85], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0, 0.05, 0.6, 0.75], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0, 0.05, 0.55, 0.7], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0, 0.05, 0.6, 0.75], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0, 0.05, 0.55, 0.7], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0, 0.05, 0.5, 0.65], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0, 0.05, 0.45, 0.6], [0, 1, 1, 0]),
  ];

  return (
    <>
      {/* Scroll trigger container */}
      <div ref={containerRef} className="zoom-parallax-container" />

      {/* Pinned/Fixed content with smooth opacity */}
      <motion.div
        className="zoom-parallax-pinned"
        style={{
          opacity,
          display,
        }}
      >
        {images.slice(0, 7).map(({ src, alt }, index) => (
          <motion.div
            key={index}
            style={{
              scale: scales[index % scales.length],
              opacity: imageOpacities[index % imageOpacities.length],
            }}
            className="zoom-parallax-item"
            data-index={index}
          >
            <div className="zoom-parallax-image-container">
              <img
                src={src}
                alt={alt || `Parallax image ${index + 1}`}
                className="zoom-parallax-image"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default ZoomParallax;