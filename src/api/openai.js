import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

/**
 * Generate an AI-powered summary for Wikipedia search results.
 * @param {string} query - Original search query.
 * @param {Array} wikiResults - List of wiki result objects.
 * @param {string} format - 'brief' or 'detailed'.
 * @returns {Promise<string>} Generated summary text.
 */
/**
 * Stream an AI-powered summary for Wikipedia search results.
 * Calls onData with each content chunk as it arrives.
 */
export const streamSummary = async (query, wikiResults, format, onData) => {
  const systemPrompt = 'You are an expert assistant summarizing Wikipedia articles.';
  const userPrompt = `
Given the following Wikipedia search results for the query "${query}", provide a ${format} summary. Include key concepts and definitions, relevant facts across multiple articles, and cite sources using article titles with links. Here are the results:

${wikiResults
    .map(r => `Title: ${r.title}\nSnippet: ${r.snippet.replace(/<[^>]+>/g, '')}\n`)
    .join('\n')}

Summary:
`;

  // Use Fetch API with stream=true to receive partial tokens
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
      stream: true,
    }),
  });
  if (!response.ok || !response.body) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${err}`);
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let done = false;
  let buffer = '';
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    if (value) {
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split('\n');
      buffer = parts.pop() || '';
      for (const part of parts) {
        const line = part.trim();
        if (!line.startsWith('data:')) continue;
        const jsonStr = line.replace(/^data:/, '').trim();
        if (jsonStr === '[DONE]') return;
        try {
          const parsed = JSON.parse(jsonStr);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) onData(delta);
        } catch (e) {
          console.error('OpenAI stream parse error', e);
        }
      }
    }
  }
};

/**
 * Full summary fallback: collects all chunks into a single string.
 */
export const generateSummary = async (query, wikiResults, format) => {
  let text = '';
  await streamSummary(query, wikiResults, format, chunk => {
    text += chunk;
  });
  return text.trim();
};