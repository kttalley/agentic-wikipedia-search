import React, { createContext, useContext, useState, useEffect } from 'react';
import { searchWiki } from '../api/wiki';
import { generateSummary, streamSummary } from '../api/openai';

const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState('');
  const [sources, setSources] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSummary, setShowSummary] = useState(true);
  const [format, setFormat] = useState('detailed'); // 'brief' or 'detailed'

  // Load history from localStorage on mount
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) setSearchHistory(JSON.parse(history));
  }, []);

  // Persist history to localStorage
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  /**
   * Execute a search: fetch Wikipedia results and AI summary.
   */
  const doSearch = async (newQuery) => {
    if (!newQuery) return;
    setQuery(newQuery);
    setError(null);
    setResults([]);
    setSummary('');
    setSources([]);

    // Update history
    setSearchHistory(prev => [newQuery, ...prev.filter(q => q !== newQuery)]);

    try {
      setLoadingResults(true);
      const wikiResults = await searchWiki(newQuery);
      setResults(wikiResults);
      setSources(
        wikiResults.map(r => ({
          title: r.title,
          link: `https://en.wikipedia.org/wiki/${encodeURIComponent(r.title)}`,
        }))
      );
      setLoadingResults(false);

      // Stream AI summary with typewriter effect
      setLoadingSummary(true);
      setSummary('');
      // streamSummary will call setSummary incrementally
      await streamSummary(newQuery, wikiResults, format, (chunk) => {
        setSummary(prev => prev + chunk);
      });
      setLoadingSummary(false);
    } catch (err) {
      setError(err.message || 'An error occurred during search.');
      setLoadingResults(false);
      setLoadingSummary(false);
    }
  };

  const toggleSummaryPanel = () => setShowSummary(prev => !prev);
  const toggleFormat = () => setFormat(prev => (prev === 'brief' ? 'detailed' : 'brief'));

  return (
    <SearchContext.Provider
      value={{
        query,
        results,
        summary,
        sources,
        loadingResults,
        loadingSummary,
        error,
        searchHistory,
        showSummary,
        format,
        doSearch,
        toggleSummaryPanel,
        toggleFormat,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};