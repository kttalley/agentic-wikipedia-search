import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPageHtml, fetchPageText } from '../api/wiki';
import { generateChatReply } from '../api/openai';
import LoadingSpinner from '../components/LoadingSpinner';
import Typewriter from '../components/Typewriter';
import '../styles/WikiPage.css';

const WikiPage = () => {
  const { title } = useParams();
  const [htmlContent, setHtmlContent] = useState('');
  const [plainText, setPlainText] = useState('');
  const [loading, setLoading] = useState(true);

  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const [html, text] = await Promise.all([
          fetchPageHtml(title),
          fetchPageText(title),
        ]);
        setHtmlContent(html);
        setPlainText(text);
      } catch (e) {
        console.error('Error loading page:', e);
      } finally {
        setLoading(false);
      }
    };
    loadPage();
  }, [title]);

  const handleSend = async (e) => {
    e.preventDefault();
    const input = e.target.elements.prompt;
    const userText = input.value.trim();
    if (!userText) return;
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    input.value = '';
    setChatLoading(true);
    try {
      const reply = await generateChatReply(title, plainText, newMessages);
      setMessages((msgs) => [...msgs, { role: 'assistant', content: reply }]);
    } catch (e) {
      console.error('Chat error:', e);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="wiki-page">
      <div className="chat-panel">
        <h3>Ask the article</h3>
        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <strong>{msg.role === 'user' ? 'You' : title}</strong>:{' '}
              {msg.role === 'assistant' ? (
                <Typewriter text={msg.content} speed={30} />
              ) : (
                msg.content
              )}
            </div>
          ))}
          {chatLoading && <LoadingSpinner />}
        </div>
        <form onSubmit={handleSend} className="chat-form">
          <input
            type="text"
            name="prompt"
            placeholder="Ask a question..."
            disabled={chatLoading}
          />
          <button type="submit" disabled={chatLoading}>
            Send
          </button>
        </form>
      </div>
      <div className="wiki-content">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};

export default WikiPage;