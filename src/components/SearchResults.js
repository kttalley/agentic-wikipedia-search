import React from 'react';
import { useSearch } from '../contexts/SearchContext';
import '../styles/SearchResults.css';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const { results } = useSearch();

  if (results.length === 0) {
    return <p>No results to display.</p>;
  }

  return (
    <ul className="search-results">
      {results.map((item) => (
        <li key={item.pageid}>
          <Link to={`/page/${encodeURIComponent(item.title)}`} className="result-link">
            <h3>{item.title}</h3>
          </Link>
          <p
            dangerouslySetInnerHTML={{ __html: item.snippet + '...' }}
          />
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;