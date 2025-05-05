// app/auth/editor/page.tsx
'use client';

import { useAuth, useUser, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

// Define a stricter interface for the expected JWT payload
interface JwtPayload {
  // Standard Claims (optional but common)
  iss?: string; // Issuer
  sub?: string; // Subject (often Clerk User ID)
  aud?: string | string[]; // Audience
  exp?: number; // Expiration Time (Unix timestamp)
  nbf?: number; // Not Before (Unix timestamp)
  iat?: number; // Issued At (Unix timestamp)
  jti?: string; // JWT ID

  // Clerk Specific Claims (optional but common)
  sid?: string; // Session ID
  org_id?: string; // Organization ID (if applicable)
  org_role?: string; // Organization Role (if applicable)
  org_slug?: string; // Organization Slug (if applicable)

  // Your Custom Claims (ensure these match keys in JWT template)
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string; // Example if you added it

  // You can add other known custom claims here explicitly
  // You might have claims like 'publicMetadata' or 'privateMetadata' as well
  //[key: string]: unknown; // Allow other claims not explicitly defined
}


export default function EditorPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  // === State for AUTOMATIC backend sync ===
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [syncError, setSyncError] = useState<string | null>(null); // Error for AUTOMATIC sync

  // === State for MANUAL token fetching/display ===
  const [manualToken, setManualToken] = useState<string | null>(null);
  const [decodedManualToken, setDecodedManualToken] = useState<JwtPayload | null>(null);
  const [manualTokenStatus, setManualTokenStatus] = useState<'idle' | 'fetching' | 'success' | 'error'>('idle');
  const [manualTokenError, setManualTokenError] = useState<string | null>(null);

  // --- useEffect to trigger AUTOMATIC sync on load/signin ---
  useEffect(() => {
    if (isLoaded && isSignedIn && syncStatus === 'idle') {
      const syncUserWithBackend = async () => {
        setSyncStatus('syncing');
        setSyncError(null);
        console.log('Attempting automatic user sync with backend...');
        try {
          const token = await getToken();
          if (!token) {
            throw new Error("Could not retrieve token for automatic sync.");
          }

          try {
            const decodedPayload = jwtDecode<JwtPayload>(token);
            console.log("--- DECODED JWT PAYLOAD (Automatic Sync - Frontend) ---");
            console.log(decodedPayload);
            console.log("-------------------------------------------------------");
            if (decodedPayload.email) console.log("✅ Email claim found in token:", decodedPayload.email);
            else console.warn("⚠️ Email claim MISSING in token payload!");
            if (decodedPayload.firstName) console.log("✅ firstName claim found:", decodedPayload.firstName);
            else console.warn("⚠️ firstName claim MISSING!");
            if (decodedPayload.lastName) console.log("✅ lastName claim found:", decodedPayload.lastName);
            else console.warn("⚠️ lastName claim MISSING!");
          } catch (decodeError) {
            console.error("Error decoding JWT on frontend (during auto-sync):", decodeError);
          }

          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000';
          const apiUrl = `${backendUrl}/auth/sync`;
          console.log('Attempting to POST to backend API for auto-sync:', apiUrl);

          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            console.error('Auto-sync failed - Response Status:', response.status, 'Response Body:', errorData);
            throw new Error(`Auto-sync failed: ${response.status} - ${errorData.message || 'Unknown error'}`);
          }

          const result = await response.json();
          console.log('Automatic user sync successful (Backend Response):', result);
          setSyncStatus('synced');

        } catch (error: unknown) {
          console.error("Error during automatic sync process:", error);
          let errorMessage = "An unexpected error occurred during auto-sync.";
          if (error instanceof Error) errorMessage = error.message;
          else if (typeof error === 'string') errorMessage = error;
          setSyncError(errorMessage);
          setSyncStatus('error');
        }
      };

      syncUserWithBackend();
    }
  }, [isLoaded, isSignedIn, getToken, syncStatus, user]);

  // --- Handler for MANUAL token fetch ---
  const handleGetManualToken = async () => {
    setManualTokenStatus('fetching');
    setManualToken(null);
    setDecodedManualToken(null);
    setManualTokenError(null);
    console.log('Attempting to get token manually...');

    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Could not retrieve token manually.");
      }
      setManualToken(token);

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setDecodedManualToken(decoded);
        console.log('--- DECODED JWT PAYLOAD (Manual Fetch) ---');
        console.log(decoded);
        console.log('------------------------------------------');
        setManualTokenStatus('success');
      } catch (decodeError) {
         console.error("Error decoding manually fetched token:", decodeError);
         setManualTokenStatus('success'); // Still success because token was fetched
         setManualTokenError("Token fetched, but failed to decode payload.");
      }

    } catch (error: unknown) {
      console.error("Error getting token manually:", error);
      let errorMessage = "Failed to fetch token.";
      if (error instanceof Error) errorMessage = error.message;
      else if (typeof error === 'string') errorMessage = error;
      setManualTokenError(errorMessage);
      setManualTokenStatus('error');
    }
  };


  // Loading State
  if (!isLoaded) {
    return (
      <div className="p-8 font-sans max-w-3xl mx-auto">
        <p>Loading authentication state...</p>
      </div>
    );
  }

  // Not Signed In State (Fallback)
  if (!isSignedIn) {
    return (
       <div className="p-8 font-sans max-w-3xl mx-auto">
         <p>Access Denied. Please sign in.</p>
       </div>
    );
  }

  // Signed In: Render main content
  return (
    <div className="p-8 font-sans max-w-3xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold">Editor Area</h1>
        {/* UserButton includes sign out functionality */}
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col gap-6">
        <p>Welcome, {user?.firstName || user?.primaryEmailAddress?.emailAddress || 'User'}!</p>
        <p>This page is only accessible after signing in.</p>

        {/* Automatic Sync Status Section */}
        <div className="p-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Automatic Backend Sync</h3>
          <p>Status: <strong className="capitalize">{syncStatus}</strong></p>
          {syncStatus === 'syncing' && <p className="mt-1 text-blue-600">Syncing user data with backend...</p>}
          {syncStatus === 'synced' && <p className="mt-1 text-green-600">User data sync process completed.</p>}
          {syncStatus === 'error' && <p className="mt-1 text-red-600 font-semibold">Sync Error: {syncError}</p>}
        </div>

        {/* Manual Token Fetch Section */}
        <div className="p-4 border border-dashed border-indigo-200 rounded-md bg-indigo-50 flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Manual Token Inspection</h3>
          <button
            onClick={handleGetManualToken}
            disabled={manualTokenStatus === 'fetching'}
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium self-start hover:bg-blue-700 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {manualTokenStatus === 'fetching' ? 'Fetching...' : 'Get JWT Token Manually'}
          </button>

          {/* Manual Token Error Display */}
          {manualTokenStatus === 'error' && !manualTokenError?.includes('decode') && ( // Show fetch error only if it's not the decode-specific one
             <p className="mt-1 text-red-600 font-semibold">Error fetching token: {manualTokenError}</p>
          )}

          {/* Manual Token Success Display */}
          {manualTokenStatus === 'success' && manualToken && (
            <div className="mt-2 flex flex-col gap-2">
              {/* Decoding Error (Specific Case) */}
              {manualTokenError && manualTokenError.includes('decode') && (
                <p className="text-orange-600 font-semibold">{manualTokenError}</p>
              )}

              {/* Raw Token */}
              <div>
                 <h4 className="text-md font-semibold mb-1">Raw JWT Token:</h4>
                 <textarea
                   className="w-full p-2 text-sm font-mono border border-gray-300 rounded-md min-h-[100px] break-all bg-white"
                   value={manualToken}
                   readOnly
                   rows={6}
                 />
              </div>

              {/* Decoded Payload */}
              <div>
                 <h4 className="text-md font-semibold mb-1">Decoded Payload:</h4>
                 {decodedManualToken ? (
                   <pre className="w-full p-2 text-sm font-mono border border-gray-300 rounded-md min-h-[100px] break-all whitespace-pre-wrap bg-white overflow-auto">
                     {JSON.stringify(decodedManualToken, null, 2)}
                   </pre>
                 ) : !manualTokenError?.includes('decode') ? ( // Only show this if decoding didn't specifically fail
                    <p className="text-gray-500">Could not decode token payload.</p>
                 ) : null }
              </div>
            </div>
          )}

          {/* Edge case: Success status but no token */}
           {manualTokenStatus === 'success' && !manualToken && (
             <p className="mt-1 text-red-600 font-semibold">Token fetch succeeded according to logic, but token value is missing.</p>
          )}
        </div>
      </main>
    </div>
  );
}