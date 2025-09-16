import { Variants, Transition } from 'framer-motion';

// Common animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'backOut' }
  }
};

export const slideInUp: Variants = {
  hidden: { y: '100%' },
  visible: { 
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

export const slideInDown: Variants = {
  hidden: { y: '-100%' },
  visible: { 
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

// Stagger animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Card animations
export const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.05, 
    y: -5,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

export const cardTap: Variants = {
  rest: { scale: 1 },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Button animations
export const buttonHover: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Modal animations
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 20,
    transition: { duration: 0.3 }
  }
};

// Navigation animations
export const navItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export const mobileMenu: Variants = {
  closed: { 
    opacity: 0, 
    height: 0,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  open: { 
    opacity: 1, 
    height: 'auto',
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

// Loading animations
export const spinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

export const pulse: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const bounce: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Page transitions
export const pageTransition: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: 0.4, ease: 'easeIn' }
  }
};

// Custom transitions
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30
};

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1]
};

export const quickTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut'
};

export const slowTransition: Transition = {
  duration: 1.2,
  ease: 'easeInOut'
};

// Utility functions
export const createStaggerVariants = (
  staggerDelay: number = 0.1,
  childrenDelay: number = 0.2
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childrenDelay
    }
  }
});

export const createFadeVariants = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 20,
  duration: number = 0.6
): Variants => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };

  return {
    hidden: { opacity: 0, ...getInitialPosition() },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { duration, ease: 'easeOut' }
    }
  };
};

export const createScaleVariants = (
  initialScale: number = 0.8,
  duration: number = 0.5
): Variants => ({
  hidden: { opacity: 0, scale: initialScale },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration, ease: 'backOut' }
  }
});

// Animation presets for common components
export const componentAnimations = {
  hero: {
    container: staggerContainer,
    title: fadeInUp,
    subtitle: fadeInUp,
    buttons: fadeInUp
  },
  card: {
    container: scaleIn,
    hover: cardHover,
    tap: cardTap
  },
  list: {
    container: staggerContainer,
    item: staggerItem
  },
  modal: {
    overlay: modalOverlay,
    content: modalContent
  },
  navigation: {
    item: navItem,
    mobileMenu: mobileMenu
  }
};

export default {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  slideInUp,
  slideInDown,
  rotateIn,
  staggerContainer,
  staggerItem,
  cardHover,
  cardTap,
  buttonHover,
  modalOverlay,
  modalContent,
  navItem,
  mobileMenu,
  spinner,
  pulse,
  bounce,
  pageTransition,
  springTransition,
  smoothTransition,
  quickTransition,
  slowTransition,
  createStaggerVariants,
  createFadeVariants,
  createScaleVariants,
  componentAnimations
};
