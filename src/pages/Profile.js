import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    newsletter: false,
    photoURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const user = auth.currentUser;
  const storage = getStorage();

  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData({
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            email: user.email,
            newsletter: false,
            photoURL: ''
          });
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    const imageRef = ref(storage, `profile-images/${user.uid}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setError(error.message);
        setSnackbarMessage("Error al subir la imagen");
        setSnackbarOpen(true);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const updatedUserData = { ...userData, photoURL: downloadURL };

        await setDoc(doc(db, "users", user.uid), updatedUserData);
        setUserData(updatedUserData);

        await updateProfile(auth.currentUser, {
          photoURL: downloadURL
        });

        setSnackbarMessage("Imagen subida exitosamente");
        setSnackbarOpen(true);
      }
    );
  };

  const handleDeleteImage = async () => {
    if (!userData.photoURL) {
      setSnackbarMessage("No hay imagen para eliminar");
      setSnackbarOpen(true);
      return;
    }

    try {
      const imageRef = ref(storage, `profile-images/${user.uid}`);
      await deleteObject(imageRef);

      const updatedUserData = { ...userData, photoURL: '' };
      await setDoc(doc(db, "users", user.uid), updatedUserData);
      setUserData(updatedUserData);

      await updateProfile(auth.currentUser, {
        photoURL: ''
      });

      setSnackbarMessage("Imagen eliminada exitosamente");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error al eliminar la imagen");
      setSnackbarOpen(true);
      setError(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUserData = { ...userData };

      await setDoc(doc(db, "users", user.uid), updatedUserData);

      await updateProfile(auth.currentUser, {
        displayName: `${updatedUserData.firstName} ${updatedUserData.lastName}`,
      });

      setSnackbarMessage("Datos guardados exitosamente");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box>
      {loading ? (
        <Typography>Cargando datos...</Typography>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" mb={2}>
          <Box mb={2}>
            <img
              src={userData.photoURL || 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png'}
              alt="Foto de perfil"
              style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center" onClick={() => document.getElementById('upload-photo').click()} style={{ cursor: 'pointer' }}>
                <ReplayCircleFilledIcon style={{ marginRight: 8 }} />
                <Typography variant="body2">Cargar foto</Typography>
              </Box>

              <Box display="flex" alignItems="center" onClick={handleDeleteImage} style={{ cursor: 'pointer', marginLeft: 16 }}>
                <DeleteForeverIcon style={{ marginRight: 8, color: 'red' }} />
                <Typography variant="body2">Eliminar foto</Typography>
              </Box>
            </Box>
            <input
              id="upload-photo"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </Box>

          
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
              name="addressLine"
              value={userData.addressLine}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Ciudad"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Código Postal"
              name="postalCode"
              value={userData.postalCode}
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
              label="País"
              name="country"
              value={userData.country}
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
          {uploadProgress > 0 && (
            <Typography>Progreso de subida: {uploadProgress}%</Typography>
          )}
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>

          {/* Botón de Ver Órdenes */}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/orders')}  // Navega a la página de órdenes
            sx={{ mt: 2 }}
          >
            Ver Órdenes
          </Button>
        </Box>
      )}

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default Profile;
