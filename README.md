# Agentic Wikipedia Search

This React application provides an agentic search experience using the Wikipedia API and OpenAI services. It fetches traditional Wikipedia search results and generates AI-powered summaries.

## Features

- Search Wikipedia articles
- Display traditional search results in a two-column layout
- AI-generated summary analyzing multiple results with citations
- Loading states, error handling
- Responsive design (mobile & desktop)
- Search history (stored in `localStorage`)
- Expand/collapse AI summary panel
- Toggle between brief/detailed summary formats
- Copy summary to clipboard
- View sources (Wikipedia article links)

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the project root based on `.env.example` and add your OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key
   ```

4. Run `npm run dev` (or `npm start`) to launch the development server on port 3000
5. Build for production with `npm run build`

When deploying to a subdirectory (e.g., `https://your-domain.com/projects/agentic-search/`), add the following to your `package.json`:

```json
  "homepage": "/projects/agentic-search"
```

Alternatively, you can set the `PUBLIC_URL` environment variable at build time:

```bash
PUBLIC_URL=/projects/agentic-search npm run build
```

## Project Structure

```
agentic-wiki-search/
├── .env.example
├── package.json
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   ├── App.js
│   ├── api/
│   │   ├── wiki.js
│   │   └── openai.js
│   ├── contexts/
│   │   └── SearchContext.js
│   ├── pages/
│   │   ├── SearchPage.js
│   │   └── HistoryPage.js
│   ├── components/
│   │   ├── SearchBar.js
│   │   ├── SearchResults.js
│   │   ├── AISummary.js
│   │   └── LoadingSpinner.js
│   └── styles/
│       ├── index.css
│       ├── App.css
│       ├── SearchBar.css
│       ├── SearchResults.css
│       ├── AISummary.css
│       ├── HistoryPage.css
│       └── LoadingSpinner.css
└── README.md
```