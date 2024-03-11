import { useState } from 'react';
import PropTypes from 'prop-types';
import './Projects.css';

const Projects = ({
  projects,
  setProjects,
  columns,
  setColumns,
  projectsTitle,
  setProjectsTitle,
}) => {
  const [newColumn, setNewColumn] = useState('');

  const handleAddColumn = () => {
    if (newColumn && !columns.includes(newColumn)) {
      setColumns([...columns, newColumn]);
      setNewColumn('');
    }
  };

  const handleProjectChange = (index, column, value) => {
    const updatedProjects = projects.map((project, projIndex) => {
      if (index === projIndex) {
        return { ...project, [column]: value };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const addNewProject = () => {
    const newProject = columns.reduce((acc, column) => {
      acc[column] = '';
      return acc;
    }, {});

    setProjects([...projects, newProject]);
  };

  return (
    <div className="projects-container">
      <input
        type="text"
        value={projectsTitle}
        onChange={(e) => setProjectsTitle(e.target.value)}
        className="title-input"
        placeholder="Project Section Title"
      />
      <div className="column-controls">
        <input
          type="text"
          placeholder="New Column Name"
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
          className="new-column-input"
        />
        <button className="projects-btn" onClick={handleAddColumn}>
          Add Column
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>
                  <input
                    type="text"
                    value={project[column] || ''}
                    onChange={(e) =>
                      handleProjectChange(index, column, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-project-container align-center">
        <button className="add-project-btn" onClick={addNewProject}>
          Add Project
        </button>
      </div>
    </div>
  );
};

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  setProjects: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  setColumns: PropTypes.func.isRequired,
  projectsTitle: PropTypes.string.isRequired,
  setProjectsTitle: PropTypes.func.isRequired,
};

export default Projects;
