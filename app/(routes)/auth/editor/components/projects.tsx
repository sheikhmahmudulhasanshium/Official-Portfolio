// components/editor/ProjectEditor.tsx
'use client'; // Add this if using Next.js App Router and the hook uses client-side features

import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming you use your Button component
import { Project } from '@/lib/types';
import { useFetchProjects } from '@/hooks/project/get-projects';

export const ProjectEditor: React.FC = () => {
  // Call the hook to get projects data, loading state, error state, and refetch function
  const { projects, loading, error, refetch } = useFetchProjects();

  // Helper function to determine status badge color (optional, for better visuals)
  const getStatusClass = (status: Project['status']) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-purple-100 text-purple-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      case 'start': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
         <h2 className="text-xl font-semibold">Manage Projects</h2>
         {/* Placeholder button for adding new projects */}
         <Button size="sm" onClick={() => alert('Add new project functionality TBD')}>
            Add New Project
         </Button>
      </div>

      {/* Refresh Button */}
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={refetch} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh List'}
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-500 py-4">
            Loading projects...
            {/* You could add a spinner component here */}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="border border-red-200 bg-red-50 text-red-700 p-4 rounded-md">
          <p className="font-medium">Error loading projects:</p>
          <p className="text-sm">{error}</p>
          {/* Consider adding the refetch button directly here too */}
          {/* <Button variant="destructive" size="sm" onClick={refetch} className="mt-2">Try Again</Button> */}
        </div>
      )}

      {/* Data Display State (when not loading and no error) */}
      {!loading && !error && (
        <>
          {projects.length === 0 ? (
            <p className="text-gray-500 py-4">No projects found. Add your first project!</p>
          ) : (
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project._id} className="border p-4 rounded-md shadow-sm bg-white transition-shadow hover:shadow-md">
                  <div className="flex justify-between items-start gap-4">
                      {/* Project Info */}
                      <div className='flex-grow'>
                        <h3 className="text-lg font-medium">{project.title}</h3>
                        {project.subtitle && <p className="text-sm text-gray-600 -mt-1">{project.subtitle}</p>}
                         <p className="mt-2 text-sm text-gray-700">{project.description}</p>
                      </div>
                       {/* Status Badge */}
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${getStatusClass(project.status)}`}>
                        {project.status}
                      </span>
                  </div>

                  {/* Technologies & Links */}
                  <div className="mt-3 text-xs text-gray-500 space-y-1">
                    <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
                    <p><strong>Repo:</strong> <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{project.repoUrl}</a></p>
                    <p><strong>Live:</strong> <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{project.liveUrl}</a></p>
                  </div>

                   {/* Action Buttons - Placeholders */}
                   <div className="mt-4 flex gap-2">
                       <Button variant="outline" size="sm" onClick={() => alert(`Edit project: ${project.title}`)}>Edit</Button>
                       <Button variant="destructive" size="sm" onClick={() => alert(`Delete project: ${project.title}`)}>Delete</Button>
                   </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};