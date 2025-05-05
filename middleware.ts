// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',                // Public portfolio page
  '/auth(.*)',        // Allow access to /auth/sign-in, /auth/sign-up, etc.
  // '/api/public(.*)' // Example: if you had public API routes
]);

// export default clerkMiddleware((auth, req) => { // This 'auth' IS the object
export default clerkMiddleware((auth, req) => {
  // If the route is public, allow access.
  if (isPublicRoute(req)) {
    return NextResponse.next(); // Allow request to proceed
  }

  // If the route is not public, protect it.
  // Access protect directly on the 'auth' object passed by clerkMiddleware
  auth.protect(); // <--- CORRECTED LINE

});

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!.*\\..*|_next).*)', // Base matcher: Excludes files with extensions & _next
    '/',                     // Ensure root route is matched
    '/(api|trpc)(.*)',       // Include API routes
  ],
  // Recommended matcher from Clerk docs:
  // matcher: [
  //   '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  //   '/(api|trpc)(.*)',
  // ],
};