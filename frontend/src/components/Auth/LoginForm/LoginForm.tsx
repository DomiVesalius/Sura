import React, { Component } from 'react';
import { Button, Stack, TextField } from '@mui/material';

interface LoginProps {}

interface LoginState {
    username: string;
    password: string;
}

class LoginForm extends Component<LoginProps, LoginState> {

    state: LoginState = {
        username: "",
        password: ""
    }

    render() {
        return (
            <div>
                <form id="login-form">
                    <Stack spacing={2} maxWidth={0.2} >
                        <TextField label="Username" required />
                        <TextField label="Password" required />
                        <Button variant="contained">Login</Button>
                    </Stack>
                </form>
            </div>
        );
    }
}

export default LoginForm;
