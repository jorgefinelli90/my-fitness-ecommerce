import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; // Importar el ícono para eliminar la imagen
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
  const navigate = useNavigate();

  const user = auth.currentUser;
  const storage = getStorage();

  // Obtener los datos del usuario de Firestore
  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          // Si no existe el documento, dejamos los campos vacíos
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
    }
  };

  const handleDeleteImage = async () => {
    if (!userData.photoURL) {
      alert("No hay imagen para eliminar.");
      return;
    }

    try {
      const imageRef = ref(storage, `profile-images/${user.uid}`);
      await deleteObject(imageRef);

      // Actualizamos el campo photoURL a vacío en Firestore y Firebase Auth
      const updatedUserData = { ...userData, photoURL: '' };
      await setDoc(doc(db, "users", user.uid), updatedUserData);
      setUserData(updatedUserData);

      await updateProfile(auth.currentUser, {
        photoURL: ''
      });

      alert("Imagen eliminada exitosamente.");
    } catch (error) {
      setError("Error al eliminar la imagen: " + error.message);
    }
  };

  const handleSave = async () => {
    try {
      let updatedUserData = { ...userData };

      // Si se selecciona una imagen, se sube al storage y se actualiza photoURL
      if (selectedImage) {
        const imageRef = ref(storage, `profile-images/${user.uid}`);
        const uploadTask = uploadBytesResumable(imageRef, selectedImage);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            setError(error.message);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            updatedUserData.photoURL = downloadURL;
            await setDoc(doc(db, "users", user.uid), updatedUserData);
            setUserData((prevState) => ({ ...prevState, photoURL: downloadURL }));

            // Actualizar también el perfil en Firebase Authentication
            await updateProfile(auth.currentUser, {
              displayName: `${userData.firstName} ${userData.lastName}`,
              photoURL: downloadURL
            });

            alert("Datos guardados exitosamente");
          }
        );
      } else {
        // Guardar los datos sin actualizar la imagen
        await setDoc(doc(db, "users", user.uid), updatedUserData);

        await updateProfile(auth.currentUser, {
          displayName: `${userData.firstName} ${userData.lastName}`,
          photoURL: userData.photoURL
        });

        alert("Datos guardados exitosamente");
      }
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
              src={userData.photoURL || 'src/assets/images/images/img-sin-perfil.png'}
              alt="Foto de perfil"
              style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box display="flex" alignItems="center">
              <ReplayCircleFilledIcon
                style={{ cursor: 'pointer', marginRight: 8 }}
                onClick={() => document.getElementById('upload-photo').click()}
              />
              <Typography variant="body2">Cargar foto</Typography>
              <DeleteForeverIcon
                style={{ cursor: 'pointer', marginLeft: 16, color: 'red' }}
                onClick={handleDeleteImage}
              />
              <Typography variant="body2" style={{ marginLeft: 8 }}>Eliminar foto</Typography>
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
          {uploadProgress > 0 && (
            <Typography>Progreso de subida: {uploadProgress}%</Typography>
          )}
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
