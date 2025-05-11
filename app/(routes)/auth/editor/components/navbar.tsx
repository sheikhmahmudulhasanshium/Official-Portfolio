import React from 'react';
import { Button } from "@/components/ui/button";

// This is the source of truth for EditorSection.
// hooks/editor-page-logic.ts MUST import and use this type.
export type EditorSection = 'profile' | 'projects' | 'interests' | 'debug' | 'education' | 'services';

export interface EditorNavigationProps {
    activeSection: EditorSection;
    setActiveSection: (section: EditorSection) => void;
}

export const EditorNavigation: React.FC<EditorNavigationProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const sections: { id: EditorSection; label: string; debug?: boolean }[] = [
    { id: 'profile', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'interests', label: 'Interests' },
    { id: 'services', label: 'Services' },
    { id: 'education', label: 'Education' },
    { id: 'debug', label: 'Debug/Status', debug: true },
  ];

  return (
    <nav className="flex flex-row md:flex-col gap-2 md:w-48 border-b md:border-b-0 md:border-r pr-4 pb-4 md:pb-0 shrink-0">
      {sections.map((section) => (
        <Button
          key={section.id}
          variant={activeSection === section.id ? 'secondary' : 'ghost'}
          className={`justify-start w-full ${section.debug ? 'mt-auto md:mt-4 text-xs text-gray-500' : ''}`} // Position debug at bottom on md+
          onClick={() => setActiveSection(section.id)}
        >
          {section.label}
        </Button>
      ))}
    </nav>
  );
};