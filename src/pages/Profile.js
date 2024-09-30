import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth'; // Importamos updateProfile para actualizar Firebase Authentication

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    newsletter: false,
    photoURL: '' // Campo para la foto de perfil
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
            email: user.email, // Rellenamos el email con el correo autenticado
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

        // Actualizar también el perfil en Firebase Authentication
        await updateProfile(auth.currentUser, {
          displayName: `${userData.firstName} ${userData.lastName}`,
          photoURL: userData.photoURL // Mantener la foto si no se cambió
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
        <Box>
          {userData.photoURL && (
            <Box>
              <img
                src={userData.photoURL}
                alt="Foto de perfil"
                style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
              />
            </Box>
          )}
          {userData.firstName && (
            <Box>
              <Typography variant="h5" >Hola, {userData.firstName}. Este es tu perfil de usuario.</Typography>
            </Box>
          )}
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
          <input type="file" onChange={handleImageChange} />
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
