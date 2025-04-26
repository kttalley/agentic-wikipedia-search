import React from 'react';
import { useSearch } from '../contexts/SearchContext';
import LoadingSpinner from './LoadingSpinner';
import '../styles/AISummary.css';

const AISummary = ({ loading }) => {
  const { summary, showSummary, toggleSummaryPanel, format, toggleFormat, sources } = useSearch();

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      alert('Summary copied to clipboard!');
    }
  };

  if (!showSummary) {
    return (
      <button className="expand-button" onClick={toggleSummaryPanel}>
        Expand Summary Panel
      </button>
    );
  }

  return (
    <div className="ai-summary">
      <div className="ai-summary-header">
        <h2>AI Summary</h2>
        <div className="ai-summary-controls">
          <button onClick={toggleFormat}>
            {format === 'brief' ? 'Switch to Detailed' : 'Switch to Brief'}
          </button>
          <button onClick={handleCopy}>Copy to Clipboard</button>
          <button onClick={toggleSummaryPanel}>Collapse</button>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="ai-summary-content">
          <p>{summary}</p>
          <div className="ai-sources">
            <h4>Sources</h4>
            <ul>
              {sources.map((s, idx) => (
                <li key={idx}>
                  <a href={s.link} target="_blank" rel="noopener noreferrer">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISummary;