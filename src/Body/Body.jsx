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
  const [previewMode, setPreviewMode] = useState(false); // false: Edit mode, true: Preview mode

    const handleContentChange = (event) => {
      setReadmeContent(event.target.value); // 사용자가 textarea에서 입력한 내용을 readmeContent에 저장
    };
  
    const generateReadme = () => {
      setIsLoading(true);
      setTimeout(() => {
        // README 내용을 생성하는 로직 추가
        const markdown = selectedLanguages.map(language => `- ${language}: Basic information about ${language}.\n`).join('');
        setReadmeContent(`# Selected Programming Languages\n\n${markdown}`);
        setShowReadme(true); // README 내용을 보여주기 위해 true로 설정
        setIsLoading(false);
      }, 1500);
    };
    
  
    const retry = () => {
      setShowReadme(false);
      setReadmeContent('');
      setPreviewMode(false); // Reset to edit mode
    };
  
    const togglePreview = () => {
      setPreviewMode(!previewMode); // Toggle between edit and preview mode
    };  

  return (
    <div className="body">
      {isLoading ? (
        <Loading />
      ) : showReadme ? (
        <div>
          <h3>README Content</h3>
          {previewMode ? (
            // Preview mode
            <div className="markdownPreview" dangerouslySetInnerHTML={{ __html: marked(readmeContent) }} />
          ) : (
            // Code mode
            <textarea 
              className="codePreview" 
              value={readmeContent} 
              onChange={handleContentChange}
            />
          )}
          <button onClick={retry}>Retry</button>
          <button onClick={togglePreview}>{previewMode ? 'Code' : 'Preview'}</button>
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
