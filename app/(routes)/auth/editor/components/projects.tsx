// components/editor/ProjectEditor.tsx
'use client';

import React, { useState, FormEvent, ChangeEvent,  } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Project, CreateProjectPayload, } from '@/lib/types'; // Ensure UpdateProjectPayload is imported
import { useFetchProjects } from '@/hooks/project/get-projects';
import useCreateProject from '@/hooks/project/create-project';
import useUpdateProject, { UpdateProjectPayload } from '@/hooks/project/update-project'; // Corrected import

interface ProjectFormState {
    title: string;
    subtitle: string;
    description: string;
    technologies: string; // Comma-separated
    repoUrl: string;
    liveUrl: string;
    previewImageUrls: string; // Comma-separated
    iconUrl: string;
    featured: boolean;
    keywords: string; // Comma-separated
    timeline: {
        start_date: string; // YYYY-MM-DDTHH:mm for datetime-local
        end_date: string;   // YYYY-MM-DDTHH:mm for datetime-local
    };
    isUpcoming: boolean;
    status: CreateProjectPayload['status'];
}

const initialProjectFormData: ProjectFormState = {
    title: '',
    subtitle: '',
    description: '',
    technologies: '',
    repoUrl: '',
    liveUrl: '',
    previewImageUrls: '',
    iconUrl: '',
    featured: false,
    keywords: '',
    timeline: {
        start_date: '',
        end_date: '',
    },
    isUpcoming: false,
    status: 'upcoming',
};

