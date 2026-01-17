// Route constants for the application
export const ROUTES = {
  HOME: '/',
  PRODUCT: '/product',
  FEATURES: '/features',
  PRICING: '/pricing',
  ABOUT: '/about',
  AnToAnt_AI: '/AnToAntAi',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/AnToAnt',
  COMING_SOON: '/coming-soon',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
