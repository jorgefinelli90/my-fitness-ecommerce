import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Se ha enviado un enlace para restablecer la contraseña a tu correo.');
        } catch (err) {
            setError('Error al enviar el correo de restablecimiento.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center'
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Restablecer contraseña
            </Typography>

            {message && (
                <Typography color="success" gutterBottom>
                    {message}
                </Typography>
            )}

            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}

            <TextField
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                sx={{ maxWidth: 400 }}
            />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ maxWidth: 400, mt: 2 }}
                onClick={handlePasswordReset}
            >
                Enviar enlace de restablecimiento
            </Button>
        </Box>
    );
};

export default ForgotPassword;
