// app/auth/editor/page.tsx
'use client';

import React from 'react';
import { UserButton } from "@clerk/nextjs";
import { ProfileEditor } from './components/profile';
import { ProjectEditor } from './components/projects';
import { InterestEditor } from './components/interests';
import { DebugInfo } from './components/token';
import { EditorNavigation } from './components/navbar';
import { useEditorPageLogic } from '@/hooks/editor-page-logic';
import Footer from './components/footer';


export default function EditorPage() {
  // Use the custom hook to get all logic and state
  const {
    isLoaded,
    isSignedIn,
    user,
    syncStatus,
    syncError,
    manualToken,
    decodedManualToken,
    manualTokenStatus,
    manualTokenError,
    handleGetManualToken,
    activeSection,
    setActiveSection,
  } = useEditorPageLogic();

  // --- Loading and Auth States ---
  if (!isLoaded) {
    return <div className="p-8">Loading authentication...</div>;
  }
  if (!isSignedIn) {
     return <div className="p-8">Access Denied. Please sign in.</div>;
  }

  // --- Render Function to select active component ---
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileEditor user={user} />;
      case 'projects':
        return <ProjectEditor />;
      case 'interests':
        return <InterestEditor />;
      case 'debug':
        return (
          <DebugInfo
            syncStatus={syncStatus}
            syncError={syncError}
            manualTokenStatus={manualTokenStatus}
            manualTokenError={manualTokenError}
            manualToken={manualToken}
            decodedManualToken={decodedManualToken}
            onGetManualToken={handleGetManualToken}
          />
        );
      default:
        // Optional: Handle unknown section or default to profile
        return <ProfileEditor user={user} />;
    }
  };

  // --- Render the Page Layout ---
  return (
    <div className="p-8 font-sans max-w-6xl mx-auto "> {/* Slightly wider max-width */}
      {/* Header */}
      <header className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold">Editor Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">

        {/* Sidebar Navigation */}
        <EditorNavigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
        />

        {/* Content Area based on activeSection */}
        <main className="flex-1 min-w-0"> {/* Added min-w-0 for flexbox shrinking issues */}
          {renderActiveSection()}
        </main>

      </div> {/* End flex container */}
    <Footer/>
      </div>
  );
}