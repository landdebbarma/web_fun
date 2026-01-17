// Application configuration constants
export const APP_CONFIG = {
  name: 'AnToAnt',
  description: 'AnToAnt Landing Page',
  version: '1.0.0',
} as const;

// Animation configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
} as const;
