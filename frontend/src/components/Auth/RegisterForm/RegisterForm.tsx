import React, { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';

interface RegisterProps {}

const RegisterForm: React.FC<RegisterProps> = () => {
    const [registerInfo, setRegisterInfo] = useState({ username: '', password: '', confirm: '' });

    return (
        <div>
            <form id="register-form">
                <Stack spacing={2} maxWidth={0.2}>
                    <TextField label="Username" required />
                    <TextField label="Password" required />
                    <TextField label="Confirm Password" required />
                    <Button variant="contained">Register</Button>
                </Stack>
            </form>
        </div>
    );
};

export default RegisterForm;
