import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Fade,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  // Sample data (unchanged)
  const lineChartData = [
    { name: 'Mon', time: 20 },
    { name: 'Tue', time: 40 },
    { name: 'Wed', time: 30 },
    { name: 'Thu', time: 50 },
    { name: 'Fri', time: 60 },
  ];

  const radarChartData = [
    { subject: 'Mon', A: 80 },
    { subject: 'Tue', A: 90 },
    { subject: 'Wed', A: 85 },
    { subject: 'Thu', A: 75 },
    { subject: 'Fri', A: 95 },
  ];

  const barChartData = [
    { name: 'Beginner', progress: 50 },
    { name: 'Intermediate', progress: 60 },
    { name: 'Advanced', progress: 70 },
    { name: 'Expert', progress: 85 },
    { name: 'Master', progress: 90 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Fade in={true} timeout={800}>
        <Box
          sx={{
            borderRadius: 3,
            background: 'linear-gradient(145deg, #ffffff, #f0f4f8)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            minHeight: '800px',
            p: 6,
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#1976d2',
                letterSpacing: 1,
              }}
            >
              MindForge
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                mt: 2,
                mb: 4,
                maxWidth: '600px',
              }}
            >
              Sharpen your problem-solving skills with challenges and insights.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  py: 1.2,
                  px: 3,
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease',
                  },
                }}
                onClick={() => navigate('/create-task')}
              >
                Create Task
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  py: 1.2,
                  px: 3,
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease',
                  },
                }}
                onClick={() => navigate('/task')}
              >
                Tasks
              </Button>
            </Box>
          </Box>

          {/* Performance Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: '#1976d2',
                mb: 4,
              }}
            >
              Your Performance
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>
                      Time Spent per Problem
                    </Typography>
                    <LineChart width={300} height={200} data={lineChartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="time" stroke="#4A6CFA" />
                    </LineChart>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>
                      Accuracy
                    </Typography>
                    <RadarChart outerRadius={90} width={300} height={200} data={radarChartData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar
                        name="Accuracy"
                        dataKey="A"
                        stroke="#4A6CFA"
                        fill="#4A6CFA"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>
                      Overall Progress
                    </Typography>
                    <BarChart width={300} height={200} data={barChartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="progress" fill="#4A6CFA" />
                    </BarChart>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Quick Links Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: '#1976d2',
                mb: 4,
              }}
            >
              Quick Links
            </Typography>
            <Grid container spacing={4}>
              {['Beginner', 'Intermediate', 'Advanced', 'Arrays', 'Strings', 'Dynamic Programming'].map(
                (category) => (
                  <Grid item xs={12} sm={4} key={category}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        backgroundColor: '#4A6CFA',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                        },
                      }}
                    >
                      <Typography variant="body1">{category}</Typography>
                      <IconButton sx={{ color: '#fff' }}>
                        <span className="material-symbols-outlined">category</span>
                      </IconButton>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          </Box>

          {/* Popular Problems Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: '#1976d2',
                mb: 4,
              }}
            >
              Popular Problems
            </Typography>
            <Grid container spacing={4}>
              {[1, 2, 3, 4, 5, 6].map((number) => (
                <Grid item xs={12} sm={4} key={number}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      backgroundColor: '#fff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#333' }}>
                        Problem {number}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Tags: Dynamic Programming, Hard, Algorithms
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Leaderboard Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: '#1976d2',
                mb: 4,
              }}
            >
              Leaderboard
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>
                      Top Performers
                    </Typography>
                    <Box component="ol" sx={{ pl: 4, color: '#666' }}>
                      <li>Alice - 1500 points</li>
                      <li>Bob - 1400 points</li>
                      <li>Charlie - 1300 points</li>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>
                      Achievements
                    </Typography>
                    <Box component="ul" sx={{ pl: 4, color: '#666' }}>
                      <li>Completed 50 Problems</li>
                      <li>100% Accuracy in Arrays</li>
                      <li>Solved a Master Challenge</li>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Time Tracking Section */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: '#1976d2',
                mb: 4,
              }}
            >
              Time Tracking
            </Typography>
            <Grid container spacing={4}>
              {[1, 2, 3].map((tracker) => (
                <Grid item xs={12} sm={4} key={tracker}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      backgroundColor: '#fff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#333' }}>
                        Problem Type {tracker}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Average Time: {tracker * 15} mins
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
};

export default Home;