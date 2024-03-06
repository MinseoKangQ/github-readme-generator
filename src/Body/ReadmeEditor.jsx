import { useState } from 'react';
import PropTypes from 'prop-types'; 
import { marked } from 'marked';
import './ReadmeEditor.css';

function ReadmeEditor({ content, onContentChange, iconTheme, setIconTheme }) {
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div>
      <div className="buttonGroup">
        <button onClick={() => setPreviewMode(false)} className={!previewMode ? 'selected' : ''}>
          Code
        </button>
        <button onClick={() => setPreviewMode(true)} className={previewMode ? 'selected' : ''}>
          Preview
        </button>
      </div>
      <div className="buttonGroup">
        <button 
          onClick={() => setIconTheme('light')}
          className={iconTheme === 'light' ? 'selected' : ''}
        >
          Light
        </button>
        <button 
          onClick={() => setIconTheme('dark')} 
          className={iconTheme === 'dark' ? 'selected' : ''}
        >
          Dark
        </button>
      </div>
      {previewMode ? (
        <div className="markdownPreview" dangerouslySetInnerHTML={{ __html: marked(content) }} />
      ) : (
        <textarea className="codePreview" value={content} onChange={(e) => onContentChange(e.target.value)} />
      )}
    </div>
  );
}

// PropTypes를 정의
ReadmeEditor.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
  iconTheme: PropTypes.string.isRequired,
  setIconTheme: PropTypes.func.isRequired,
};

export default ReadmeEditor;
