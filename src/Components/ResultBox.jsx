import React from 'react';
import "./Resultbox.css"


// TODO - fix the box shape and style
function ResultBox({ person }) {
    return (
        <div className="result-box">
            <h2>{person.Name}</h2>
            <p>{person.Gender}</p>
            <p>{person.Age}</p>
            <p>{person.DOB}</p>
            <p>{person.Description}</p>
            <p>{person.Occupation}</p>
            <p>{person.score}</p>
        </div>
    );
}

export default ResultBox;
