// app/layout.tsx
'use client';

import { Metadata } from 'next';
import { AuthProvider } from './context/AuthContext';
import './globals.css';

// export const metadata: Metadata = {
//   title: 'Periscope Chat',
//   description: 'A chat application',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}