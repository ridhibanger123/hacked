// src/types/lenis.d.ts
declare module 'lenis' {
  interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
    direction?: 'vertical' | 'horizontal';
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    on(event: string, callback: (...args: any[]) => void): void;
    off(event: string, callback: (...args: any[]) => void): void;
    destroy(): void;
    scrollTo(target: string | number | HTMLElement, options?: object): void;
    start(): void;
    stop(): void;
  }
}