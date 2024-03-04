import { useState, useEffect } from 'react';
import ReadmeEditor from './ReadmeEditor';
import MainSkills from './MainSkills';
import Loading from './Loading';
import './Body.css';
import { fetchReadmeAndParseIcons } from '../API/apiService';

export default function Body() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [iconsList, setIconsList] = useState([]); // 파싱된 아이콘 리스트
  const [generatedReadmeContent, setGeneratedReadmeContent] = useState('');
  const [showGeneratedReadme, setShowGeneratedReadme] = useState(false); // 추가된 상태
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchReadmeAndParseIcons('tandpfun/skill-icons')
      .then(icons => {
        setIconsList(icons);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.toString());
        setIsLoading(false);
      });
  }, []);

  // 선택된 언어들로 README를 생성하는 함수
const generateReadme = () => {
  const markdown = selectedLanguages.map(iconId => `- ${iconId}: ![${iconId}](${createIconUrl(iconId)})`).join('\n');
  const generatedContent = `## Main Skills\n\n${markdown}`;
  setGeneratedReadmeContent(generatedContent);
  setShowGeneratedReadme(true); // README가 생성되면 표시 상태를 true로 설정
};


  // ReadmeEditor의 내용을 업데이트하는 함수
  const handleContentChange = (newContent) => {
    setGeneratedReadmeContent(newContent);
  };

  // Retry 버튼의 동작 구현
  const retry = () => {
    setShowGeneratedReadme(false);
    setGeneratedReadmeContent('');
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="body">
      {!showGeneratedReadme && (
        <>
          <MainSkills iconsList={iconsList} selectedLanguages={selectedLanguages.map(lang => lang.iconId)} setSelectedLanguages={setSelectedLanguages} />
          <button onClick={generateReadme}>Generate README</button>
        </>
      )}
      {showGeneratedReadme && (
        <>
          <h3>README Content</h3>
          <ReadmeEditor content={generatedReadmeContent} onContentChange={handleContentChange} />
          <div className="retryButton">
            <button onClick={retry}>Retry</button>
          </div>
        </>
      )}
    </div>
  );
}

// iconsList에서 선택된 아이콘의 URL을 생성하는 함수
const createIconUrl = (iconId) => `https://skillicons.dev/icons?i=${iconId}`;