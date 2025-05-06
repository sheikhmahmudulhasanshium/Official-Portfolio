export interface PersonalInterest {
    title: string;
    description: string;
    iconPath: string;
    icon: string;
  }
  
  export interface Pricing {
    icon: string;
    iconLink: string;
    title: string;
    description:  string;
}
export interface Reviews {
  name:string,
  review:string,
  profileIconURL:string,
  designation:string,
  seasonalIdentifier:string,
  reviewerUrl:string,
}


export interface Projects {
  id: string;
  name: string;
  tags: string[];
  LogoUrl: string;
  image: string;
  description: string;
  projectURL: string;
  techStack?: { name: string; logoUrl: string }[]; // Updated to include name and logoUrl for each tech
  subProjects?: SubProject[];
}

export interface SubProject {
name: string;
image?: string;
src: string;
projectURL: string;
techStack?: { name: string; logoUrl: string }[]; // Updated to include name and logoUrl for each tech
}

// types/editor.ts (or types/index.ts, or wherever you keep shared types)
import type { UserResource } from '@clerk/types';

// Define the possible sections the editor can display
export type EditorSection = 'profile' | 'projects' | 'interests' | 'debug';

// Define a stricter interface for the expected JWT payload
export interface JwtPayload {
  iss?: string; sub?: string; aud?: string | string[]; exp?: number; nbf?: number; iat?: number; jti?: string;
  sid?: string; org_id?: string; org_role?: string; org_slug?: string;
  email?: string; firstName?: string; lastName?: string; profileImageUrl?: string;
}

// Prop types for components that need them
export interface ProfileEditorProps {
  user: UserResource | null | undefined;
}

export interface DebugInfoProps {
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  syncError: string | null;
  onGetManualToken: () => Promise<void>;
  manualTokenStatus: 'idle' | 'fetching' | 'success' | 'error';
  manualTokenError: string | null;
  manualToken: string | null;
  decodedManualToken: JwtPayload | null;
}

export interface EditorNavigationProps {
    activeSection: EditorSection;
    setActiveSection: (section: EditorSection) => void;
}
// src/types/project.ts (or wherever you keep frontend types)

// Type matching the expected data structure from the /projects endpoint
export interface Project {
  _id: string; // Usually added by MongoDB/Mongoose
  title: string;
  subtitle?: string; // Optional based on schema
  description: string;
  technologies: string[];
  repoUrl: string;
  liveUrl: string;
  previewImageUrls: string[];
  iconUrl: string;
  featured: boolean;
  keywords?: string[]; // Optional based on schema
  timeline: {
    start_date: string; // Should match backend (Date string)
    end_date: string;   // Should match backend (Date string)
  };
  isUpcoming: boolean;
  status: 'start' | 'ongoing' | 'done' | 'canceled' | 'upcoming';
  createdAt?: string; // Added by timestamps: true
  updatedAt?: string; // Added by timestamps: true
}