import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel,  } from '@mui/material';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    newsletter: false,
    photoURL: '' // Agrega un campo para la foto de perfil
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
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
      // Upload the image to Firebase Storage
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
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUserData({ ...userData, photoURL: downloadURL });
              // Save the updated user data to Firestore
              setDoc(doc(db, "users", user.uid), userData);
              alert("Datos guardados exitosamente");
            });
          }
        );
      } else {
        // Save the user data without updating the profile picture
        await setDoc(doc(db, "users", user.uid), userData);
        alert("Datos guardados exitosamente");
      }
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
