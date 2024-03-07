import { useState } from 'react';
import PropTypes from 'prop-types'; 
import { marked } from 'marked';
import './ReadmeEditor.css';

function ReadmeEditor({ content, onContentChange, iconTheme, updateTheme }) {
  const [previewMode, setPreviewMode] = useState(false);

  const toggleTheme = () => {
    const newTheme = iconTheme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

//   return (
//     <div>
//       <div className="buttonGroup1">
//         <button onClick={() => setPreviewMode(false)} className={!previewMode ? 'selected' : ''}>Code</button>
//         <button onClick={() => setPreviewMode(true)} className={previewMode ? 'selected' : ''}>Preview</button>
//       </div>
//       <div className="toggleGroup" onClick={toggleTheme}>
//         <div className={`toggleBackground ${iconTheme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
//           <div className={`toggleButton ${iconTheme === 'dark' ? 'toggle-dark' : 'toggle-light'}`}></div>
//         </div>
//       </div>
//       {previewMode ? (
//         <div className="markdownPreview" dangerouslySetInnerHTML={{ __html: marked(content) }} />
//       ) : (
//         <textarea className="codePreview" value={content} onChange={onContentChange} />
//       )}
//     </div>
//   );
// }

return (
  <div className="editorContainer">
    <div className="toolbar">
      <div className="buttonGroup1">
        <button onClick={() => setPreviewMode(false)} className={!previewMode ? 'selected' : ''}>Code</button>
        <button onClick={() => setPreviewMode(true)} className={previewMode ? 'selected' : ''}>Preview</button>
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
      <textarea className="codePreview" value={content} onChange={onContentChange} />
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
