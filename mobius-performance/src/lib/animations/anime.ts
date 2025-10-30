// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const anime = require('animejs') as any;

// Basic animation presets
export const fadeInUp = (targets: string | Element | NodeList, delay: number = 0) => {
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    delay,
    easing: 'easeOutQuart'
  });
};

export const fadeInLeft = (targets: string | Element | NodeList, delay: number = 0) => {
  return anime({
    targets,
    opacity: [0, 1],
    translateX: [-30, 0],
    duration: 800,
    delay,
    easing: 'easeOutQuart'
  });
};

export const fadeInRight = (targets: string | Element | NodeList, delay: number = 0) => {
  return anime({
    targets,
    opacity: [0, 1],
    translateX: [30, 0],
    duration: 800,
    delay,
    easing: 'easeOutQuart'
  });
};

export const scaleIn = (targets: string | Element | NodeList, delay: number = 0) => {
  return anime({
    targets,
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 600,
    delay,
    easing: 'easeOutBack'
  });
};

export const slideInUp = (targets: string | Element | NodeList, delay: number = 0) => {
  return anime({
    targets,
    translateY: ['100%', 0],
    duration: 800,
    delay,
    easing: 'easeOutCubic'
  });
};

export const rotateIn = (targets: string | Element | NodeList, delay: number = 0) => {
  return anime({
    targets,
    opacity: [0, 1],
    rotate: [-180, 0],
    duration: 800,
    delay,
    easing: 'easeOutBack'
  });
};

// Stagger animations
export const staggerFadeIn = (targets: string | Element | NodeList, staggerDelay: number = 100) => {
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    delay: anime.stagger(staggerDelay),
    easing: 'easeOutQuart'
  });
};

export const staggerSlideIn = (targets: string | Element | NodeList, staggerDelay: number = 100) => {
  return anime({
    targets,
    translateX: [-50, 0],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(staggerDelay),
    easing: 'easeOutCubic'
  });
};

// Number counting animation
export const countUp = (
  targets: string | Element | NodeList, 
  endValue: number, 
  duration: number = 2000,
  startValue: number = 0
) => {
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : 
                   targets instanceof Element ? [targets] : targets;

  return anime({
    targets: { value: startValue },
    value: endValue,
    duration,
    easing: 'easeOutQuart',
    update: function(anim: anime.AnimeInstance) {
      const currentValue = Math.round((anim.animatables[0].target as unknown as { value: number }).value);
      (elements as NodeListOf<Element>).forEach(el => {
        el.textContent = currentValue.toString();
      });
    }
  });
};

// Progress bar animation
export const progressBar = (
  targets: string | Element | NodeList, 
  percentage: number, 
  duration: number = 1500
) => {
  return anime({
    targets,
    width: `${percentage}%`,
    duration,
    easing: 'easeOutCubic'
  });
};

// Path drawing animation
export const drawPath = (
  targets: string | Element | NodeList, 
  duration: number = 2000
) => {
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : 
                   targets instanceof Element ? [targets] : targets;

  // Set initial state
  (elements as NodeListOf<SVGPathElement>).forEach(path => {
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength.toString();
    path.style.strokeDashoffset = pathLength.toString();
  });

  return anime({
    targets,
    strokeDashoffset: 0,
    duration,
    easing: 'easeInOutSine'
  });
};

// Morphing animation
export const morphPath = (
  targets: string | Element | NodeList,
  newPath: string,
  duration: number = 1000
) => {
  return anime({
    targets,
    d: newPath,
    duration,
    easing: 'easeInOutQuart'
  });
};

// Floating animation
export const floatingAnimation = (
  targets: string | Element | NodeList,
  amplitude: number = 10,
  duration: number = 3000
) => {
  return anime({
    targets,
    translateY: [-amplitude, amplitude],
    duration,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
  });
};

