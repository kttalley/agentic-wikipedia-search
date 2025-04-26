import React from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import AISummary from '../components/AISummary';
import { useSearch } from '../contexts/SearchContext';
import '../styles/App.css';

const SearchPage = () => {
  const { loadingResults, loadingSummary, error } = useSearch();

  return (
    <div className="search-page">
      <SearchBar />
      {error && <div className="error-message">{error}</div>}
      <div className="container">
        <div className="column">
          {loadingResults ? <p>Loading results...</p> : <SearchResults />}
        </div>
        <div className="column">
          <AISummary loading={loadingSummary} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;