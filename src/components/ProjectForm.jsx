import { useState } from 'react';
import { useProjects } from '../context/ProjectsContext';

const INITIAL_FORM_DATA = {
  title: '',
  description: '',
  category: 'web',
  imageUrl: 'https://placehold.co/600x400?text=New+Project',
  technologies: [],
  githubUrl: '',
  liveUrl: '',
  featured: false,
};

const ProjectForm = () => {
  const { addProject } = useProjects();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(previousData => ({
      ...previousData,
      [name]: value,
    }));

    if (formError) {
      setFormError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setFormError('A project title is required.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      await addProject({
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
      });
      setFormData(INITIAL_FORM_DATA);
    } catch {
      setFormError('Could not add the project. Check that the API server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="project-form-heading">
        <div>
          <h3>Add a project</h3>
          <p>New projects are saved to the local API.</p>
        </div>
      </div>

      <div className="project-form-fields">
        <div className="form-group">
          <label htmlFor="project-title">Title</label>
          <input
            id="project-title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Project title"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="project-category">Category</label>
          <select
            id="project-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="data">Data</option>
          </select>
        </div>

        <div className="form-group project-description-field">
          <label htmlFor="project-description">Description</label>
          <textarea
            id="project-description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="What did you build?"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="project-form-footer">
        {formError && (
          <p className="form-error" role="alert">{formError}</p>
        )}
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
