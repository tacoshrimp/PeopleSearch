import React from 'react';
import { useState } from 'react';
import { TextField, FormControl, Select, MenuItem, Slider } from "@mui/material";
import { Box } from "@mui/system";
import Button from '@mui/material/Button';

function DoBSlider({ sendDobToMain }) {
    const [dob, setDob] = useState([1900, 2023]);

    const handleSliderChange = (event, newValue) => {
        setDob(newValue);
    };

    function valuetext(value) {
        return `${value}`;
    }

    const marks = [
        {
            value: 1900,
            label: '1900',
        },
        {
            value: 2023,
            label: '2023',
        },
    ];

    const handleSubmit = () => {

        console.log("Form submitted with values:");
        console.log("Date of Birth:", dob);

        sendDobToMain(dob);
    };

    return (
        <Box>
            <p style={{ margin: 'auto',  display: "flex", justifyContent: "center", paddingTop: 10 }}>
                        Date of Birth
                    </p>
            <Box sx={{ width: 300 }}>
                <Slider
                    defaultValue={0}
                    value={dob}
                    onChange={handleSliderChange}
                    getAriaValueText={valuetext}
                    marks={marks}
                    valueLabelDisplay="auto"
                    min={1900}
                    max={2023}
                    disableSwap
                    sx={{ 
                        color: "#619cfa",
                    }}
                />
            </Box>
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
        </Box>
    );
}

export default DoBSlider;