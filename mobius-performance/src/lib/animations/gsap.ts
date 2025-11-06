import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Animation presets
export const fadeInUp = {
  from: { opacity: 0, y: 50 },
  to: { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
};

export const fadeInLeft = {
  from: { opacity: 0, x: -50 },
  to: { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
};

export const fadeInRight = {
  from: { opacity: 0, x: 50 },
  to: { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
};

export const scaleIn = {
  from: { opacity: 0, scale: 0.8 },
  to: { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
};

export const slideInUp = {
  from: { y: '100%' },
  to: { y: '0%', duration: 0.8, ease: 'power3.out' }
};

// Utility functions
export const animateOnScroll = (
  selector: string,
  animation: any,
  options: any = {}
) => {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element) => {
    gsap.fromTo(element, animation.from, {
      ...animation.to,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...options
      }
    });
  });
};

export const staggerAnimation = (
  selector: string,
  animation: any,
  stagger: number = 0.1
) => {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll(selector);
  
  gsap.fromTo(elements, animation.from, {
    ...animation.to,
    stagger: stagger
  });
};

export const parallaxEffect = (
  selector: string,
  speed: number = 0.5
) => {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element) => {
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};

export const countUp = (
  selector: string,
  endValue: number,
  duration: number = 2,
  startValue: number = 0
) => {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element) => {
    gsap.fromTo(element, 
      { textContent: startValue },
      {
        textContent: endValue,
        duration: duration,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
};

export const typeWriter = (
  selector: string,
  text: string,
  speed: number = 0.05
) => {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element) => {
    gsap.to(element, {
      text: text,
      duration: text.length * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
};

export const morphPath = (
  selector: string,
  newPath: string,
  duration: number = 1
) => {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element) => {
    gsap.to(element, {
      attr: { d: newPath },
      duration: duration,
      ease: 'power2.inOut'
    });
  });
};

// Timeline utilities
export const createTimeline = (options: any = {}) => {
  return gsap.timeline(options);
};

export const createScrollTimeline = (trigger: string, options: any = {}) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      ...options
    }
  });
};

// Performance optimizations
export const batchAnimation = (
  selector: string,
  animation: any,
  batchSize: number = 10
) => {
  if (typeof window === 'undefined') return;

  ScrollTrigger.batch(selector, {
    onEnter: (elements) => {
      gsap.fromTo(elements, animation.from, animation.to);
    },
    onLeave: (elements) => {
      gsap.to(elements, { opacity: 0, y: -50, duration: 0.3 });
    },
    onEnterBack: (elements) => {
      gsap.to(elements, { opacity: 1, y: 0, duration: 0.3 });
    },
    batchMax: batchSize
  });
};

// Refresh ScrollTrigger (useful after dynamic content changes)
export const refreshScrollTrigger = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh();
  }
};

// Kill all ScrollTriggers (useful for cleanup)
export const killScrollTriggers = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.killAll();
  }
};

// Custom easing functions
export const customEases = {
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)',
  smooth: 'power2.inOut',
  sharp: 'power3.out',
  gentle: 'sine.inOut'
};

// Mobile-optimized animations
export const mobileOptimized = {
  duration: 0.4,
  ease: 'power2.out',
  force3D: true,
  transformOrigin: 'center center'
};

export default {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  slideInUp,
  animateOnScroll,
  staggerAnimation,
  parallaxEffect,
  countUp,
  typeWriter,
  morphPath,
  createTimeline,
  createScrollTimeline,
  batchAnimation,
  refreshScrollTrigger,
  killScrollTriggers,
  customEases,
  mobileOptimized
};
