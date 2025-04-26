import axios from 'axios';

/**
 * Perform a search query on the Wikipedia API.
 * @param {string} query - The search term.
 * @returns {Promise<Array>} List of search result objects with title, pageid, and snippet.
 */
export const searchWiki = async (query) => {
  const response = await axios.get('https://en.wikipedia.org/w/api.php', {
    params: {
      action: 'query',
      list: 'search',
      srsearch: query,
      format: 'json',
      origin: '*',
    },
  });
  return response.data.query.search.map(item => ({
    pageid: item.pageid,
    title: item.title,
    snippet: item.snippet,
  }));
};