import React from 'react';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { StoreProvider } from '@/context/StoreContext';
import { ThemeProvider } from '@/context/ThemeContext';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Emotion Board App',
  description: 'Track your daily emotions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
