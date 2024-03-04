import { useState } from 'react';
import PropTypes from 'prop-types';
import icons from '../icons';
import './MainSkills.css';

function MainSkills({ iconsList, selectedLanguages, setSelectedLanguages }) {
  const [searchTerm, setSearchTerm] = useState('');

  const toggleLanguageSelection = (iconId) => {
    setSelectedLanguages((prev) => {
      const isSelected = prev.includes(iconId);
      return isSelected ? prev.filter((id) => id !== iconId) : [...prev, iconId];
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredIcons = iconsList.filter((icon) =>
    icon.iconId.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <h2>Main Skills</h2>
      <input
        type="text"
        placeholder="Search skills..."
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="icons-grid">
        {filteredIcons.map((icon) => (
          <div key={icon.iconId} className="icon-container">
            <input
              type="checkbox"
              id={icon.iconId}
              onChange={(e) => {
                e.stopPropagation();
                toggleLanguageSelection(icon.iconId);
              }}
              checked={selectedLanguages.includes(icon.iconId)}
            />
            <label htmlFor={icon.iconId}>{icon.iconId}</label>
            <img src={icons[icon.iconId]} alt={icon.iconId} />
          </div>
        ))}
      </div>
    </div>
  );
}

MainSkills.propTypes = {
  iconsList: PropTypes.arrayOf(
    PropTypes.shape({
      iconId: PropTypes.string.isRequired,
      iconSrc: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedLanguages: PropTypes.array.isRequired,
  setSelectedLanguages: PropTypes.func.isRequired,
};

export default MainSkills;
