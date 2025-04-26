import React from 'react';
import { useSearch } from '../contexts/SearchContext';
import '../styles/HistoryPage.css';

const HistoryPage = () => {
  const { searchHistory, doSearch } = useSearch();

  return (
    <div className="history-page">
      <h2>Search History</h2>
      {searchHistory.length === 0 ? (
        <p>No search history.</p>
      ) : (
        <ul>
          {searchHistory.map((term, idx) => (
            <li key={idx}>
              <button onClick={() => doSearch(term)}>{term}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage;