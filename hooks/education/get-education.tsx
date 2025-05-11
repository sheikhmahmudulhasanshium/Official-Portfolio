// src/hooks/useFetchEducation.ts
import { useState, useEffect } from 'react';
import type { Education } from '@/lib/types'; // Adjust the path as needed

// Define the shape of the hook's return value for better type inference
interface UseFetchEducationReturn {
  education: Education[];
  loading: boolean;
  error: string | null;
  refetch: () => void; // Add a function to manually trigger refetch
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portfolio-maker-v2.vercel.app'; // Use environment variable if possible
const PROJECTS_ENDPOINT = `${API_URL}/education`;

const useFetchEducation = (): UseFetchEducationReturn => {
const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Start loading initially
  const [error, setError] = useState<string | null>(null);
  const [triggerFetch, setTriggerFetch] = useState<number>(0); // State to trigger refetch

  const fetchEducation = async () => {
    console.log('Fetching education from:', PROJECTS_ENDPOINT);
    setLoading(true);
    setError(null); // Clear previous errors on new fetch attempt

    try {
      const response = await fetch(PROJECTS_ENDPOINT);

      if (!response.ok) {
        // Try to get error details from response body if possible
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage += ` - ${errorData.message || 'No error message provided'}`;
        } catch (_e) {
          // Log the parsing error but continue with the main HTTP error message
          console.warn("Failed to parse error response body, using status code message.", _e); // <-- Use _e here
        }
        throw new Error(errorMessage);
      }

      const data: Education[] = await response.json();
      setEducation(data);
      console.log('Education fetched successfully:', data.length);

    } catch (err: unknown) {
      console.error("Failed to fetch education:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while fetching education.");
      }
      setEducation([]); // Clear education on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, [triggerFetch]); // Re-run effect when triggerFetch changes

  // Function to manually trigger a refetch
  const refetch = () => {
    setTriggerFetch(prev => prev + 1); // Increment the trigger state
  };

  return { education, loading, error, refetch };
}
 
export default useFetchEducation;