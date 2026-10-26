import { useEffect, useState } from 'react';
import { useProjects } from '../context/ProjectsContext';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Projects = () => {
  const { projects, loading, error, deleteProject } = useProjects();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim().toLowerCase());
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  if (loading) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <h2>My Projects</h2>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <h2>My Projects</h2>
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const searchableContent = [
      project.title,
      project.description,
      ...(project.technologies || []),
    ].join(' ').toLowerCase();

    return matchesCategory &&
      (!debouncedSearchTerm || searchableContent.includes(debouncedSearchTerm));
  });

  const categories = ['all', 'web', 'mobile', 'data'];

  const handleDelete = async (project) => {
    setDeleteError('');

    try {
      await deleteProject(project.id);
    } catch {
      setDeleteError(`Could not delete "${project.title}". Please try again.`);
    }
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>

        <ProjectForm />

        <div className="project-controls">
          <div className="project-search">
            <label htmlFor="project-search">Search projects</label>
            <input
              id="project-search"
              type="search"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              placeholder="Search by title, description, or technology"
            />
          </div>

          <div className="project-filters" aria-label="Filter projects by category">
            {categories.map(cat => (
              <button
                type="button"
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {deleteError && (
          <p className="inline-error" role="alert">{deleteError}</p>
        )}

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="no-projects">
              No projects match your search and filter.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
