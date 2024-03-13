import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './GithubUserName.css';

function GithubUserName({ setUsername, initialUsername }) {
  const [localUsername, setLocalUsername] = useState('');

  useEffect(() => {
    setLocalUsername(initialUsername);
  }, [initialUsername]);

  const handleChange = (e) => {
    setLocalUsername(e.target.value);
  };

  const handleBlur = () => {
    setUsername(localUsername);
  };

  return (
    <div className="github-username-container">
      <h3>What&apos;s your github username?</h3>
      <input 
        type="text"
        value={localUsername}
        onChange={handleChange}
        onBlur={handleBlur}
        className="username-input"
        placeholder="Enter your Github username"
      />
    </div>
  );
}

GithubUserName.propTypes = {
    setUsername: PropTypes.func.isRequired,
    initialUsername: PropTypes.string,
  };
  
  export default GithubUserName;