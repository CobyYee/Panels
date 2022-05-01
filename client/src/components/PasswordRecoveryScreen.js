import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AuthContextProvider from '../auth'
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PasswordRecoveryScreen() {
    const {auth} = useContext(AuthContextProvider)
    const [saved, setSaved] = useState(false);

    const { id, token } = useParams();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        auth.saveNewPassword({
            userId: id,
            token: token,
            newPassword: data.get('password')
        }).then(value => {
            if (value) { setSaved(true)}
        });
    };

    const[values, setValues] = React.useState({
        password: '',
        showPassword: false
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{ background: '#2b2b2b', height: '95.1vh' }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        paddingTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#9c4247' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
                        Change Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: 400, mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            placeholder="New Password"
                            id="password"
                            autoComplete="new-password"

                            type={values.showPassword ? 'text' : 'password'}
                            onChange={handleChange('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOffIcon style={{ color: "white" }} /> : <VisibilityIcon style={{ color: "white" }} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}

                            sx={{ input: { color: 'white' } }}
                        />
                        <Typography style={{textAlign: 'center', fontSize: 10, color: 'white' }}>
                            {saved ? "Password Updated" : ""}
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2, backgroundColor:'#9c4247', "&:hover": { backgroundColor: '#b8434b' } }}
                        >
                            Change Password
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}