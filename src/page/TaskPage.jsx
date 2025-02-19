import {useState, useEffect} from "react";
import {Box, Button, Typography, TextField, IconButton, MenuItem, Paper, CircularProgress, Link} from "@mui/material";
import {FilterList, ThumbUp, Visibility} from "@mui/icons-material";
import api from "../api.js";
import {useNavigate} from "react-router-dom";

export const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/task?page=${page}&size=${size}`);
                const data = await response.data;
                setTasks(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Ошибка загрузки задач:", error);
            }
            setLoading(false);
        };

        fetchTasks();
    }, [page, size]);
    const navigate = useNavigate();
    return (
        <Box display="flex" justifyContent="center" p={4}>
            <Paper elevation={3} sx={{width: 800, p: 3, borderRadius: 2}}>
                {/* Заголовок и поиск */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5" fontWeight="bold">Problem Set</Typography>
                    <Box display="flex" gap={2}>
                        <TextField placeholder="Search problems..." size="small" variant="outlined"/>
                        <IconButton><FilterList/></IconButton>
                    </Box>
                </Box>

                {/* Контент: либо загрузка, либо список задач */}
                {loading ? (
                    <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress/>
                    </Box>
                ) : (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {tasks.length > 0 ? (
                            tasks.map((task, i) => (
                                <Paper key={task.id} elevation={1} sx={{
                                    p: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    transition: "0.3s",
                                    '&:hover': {boxShadow: 3}
                                }}>
                                    <Box width={40} height={40} display="flex" alignItems="center"
                                         justifyContent="center" bgcolor="success.light" borderRadius="50%">
                                        <Typography color="success.dark"
                                                    fontWeight="medium">{i + 1 + page * size}</Typography>
                                    </Box>

                                    <Box flexGrow={1}>
                                        <Link
                                              onClick={() => {
                                                  navigate(`/task/${encodeURIComponent(task.title)}`);
                                              }}
                                              style={{textDecoration: "none", color: "inherit"}}>
                                            <Typography fontWeight="medium" sx={{
                                                '&:hover': {color: "primary.main"},
                                                display: 'inline-block'
                                            }}>
                                                {task.title}
                                            </Typography>
                                        </Link>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography variant="body2" sx={{
                                                bgcolor: "success.light",
                                                color: "success.dark",
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: 1
                                            }}>
                                                {task.difficulty}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Acceptance: {task.acceptance}%
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box display="flex" alignItems="center" gap={0.5}>
                                            <IconButton size="small"><ThumbUp fontSize="small"/></IconButton>
                                            <Typography variant="body2">{task.likes}%</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" gap={0.5}>
                                            <IconButton size="small"><Visibility fontSize="small"/></IconButton>
                                            <Typography variant="body2">{task.views}M</Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            ))
                        ) : (
                            <Typography textAlign="center" color="text.secondary">No tasks available</Typography>
                        )}
                    </Box>
                )}

                {/* Пагинация */}
                <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" gap={2}>
                        <Button variant="contained" disabled={page === 0}
                                onClick={() => setPage(page - 1)}>Previous</Button>
                        <Button variant="contained" disabled={page + 1 >= totalPages}
                                onClick={() => setPage(page + 1)}>Next</Button>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="body2" color="text.secondary">Page {page + 1} of {totalPages}</Typography>
                        <MenuItem onClick={() => setSize(10)}>10 / page</MenuItem>
                        <MenuItem onClick={() => setSize(20)}>20 / page</MenuItem>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};