// Pulse animation
export const pulseAnimation = (
  targets: string | Element | NodeList,
  scale: number = 1.1,
  duration: number = 1000
) => {
  return anime({
    targets,
    scale: [1, scale, 1],
    duration,
    loop: true,
    easing: 'easeInOutQuad'
  });
};

// Shake animation
export const shakeAnimation = (
  targets: string | Element | NodeList,
  intensity: number = 10,
  duration: number = 500
) => {
  return anime({
    targets,
    translateX: [
      { value: intensity, duration: duration / 8 },
      { value: -intensity, duration: duration / 8 },
      { value: intensity / 2, duration: duration / 8 },
      { value: -intensity / 2, duration: duration / 8 },
      { value: intensity / 4, duration: duration / 8 },
      { value: -intensity / 4, duration: duration / 8 },
      { value: 0, duration: duration / 4 }
    ],
    easing: 'easeOutQuart'
  });
};

// Typewriter effect
export const typeWriter = (
  targets: string | Element | NodeList,
  text: string,
  speed: number = 50
) => {
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : 
                   targets instanceof Element ? [targets] : targets;

  let currentIndex = 0;
  
  return anime({
    targets: { progress: 0 },
    progress: text.length,
    duration: text.length * speed,
    easing: 'linear',
    update: function(anim: anime.AnimeInstance) {
      const progress = Math.floor((anim.animatables[0].target as unknown as { progress: number }).progress);
      if (progress > currentIndex) {
        currentIndex = progress;
        (elements as NodeListOf<Element>).forEach(el => {
          el.textContent = text.substring(0, currentIndex);
        });
      }
    }
  });
};

// Timeline utilities
export const createTimeline = (options: anime.AnimeParams = {}) => {
  return anime.timeline(options);
};

// Scroll-triggered animations
export const onScrollAnimation = (
  targets: string | Element | NodeList,
  animation: anime.AnimeParams,
  threshold: number = 0.1
) => {
  if (typeof window === 'undefined') return;

  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : 
                   targets instanceof Element ? [targets] : Array.from(targets as NodeListOf<Element>);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          ...animation
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });

  (elements as Element[]).forEach(el => observer.observe(el));

  return observer;
};

// Utility functions
export const setInitialState = (targets: string | Element | NodeList, properties: anime.AnimeParams) => {
  return anime.set(targets, properties);
};

export const removeAnimation = (targets: string | Element | NodeList) => {
  return anime.remove(targets);
};

// Custom easing functions
export const customEasing = {
  elastic: 'easeOutElastic(1, .8)',
  bounce: 'easeOutBounce',
  back: 'easeOutBack(1.7)',
  smooth: 'easeInOutQuart',
  sharp: 'easeOutCubic'
};

// Performance optimized animations for mobile
export const mobileOptimized = {
  duration: 400,
  easing: 'easeOutQuart'
};

// Complex animations
export const cardFlip = (
  targets: string | Element | NodeList,
  duration: number = 800
) => {
  const tl = anime.timeline();
  
  tl.add({
    targets,
    rotateY: 90,
    duration: duration / 2,
    easing: 'easeInQuart'
  }).add({
    targets,
    rotateY: 0,
    duration: duration / 2,
    easing: 'easeOutQuart'
  });

  return tl;
};

export const slideShow = (
  targets: string | Element | NodeList,
  direction: 'left' | 'right' = 'left',
  duration: number = 1000
) => {
  const translateValue = direction === 'left' ? '-100%' : '100%';
  
  return anime({
    targets,
    translateX: [translateValue, 0],
    opacity: [0, 1],
    duration,
    easing: 'easeOutCubic'
  });
};

export default {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  slideInUp,
  rotateIn,
  staggerFadeIn,
  staggerSlideIn,
  countUp,
  progressBar,
  drawPath,
  morphPath,
  floatingAnimation,
  pulseAnimation,
  shakeAnimation,
  typeWriter,
  createTimeline,
  onScrollAnimation,
  setInitialState,
  removeAnimation,
  customEasing,
  mobileOptimized,
  cardFlip,
  slideShow
};
