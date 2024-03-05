import { useState } from 'react';
// import { useEffect } from 'react';
import PropTypes from 'prop-types';
import icons from '../icons';
import './MainSkills.css';

function MainSkills({ iconsList, selectedLanguages, setSelectedLanguages }) {
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   // 현재까지 선택된 모든 언어들을 콘솔에 출력
  //   console.log("Currently selected languages:", selectedLanguages);
  // }, [selectedLanguages]);

  const toggleLanguageSelection = (iconId) => {
    // console.log(iconId); // 클릭된 아이콘의 ID를 출력
    setSelectedLanguages((prev) => {
      const isSelected = prev.includes(iconId);
      const newSelectedLanguages = isSelected
        ? prev.filter((id) => id !== iconId)
        : [...prev, iconId];
      return newSelectedLanguages;
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
      <div className="skills-container"> {/* 스킬들을 포함하는 네모 박스 추가 */}
      <div className="icons-grid">
        {filteredIcons.map((icon) => (
          <div key={icon.iconId} className="icon-container">
            <input
              type="checkbox"
              id={icon.iconId}
              onClick={() => {
                toggleLanguageSelection(icon.iconId);
              }}
              defaultChecked={selectedLanguages.includes(icon.iconId)}
            />
            <label htmlFor={icon.iconId}>{icon.iconId}</label>
            <img src={icons[icon.iconId]} alt={icon.iconId} />
          </div>
        ))}
      </div>
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