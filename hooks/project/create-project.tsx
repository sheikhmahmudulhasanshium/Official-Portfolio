// src/hooks/project/useCreateProject.tsx
import { CreateProjectPayload, Project,  } from '@/lib/types'; // Added ApiErrorResponse
import { useState, useCallback } from 'react';


export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[]; // NestJS validation errors can be an array of messages
  error?: string; // Optional, NestJS sometimes includes this
  // You can add other properties if your backend sends them
}
interface UseCreateProjectReturn {
  createProject: (projectData: CreateProjectPayload) => Promise<Project>;
  isLoading: boolean;
  error: string | null;
  data: Project | null;
}

const useCreateProject = (): UseCreateProjectReturn => {
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portfolio-maker-v2.vercel.app';
    const PROJECTS_ENDPOINT = `${API_URL}/projects`;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Project | null>(null);

    const createProject = useCallback(async (projectData: CreateProjectPayload): Promise<Project> => {
        setIsLoading(true);
        setError(null);
        setData(null);

        let response: Response; // Declare response here to access it in catch for non-JSON errors

        try {
            response = await fetch(PROJECTS_ENDPOINT, { // Assign to the declared response
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            // Try to parse JSON. This can fail if the error response is not JSON.
            const responseData: Project | ApiErrorResponse = await response.json();

            if (!response.ok) {
                // Now responseData is typed as ApiErrorResponse within this block
                // due to the !response.ok check (assuming successful responses are Project)
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

            // If response.ok is true, responseData should be a Project
            // We can use a type assertion here, or a type guard if we want to be safer
            setData(responseData as Project);
            return responseData as Project;

        } catch (err: unknown) {
            let errorMessage = "An unexpected error occurred.";

            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }
            // If the error was from response.json() failing (e.g. server sent HTML error page)
            // 'err.message' might already be something like "Unexpected token < in JSON at position 0"
            // and response might be defined.
            // You could add more specific logging here if needed using the 'response' object.
            // For example: if (response && !response.headers.get('content-type')?.includes('application/json')) {
            //   console.warn("Server did not respond with JSON. Status:", response.status);
            // }

            setError(errorMessage);
            console.error('Failed to create project:', errorMessage, err);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [PROJECTS_ENDPOINT]);

    return { createProject, isLoading, error, data };
};

export default useCreateProject;