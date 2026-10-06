import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Test It With Kashii — Autonomous AI QA Platform',
  description: 'Deterministic, AI-orchestrated autonomous testing platform: Observe -> Plan -> Act -> Evidence -> Verify -> Classify -> Report -> Retest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
