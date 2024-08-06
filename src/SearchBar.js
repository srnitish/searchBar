import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce function
  const debounce = (fn, delay) => {
    let handler;
    return function (...args) {
      if (handler) {
        clearTimeout(handler);
      }
      handler = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // Debounced function to set the debounced query
  const updateDebouncedQuery = debounce((newQuery) => {
    setDebouncedQuery(newQuery);
  }, 500);

  // Update debounced query after a delay
  useEffect(() => {
    updateDebouncedQuery(query);
  }, [query]);

  // Filter data based on the debounced query
  useEffect(() => {
    const fetchData = () => {
      const products = [
        { id: 1, title: 'AVA', content: 'Content for AVA' },
        { id: 2, title: 'Poornata App', content: 'Content for Poornata App' },
        { id: 3, title: 'MVP', content: 'Content for MVP' },
      ];

      if (debouncedQuery) {
        const filteredProducts = products.filter(product =>
          product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setResults(filteredProducts);
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  // Update suggestions based on the current query
  useEffect(() => {
    const products = [
      { id: 1, title: 'AVA' },
      { id: 2, title: 'Poornata App' },
      { id: 3, title: 'MVP' },
    ];

    if (query) {
      const filteredSuggestions = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      ).map(product => product.title);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(products.map(product => product.title));
    }
  }, [query]);

  // Function to highlight text
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // Scroll to the div with the corresponding id
  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Clear the search input
  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    setSuggestions([]);
    setResults([]);
  };

  return (
    <div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for a content..."
          style={{ paddingRight: '30px' }}
        />
        {query && (
          <button 
            onClick={clearSearch} 
            style={{ 
              position: 'absolute', 
              right: '5px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer' 
            }}
          >
            &#x2715;
          </button>
        )}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{ position: 'absolute', backgroundColor: 'white', border: '1px solid #ccc', width: '200px', listStyleType: 'none', padding: '0', margin: '0' }}>
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)} 
              style={{ padding: '10px', cursor: 'pointer' }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {debouncedQuery && results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {results.map((result, index) => (
            <li 
              key={index} 
              style={{ backgroundColor: 'antiquewhite', width: '50%', margin: '10px', padding: '10px', listStyleType: 'none', textAlign: 'center' }}
              onClick={() => scrollToDiv(`product-${result.id}`)}
            >
              <h3>{getHighlightedText(result.title, debouncedQuery)}</h3>
            </li>
          ))}
        </ul>
      )}
      <div id="product-1" style={{ margin: '50px 0', padding: '20px', border: '1px solid black' }}>
        <h2>AVA</h2>
        <p>Content for AVA</p>
      </div>
      <div id="product-2" style={{ margin: '50px 0', padding: '20px', border: '1px solid black', marginTop: '100px' }}>
        <h2>Poornata App</h2>
        <p>Content for Poornata App</p>
      </div>
      <div id="product-3" style={{ margin: '50px 0', padding: '20px', border: '1px solid black', marginBottom: '1000px' }}>
        <h2>MVP</h2>
        <p>Content for MVP</p>
      </div>
      <style>{`
        .highlight {
          background-color: yellow;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
