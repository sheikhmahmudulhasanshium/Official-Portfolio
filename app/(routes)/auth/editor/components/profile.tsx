// components/editor/ProfileEditor.tsx
import useFetchEducation from '@/hooks/education/get-education';
import { useFetchInterests } from '@/hooks/interests/get-interests';
import { useFetchProjects } from '@/hooks/project/get-projects';
import { useFetchServices } from '@/hooks/services/get-services';
import type {
  ProfileEditorProps,
  Interest,
  Service,
  Project,
  Education, // Import the Education type
} from '@/lib/types';
import {
  Loader2,
  Briefcase, // Changed from BriefcaseBusinessIcon for standard lucide-react icon
  Lightbulb,
  Package,
  AlertTriangle,
  GraduationCap, // Icon for Education
} from 'lucide-react';

const ProfileEditor: React.FC<ProfileEditorProps> = ({ user }) => {
  const {
    interests,
    loading: interestsLoading,
    error: interestsError,
  } = useFetchInterests();
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
  } = useFetchServices();
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useFetchProjects();
  const {
    education, // Destructure education data
    loading: educationLoading, // Aliased loading state
    error: educationError,     // Aliased error state
  } = useFetchEducation();
  const renderWelcomeMessage = () => (
    <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold">
        Welcome, {user?.fullName || user?.primaryEmailAddress?.emailAddress || 'Valued User'}!
      </h1>
      <p className="text-lg mt-1 opacity-90">
        Here&apos;s an overview of your profile.
      </p>
    </div>
  );

  const renderDataCard = <T,>(
    title: string,
    data: T[] | undefined,
    loading: boolean,
    error: unknown,
    itemName: string,
    IconComponent: React.ElementType
  ) => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg min-h-[14rem]">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500 dark:text-blue-400 mb-3" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading {itemName}...</p>
        </div>
      );
    }

    if (error) {
      const errorMessage = `Could not load ${itemName.toLowerCase()}.`;
      return (
        <div className="flex flex-col items-center justify-center p-6 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 rounded-lg shadow-lg min-h-[14rem] text-center">
          <AlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400 mb-3" />
          <h3 className="font-semibold text-xl text-red-700 dark:text-red-300 mb-2">Error</h3>
          <p className="text-red-600 dark:text-red-300/90">{errorMessage}</p>
        </div>
      );
    }

    const count = data ? data.length : 0;

    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl text-center flex flex-col justify-between min-h-[14rem]">
        <div>
          <IconComponent className="h-12 w-12 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-5">{title}</h3>
          <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white rounded-full w-28 h-28 flex flex-col items-center justify-center mx-auto shadow-lg transition-transform hover:scale-105">
            <p className="text-4xl font-bold">{count}</p>
            <p className="text-xs uppercase tracking-wider">{itemName}</p>
          </div>
        </div>
        {count === 0 && !loading && !error && (
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            You haven&apos;t specified any {itemName.toLowerCase()} yet.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      {renderWelcomeMessage()}

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Profile Quick Look</h2>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
                <span className="font-medium">Name:</span> {user?.fullName || 'N/A'}
            </p>
            <p>
                <span className="font-medium">Email:</span> {user?.primaryEmailAddress?.emailAddress || 'N/A'}
            </p>
        </div>
        <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Edit Profile
        </button>
      </div>

      {/* Adjusted grid for potentially more cards. You can fine-tune columns based on how many cards you'll have. */}
      {/* e.g., md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {renderDataCard<Interest>("Your Interests", interests, interestsLoading, interestsError, "Interests", Lightbulb)}
        {renderDataCard<Service>("Offered Services", services, servicesLoading, servicesError, "Services", Package)}
        {renderDataCard<Project>("Completed Projects", projects, projectsLoading, projectsError, "Projects", Briefcase)}
        {renderDataCard<Education>("Educational Qualifications", education, educationLoading, educationError, "Qualifications", GraduationCap)}
      </div>
    </div>
  );
};

export default ProfileEditor;