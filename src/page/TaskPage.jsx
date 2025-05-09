import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import api from '../api.js';
import { useNavigate } from 'react-router-dom';

export const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await api.get(`tasks/?page=${page + 1}&page_size=${size}`);
        const data = response.data;
        setTasks(data.results || []);
        setTotalPages(Math.ceil(data.count / size) || 1);
      } catch (error) {
        console.error('Error loading tasks:', error);
        setTasks([]);
        setTotalPages(1);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [page, size]);

  const handleSizeMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSizeMenuClose = (newSize) => {
    if (newSize) {
      setSize(newSize);
      setPage(0);
    }
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        display: 'flex',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Fade in={true} timeout={800}>
        <Paper
          elevation={6}
          sx={{
            width: { xs: '90%', sm: 900 },
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(145deg, #ffffff, #f0f4f8)',
          }}
        >
          {/* Header and Search */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#1976d2',
              }}
            >
              Explore Tasks
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                placeholder="Search tasks..."
                size="small"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
              <IconButton
                sx={{
                  borderRadius: 2,
                  color: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                  },
                }}
              >
                <FilterList />
              </IconButton>
            </Box>
          </Box>

          {/* Content: Loading or Task List */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress sx={{ color: '#1976d2' }} />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tasks.length > 0 ? (
                tasks.map((task, i) => (
                  <Paper
                    key={task.id}
                    elevation={2}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#4caf50',
                        borderRadius: '50%',
                      }}
                    >
                      <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                        {i + 1 + page * size}
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      <Link
                        component="button"
                        onClick={() => navigate(`tasks/${task.id}`)}
                        sx={{
                          textDecoration: 'none',
                          color: '#333',
                          '&:hover': {
                            color: '#1976d2',
                          },
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          {task.title}
                        </Typography>
                      </Link>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            bgcolor: '#e8f5e9',
                            color: '#2e7d32',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                          }}
                        >
                          {task.difficulty?.name || 'N/A'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {task.tags.map((tag) => (
                            <Typography
                              key={tag.id}
                              variant="body2"
                              sx={{
                                bgcolor: '#e3f2fd',
                                color: '#1976d2',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                              }}
                            >
                              {tag.name}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: '#666', mt: 0.5 }}
                      >
                        Time Limit: {task.time_limit}s | Memory Limit: {task.memory_limit}MB
                      </Typography>
                    </Box>
                  </Paper>
                ))
              ) : (
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: '#666',
                    py: 4,
                    fontStyle: 'italic',
                  }}
                >
                  No tasks available. Create a new task to get started!
                </Typography>
              )}
            </Box>
          )}

          {/* Pagination */}
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease',
                  },
                  '&:disabled': {
                    backgroundColor: '#b0bec5',
                  },
                }}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(page + 1)}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease',
                  },
                  '&:disabled': {
                    backgroundColor: '#b0bec5',
                  },
                }}
              >
                Next
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Page {page + 1} of {totalPages}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleSizeMenuOpen}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  color: '#1976d2',
                  borderColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    borderColor: '#1565c0',
                  },
                }}
              >
                {size} / page
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleSizeMenuClose()}
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <MenuItem onClick={() => handleSizeMenuClose(10)}>10 / page</MenuItem>
                <MenuItem onClick={() => handleSizeMenuClose(20)}>20 / page</MenuItem>
                <MenuItem onClick={() => handleSizeMenuClose(50)}>50 / page</MenuItem>
                <MenuItem onClick={() => handleSizeMenuClose(100)}>100 / page</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
};

export default TaskPage;