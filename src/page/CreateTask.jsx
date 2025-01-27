import {
    Box,
    TextField,
    Typography,
    Button,
    MenuItem,
    Grid,
} from '@mui/material';
import {useState} from "react";
import api from "../api.js";

export const CreateTask = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        inputFormat: '',
        outputFormat: '',
        difficulty: '',
        timeLimit: 0,
        memoryLimit: 0,
        testCases: '',
        tags: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            ...formData,
            testCases: JSON.parse(formData.testCases || '[]'),
            tags: formData.tags.split(',').map((tag) => tag.trim()),
        };

        try {
            const response = await api.post('/task', body);

            if (response.ok) {
                alert('Task successfully created!');
                setFormData({
                    title: '',
                    description: '',
                    inputFormat: '',
                    outputFormat: '',
                    difficulty: '',
                    timeLimit: 0,
                    memoryLimit: 0,
                    testCases: '',
                    tags: '',
                });
            } else {
                const error = await response.json();
                alert(`Error: ${error.message || 'Failed to create task'}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <Box
            sx={{
                width: '720px',
                margin: 'auto',
                backgroundColor: 'white',
                boxShadow: 3,
                borderRadius: 2,
                padding: 4,
            }}
        >
            <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                mb={4}
                color="primary"
            >
                Create Task
            </Typography>

            <form onSubmit={handleSubmit}>
                {/* Title */}
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    variant="outlined"
                    margin="normal"
                    placeholder="Enter task title"
                    value={formData.title}
                    onChange={handleChange}
                />

                {/* Description */}
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    placeholder="Enter task description"
                    value={formData.description}
                    onChange={handleChange}
                />

                {/* Input and Output Formats */}

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="inputFormat"
                            name="inputFormat"
                            label="Input Format"
                            variant="outlined"
                            placeholder="Enter input format"
                            value={formData.inputFormat}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="outputFormat"
                            name="outputFormat"
                            label="Output Format"
                            variant="outlined"
                            placeholder="Enter output format"
                            value={formData.outputFormat}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                {/* Difficulty */}
                <TextField
                    select
                    fullWidth
                    id="difficulty"
                    name="difficulty"
                    label="Difficulty"
                    variant="outlined"
                    margin="normal"
                    value={formData.difficulty}
                    onChange={handleChange}
                >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </TextField>

                {/* Time and Memory Limits */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="timeLimit"
                            name="timeLimit"
                            label="Time Limit (ms)"
                            type="number"
                            variant="outlined"
                            placeholder="Enter time limit"
                            value={formData.timeLimit}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="memoryLimit"
                            name="memoryLimit"
                            label="Memory Limit (MB)"
                            type="number"
                            variant="outlined"
                            placeholder="Enter memory limit"
                            value={formData.memoryLimit}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                {/* Test Cases */}
                <TextField
                    fullWidth
                    id="testCases"
                    name="testCases"
                    label="Test Cases"
                    variant="outlined"
                    margin="normal"
                    placeholder='Add test cases (JSON format, e.g. [{"input": "...", "output": "..."}])'
                    value={formData.testCases}
                    onChange={handleChange}
                />

                {/* Tags */}
                <TextField
                    fullWidth
                    id="tags"
                    name="tags"
                    label="Tags"
                    variant="outlined"
                    margin="normal"
                    placeholder="Add tags (comma-separated)"
                    value={formData.tags}
                    onChange={handleChange}
                />

                {/* Submit Button */}
                <Box mt={3} textAlign="right">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{px: 4, py: 1.5}}
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
