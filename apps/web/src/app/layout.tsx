'use client';

import { ReactNode, useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@elo-tech/ui';
import { ConvexClientProvider } from './ConvexClientProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
