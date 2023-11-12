import React from 'react';
import "./Resultbox.css"
import { Card, CardContent, Typography, Box } from '@mui/material';


// TODO - fix the box shape and style
function ResultBox({ person }) {
    return (
        <Card sx={{ marginTop: '10px', marginBottom: '20px' }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography variant="h5">{person.Name}</Typography>
                    <Typography variant="subtitle1">{person.Occupation}</Typography>
                    {person.Age && <Typography variant="body1">{`Age: ${person.Age}`}</Typography>}
                    {person.DOB && <Typography variant="body1">{`DoB: ${person.DOB}`}</Typography>}
                    {person.Gender && <Typography variant="body1">{`Gender: ${person.Gender}`}</Typography>}
                    {person.Description && <Typography variant="body1">{`Description: ${person.Description}`}</Typography>}
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Typography variant="h4">{person.score}</Typography>
                    <Typography variant="caption">Score</Typography>
                </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ResultBox;
