import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Container, Paper, Typography, Chip, Button, CircularProgress, Grid,
    Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import {Bookmark, Share, Timer, Memory, ContentCopy} from "@mui/icons-material";
import CodeMirror from '@uiw/react-codemirror';
import {material} from '@uiw/codemirror-theme-material';
import {python} from '@codemirror/lang-python';
import {java} from '@codemirror/lang-java';
import api from "../api";

export const TaskView = () => {
    const {id} = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState("python");
    const [code, setCode] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                console.log("ID = " + id)
                const response = await api.get(`/tasks/${id}/`);
                console.log(response);
                setTask(response.data);
            } catch (error) {
                console.error("Ошибка загрузки задачи:", error);
            }
            setLoading(false);
        };
        fetchTask()
    }, [id]);

    const handleSubmit = async () => {
        setSubmitting(true);
        const formData = new FormData();
        const fileExtension = language === "python" ? "py" : "java";
        const fileName = `solution.${fileExtension}`;
        const codeBlob = new Blob([code], {type: "text/plain"});
        formData.append("file", new File([codeBlob], fileName));
        formData.append("task", id);
        formData.append("language", language);

        try {
            const response = await api.post("/submissions", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.data.status === "wrong") {
                alert("Неверное решение");
            } else if (response.data.status === "correct") {
                alert("Правильное решение!");
            } else {
                alert("Решение отправлено успешно!");
            }
        } catch (error) {
            console.error("Ошибка отправки решения:", error);
            if (error.response) {
                alert(`Ошибка: ${error.response.data.detail || error.response.statusText}`);
            } else {
                alert("Ошибка при отправке");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleCopyTestCases = () => {
        if (!task?.testcases) return;

        const testCasesText = task.testcases
            .filter(tc => tc.is_public)
            .map(tc => `Input:\n${tc.input_data}\nExpected Output:\n${tc.expected_output}`)
            .join("\n\n");

        navigator.clipboard.writeText(testCasesText);
        alert("Тест-кейсы скопированы в буфер обмена!");
    };

    if (loading) return <CircularProgress/>;
    if (!task) return <Typography variant="h6">Задача не найдена</Typography>;

    return (
        <Container maxWidth="xl" sx={{mt: 4}}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{p: 4, borderRadius: 2}}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Bookmark color="primary"/>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5" fontWeight="bold">
                                    {task.title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Share color="action" sx={{cursor: "pointer"}}/>
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} sx={{my: 2}}>
                            <Grid item>
                                <Chip label={task.difficulty?.name} color="primary"/>
                            </Grid>
                            {task.tags?.map((tag, index) => (
                                <Grid item key={index}>
                                    <Chip label={tag.name} variant="outlined"/>
                                </Grid>
                            ))}
                        </Grid>

                        <Typography variant="body1" sx={{mt: 2}}>{task.description}</Typography>

                        <Paper elevation={1} sx={{p: 2, mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} display="flex" alignItems="center">
                                    <Timer color="primary" sx={{mr: 1}}/>
                                    <Typography variant="body2">Time Limit: {task.time_limit}ms</Typography>
                                </Grid>
                                <Grid item xs={6} display="flex" alignItems="center">
                                    <Memory color="primary" sx={{mr: 1}}/>
                                    <Typography variant="body2">Memory Limit: {task.memory_limit}MB</Typography>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Typography variant="h6" sx={{mt: 3}}>Input Format</Typography>
                        <Typography variant="body2">{task.input_format}</Typography>

                        <Typography variant="h6" sx={{mt: 2}}>Output Format</Typography>
                        <Typography variant="body2">{task.output_format}</Typography>

                        <Grid container justifyContent="flex-end" sx={{mt: 2}}>
                            <Button
                                variant="outlined"
                                startIcon={<ContentCopy/>}
                                onClick={handleCopyTestCases}
                            >
                                Copy Test Cases
                            </Button>
                        </Grid>

                        <Typography variant="h6" sx={{mt: 1}}>Sample Test Cases</Typography>
                        {task.testcases?.filter(tc => tc.is_public).map((testCase, index) => (
                            <Paper key={index} elevation={1} sx={{p: 2, my: 1}}>
                                <Typography variant="subtitle2">Input:</Typography>
                                <Typography
                                    component="pre"
                                    sx={{bgcolor: "grey.100", p: 1, borderRadius: 1, whiteSpace: 'pre-wrap'}}
                                >
                                    {testCase.input_data}
                                </Typography>
                                <Typography variant="subtitle2" sx={{mt: 1}}>Expected Output:</Typography>
                                <Typography
                                    component="pre"
                                    sx={{bgcolor: "grey.100", p: 1, borderRadius: 1, whiteSpace: 'pre-wrap'}}
                                >
                                    {testCase.expected_output}
                                </Typography>
                            </Paper>
                        ))}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{p: 4, borderRadius: 2, height: "100%"}}>
                        <FormControl fullWidth>
                            <InputLabel>Язык</InputLabel>
                            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                                <MenuItem value="python">Python</MenuItem>
                                <MenuItem value="java">Java</MenuItem>
                            </Select>
                        </FormControl>

                        <CodeMirror
                            value={code}
                            height="500px"
                            theme={material}
                            extensions={[language === 'python' ? python() : java()]}
                            onChange={(value) => setCode(value)}
                            style={{marginTop: '16px'}}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{mt: 3}}
                            disabled={submitting}
                        >
                            {submitting ? <CircularProgress size={24}/> : "Отправить решение"}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};