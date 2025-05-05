// app/auth/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      path="/auth/sign-in" // Tell Clerk the base path for sign-in
      routing="path"      // Use path-based routing
    />
  );
}