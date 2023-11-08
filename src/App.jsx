import { useState , useEffect } from 'react';
import './App.css'
import ResultBox from './Components/Resultbox';
import SearchBar from './Components/SearchBar';
import MultiLine from './Components/MultiLine';
import DoBSlider from './Components/DoBSlider';

import axios from 'axios';

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";

function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  
  
  const [searchBy, setSearchBy] = useState("default");
  const [checked, setChecked] = useState(false);
  const [scoreMode, setScoreMode] = useState("tfidf");
  
  const handleSearchBy = (event) => {
    setSearchBy(event.target.value);
  };

  const handleScoreMode = (event) => {
    setScoreMode(event.target.value);
  };
  
  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  const sendToMain = (data) => {
    console.log(data);

    let minDob = new Date(data[7][0], 1, 1);
    let maxDob = new Date(data[7][1], 1, 1);

    data.pop();

    let result = {};

    for (const variable of data) {
      const key = variable.charAt(0).toUpperCase() + variable.slice(1);

      if (window[variable] !== null) {
        result[key] = window[variable];
      }
    }

    handleSearch(result);
  };
  
  const sendDobToMain = (data) => {
    let minDob = new Date(data[0], 1, 1);
    let maxDob = new Date(data[1], 1, 1);

    handleSearch("test");
  };

  const GPTAPI_key = import.meta.env.VITE_GPT_API_KEY;
  
  const serverLink = import.meta.env.VITE_SERVER_LINK;

  console.log(GPTAPI_key);
  console.log(serverLink);

  let linkSuffix = "";

  const handleSearch = (query) => {
    // TODO - Add new filter logic

    console.log('Search Query:', query);
    console.log('Filters:', filters);



    if(!checked) {
      switch(searchBy) {
        case "default":
          linkSuffix = `/search/all?q=${query}`;
          break;
        case "name":
          linkSuffix = `/search?name=${query}`;
          break;
        case "dob":
          linkSuffix = `/search?mindate=${minDob}&maxdate=${maxDob}`;
          break;
        case "occupation":
          linkSuffix = `/search?occupation=${query}`;
          break;
        case "multiline":
          // TODO - Fix multiline search
          linkSuffix = `/search?multiline`;
          break;
        default:
          console.log("Invalid searchBy value");
          break;
      }
    } else {
      // TODO - Discuss GPT query call
      query = callGPT(query);
      linkSuffix = `/search/all?q=${query}`;
    }

    fetchData();
  };

  const callGPT = (query) => {
    // TODO - Call GPT API
    
    query = "engineer";

    return query;
  }
  
  const fetchData = () => {
      const axiosConfig = {
        headers: {
          'ngrok-skip-browser-warning': 'koosa'
        }
      };

      if(searchBy === "multiline") {
        // TODO - Discuss POST request for multiline search
        let test = 0;
      }

      axios.get(`${serverLink + linkSuffix}`, axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          console.log('JSON Response:');
          console.log(response.data);
          setSearchResults(response.data);
        } else {
          console.error('Request failed with status code: ' + response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // TODO - Send file to server
        console.log('Selected .docx file:', file);
      } else {
        alert('Please select a .docx file.');
      }
    }
  };

  {/* TODO - Improve overall page style */}
  return (
    <div className="App">
      <div className="search-contents">
        <h1>Epic People Search 69</h1>
        {searchBy === "multiline" ? <MultiLine sendToMain={sendToMain} /> : searchBy === "dob" ? <DoBSlider sendDobToMain={sendDobToMain}/> : <SearchBar handleSearch={handleSearch} />}

        <div>
          <FormControl variant="outlined" style={{ width: '150px' }}>
            <InputLabel id="page-select-label">Search by Filter</InputLabel>
            <Select
              labelId="page-select-label"
              id="page-select"
              value={searchBy}
              onChange={handleSearchBy}
              label="Search by Filter"
            >
              <MenuItem value={"default"}>All</MenuItem>
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"dob"}>Date of Birth</MenuItem>
              <MenuItem value={"occupation"}>Occupation</MenuItem>
              <MenuItem value={"multiline"}>Multi-Line</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{ padding: '10px' }}>
          <FormControl variant="outlined" style={{ width: '150px' }}>
            <InputLabel id="page-select-label">Score Mode</InputLabel>
            <Select
              labelId="page-select-label"
              id="page-select"
              value={scoreMode}
              onChange={handleScoreMode}
              label="Score Mode"
            >
              <MenuItem value={"tfidf"}>TF-IDF</MenuItem>
              <MenuItem value={"tf"}>TF Only</MenuItem>
              <MenuItem value={"idf"}>IDF Only</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckbox}
              />
            }
            label={"Use AI Query Reformatting"}
          />
        </div>

        <div className="results">
          <div className="search-results">
            {
              searchResults.map((result, index) => (
                <ResultBox key={index} person={result} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;