// Helper function to format ISO date string to YYYY-MM-DDTHH:mm for datetime-local input
const formatISOToDateTimeLocal = (isoDateString: string | undefined): string => {
    if (!isoDateString) return '';
    try {
        const date = new Date(isoDateString);
        // Check if date is valid
        if (isNaN(date.getTime())) {
            console.warn("Invalid date string provided to formatISOToDateTimeLocal:", isoDateString);
            return '';
        }
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (e) {
        console.error("Error formatting ISO date to datetime-local:", isoDateString, e);
        return '';
    }
};


export const ProjectEditor: React.FC = () => {
    const { projects, loading: loadingProjects, error: fetchProjectsError, refetch } = useFetchProjects();
    const {
        createProject,
        isLoading: isCreatingProject,
        error: createProjectError,
    } = useCreateProject();
    const {
        updateProject,
        isLoading: isUpdatingProject,
        error: updateProjectError,
        // data: updatedProjectData, // Available if needed
    } = useUpdateProject();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProjectFormState>(initialProjectFormData);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        if (name.startsWith("timeline.")) {
            const timelineField = name.split(".")[1] as keyof ProjectFormState['timeline'];
            setFormData(prev => ({
                ...prev,
                timeline: { ...prev.timeline, [timelineField]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleCheckboxChange = (name: keyof Pick<ProjectFormState, 'featured' | 'isUpcoming'>) => {
        setFormData(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const handleSelectChange = (value: ProjectFormState['status']) => {
        setFormData(prev => ({ ...prev, status: value }));
    };

    const handleOpenFormForAdd = () => {
        setEditingProjectId(null);
        setFormData(initialProjectFormData);
        setIsFormVisible(true);
    };
    
    const handleOpenFormForEdit = (project: Project) => {
        setEditingProjectId(project._id);
        setFormData({
            title: project.title,
            subtitle: project.subtitle || '',
            description: project.description,
            technologies: project.technologies.join(', '),
            repoUrl: project.repoUrl || '',
            liveUrl: project.liveUrl || '',
            previewImageUrls: project.previewImageUrls.join(', '),
            iconUrl: project.iconUrl || '',
            featured: project.featured,
            keywords: project.keywords ? project.keywords.join(', ') : '',
            timeline: {
                start_date: formatISOToDateTimeLocal(project.timeline.start_date),
                end_date: formatISOToDateTimeLocal(project.timeline.end_date),
            },
            isUpcoming: project.isUpcoming,
            status: project.status,
        });
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
        setEditingProjectId(null);
        setFormData(initialProjectFormData);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.title || !formData.description) {
            alert("Title and Description are required.");
            return;
        }
        if (!formData.timeline.start_date || !formData.timeline.end_date) {
            alert("Timeline start and end dates are required.");
            return;
        }

        let startDateISO: string | undefined = undefined;
        let endDateISO: string | undefined = undefined;

        try {
            if (formData.timeline.start_date) {
                startDateISO = new Date(formData.timeline.start_date).toISOString();
            }
            if (formData.timeline.end_date) {
                endDateISO = new Date(formData.timeline.end_date).toISOString();
            }
        } catch (error) {
            alert("Invalid date format selected for timeline. Please check the dates.");
            console.error("Date conversion error:", error);
            return;
        }
        
        if (!startDateISO || !endDateISO) {
            alert("Timeline start and end dates must be valid dates.");
            return;
        }

        const commonPayload = {
            ...formData,
            technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
            previewImageUrls: formData.previewImageUrls.split(',').map(url => url.trim()).filter(Boolean),
            keywords: formData.keywords ? formData.keywords.split(',').map(kw => kw.trim()).filter(Boolean) : [],
            timeline: {
                start_date: startDateISO,
                end_date: endDateISO,
            },
        };
        
        try {
            if (editingProjectId) {
                const payload: UpdateProjectPayload = commonPayload;
                await updateProject(editingProjectId, payload);
                // toast.success("Project updated successfully!");
            } else {
                const payload: CreateProjectPayload = commonPayload;
                await createProject(payload);
                // toast.success("Project created successfully!");
            }
            handleCloseForm();
            refetch();
        } catch (err) {
            console.error("Failed to save project from editor:", err);
            // toast.error(editingProjectId ? updateProjectError : createProjectError || "Failed to save project.");
        }
    };


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
        <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Manage Projects</h2>
                <Button size="sm" onClick={isFormVisible ? handleCloseForm : handleOpenFormForAdd}>
                    {isFormVisible ? 'Cancel' : 'Add New Project'}
                </Button>
            </div>

            {isFormVisible && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 border rounded-lg shadow-md bg-card space-y-6">
                    <h3 className="text-xl font-semibold mb-4">
                        {editingProjectId ? 'Edit Project Details' : 'Add New Project Details'}
                    </h3>

                    {/* Title */}
                    <div className="space-y-1">
                        <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                        <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required placeholder="Project Awesome" />
                    </div>

                    {/* Subtitle */}
                    <div className="space-y-1">
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Input id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleInputChange} placeholder="A brief tagline" />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                        <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required placeholder="Detailed description of the project..." />
                    </div>

                    {/* Technologies */}
                    <div className="space-y-1">
                        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                        <Input id="technologies" name="technologies" value={formData.technologies} onChange={handleInputChange} placeholder="React, Node.js, TailwindCSS" />
                    </div>

                    {/* URLs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="repoUrl">Repository URL</Label>
                            <Input id="repoUrl" name="repoUrl" type="url" value={formData.repoUrl} onChange={handleInputChange} placeholder="https://github.com/user/repo" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="liveUrl">Live URL</Label>
                            <Input id="liveUrl" name="liveUrl" type="url" value={formData.liveUrl} onChange={handleInputChange} placeholder="https://myproject.com" />
                        </div>
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="iconUrl">Icon URL</Label>
                        <Input id="iconUrl" name="iconUrl" type="url" value={formData.iconUrl} onChange={handleInputChange} placeholder="https://example.com/icon.png" />
                    </div>

                    {/* Preview Image URLs */}
                    <div className="space-y-1">
                        <Label htmlFor="previewImageUrls">Preview Image URLs (comma-separated)</Label>
                        <Input id="previewImageUrls" name="previewImageUrls" value={formData.previewImageUrls} onChange={handleInputChange} placeholder="https://image1.com, https://image2.com" />
                    </div>
                    
                    {/* Keywords */}
                    <div className="space-y-1">
                        <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                        <Input id="keywords" name="keywords" value={formData.keywords} onChange={handleInputChange} placeholder="web app, portfolio, SaaS" />
                    </div>


                    {/* Timeline - UPDATED to datetime-local */}
                    <fieldset className="border p-4 rounded-md">
                        <legend className="text-sm font-medium px-1">Timeline <span className="text-red-500">*</span></legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div className="space-y-1">
                                <Label htmlFor="timeline.start_date">Start Date & Time</Label>
                                <Input 
                                    id="timeline.start_date" 
                                    name="timeline.start_date" 
                                    type="datetime-local" 
                                    value={formData.timeline.start_date} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="timeline.end_date">End Date & Time</Label>
                                <Input 
                                    id="timeline.end_date" 
                                    name="timeline.end_date" 
                                    type="datetime-local" 
                                    value={formData.timeline.end_date} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                        </div>
                    </fieldset>

                    {/* Booleans: Featured & Is Upcoming */}
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="featured" name="featured" checked={formData.featured} onCheckedChange={() => handleCheckboxChange('featured')} />
                            <Label htmlFor="featured" className="cursor-pointer">Featured Project</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isUpcoming" name="isUpcoming" checked={formData.isUpcoming} onCheckedChange={() => handleCheckboxChange('isUpcoming')} />
                            <Label htmlFor="isUpcoming" className="cursor-pointer">Is Upcoming</Label>
                        </div>
                    </div>

                    {/* Status */}
                     <div className="space-y-1">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" value={formData.status} onValueChange={handleSelectChange}>
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="start">Start</SelectItem>
                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                                <SelectItem value="canceled">Canceled</SelectItem>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submission and Error Display */}
                    {(createProjectError || updateProjectError) && (
                        <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md">
                            Error: {createProjectError || updateProjectError}
                        </p>
                    )}
                    <div className="flex justify-end space-x-3 pt-4">
                        <Button type="button" variant="outline" onClick={handleCloseForm}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isCreatingProject || isUpdatingProject}>
                            {editingProjectId 
                                ? (isUpdatingProject ? 'Updating...' : 'Update Project')
                                : (isCreatingProject ? 'Creating...' : 'Create Project')}
                        </Button>
                    </div>
                </form>
            )}


            {/* Refresh Button for Project List */}
            <div className="mb-4">
                <Button variant="outline" size="sm" onClick={refetch} disabled={loadingProjects}>
                    {loadingProjects ? 'Refreshing...' : 'Refresh List'}
                </Button>
            </div>

            {/* Loading State for Project List */}
            {loadingProjects && (
                <div className="text-center text-gray-500 py-4">
                    Loading projects...
                </div>
            )}

            {/* Error State for Project List */}
            {fetchProjectsError && !loadingProjects && (
                <div className="border border-red-200 bg-red-50 text-red-700 p-4 rounded-md">
                    <p className="font-medium">Error loading projects:</p>
                    <p className="text-sm">{fetchProjectsError}</p>
                    <Button variant="destructive" size="sm" onClick={refetch} className="mt-2">
                        Try Again
                    </Button>
                </div>
            )}

            {/* Data Display State for Project List */}
            {!loadingProjects && !fetchProjectsError && (
                <>
                    {projects.length === 0 ? (
                        <p className="text-gray-500 py-4">No projects found. Add your first project!</p>
                    ) : (
                        <ul className="space-y-4">
                            {projects.map((project) => (
                                <li key={project._id} className="border p-4 rounded-md shadow-sm bg-card transition-shadow hover:shadow-md">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className='flex-grow'>
                                            <h3 className="text-lg font-medium">{project.title}</h3>
                                            {project.subtitle && <p className="text-sm text-gray-600 -mt-1">{project.subtitle}</p>}
                                            <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{project.description}</p>
                                        </div>
                                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${getStatusClass(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <div className="mt-3 text-xs text-gray-500 space-y-1">
                                        <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
                                        {project.repoUrl && <p><strong>Repo:</strong> <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{project.repoUrl}</a></p>}
                                        {project.liveUrl && <p><strong>Live:</strong> <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{project.liveUrl}</a></p>}
                                        <p><strong>Timeline:</strong> {new Date(project.timeline.start_date).toLocaleString()} - {new Date(project.timeline.end_date).toLocaleString()}</p>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleOpenFormForEdit(project)}>Edit</Button>
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