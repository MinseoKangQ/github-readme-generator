import { useState } from 'react';
import PropTypes from 'prop-types'; // PropTypes import

export default function MainSkills({ selectedLanguages, setSelectedLanguages }) {
  const programmingLanguages = ['Java', 'Python', 'C', 'C++', 'JavaScript', 'Ruby', 'Go', 'Swift', 'Kotlin', 'PHP'];
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleLanguageSelection = (language) => {
    setSelectedLanguages(prev =>
      prev.includes(language) ? prev.filter(l => l !== language) : [...prev, language]
    );
  };

  const filteredLanguages = programmingLanguages.filter(language =>
    language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Main Skills</h2>
      <input type="text" placeholder="Search languages..." onChange={handleSearchChange} />
      <div>
        {filteredLanguages.map(language => (
          <div key={language}>
            <input
              type="checkbox"
              id={language}
              checked={selectedLanguages.includes(language)}
              onChange={() => toggleLanguageSelection(language)}
            />
            <label htmlFor={language}>{language}</label>
          </div>
        ))}
      </div>
      <div>
        <h3>Selected Languages</h3>
        {selectedLanguages.map(language => (
          <span key={language}>{language} </span>
        ))}
      </div>
    </div>
  );
}

// PropTypes 정의
MainSkills.propTypes = {
  selectedLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedLanguages: PropTypes.func.isRequired,
};
