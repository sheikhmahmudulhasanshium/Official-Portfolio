// app/auth/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      path="/auth/sign-up" // Tell Clerk the base path for sign-up
      routing="path"      // Use path-based routing
    />
  );
}