import React from 'react';
import "./Resultbox.css"


// TODO - fix the box shape and style
function ResultBox({ person }) {
    return (
        <div className="result-box">
            <h2>{person.name}</h2>
            <p>{person.description}</p>
        </div>
    );
}

export default ResultBox;
