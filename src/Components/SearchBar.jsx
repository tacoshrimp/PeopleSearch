import React, { useState } from 'react';
import "./SearchBar.css";
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div className="search-bar-container">
        <FaSearch id="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleEnterPress}
        />
    </div>
  );
}

export default SearchBar;