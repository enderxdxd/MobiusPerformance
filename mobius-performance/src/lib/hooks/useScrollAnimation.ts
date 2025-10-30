'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    amount: options.threshold || 0.1,
    once: options.triggerOnce !== false
  });

  return { ref, isInView };
};

export const useStaggeredAnimation = (
  itemCount: number,
  delay: number = 0.1
) => {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    refs.current = refs.current.slice(0, itemCount);
  }, [itemCount]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  const getDelay = (index: number) => index * delay;

  return { setRef, getDelay, refs: refs.current };
};

export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};

export const useCountUp = (
  endValue: number,
  duration: number = 2000,
  startValue: number = 0
) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    amount: 0.1,
    once: true
  });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentValue = startValue + (endValue - startValue) * progress;
      
      if (ref.current) {
        ref.current.textContent = Math.round(currentValue).toString();
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, endValue, duration, startValue]);

  return ref;
};

export const useTypewriter = (
  text: string,
  speed: number = 50,
  startDelay: number = 0
) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    amount: 0.1,
    once: true
  });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const typeNextCharacter = () => {
      if (currentIndex <= text.length && ref.current) {
        ref.current.textContent = text.slice(0, currentIndex);
        currentIndex++;
        
        if (currentIndex <= text.length) {
          timeoutId = setTimeout(typeNextCharacter, speed);
        }
      }
    };

    timeoutId = setTimeout(typeNextCharacter, startDelay);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isInView, text, speed, startDelay]);

  return ref;
};

export const useProgressBar = (
  targetPercentage: number,
  duration: number = 1500
) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    amount: 0.1,
    once: true
  });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentPercentage = targetPercentage * progress;
      
      if (ref.current) {
        ref.current.style.width = `${currentPercentage}%`;
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, targetPercentage, duration]);

  return ref;
};

export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
      ...options
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, options]);

  return ref;
};
