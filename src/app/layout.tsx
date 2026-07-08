import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'UFAS Cortex - Learn More. Stress Less.',
    template: '%s | UFAS Cortex',
  },
  description:
    'Modern educational platform for medical students at the Faculty of Medicine, University Ferhat Abbas Setif 1. Access previous exams, lecture notes, and AI-powered study tools.',
  keywords: [
    'medical education',
    'medical students',
    'UFAS',
    'University Ferhat Abbas Setif',
    'medical resources',
    'exam preparation',
    'study tools',
    'AI learning',
  ],
  authors: [{ name: 'UFAS Cortex Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ufas-cortex.vercel.app',
    siteName: 'UFAS Cortex',
    title: 'UFAS Cortex - Learn More. Stress Less.',
    description:
      'Modern educational platform for medical students. Access previous exams, lecture notes, and AI-powered study tools.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UFAS Cortex - Learn More. Stress Less.',
    description:
      'Modern educational platform for medical students. Access exams, notes, and AI study tools.',
  },
  icons: {
    icon: '/logo/favicon.ico',
    apple: '/logo/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 font-sans dark:bg-gray-950">
        {children}
      </body>
    </html>
  );
}
