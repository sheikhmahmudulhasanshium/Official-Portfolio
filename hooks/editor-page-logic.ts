// hooks/useEditorPageLogic.ts
import { useState, useEffect, useCallback } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { jwtDecode } from 'jwt-decode';
import { EditorSection } from '@/app/(routes)/auth/editor/components/navbar';

// Define a stricter interface for the expected JWT payload (can be shared or defined here)
interface JwtPayload {
  iss?: string; sub?: string; aud?: string | string[]; exp?: number; nbf?: number; iat?: number; jti?: string;
  sid?: string; org_id?: string; org_role?: string; org_slug?: string;
  email?: string; firstName?: string; lastName?: string; profileImageUrl?: string;
}

// Define the possible sections the editor can display (can be shared or defined here)

export const useEditorPageLogic = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  // === State ===
  // Automatic Sync
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [syncError, setSyncError] = useState<string | null>(null);

  // Manual Token
  const [manualToken, setManualToken] = useState<string | null>(null);
  const [decodedManualToken, setDecodedManualToken] = useState<JwtPayload | null>(null);
  const [manualTokenStatus, setManualTokenStatus] = useState<'idle' | 'fetching' | 'success' | 'error'>('idle');
  const [manualTokenError, setManualTokenError] = useState<string | null>(null);

  // Active Section
  const [activeSection, setActiveSection] = useState<EditorSection>('profile');

  // === Effects ===
  // Automatic Backend Sync
  useEffect(() => {
    // Avoid running sync if already synced or currently syncing in this session/mount
    if (!isLoaded || !isSignedIn || syncStatus !== 'idle') {
        return;
    }

    const syncUserWithBackend = async () => {
      setSyncStatus('syncing');
      setSyncError(null);
      console.log('Attempting automatic user sync with backend...');
      try {
        const token = await getToken();
        if (!token) throw new Error("Could not retrieve token for automatic sync.");

        // Optional: Decode/log token payload
        try {
           jwtDecode<JwtPayload>(token);
           // console.log("--- DECODED JWT PAYLOAD (Automatic Sync) ---", decodedPayload);
        } catch (decodeError) { console.error("Error decoding JWT (auto-sync):", decodeError); }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000';
        const response = await fetch(`${backendUrl}/auth/sync`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown sync error' }));
          throw new Error(`Auto-sync failed: ${response.status} - ${errorData.message}`);
        }

        const result = await response.json();
        console.log('Automatic user sync successful:', result);
        setSyncStatus('synced');
      } catch (error: unknown) {
        console.error("Error during automatic sync:", error);
        const message = error instanceof Error ? error.message : String(error);
        setSyncError(message);
        setSyncStatus('error');
      }
    };

    syncUserWithBackend();
    // Only re-run if auth state changes *to* loaded and signed in, or if getToken changes (unlikely but safe)
  }, [isLoaded, isSignedIn, getToken, syncStatus]);


  // === Handlers ===
  // Manual Token Fetch (using useCallback for potential performance optimization if passed deep)
  const handleGetManualToken = useCallback(async () => {
    setManualTokenStatus('fetching');
    setManualToken(null); setDecodedManualToken(null); setManualTokenError(null);
    console.log('Attempting to get token manually...');
    try {
      const token = await getToken();
      if (!token) throw new Error("Could not retrieve token manually.");
      setManualToken(token);
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setDecodedManualToken(decoded);
        console.log('--- DECODED JWT PAYLOAD (Manual Fetch) ---', decoded);
        setManualTokenStatus('success');
      } catch (decodeError) {
         console.error("Error decoding manually fetched token:", decodeError);
         setManualTokenStatus('success'); // Token fetched, but decoding failed
         setManualTokenError("Token fetched, but failed to decode payload.");
      }
    } catch (error: unknown) {
      console.error("Error getting token manually:", error);
      const message = error instanceof Error ? error.message : String(error);
      setManualTokenError(message);
      setManualTokenStatus('error');
    }
  }, [getToken]); // Dependency: getToken

  // === Return Values ===
  // Return everything the component needs
  return {
    // Auth State
    isLoaded,
    isSignedIn,
    user,

    // Sync State
    syncStatus,
    syncError,

    // Manual Token State & Handler
    manualToken,
    decodedManualToken,
    manualTokenStatus,
    manualTokenError,
    handleGetManualToken,

    // Editor Section State & Setter
    activeSection,
    setActiveSection,
  };
};