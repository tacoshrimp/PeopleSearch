import React from 'react';
import { useState } from 'react';
import "./MultiLine.css";
import { Card, CardContent, Typography, Grid, Box, TextField, FormControl, Select, MenuItem, Button, Slider } from '@mui/material';


function MultiLine({ sendToMain }) {
    const [name, setName] = useState("");
    const [occupation, setOccupation] = useState("");
    const [description, setDescription] = useState("");
    const [likes, setLikes] = useState("");
    const [interests, setInterests] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
      
    const handleSubmit = () => {

        console.log("Form submitted with values:");
        console.log("Name:", name);
        console.log("Age:", age);
        console.log("Gender:", gender);
        console.log("Occupation:", occupation);
        console.log("Description:", description);
        console.log("Likes:", likes);
        console.log("Interests:", interests);

        let data = [
            name,
            age,
            gender,
            occupation,
            description,
            likes,
            interests,
        ];

        sendToMain(data);
    };

    return (
        <div className="main">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
                sx={{ '& > :not(style)': { m: 1, width: '55ch' } }}
                >
                <Card>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8} md={7}>
                            <CardContent>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </CardContent>
                            <CardContent>
                                <FormControl variant="outlined" sx={{ margin: 'auto' }}>
                                    <Select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        displayEmpty
                                        >
                                        <MenuItem value=""><em>Gender</em></MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </CardContent>
                            <CardContent>
                                <TextField
                                    label="Age"
                                    variant="outlined"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    type="number"
                                    />
                            </CardContent>
                            <CardContent>
                                <TextField
                                    label="Occupation"
                                    variant="outlined"
                                    value={occupation}
                                    onChange={(e) => setOccupation(e.target.value)}
                                    />
                            </CardContent>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                            <CardContent>
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </CardContent>
                            <CardContent>
                                <TextField
                                    label="Likes"
                                    variant="outlined"
                                    value={likes}
                                    onChange={(e) => setLikes(e.target.value)}
                                />
                            </CardContent>
                            <CardContent>
                                <TextField
                                    label="Interests"
                                    variant="outlined"
                                    value={interests}
                                    onChange={(e) => setInterests(e.target.value)}
                                />
                            </CardContent>
                            <CardContent>
                                <Box display="flex" justifyContent="center" p={1} m={1}>
                                    <Button variant="outline" color="primary" onClick={handleSubmit} sx={{
                                        backgroundColor: "#619cfa",
                                        color: "#eeeeee",
                                        '&:hover': {
                                            backgroundColor: "#61bafa",
                                            color: "#eeeeee",
                                        }
                                    }}>
                                        Submit
                                    </Button>
                                </Box>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </div>
    );
}

export default MultiLine;