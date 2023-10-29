import { useState } from 'react';
import './App.css'
import resultbox from './Components/ResultBox';

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
};

function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  const handleFilterClick = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handleSearch = () => {
    console.log('Search Query:', query);
    console.log('Filters:', filters);
    const results = [
      // query
      {
        name: "John Doe",
        description: "A person who is a person",
      }
    ];
    setSearchResults(results);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h1>Epic People Search 69</h1>
      <div className="search-bar-container">
        <div className="search-bar" style={centerStyle}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleEnterPress}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="filter-buttons">
        <button onClick={() => handleFilterClick('filter1')} className="filter-button">
          Filter 1
        </button>
        <button onClick={() => handleFilterClick('filter2')} className="filter-button">
          Filter 2
        </button>
      </div>
      <div className="results">
        <div>
          <h3>Filters:</h3>
          <pre>{JSON.stringify(filters, null, 2)}</pre>
        </div>
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index}>{result}</div>

          ))}
        </div>
      </div>
    </div>
  );
}

export default App;