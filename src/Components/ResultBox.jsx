// import React from 'react';
// import './ResultBox.css';

// function ResultBox({ person }) {
//   return (
//     <div className="result-box">
//       <h2>{person.name}</h2>
//       <p>Age: {person.age}</p>
//       <p>Location: {person.location}</p>
//     </div>
//   );
// }

// export default ResultBox;

import React from 'react';

function ResultBox({ person }) {
    return (
        <div className="result-box">
            <h2>{person.name}</h2>
            <p>{person.description}</p>
        </div>
    );
}

export default ResultBox;
