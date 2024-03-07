import { useState } from 'react';
import PropTypes from 'prop-types';
import './GithubUserName.css';

function GithubUserName({ setUsername }) {
  const [localUsername, setLocalUsername] = useState('');

  const handleChange = (e) => {
    setLocalUsername(e.target.value);
  };

  const handleBlur = () => {
    setUsername(localUsername);
  };

  return (
    <div className="github-username-container">
      <h2>What&apos;s your github username?</h2>
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
    setUsername: PropTypes.func.isRequired, // Validate setUsername as a required function
  };
  
  export default GithubUserName;