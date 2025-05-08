// src/hooks/useFetchServices.ts
import { useState, useEffect } from 'react';
import type { Service } from '@/lib/types'; // Adjust the path as needed

// Define the shape of the hook's return value for better type inference
interface UseFetchServicesReturn {
  services: Service[];
  loading: boolean;
  error: string | null;
  refetch: () => void; // Add a function to manually trigger refetch
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portfolio-maker-v2.vercel.app'; // Use environment variable if possible
const PROJECTS_ENDPOINT = `${API_URL}/services`;

export const useFetchServices = (): UseFetchServicesReturn => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Start loading initially
  const [error, setError] = useState<string | null>(null);
  const [triggerFetch, setTriggerFetch] = useState<number>(0); // State to trigger refetch

  const fetchServices = async () => {
    console.log('Fetching services from:', PROJECTS_ENDPOINT);
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

      const data: Service[] = await response.json();
      setServices(data);
      console.log('Services fetched successfully:', data.length);

    } catch (err: unknown) {
      console.error("Failed to fetch services:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while fetching services.");
      }
      setServices([]); // Clear services on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [triggerFetch]); // Re-run effect when triggerFetch changes

  // Function to manually trigger a refetch
  const refetch = () => {
    setTriggerFetch(prev => prev + 1); // Increment the trigger state
  };

  return { services, loading, error, refetch };
};