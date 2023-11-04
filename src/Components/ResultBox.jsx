import React from 'react';
import "./Resultbox.css"


// TODO - fix the box shape and style
function ResultBox({ person }) {
    return (
        <div className="result-box">
            {
                // print all the values in person
                // Object.entries(person).map(([key, value]) => (
                //     <p key={key}>{key}: {value}</p>
                // ))
            }
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
