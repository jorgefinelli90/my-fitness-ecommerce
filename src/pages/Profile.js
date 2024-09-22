import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    newsletter: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
        setLoading(false);
      };
      getUserData();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setUserData({ ...userData, newsletter: e.target.checked });
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), userData);
      alert("Datos guardados exitosamente");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box>
      <Typography variant="h5">Perfil de Usuario</Typography>
      {loading ? (
        <Typography>Cargando datos...</Typography>
      ) : (
        <Box>
          <TextField
            label="Nombre"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Apellido"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dirección"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={userData.newsletter}
                onChange={handleCheckboxChange}
              />
            }
            label="¿Desea suscribirse al newsletter?"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
