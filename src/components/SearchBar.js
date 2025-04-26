import React, { useState } from 'react';
import { useSearch } from '../contexts/SearchContext';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const { doSearch } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    doSearch(input);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Wikipedia..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;