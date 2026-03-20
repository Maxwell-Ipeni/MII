export const APP_CONFIG = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Elo Tech',
  PRIMARY_COLOR: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#3B82F6',
  SECONDARY_COLOR: process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#22C55E',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
} as const;

export const API_ENDPOINTS = {
  TENANTS: '/tenants',
  USERS: '/users',
  PRODUCTS: '/products',
  PAYMENTS: '/payments',
  NOTIFICATIONS: '/notifications',
  WEBHOOKS: '/webhooks',
} as const;
