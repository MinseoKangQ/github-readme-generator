import { useState } from 'react';
import PropTypes from 'prop-types';
import './Introduce.css';

function Introduce({ setUserIntroduction }) {
    const [introduction, setIntroduction] = useState('');

  const handleChange = (e) => {
    setIntroduction(e.target.value);
  };

  const handleBlur = () => {
    setUserIntroduction(introduction);
  };

  return (
    <div className="introduce-container">
      <h3>👋 Tell me about yourself</h3>
      <textarea
        value={introduction}
        onChange={handleChange}
        onBlur={handleBlur}
        className="introduction-input"
        placeholder="Hello, I am a user!"
      />
    </div>
  );
}

Introduce.propTypes = {
  setUserIntroduction: PropTypes.func.isRequired,
};

export default Introduce;
