import React from 'react';
import './App.css';
import LoginForm from './components/Auth/LoginForm/LoginForm';
import { AppBar, Box, Typography } from '@mui/material';

const App: React.FC = () => {
    return (
        <div>
            <Box>
                <AppBar position="static">
                    <Typography variant="h3">Sura</Typography>
                </AppBar>
            </Box>

            <LoginForm />
        </div>
    );
};

export default App;
