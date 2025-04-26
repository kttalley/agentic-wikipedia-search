import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

/**
 * Generate an AI-powered summary for Wikipedia search results.
 * @param {string} query - Original search query.
 * @param {Array} wikiResults - List of wiki result objects.
 * @param {string} format - 'brief' or 'detailed'.
 * @returns {Promise<string>} Generated summary text.
 */
export const generateSummary = async (query, wikiResults, format) => {
  const systemPrompt = 'You are an expert assistant summarizing Wikipedia articles.';
  const userPrompt = `
Given the following Wikipedia search results for the query "${query}", provide a ${format} summary. Include key concepts and definitions, relevant facts across multiple articles, and cite sources using article titles with links. Here are the results:

${wikiResults
    .map(r => `Title: ${r.title}\nSnippet: ${r.snippet.replace(/<[^>]+>/g, '')}\n`)
    .join('\n')}

Summary:
`;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content.trim();
};