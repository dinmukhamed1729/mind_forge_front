
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { Container, Paper, Typography, Chip, Button, CircularProgress, Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Bookmark, Share, Timer, Memory, ContentCopy } from "@mui/icons-material";
import api from "../api";

export const TaskView = () => {
    const { title } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState("python");
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.get(`/task/${encodeURIComponent(title)}`);
               console.log(response.data);
                setTask(response.data);
            } catch (error) {
                console.error("Ошибка загрузки задачи:", error);
            }
            setLoading(false);
        };

        fetchTask();
    }, [title]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Выберите файл перед отправкой");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);

        try {
            await api.post("/execute", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Файл отправлен успешно!");
        } catch (error) {
            console.error("Ошибка отправки файла:", error);
        }
    };

    const handleCopyTestCases = () => {
        const testCasesText = task.publicTestCases.map(tc => `Input:\n${tc.inputData}\nExpected Output:\n${tc.expectedOutput}`).join("\n\n");
        navigator.clipboard.writeText(testCasesText);
        alert("Тест-кейсы скопированы в буфер обмена!");
    };

    if (loading) return <CircularProgress />;
    if (!task) return <Typography variant="h6">Задача не найдена</Typography>;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <Bookmark color="primary" />
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" fontWeight="bold">
                            {task.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Share color="action" sx={{ cursor: "pointer" }} />
                    </Grid>
                </Grid>

                <Grid container spacing={1} sx={{ my: 2 }}>
                    <Grid item>
                        <Chip label={task.difficulty} color="primary" />
                    </Grid>
                    {task.tags?.map((tag, index) => (
                        <Grid item key={index}>
                            <Chip label={tag} variant="outlined" />
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="body1" sx={{ mt: 2 }}>{task.description}</Typography>

                <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} display="flex" alignItems="center">
                            <Timer color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2">Time Limit: {task.timeLimit}ms</Typography>
                        </Grid>
                        <Grid item xs={6} display="flex" alignItems="center">
                            <Memory color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2">Memory Limit: {task.memoryLimit}MB</Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Typography variant="h6" sx={{ mt: 3 }}>Input Format</Typography>
                <Typography variant="body2">{task.inputFormat}</Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Output Format</Typography>
                <Typography variant="body2">{task.outputFormat}</Typography>

                <Typography variant="h6" sx={{ mt: 3 }}>Sample Test Cases</Typography>
                {task.publicTestCases?.map((testCase, index) => (
                    <Paper key={index} elevation={1} sx={{ p: 2, my: 1 }}>
                        <Typography variant="subtitle2">Input:</Typography>
                        <Typography component="pre" sx={{ bgcolor: "grey.100", p: 1, borderRadius: 1 }}>{testCase.inputData}</Typography>
                        <Typography variant="subtitle2" sx={{ mt: 1 }}>Expected Output:</Typography>
                        <Typography component="pre" sx={{ bgcolor: "grey.100", p: 1, borderRadius: 1 }}>{testCase.expectedOutput}</Typography>
                    </Paper>
                ))}
                <Button variant="contained" color="secondary" startIcon={<ContentCopy />} onClick={handleCopyTestCases} sx={{ mt: 2 }}>Скопировать тест-кейсы</Button>

                <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel>Язык</InputLabel>
                    <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <MenuItem value="python">Python</MenuItem>
                        <MenuItem value="java">Java</MenuItem>
                    </Select>
                </FormControl>

                <input type="file" onChange={handleFileChange} style={{ marginTop: 16 }} />

                <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Solution</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};
