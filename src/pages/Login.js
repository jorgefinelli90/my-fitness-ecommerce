import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { setPersistence, browserSessionPersistence, browserLocalPersistence } from 'firebase/auth'; // Importamos las constantes correctas

const Login = () => {
  const [email, setEmail] = useState(''); // Estado para almacenar el email
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [rememberMe, setRememberMe] = useState(false); // Estado para manejar la opción "Recordar usuario"
  const [error, setError] = useState(''); // Estado para manejar los errores
  const [loading, setLoading] = useState(false); // Estado de carga para mejorar la UX
  const navigate = useNavigate(); // Hook para la navegación

  // Función para alternar la visibilidad de la contraseña
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para manejar el inicio de sesión con correo y contraseña
  const handleLogin = async () => {
    setLoading(true); // Activamos el estado de carga
    try {
      // Configuramos la persistencia según la opción "Recordar usuario"
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence); // Aplicamos la persistencia seleccionada

      // Realizamos el inicio de sesión con correo y contraseña
      await signInWithEmailAndPassword(auth, email, password);



      // Navegamos al perfil tras un inicio de sesión exitoso
      navigate('/profile');
    } catch (err) {
      // Manejamos errores de Firebase con mensajes más específicos
      if (err.code === 'auth/wrong-password') {
        setError('La contraseña es incorrecta');
      } else if (err.code === 'auth/user-not-found') {
        setError('El correo no está registrado');
      } else {
        setError('Error al iniciar sesión');
      }
    } finally {
      setLoading(false); // Terminamos el estado de carga
    }
  };

  // Función para manejar el inicio de sesión con Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true); // Activamos el estado de carga
    try {
      // Aplicamos la misma persistencia para el inicio de sesión con Google
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);

      // Realizamos el inicio de sesión con Google
      await signInWithPopup(auth, provider);

      // Navegamos al perfil tras un inicio de sesión exitoso
      navigate('/profile');
    } catch (err) {
      setError('Error al iniciar sesión con Google');
    } finally {
      setLoading(false); // Terminamos el estado de carga
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
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Iniciar Sesión
      </Typography>

      {/* Mostramos el mensaje de error si hay alguno */}
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {/* Campo de texto para el correo electrónico */}
      <TextField
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ maxWidth: 400 }}
      />

      {/* Campo de texto para la contraseña con visibilidad alternable */}
      <TextField
        label="Contraseña"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ maxWidth: 400 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Checkbox para la opción de "Recordar usuario" */}
      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        }
        label="Recordar usuario"
      />

      {/* Botón de inicio de sesión con correo y contraseña */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ maxWidth: 400, mt: 2 }}
        onClick={handleLogin}
        disabled={loading} // Deshabilitamos el botón durante la carga
      >
        {loading ? 'Cargando...' : 'Iniciar Sesión'}
      </Button>

      {/* Botón para inicio de sesión con Google */}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<GoogleIcon />}
        fullWidth
        sx={{ maxWidth: 400, mt: 2 }}
        onClick={handleGoogleLogin}
        disabled={loading} // Deshabilitamos el botón durante la carga
      >
        Iniciar sesión con Google
      </Button>

      {/* Enlace para la opción de "Olvidé mi contraseña" */}
      <Link to="/forgot-password" style={{ marginTop: '10px', display: 'block', textDecoration: 'none' }}>
        Olvidé mi contraseña
      </Link>
    </Box>
  );
};

export default Login;
