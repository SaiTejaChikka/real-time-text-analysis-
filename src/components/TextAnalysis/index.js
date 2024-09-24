import React, { useState, useEffect, useMemo } from 'react';
import './index.css';

const TextAnalysis = () => {
  const [text, setText] = useState('');
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [wordFrequency, setWordFrequency] = useState({});
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [highlightedText, setHighlightedText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Load saved text from localStorage when the component loads
  useEffect(() => {
    const savedText = localStorage.getItem('textData');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  // Save the text to localStorage on every text change
  useEffect(() => {
    localStorage.setItem('textData', text);
  }, [text]);

  // Function to calculate the unique word count and word frequency
  const calculateUniqueWords = (inputText) => {
    const words = inputText.toLowerCase().match(/\b\w+\b/g) || [];
    const wordMap = {};
    words.forEach((word) => {
      wordMap[word] = (wordMap[word] || 0) + 1;
    });
    setWordFrequency(wordMap);
    return new Set(words).size;
  };

  // Function to calculate character count excluding spaces and punctuation
  const calculateCharCount = (inputText) => {
    const chars = inputText.replace(/[^a-zA-Z0-9]/g, '');
    return chars.length;
  };

  // Update statistics whenever the text changes
  useEffect(() => {
    setUniqueWordCount(calculateUniqueWords(text));
    setCharCount(calculateCharCount(text));
    setHighlightedText(text); // Reset highlighted text to plain after analysis
  }, [text]);

  // Handle text replacement
  const handleReplace = () => {
    if (searchString) {
      const replacedText = text.split(searchString).join(replaceString);
      const highlighted = replacedText.split(replaceString).join(`<span class="highlight">${replaceString}</span>`);
      setText(replacedText);
      setHighlightedText(highlighted);  // Show highlighted version for the output
    }
  };

  // Memoize word frequency calculation for better performance
  const wordFrequencyMemoized = useMemo(() => wordFrequency, [wordFrequency]);

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Real-Time Text Analysis</h1>

      <textarea
        rows="10"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
      />

      <div className="stats">
        <p>Unique Word Count: {uniqueWordCount}</p>
        <p>Character Count (Excluding Spaces and Punctuation): {charCount}</p>
      </div>

      <div className="replace-section">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search for..."
        />
        <input
          type="text"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          placeholder="Replace with..."
        />
        <button onClick={handleReplace}>Replace All</button>
      </div>

      {/* Render highlighted text */}
      <div className="output">
        <h2>Modified Text:</h2>
        <div
          dangerouslySetInnerHTML={{ __html: highlightedText }}
          className="text-output"
        />
      </div>

      <div className="word-frequency">
        <h3>Word Frequency:</h3>
        {Object.entries(wordFrequencyMemoized).map(([word, count]) => (
          <div key={word}>{word}: {count}</div>
        ))}
      </div>

      {/* Toggle Dark Mode */}
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default TextAnalysis;
