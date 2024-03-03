import { useState } from 'react';
import MainSkills from './MainSkills';
import Loading from './Loading'; // Loading 컴포넌트를 import합니다.
import './Body.css';

export default function Body() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [readmeContent, setReadmeContent] = useState('');

  const generateReadme = () => {
    setIsLoading(true);
    setTimeout(() => {
      const content = selectedLanguages.map(language => `- ${language}: Basic information about ${language}.\n`).join('');
      setReadmeContent(`# Selected Programming Languages\n\n${content}`);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="body">
      <MainSkills selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages} />
      <button onClick={generateReadme} disabled={isLoading}>Generate README</button>
      {isLoading && <Loading />} {/* isLoading이 true일 때 Loading 컴포넌트를 렌더링합니다. */}
      {!isLoading && readmeContent && (
        <div>
          <h3>README Content</h3>
          <pre>{readmeContent}</pre>
        </div>
      )}
    </div>
  );
}
