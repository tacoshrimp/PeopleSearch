import { useState } from 'react';
import './App.css'
import ResultBox from './Components/Resultbox';

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
};

{/* TODO - Update page when search button is clicked */}

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
      // TODO - replace this with a real API call based on filters

      // const response = await fetch(`/api/search?query=${query}`);
      // const results = await response.json();

      {
        name: "John Doe",
        description: "A person who is a person " + query,
      },
      {
        name: "Jane Doe",
        description: "A person2 who is a person2 " + query,
      }
    ];
    setSearchResults(results);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  {/* TODO - Improve overall page style */}
  return (
    <div>
      {/* TODO - Create real name */}
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
      {/* TODO - Create real filters and update button states based on value */}
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
          {
            searchResults.map((result, index) => (
              <ResultBox key={index} person={result} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;