import { useState } from 'react';
import ReadmeEditor from './ReadmeEditor'; // 분리한 ReadmeEditor 컴포넌트 import
import MainSkills from './MainSkills';
import Loading from './Loading';
import './Body.css'; // Body 컴포넌트에 대한 스타일

export default function Body() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [readmeContent, setReadmeContent] = useState('');
  const [showReadme, setShowReadme] = useState(false);

  const handleContentChange = (event) => {
    setReadmeContent(event.target.value); // 사용자가 textarea에서 입력한 내용을 readmeContent에 저장
  };

  const generateReadme = () => {
    setIsLoading(true);
    setTimeout(() => {
      const markdown = selectedLanguages.map(language => `- ${language}: Basic information about ${language}.\n`).join('');
      // setReadmeContent(`### 🪄 Main skills\n\n${markdown}`);
      setReadmeContent(`<h3 align="center">🪄 Main skills</h3>\n\n${markdown}`)
      setShowReadme(true); // README 내용을 보여주기 위해 true로 설정
      setIsLoading(false);
    }, 1500);
  };

  const retry = () => {
    setShowReadme(false);
    setReadmeContent('');
  };

  return (
    <div className="body">
      {isLoading ? (
        <Loading />
      ) : showReadme ? (
        <div>
          <h3>README Content</h3>
          {/* ReadmeEditor 컴포넌트를 사용하여 코드 및 프리뷰 기능 구현 */}
          <ReadmeEditor content={readmeContent} onContentChange={handleContentChange} />
          <div className="retryButton">
            <button onClick={retry}>Retry</button>
          </div>
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
