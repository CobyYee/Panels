import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AuthContextProvider from '../auth'
import {useContext } from 'react'

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function RegisterScreen() {
  const {auth} = useContext(AuthContextProvider)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('confirm'))
    auth.registerUser({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      username: data.get('username'),
      password: data.get('password'),
      passwordVerify: data.get('confirm')
    })
  }

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  placeholder="First Name"
                  autoFocus
                  sx={{ input: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  sx={{ input: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                  sx={{ input: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  placeholder="User Name"
                  name="username"
                  autoComplete="user-name"
                  sx={{ input: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type={values.showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"

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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm"
                  placeholder="Confirm Password"
                  type={values.showPassword ? 'text' : 'password'}
                  id="confirm-password"
                  autoComplete="confirm-password"

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
              </Grid>
            </Grid>
            <Typography style={{ mt: 1, color: 'white', textAlign: 'center', fontSize: 10}}>{(auth.error) ? auth.error : ""}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, backgroundColor:'#9c4247', "&:hover": { backgroundColor: 'red' } }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href='/login/' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      </div>
  );
}