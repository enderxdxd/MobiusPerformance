export const animationConfig = {
  // Anime.js configurations
  anime: {
    duration: 1000,
    easing: 'easeOutExpo',
    delay: (el: any, i: number) => i * 100,
  },
  
  // GSAP ScrollTrigger configurations
  gsap: {
    scrollTrigger: {
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
    duration: 1,
    ease: 'power2.out',
  },
  
  // Framer Motion variants
  framerMotion: {
    fadeInUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    },
    stagger: {
      visible: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
  },
  
  // AOS (Animate On Scroll) settings
  aos: {
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 120,
  },
  
  // Three.js animation settings
  three: {
    camera: {
      position: [0, 0, 5],
      fov: 75,
    },
    controls: {
      enableDamping: true,
      dampingFactor: 0.05,
      autoRotate: true,
      autoRotateSpeed: 0.5,
    },
  },
};
