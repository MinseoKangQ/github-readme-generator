import { useState, useEffect } from 'react';
import ReadmeEditor from './ReadmeEditor';
import MainSkills from './MainSkills';
import AvailableSkills from './AvailableSkills';
import NowStudying from './NowStudying';
import Loading from './Loading';
import './Body.css';
import { fetchReadmeAndParseIcons } from '../API/apiService';

export default function Body() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedAvailableLanguages, setSelectedAvailableLanguages] = useState([]);
  const [selectedStudyingLanguages, setSelectedStudyingLanguages] = useState([]);
  const [iconsList, setIconsList] = useState([]); // 파싱된 아이콘 리스트
  const [generatedReadmeContent, setGeneratedReadmeContent] = useState('');
  const [showGeneratedReadme, setShowGeneratedReadme] = useState(false); // 추가된 상태
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 타이틀
  const [mainSkillsTitle, setMainSkillsTitle] = useState('🪄 Main Skills');
  const [availableSkillsTitle, setAvailableSkillsTitle] = useState('💡 Available Skills');
  const [nowStudyingTitle, setNowStudyingTitle] = useState('📚 Now Studying');

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
    setIsLoading(true);
    setTimeout(() => {
      // 각 섹션의 마크다운 문자열 생성
      const mainSkillsMarkdown = selectedLanguages.length
        ? `### ${mainSkillsTitle}\n\n[![My Skills](https://skillicons.dev/icons?i=${selectedLanguages.join(",")})](https://skillicons.dev)`
        : '';
      const availableSkillsMarkdown = selectedAvailableLanguages.length
        ? `### ${availableSkillsTitle}\n\n[![Available Skills](https://skillicons.dev/icons?i=${selectedAvailableLanguages.join(",")})](https://skillicons.dev)`
        : '';
      const nowStudyingMarkdown = selectedStudyingLanguages.length
        ? `### ${nowStudyingTitle}\n\n[![Now Studying](https://skillicons.dev/icons?i=${selectedStudyingLanguages.join(",")})](https://skillicons.dev)`
        : '';
  
      // 섹션별로 내용이 있으면 앞에 <br><br>을 추가하는 로직
      const markdownSections = [
        mainSkillsMarkdown,
        availableSkillsMarkdown,
        nowStudyingMarkdown
      ].filter(Boolean); // 빈 문자열 제거
  
      const generatedContent = markdownSections.join("\n\n<br><br>\n\n");
      
      setGeneratedReadmeContent(generatedContent);
      setShowGeneratedReadme(true);
      setIsLoading(false);
    }, 1000);
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
          <MainSkills
            title={mainSkillsTitle}
            setTitle={setMainSkillsTitle}
            iconsList={iconsList}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
          />
          <AvailableSkills
            title={availableSkillsTitle}
            setTitle={setAvailableSkillsTitle}
            iconsList={iconsList}
            selectedAvailableLanguages={selectedAvailableLanguages}
            setSelectedAvailableLanguages={setSelectedAvailableLanguages}
          />
          <NowStudying
            title={nowStudyingTitle}
            setTitle={setNowStudyingTitle}
            iconsList={iconsList}
            selectedStudyingLanguages={selectedStudyingLanguages}
            setSelectedStudyingLanguages={setSelectedStudyingLanguages}
          />
          <div className="generateButton">
            <button onClick={generateReadme}>Generate README</button>
          </div>
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