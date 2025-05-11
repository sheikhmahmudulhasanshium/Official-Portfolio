// src/hooks/project/useUpdateProject.tsx
import { useState, useCallback } from 'react';
// src/lib/types.ts (or your types file)
// ... (existing Project, CreateProjectPayload, ApiErrorResponse types)
// src/lib/types.ts

// --- Existing Project and CreateProjectPayload ---
export interface CreateProjectPayload {
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  repoUrl: string;
  liveUrl: string;
  previewImageUrls: string[];
  iconUrl: string;
  featured: boolean;
  keywords?: string[];
  timeline: {
    start_date: string; // ISO date string
    end_date: string;   // ISO date string
  };
  isUpcoming: boolean;
  status: 'start' | 'ongoing' | 'done' | 'canceled' | 'upcoming';
}

export interface Project extends CreateProjectPayload { // Often, Project includes all create fields + ID and timestamps
  _id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  // Add any other fields your Project entity has that are not in CreateProjectPayload
}

// --- Ensure these are EXPORTED ---

// 1. ApiErrorResponse
export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
  // Add other properties if your backend sends them
}

// 2. UpdateProjectPayload
export type UpdateProjectPayload = Partial<CreateProjectPayload>;

// You might have other types here too...
interface UseUpdateProjectReturn {
  updateProject: (id: string, projectData: UpdateProjectPayload) => Promise<Project>;
  isLoading: boolean;
  error: string | null;
  data: Project | null; // To store the updated project data
}

const useUpdateProject = (): UseUpdateProjectReturn => {
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portfolio-maker-v2.vercel.app';
    const PROJECTS_ENDPOINT = `${API_URL}/projects`; // Base endpoint

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Project | null>(null);

    const updateProject = useCallback(async (id: string, projectData: UpdateProjectPayload): Promise<Project> => {
        if (!id) {
            const errMsg = "Project ID is required for update.";
            setError(errMsg);
            throw new Error(errMsg);
        }

        setIsLoading(true);
        setError(null);
        setData(null);

        let response: Response;

        try {
            response = await fetch(`${PROJECTS_ENDPOINT}/${id}`, { // Append project ID to the endpoint
                method: 'PATCH', // Use PATCH for partial updates
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            const responseData: Project | ApiErrorResponse = await response.json();

            if (!response.ok) {
                const errorPayload = responseData as ApiErrorResponse;
                let errorMessage = `HTTP error! status: ${response.status}`;
                if (errorPayload && errorPayload.message) {
                    errorMessage = Array.isArray(errorPayload.message)
                        ? errorPayload.message.join(', ')
                        : errorPayload.message;
                } else if (errorPayload && errorPayload.error) {
                    errorMessage = errorPayload.error;
                }
                throw new Error(errorMessage);
            }

            setData(responseData as Project);
            return responseData as Project;

        } catch (err: unknown) {
            let errorMessage = "An unexpected error occurred while updating the project.";
            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }
            
            setError(errorMessage);
            console.error(`Failed to update project with ID ${id}:`, errorMessage, err);
            throw new Error(errorMessage); // Re-throw for the calling component
        } finally {
            setIsLoading(false);
        }
    }, [PROJECTS_ENDPOINT]); // PROJECTS_ENDPOINT is a dependency

    return { updateProject, isLoading, error, data };
};

export default useUpdateProject;