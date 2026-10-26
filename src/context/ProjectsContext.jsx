import { createContext, useState, useContext, useEffect } from 'react';

const API_URL = 'http://localhost:3001/projects';
const ProjectsContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }

  return context;
};

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error, status ${response.status}`);
        }

        const data = await response.json();
        if (!isCancelled) {
          setProjects(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || 'Failed to load projects.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isCancelled = true;
    };
  }, []);

  const addProject = async (projectData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...projectData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add project');
    }

    const newProject = await response.json();
    setProjects(previousProjects => [...previousProjects, newProject]);
    return newProject;
  };

  const updateProject = async (id, updates) => {
    const currentProject = projects.find(project => project.id === id);
    if (!currentProject) {
      throw new Error('Project not found');
    }

    const updatedProjectData = { ...currentProject, ...updates, id };
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProjectData),
    });

    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    const updatedProject = await response.json();
    setProjects(previousProjects =>
      previousProjects.map(project =>
        project.id === id ? updatedProject : project
      )
    );
    return updatedProject;
  };

  const deleteProject = async (id) => {
    const projectToRestore = projects.find(project => project.id === id);
    setProjects(previousProjects =>
      previousProjects.filter(project => project.id !== id)
    );

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
    } catch (err) {
      if (projectToRestore) {
        setProjects(previousProjects => {
          if (previousProjects.some(project => project.id === id)) {
            return previousProjects;
          }

          return [...previousProjects, projectToRestore].sort(
            (firstProject, secondProject) => firstProject.id - secondProject.id
          );
        });
      }
      throw err;
    }
  };

  const value = {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
