import { useState , useEffect } from 'react';
import './App.css'
import ResultBox from './Components/Resultbox';
import SearchBar from './Components/SearchBar';
import MultiLine from './Components/MultiLine';
import DoBSlider from './Components/DoBSlider';

import axios from 'axios';
import OpenAI from 'openai';

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  
  const [searchBy, setSearchBy] = useState("default");
  const [checked, setChecked] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [scoreMode, setScoreMode] = useState("bm25");

  const [selectedFile, setSelectedFile] = useState();

  const openai = new OpenAI({ apiKey: import.meta.env.VITE_GPT_API_KEY, dangerouslyAllowBrowser: true });

  let minDob = new Date(1900, 1, 1);
  let maxDob = new Date(2023, 1, 1);
  let result = {};
  let gptResult = {};

  const axiosConfig = {
    headers: {
      'ngrok-skip-browser-warning': 'koosa'
    }
  };
  
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

    result = {};

    if (data[0] !== "") {
      result["Name"] = data[0];
    }
    if (data[1] !== "") {
      result["Age"] = data[1];
    }
    if (data[2] !== "") {
      result["Gender"] = data[2];
    }
    if (data[3] !== "") {
      result["Occupation"] = data[3];
    }
    if (data[4] !== "") { 
      result["Description"] = data[4];
    }
    if (data[5] !== "") {
      result["Likes"] = data[5];
    }
    if (data[6] !== "") {
      result["Interests"] = data[6];
    }

    console.log(result);
    handleSearch(result);
  };
  
  const sendDobToMain = (data) => {
    minDob = new Date(data[0], 1, 1);
    maxDob = new Date(data[1], 1, 1);
    
    minDob = minDob.getFullYear() + "-0" + (minDob.getMonth() ) + "-0" + minDob.getDate();
    maxDob = maxDob.getFullYear() + "-0" + (maxDob.getMonth()) + "-0" + maxDob.getDate();

    handleSearch("test");
  };
  
  const serverLink = import.meta.env.VITE_SERVER_LINK;

  console.log(serverLink);

  let linkSuffix = "";

  const handleSearch = async (query) => {
    if(!checked) {
      switch(searchBy) {
        case "default":
          if(scoreMode != "bm25") {
            linkSuffix = `/search/${scoreMode}?q=${query}`;
          } else {
            linkSuffix = `/search/all?q=${query}`;
          }
          break;
        case "name":
          linkSuffix = `/search?name=${query}`;
          break;
        case "dob":
          linkSuffix = `/search/dob?mindate=${minDob}&maxdate=${maxDob}`;
          break;
        case "occupation":
          linkSuffix = `/search?occupation=${query}`;
          break;
        case "multiline":
          linkSuffix = `/search/multiline`;
          break;
        default:
          console.log("Invalid searchBy value");
          break;
      }
    } else {
      query = await callGPT(query);

      linkSuffix = `/search/multiline`;
    }

    fetchData();
  };

  const callGPT = async (query) => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You will be given a query. We would like to turn it into a JSON object that will be parsed by Node JS which will be your response. If your response is not in JSON format, the code will crash so you must always respond in this way and add nothing else. The JSON object is allowed to have the following fields: Name, Age, Gender, Occupation, Description, Likes, Interests. The key will be these strings, and the value will depend on the query given. You must fill in the blanks as you see fit. If a field does not exist in the query, include it as an empty string in the response. The current year is 2023. All values should be strings except age which should be an integer. Lists are not allowed. If a field seems like it can have more than one value, join the list into a string separated by spaces.",
        },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    let gptResponse = JSON.parse(completion.choices[0].message.content);
    
    if (gptResponse["Name"] !== "") {
      gptResult["Name"] = gptResponse["Name"];
    }
    if (gptResponse["Age"] !== "") {
      gptResult["Age"] = gptResponse["Age"];
    }
    if (gptResponse["Gender"] !== "") {
      gptResult["Gender"] = gptResponse["Gender"];
    }
    if (gptResponse["Occupation"] !== "") {
      gptResult["Occupation"] = gptResponse["Occupation"];
    }
    if (gptResponse["Description"] !== "") { 
      gptResult["Description"] = gptResponse["Description"];
    }
    if (gptResponse["Likes"] !== "") {
      gptResult["Likes"] = gptResponse["Likes"];
    }
    if (gptResponse["Interests"] !== "") {
      gptResult["Interests"] = gptResponse["Interests"];
    }

    console.log(JSON.stringify(gptResult));

    return query;
  }
  
  const fetchData = () => {
    if(checked && searchBy === "default") {
      axios.post(`${serverLink + linkSuffix}`, gptResult, axiosConfig)
        .then((response) => {
          if (response.status === 200) {
            console.log('POST Response:');
            console.log(response.data);
            setSearchResults(response.data);
          } else {
            console.error('Request failed with status code: ' + response.status);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.log(typeof result);
      if(searchBy === "multiline") {
        axios.post(`${serverLink + linkSuffix}`, result, axiosConfig)
        .then((response) => {
          if (response.status === 200) {
            console.log('POST Response:');
            console.log(response.data);
            setSearchResults(response.data);
          } else {
            console.error('Request failed with status code: ' + response.status);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      } else {
        axios.get(`${serverLink + linkSuffix}`, axiosConfig)
        .then((response) => {
          if (response.status === 200) {
            console.log('GET Response:');
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
    }
  }

  const handleFileChange = event => {
    const file = event.target.files[0];

    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
        setIsFileSelected(true);
        console.log('Selected .docx file:', selectedFile);
      } else {
        alert('Please select a .docx file.');
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleUpload = async () => {
    linkSuffix = `/upload`;

    const formData = new FormData();

    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${serverLink + linkSuffix}`, formData, axiosConfig);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="App">
      <div className="search-contents">
        <h1>Epic People Search 🔥</h1>
        {searchBy === "multiline" ? <MultiLine sendToMain={sendToMain} /> : searchBy === "dob" ? <DoBSlider sendDobToMain={sendDobToMain}/> : <SearchBar handleSearch={handleSearch} />}


        {isFileSelected ? <p>Selected File: {selectedFile.name}</p> : null}
        <div style={{ paddingBottom: '25px', paddingTop: isFileSelected ? '10px': '0' }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            style={{ marginLeft: '10px' }}
          >
            Send
          </Button>
        </div>

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
            <InputLabel id="page-select-label">Score Method</InputLabel>
            <Select
              labelId="page-select-label"
              id="page-select"
              value={scoreMode}
              onChange={handleScoreMode}
              label="Score Method"
            >
              <MenuItem value={"bm25"}>BM25</MenuItem>
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