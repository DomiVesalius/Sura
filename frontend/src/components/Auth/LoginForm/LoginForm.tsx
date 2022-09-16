import React, { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import useStyles from "./styles";

interface LoginProps {}

const LoginForm: React.FC<LoginProps> = () => {
    const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
    const classes = useStyles();

    return (
        <Stack sx={{ boxShadow: 1 }}>
            <div className={classes.loginFormDiv}>
                <form className={classes.loginForm}>
                    <Stack spacing={2}>
                        <TextField label="Username" required />
                        <TextField label="Password" required />
                        <Button variant="contained">Login</Button>
                    </Stack>
                </form>
            </div>
        </Stack>
    );
};

export default LoginForm;
