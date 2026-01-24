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
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/AnToAnt',
  COMING_SOON: '/coming-soon',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_CONDITIONS: '/terms-and-conditions',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
