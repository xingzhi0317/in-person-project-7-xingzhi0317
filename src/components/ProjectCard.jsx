import { useState } from 'react';

const ProjectCard = ({ project, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(project);
    setIsDeleting(false);
  };

  return (
    <div className="project-card">
      {project.imageUrl && <div className="project-image">
        <img src={project.imageUrl} alt={project.title} />
        {project.featured && <span className="featured-badge">Featured</span>}
      </div>}<div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.completed && <p>Completed: {project.completed}</p>}

        <div className="project-tech">
          {project.technologies?.map((tech, index) => (
            <span key={index} className="tech-badge">{tech}</span>
          ))}
        </div>

        <div className="project-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
          <button
            type="button"
            className="delete-btn"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
