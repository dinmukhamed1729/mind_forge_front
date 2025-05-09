import {
    Box,
    TextField,
    Typography,
    Button,
    MenuItem,
    Grid,
    Paper,
} from '@mui/material';
import { useState } from 'react';
import api from '../api.js';

export const CreateTask = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        inputFormat: '',
        outputFormat: '',
        difficulty: '',
        timeLimit: 2,
        memoryLimit: 256,
        testCases: '',
        tags: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.difficulty) newErrors.difficulty = 'Difficulty is required';
        if (formData.timeLimit <= 0) newErrors.timeLimit = 'Time limit must be greater than 0';
        if (formData.memoryLimit <= 0) newErrors.memoryLimit = 'Memory limit must be greater than 0';
        if (!formData.tags.trim()) newErrors.tags = 'At least one tag is required';

        try {
            const parsedTestCases = JSON.parse(formData.testCases || '[]');
            if (!Array.isArray(parsedTestCases) || parsedTestCases.length === 0) {
                newErrors.testCases = 'At least one test case is required';
            } else {
                parsedTestCases.forEach((tc, index) => {
                    if (!tc.input_data || !tc.expected_output) {
                        newErrors.testCases = `Test case ${index + 1} must have both input_data and expected_output`;
                    }
                });
            }
        } catch (e) {
            newErrors.testCases = 'Test cases must be valid JSON';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        let parsedTestCases;
        try {
            parsedTestCases = JSON.parse(formData.testCases || '[]');
        } catch (e) {
            alert('Error: Test cases must be valid JSON');
            return;
        }

        const body = {
            title: formData.title,
            description: formData.description,
            input_format: formData.inputFormat,
            output_format: formData.outputFormat,
            difficulty: { name: formData.difficulty },
            time_limit: parseInt(formData.timeLimit, 10),
            memory_limit: parseInt(formData.memoryLimit, 10),
            testcases: parsedTestCases.map((tc) => ({
                input_data: tc.input_data,
                expected_output: tc.expected_output,
            })),
            tags: formData.tags
                .split(',')
                .map((tag) => ({ name: tag.trim() }))
                .filter((tag) => tag.name),
        };

        try {
            const response = await api.post('tasks/', body);

            if (response.status === 201) {
                alert('Task successfully created!');
                setFormData({
                    title: '',
                    description: '',
                    inputFormat: '',
                    outputFormat: '',
                    difficulty: '',
                    timeLimit: 2,
                    memoryLimit: 256,
                    testCases: '',
                    tags: '',
                });
                setErrors({});
            } else {
                const error = response.data;
                alert(`Error: ${error.message || 'Failed to create task'}`);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to create task';
            alert(`Error: ${errorMessage}`);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: '100%',
                    maxWidth: '800px',
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: '#ffffff',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.02)',
                    },
                }}
            >
                <Typography
                    variant="h4"
                    component="h2"
                    fontWeight="bold"
                    mb={4}
                    color="#1976d2"
                    sx={{ textAlign: 'center', fontFamily: '"Roboto", sans-serif' }}
                >
                    Create New Task
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
                        error={!!errors.title}
                        helperText={errors.title}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '&:hover fieldset': {
                                    borderColor: '#1976d2',
                                },
                            },
                        }}
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
                        error={!!errors.description}
                        helperText={errors.description}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '&:hover fieldset': {
                                    borderColor: '#1976d2',
                                },
                            },
                        }}
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
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                    },
                                }}
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
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                    },
                                }}
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
                        error={!!errors.difficulty}
                        helperText={errors.difficulty}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '&:hover fieldset': {
                                    borderColor: '#1976d2',
                                },
                            },
                        }}
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
                                label="Time Limit (s)"
                                type="number"
                                variant="outlined"
                                placeholder="Enter time limit"
                                value={formData.timeLimit}
                                onChange={handleChange}
                                error={!!errors.timeLimit}
                                helperText={errors.timeLimit}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                    },
                                }}
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
                                error={!!errors.memoryLimit}
                                helperText={errors.memoryLimit}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                    },
                                }}
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
                        placeholder='Add test cases (JSON format, e.g. [{"input_data": "2", "expected_output": "4"}])'
                        value={formData.testCases}
                        onChange={handleChange}
                        error={!!errors.testCases}
                        helperText={errors.testCases}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '&:hover fieldset': {
                                    borderColor: '#1976d2',
                                },
                            },
                        }}
                    />

                    {/* Tags */}
                    <TextField
                        fullWidth
                        id="tags"
                        name="tags"
                        label="Tags"
                        variant="outlined"
                        margin="normal"
                        placeholder="Add tags (comma-separated, e.g. Math, Geometry)"
                        value={formData.tags}
                        onChange={handleChange}
                        error={!!errors.tags}
                        helperText={errors.tags}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '&:hover fieldset': {
                                    borderColor: '#1976d2',
                                },
                            },
                        }}
                    />

                    {/* Submit Button */}
                    <Box mt={4} textAlign="right">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                px: 5,
                                py: 1.5,
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}
                        >
                            Create Task
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};