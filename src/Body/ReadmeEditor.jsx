import { useState } from 'react';
import PropTypes from 'prop-types'; 
import { marked } from 'marked';
import './ReadmeEditor.css';

function ReadmeEditor({ content, onContentChange }) {
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
      {previewMode ? (
        <div className="markdownPreview" dangerouslySetInnerHTML={{ __html: marked(content) }} />
      ) : (
        <textarea className="codePreview" value={content} onChange={onContentChange} />
      )}
    </div>
  );
}

// 여기에 PropTypes를 정의합니다.
ReadmeEditor.propTypes = {
  content: PropTypes.string.isRequired, // content는 문자열이며 필수입니다.
  onContentChange: PropTypes.func.isRequired, // onContentChange는 함수이며 필수입니다.
};

export default ReadmeEditor;
