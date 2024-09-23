import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Usuario registrado con éxito');
      // Aquí puedes añadir lógica para manejar el nombre, apellido y suscripción al newsletter
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box>
      <Typography variant="h5">Creá tu cuenta</Typography>

      <TextField
        label="Nombre"
        type="text"
        fullWidth
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        margin="normal"
      />

      <TextField
        label="Apellido"
        type="text"
        fullWidth
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        margin="normal"
      />

      <TextField
        label="Correo electrónico"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />

      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />

      <TextField
        label="Confirmar contraseña"
        type="password"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={subscribeNewsletter}
            onChange={(e) => setSubscribeNewsletter(e.target.checked)}
          />
        }
        label="Suscribirse al newsletter"
      />

      {error && <Typography color="error">{error}</Typography>}

      <Button variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2 }}>
        Registrarse
      </Button>
    </Box>
  );
};

export default Register;
