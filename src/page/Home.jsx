import {Button, Card, CardContent, Grid, IconButton, Typography} from '@mui/material';
import {Bar, BarChart, Line, LineChart, Radar, RadarChart, Tooltip, XAxis, YAxis} from 'recharts'; // Пример использования графиков с recharts (или Material-UI Chart, если используется)
import {useNavigate} from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div id="webcrumbs">
            <div className="w-[1200px] bg-white rounded-lg shadow-lg p-6 min-h-[800px]">
                <header className="mb-6">
                    <Typography variant="h3" fontWeight="bold" color="primary">MindForge

                    </Typography>
                    <Typography variant="body1" color="textSecondary" mt={2}>
                        Sharpen your problem-solving skills with challenges and insights.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{textTransform: 'none'}}
                        onClick={() => {
                            navigate('/create-task');
                        }}
                    >
                        Create Task
                    </Button>
                </header>

                <section className="mb-8">
                    <Typography variant="h5" fontWeight="600" color="textPrimary" mb={4}>
                        Your Performance
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" color="textPrimary">Time Spent per Problem</Typography>
                                    {/* Пример графика с recharts */}
                                    <LineChart width={300} height={200}
                                               data={[{name: 'Mon', time: 20}, {name: 'Tue', time: 40}, {
                                                   name: 'Wed',
                                                   time: 30
                                               }, {name: 'Thu', time: 50}, {name: 'Fri', time: 60}]}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Line type="monotone" dataKey="time" stroke="#4A6CFA"/>
                                    </LineChart>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" color="textPrimary">Accuracy</Typography>
                                    {/* Пример графика с recharts */}
                                    <RadarChart outerRadius={90} width={300} height={200}
                                                data={[{subject: 'Mon', A: 80}, {
                                                    subject: 'Tue',
                                                    A: 90
                                                }, {subject: 'Wed', A: 85}, {subject: 'Thu', A: 75}, {
                                                    subject: 'Fri',
                                                    A: 95
                                                }]}>
                                        <Radar name="Accuracy" dataKey="A" stroke="#4A6CFA" fill="#4A6CFA"
                                               fillOpacity={0.6}/>
                                    </RadarChart>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" color="textPrimary">Overall Progress</Typography>
                                    {/* Пример графика с recharts */}
                                    <BarChart width={300} height={200} data={[{name: 'Beginner', progress: 50}, {
                                        name: 'Intermediate',
                                        progress: 60
                                    }, {name: 'Advanced', progress: 70}, {
                                        name: 'Expert',
                                        progress: 85
                                    }, {name: 'Master', progress: 90}]}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Bar dataKey="progress" fill="#4A6CFA"/>
                                    </BarChart>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </section>

                <section className="mb-8">
                    <Typography variant="h5" fontWeight="600" color="textPrimary" mb={4}>
                        Quick Links
                    </Typography>
                    <Grid container spacing={4}>
                        {['Beginner', 'Intermediate', 'Advanced', 'Arrays', 'Strings', 'Dynamic Programming'].map((category) => (
                            <Grid item xs={12} sm={4} key={category}>
                                <Card variant="outlined" sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: 2,
                                    backgroundColor: '#4A6CFA'
                                }}>
                                    <Typography variant="body1" color="white">{category}</Typography>
                                    <IconButton color="white">
                                        <span className="material-symbols-outlined">category</span>
                                    </IconButton>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </section>

                <section className="mb-8">
                    <Typography variant="h5" fontWeight="600" color="textPrimary" mb={4}>
                        Popular Problems
                    </Typography>
                    <Grid container spacing={4}>
                        {[1, 2, 3, 4, 5, 6].map((number) => (
                            <Grid item xs={12} sm={4} key={number}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" color="textPrimary">Problem {number}</Typography>
                                        <Typography variant="body2" color="textSecondary">Tags: Dynamic Programming,
                                            Hard, Algorithms</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </section>

                <section className="mb-8">
                    <Typography variant="h5" fontWeight="600" color="textPrimary" mb={4}>
                        Leaderboard
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" color="textPrimary">Top Performers</Typography>
                                    <ol>
                                        <li>Alice - 1500 points</li>
                                        <li>Bob - 1400 points</li>
                                        <li>Charlie - 1300 points</li>
                                    </ol>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" color="textPrimary">Achievements</Typography>
                                    <ul>
                                        <li>Completed 50 Problems</li>
                                        <li>100% Accuracy in Arrays</li>
                                        <li>Solved a Master Challenge</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </section>

                <section>
                    <Typography variant="h5" fontWeight="600" color="textPrimary" mb={4}>
                        Time Tracking
                    </Typography>
                    <Grid container spacing={4}>
                        {[1, 2, 3].map((tracker) => (
                            <Grid item xs={12} sm={4} key={tracker}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" color="textPrimary">Problem Type {tracker}</Typography>
                                        <Typography variant="body2" color="textSecondary">Average
                                            Time: {tracker * 15} mins</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </section>
            </div>
        </div>
    );
};
