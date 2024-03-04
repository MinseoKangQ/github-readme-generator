import { useState, useEffect } from 'react';
import ReadmeEditor from './ReadmeEditor';
import MainSkills from './MainSkills';
import Loading from './Loading';
import './Body.css';
import useFetchReadme from '../API/useFetchReadme';

export default function Body() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const { readmeContent: fetchedReadmeContent, isLoading: isReadmeLoading, error } = useFetchReadme('tandpfun/skill-icons');
  const [generatedReadmeContent, setGeneratedReadmeContent] = useState('');
  const [showGeneratedReadme, setShowGeneratedReadme] = useState(false);
  
  // API로 가져온 README 내용을 콘솔에 출력 - 성공
  useEffect(() => {
    if (fetchedReadmeContent) {
      console.log(fetchedReadmeContent);
    }
  }, [fetchedReadmeContent]);

  // 선택된 언어들로 README를 생성
  const generateReadme = () => {
    const markdown = selectedLanguages.map(language => `- ${language}: Basic information about ${language}.\n`).join('');
    const generatedContent = `<h3 align="center">🪄 Main skills</h3>\n\n${markdown}`;
    setGeneratedReadmeContent(generatedContent);
    setShowGeneratedReadme(true);
  };

  // ReadmeEditor의 내용을 업데이트
  const handleContentChange = (newContent) => {
    setGeneratedReadmeContent(newContent);
  };

  // retry 버튼의 동작
  const retry = () => {
    setShowGeneratedReadme(false);
    setGeneratedReadmeContent('');
  };

  if (isReadmeLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="body">
      {showGeneratedReadme ? (
        <>
          <h3>README Content</h3>
          <ReadmeEditor content={generatedReadmeContent} onContentChange={handleContentChange} />
          <div className="retryButton">
            <button onClick={retry}>Retry</button>
          </div>
        </>
      ) : (
        <>
          <MainSkills selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages} />
          <button onClick={generateReadme}>Generate README</button>
        </>
      )}
    </div>
  );
}