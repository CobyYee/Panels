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
import AuthContextProvider from '../auth'
import { useContext, useState } from 'react';

export default function PasswordResetScreen() {
    const {auth} = useContext(AuthContextProvider)
    const [sent, setSent] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        auth.passwordReset({
            email: data.get('email')
        }).then(value => {if (value) {setSent(true)}});
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
                        Forgot Password?
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            placeholder="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            sx={{ input: { color: 'white' } }}
                        />  
                        <Typography sx={{color: 'white', fontSize: 10, textAlign: 'center'}}>{sent ? "Password reset sent to email" : ""} </Typography>
                        <Button
                            type="submit"
                            name="submit"
                            id="submit"
                            fullWidth
                            variant="contained"
                            // NEED A SCRIPT TO GO WITH THIS, ENABLE BUTTON ONCE A VALID EMAIL IS INPUTTED
                            sx={{ mt: 1, mb: 2, backgroundColor:'#9c4247', "&:hover": { backgroundColor: 'red' } }}
                        >
                            Send Password Reset Email
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/login/" variant="body2">
                                    Back to sign in
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register/" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

// SUBMIT BUTTON IS DISABLED BY DEFAULT, BUT IF A VALID EMAIL IS INPUTTED, THEN ENABLE THE BUTTON
/*
<script>
    function validate() {
        var valid = true;
        valid = checkEmail($("#email"));

        $("#submit").attr("disabled",true);
        if(valid) {
            $("#submit").attr("disabled",false);
        }
    }

    function checkEmpty(obj) {
        var name = $(obj).attr("name");

        $("."+name+"-validation").html("");
        $(obj).css("border","");

        if($(obj).val() == "") {
            $(obj).css("border","#FF0000 1px solid");
            $("."+name+"-validation").html("Required");
            return false;
        }

        return true;
    }

    function checkEmail(obj) {
        var result = true;

        var name = $(obj).attr("name");
        $("."+name+"-validation").html("");
        $(obj).css("border","");

        result = checkEmpty(obj);

        if(!result) {
            $(obj).css("border","#FF0000 1px solid");
            $("."+name+"-validation").html("Required");
            return false;
        }

        var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,3})+$/;
        result = email_regex.test($(obj).val());

        if(!result) {
            $(obj).css("border","#FF0000 1px solid");
            $("."+name+"-validation").html("Invalid");
            return false;
        }

        return result;
    }
</script>
*/