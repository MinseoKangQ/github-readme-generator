import { useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([{}]);
  const [columns, setColumns] = useState(['Project Name', 'Repository', 'Role']);
  const [newColumn, setNewColumn] = useState('');
  const [title, setTitle] = useState('📁 Projects');

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
    setProjects([...projects, {}]);
  };

  return (
    <div className="projects-container">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        <button className="projects-btn" onClick={handleAddColumn}>Add Column</button>
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
                    onChange={(e) => handleProjectChange(index, column, e.target.value)}
                  />
                </td>
              ))}
              <td></td>
            </tr>
          ))}
          <tr className="add-project-row">
            <td colSpan={columns.length + 1} style={{textAlign: 'center'}}>
              <button className="add-project-btn" onClick={addNewProject}>Add Project</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
