import PropTypes from 'prop-types';
import icons from '../icons';

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
      <img src="../../public/activitypub.svg"/>
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
            <label htmlFor={icon.iconId}>{icon.iconId}</label>
            {/* 아이콘 이미지 표시 */}
            <img src={icons[icon.iconId]} alt={icon.iconId} style={{ width: '48px', height: '48px' }} />
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
