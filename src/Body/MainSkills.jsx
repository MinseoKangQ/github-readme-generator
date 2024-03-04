import PropTypes from 'prop-types';

function MainSkills({ iconsList, setSelectedLanguages }) {
  // 언어 선택 토글 함수
  const toggleLanguageSelection = (iconId) => {
    setSelectedLanguages(prev => {
      const isSelected = prev.includes(iconId);
      return isSelected ? prev.filter(id => id !== iconId) : [...prev, iconId];
    });
  };

  return (
    <div>
      <h2>Main Skills</h2>
      <div>
        {iconsList.map(icon => (
          <div key={icon.iconId} style={{ margin: '5px' }}>
            <input
              type="checkbox"
              id={icon.iconId}
              onChange={(e) => toggleLanguageSelection(icon.iconId, e)}
              // aria-label={icon.iconId} // 접근성을 위한 aria-label 사용
            />
            <span>{icon.iconId.toLowerCase()}</span>
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