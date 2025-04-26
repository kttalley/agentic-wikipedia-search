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
/**
 * Fetch the HTML content of a Wikipedia page.
 * @param {string} title - The title of the Wikipedia page.
 * @returns {Promise<string>} HTML content of the page.
 */
export const fetchPageHtml = async (title) => {
  const response = await axios.get('https://en.wikipedia.org/w/api.php', {
    params: {
      action: 'parse',
      page: title,
      format: 'json',
      origin: '*',
      prop: 'text',
    },
  });
  return response.data.parse.text['*'];
};
/**
 * Fetch the plain text extract of a Wikipedia page.
 * @param {string} title - The title of the Wikipedia page.
 * @returns {Promise<string>} Plain text of the page.
 */
export const fetchPageText = async (title) => {
  const response = await axios.get('https://en.wikipedia.org/w/api.php', {
    params: {
      action: 'query',
      prop: 'extracts',
      explaintext: true,
      titles: title,
      format: 'json',
      origin: '*',
    },
  });
  const pages = response.data.query.pages;
  const page = pages[Object.keys(pages)[0]];
  return page.extract;
};