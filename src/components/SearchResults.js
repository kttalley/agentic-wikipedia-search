import React from 'react';
import { useSearch } from '../contexts/SearchContext';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const { results } = useSearch();

  if (results.length === 0) {
    return <p>No results to display.</p>;
  }

  return (
    <ul className="search-results">
      {results.map((item) => (
        <li key={item.pageid}>
          <a
            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>{item.title}</h3>
          </a>
          <p
            dangerouslySetInnerHTML={{ __html: item.snippet + '...' }}
          />
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;