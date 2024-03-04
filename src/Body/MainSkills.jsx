import PropTypes from 'prop-types';

function MainSkills({ iconsList, selectedLanguages, setSelectedLanguages }) {
  // 언어 선택 토글 함수
  const toggleLanguageSelection = (iconId) => {
    setSelectedLanguages((prev) => {
      const isSelected = prev.includes(iconId);
      const newSelectedLanguages = isSelected
        ? prev.filter((id) => id !== iconId)
        : [...prev, iconId];
      console.log(`Before update: ${prev}`);
      console.log(`After update: ${newSelectedLanguages}`);
      return newSelectedLanguages;
    });
  };

  return (
    <div>
      <h2>Main Skills</h2>
      <div>
        {iconsList.map((icon) => (
          <div key={icon.iconId} style={{ margin: '5px' }}>
            <input
              type="checkbox"
              id={icon.iconId}
              onChange={(e) => {
                e.stopPropagation();
                toggleLanguageSelection(icon.iconId);
              }}
              defaultChecked={selectedLanguages.includes(icon.iconId)}
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
