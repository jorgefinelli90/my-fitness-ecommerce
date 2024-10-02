import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel, Snackbar, CircularProgress } from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para el Snackbar
  const navigate = useNavigate(); // Hook para la redirección

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true); // Activamos el estado de carga

      // Crear el usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizar el perfil del usuario con el nombre completo (nombre + apellido)
      await updateProfile(user, {
        displayName: `${nombre} ${apellido}`,
      });

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName: nombre,
        lastName: apellido,
        email: email,
        phone: '',
        address: '',
        newsletter: subscribeNewsletter,
        photoURL: ''
      });

      // Mostrar el snackbar durante 700 ms y luego redirigir al inicio
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
        navigate('/'); // Redirige al inicio
      }, 700);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Finalizamos el estado de carga
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        disabled={loading} // Deshabilitar el botón mientras se registra el usuario
        sx={{ mt: 2 }}
        startIcon={loading && <CircularProgress size={20} />} // Mostrar el spinner durante la carga
      >
        {loading ? '' : 'Registrarse'} {/* Si está en carga, no mostrar texto */}
      </Button>

      {/* Snackbar para la notificación */}
      <Snackbar
        open={snackbarOpen}
        message="Usuario registrado con éxito"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={700}
        onClose={() => setSnackbarOpen(false)} // Cerrar el snackbar automáticamente
      />
    </Box>
  );
};

export default Register;
