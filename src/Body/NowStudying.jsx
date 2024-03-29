import { useState } from 'react';
import PropTypes from 'prop-types';
import icons from '../icons';

function NowStudying({ title, setTitle, iconsList, selectedStudyingLanguages, setSelectedStudyingLanguages }) {
  const [searchTerm, setSearchTerm] = useState('');

  const toggleLanguageSelection = (iconId) => {
    setSelectedStudyingLanguages((prev) => {
      const isSelected = prev.includes(iconId);
      return isSelected ? prev.filter(id => id !== iconId) : [...prev, iconId];
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredIcons = iconsList.filter(icon => icon.iconId.toLowerCase().includes(searchTerm));

  return (
    <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
          aria-label="Section title"
        />
      <input
        type="text"
        placeholder="Search skills..."
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="skills-container">
        <div className="icons-grid">
          {filteredIcons.map((icon) => (
            <div key={icon.iconId} className="icon-container">
              <input
                type="checkbox"
                id={`studying-${icon.iconId}`}
                onClick={() => toggleLanguageSelection(icon.iconId)}
                defaultChecked={selectedStudyingLanguages.includes(icon.iconId)}
              />
              <label htmlFor={`studying-${icon.iconId}`}>{icon.iconId}</label>
              <img src={icons[icon.iconId]} alt={icon.iconId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

NowStudying.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  iconsList: PropTypes.array.isRequired,
  selectedStudyingLanguages: PropTypes.array.isRequired,
  setSelectedStudyingLanguages: PropTypes.func.isRequired,
};

export default NowStudying;
