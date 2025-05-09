import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api.js";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await api.post('users/login/', formData)
            if (response.status === 201) {
                navigate('/home')
            } else {
                console.error(response);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    return (
        <Container component="main" maxWidth="xs">

            <CssBaseline/>
            <Box sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h5">
                    LogIn
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{mt: 3}}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;
