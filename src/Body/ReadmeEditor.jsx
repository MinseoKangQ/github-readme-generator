import { useState } from 'react';
import PropTypes from 'prop-types'; 
import { marked } from 'marked';
import './ReadmeEditor.css';
import copy from '../assets/copy.svg';

function ReadmeEditor({ content, onContentChange, iconTheme, updateTheme }) {
  const [previewMode, setPreviewMode] = useState(false);

  const toggleTheme = () => {
    const newTheme = iconTheme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(content).then(() => {
      alert('Success code copy!');
    }, (err) => {
      console.error('Error copying text: ', err);
    });
  };  

return (
  <div className="editorContainer">
    {/* <div className="toolbar">
      <div className="buttonGroup1">
        <button onClick={() => setPreviewMode(false)} className={!previewMode ? 'selected' : ''}>Code</button>
        <button onClick={() => setPreviewMode(true)} className={previewMode ? 'selected' : ''}>Preview</button>
      </div>
      <div className="rightControls">
        <div className="copyButton" onClick={copyMarkdown}>
          <img src={copy} alt="Copy" />
        </div>
        <div className="toggleGroup" onClick={toggleTheme}>
          <div className={`toggleBackground ${iconTheme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
            <div className={`toggleButton ${iconTheme === 'dark' ? 'toggle-dark' : 'toggle-light'}`}></div>
          </div>
        </div>
      </div>
    </div> */}
    <div className="toolbar">
      <div className="buttonGroup1">
        <button onClick={() => setPreviewMode(false)} className={!previewMode ? 'selected' : ''}>Code</button>
        <button onClick={() => setPreviewMode(true)} className={previewMode ? 'selected' : ''}>Preview</button>
        <div className="copyButton" onClick={copyMarkdown}>
          <img src={copy} alt="Copy" />
        </div>
      </div>
      <div className="toggleGroup" onClick={toggleTheme}>
        <div className={`toggleBackground ${iconTheme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
          <div className={`toggleButton ${iconTheme === 'dark' ? 'toggle-dark' : 'toggle-light'}`}></div>
        </div>
      </div>
    </div>
    {previewMode ? (
      <div className="markdownPreview" dangerouslySetInnerHTML={{ __html: marked(content) }} />
    ) : (
      <textarea className="codePreview" value={content} onChange={(e) => onContentChange(e.target.value)} />
    )}
  </div>
);
}

ReadmeEditor.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
  iconTheme: PropTypes.string.isRequired,
  updateTheme: PropTypes.func.isRequired,
};

export default ReadmeEditor;
