import { useState } from 'react';
import { marked } from 'marked';
import MainSkills from './MainSkills';
import Loading from './Loading';
import './Body.css';

export default function Body() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [readmeContent, setReadmeContent] = useState('');
  const [showReadme, setShowReadme] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const generateReadme = () => {
    setIsLoading(true);
    setTimeout(() => {
      const markdown = selectedLanguages.map(language => `- ${language}: Basic information about ${language}.\n`).join('');
      setReadmeContent(`# Selected Programming Languages\n\n${markdown}`);
      setIsLoading(false);
      setShowReadme(true);
    }, 2000);
  };

  const retry = () => {
    setShowReadme(false);
    setReadmeContent('');
    setPreviewMode(false);
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="body">
      {isLoading ? (
        <Loading />
      ) : showReadme ? (
        <div>
          <h3>README Content</h3>
          {previewMode ? (
            <div dangerouslySetInnerHTML={{ __html: marked(readmeContent) }} /> // 마크다운을 HTML로 변환하여 렌더링
          ) : (
            <pre>{readmeContent}</pre>
          )}
          <button onClick={retry}>Retry</button>
          <button onClick={togglePreview}>{previewMode ? 'Code View' : 'Preview'}</button>
        </div>
      ) : (
        <>
          <MainSkills selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages} />
          <button onClick={generateReadme}>Generate README</button>
        </>
      )}
    </div>
  );
}
