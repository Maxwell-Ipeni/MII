import { z } from 'zod';

export const appConfigSchema = z.object({
  APP_NAME: z.string().default('Elo Tech'),
  PRIMARY_COLOR: z.string().default('#3B82F6'),
  SECONDARY_COLOR: z.string().default('#22C55E'),
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
});

export type AppConfig = z.infer<typeof appConfigSchema>;

export function formatCurrency(amount: number, currency = 'KES'): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'medium',
  }).format(new Date(date));
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
