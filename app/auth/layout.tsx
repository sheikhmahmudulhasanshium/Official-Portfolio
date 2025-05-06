// app/auth/layout.tsx
import React from 'react';

// This layout wraps the sign-in and sign-up pages
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='from-cyan-200 bg-gradient-to-l flex min-h-screen justify-center items-center' >
      {/* Children will be the sign-in or sign-up page component */}
      {children}
    </div>
  );
}