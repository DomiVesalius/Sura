import React, { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';

interface LoginProps {}

const LoginForm: React.FC<LoginProps> = () => {
    const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });

    return (
        <div>
            <form id="login-form">
                <Stack spacing={2} maxWidth={0.2}>
                    <TextField label="Username" required />
                    <TextField label="Password" required />
                    <Button variant="contained">Login</Button>
                </Stack>
            </form>
        </div>
    );
};

export default LoginForm;