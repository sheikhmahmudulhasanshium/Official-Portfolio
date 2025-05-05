// app/auth/layout.tsx
import React from 'react';

// This layout wraps the sign-in and sign-up pages
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {/* Children will be the sign-in or sign-up page component */}
      {children}
    </div>
  );
}