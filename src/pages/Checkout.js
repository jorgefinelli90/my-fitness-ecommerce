import React, { useContext, useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { CartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const Checkout = () => {
    const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useContext(CartContext);
    const [address, setAddress] = useState({
        fullName: '',
        addressLine: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Traer la dirección del perfil del usuario desde Firestore si está autenticado
    useEffect(() => {
        const fetchUserAddress = async () => {
            if (auth.currentUser) {
                const userDoc = doc(db, "users", auth.currentUser.uid);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setAddress({
                        fullName: `${userData.firstName} ${userData.lastName}`,
                        addressLine: userData.addressLine || '',
                        city: userData.city || '',
                        postalCode: userData.postalCode || '',
                        country: userData.country || '',
                    });
                }
            }
        };

        fetchUserAddress();
    }, []);

    // Manejar los cambios en los campos de la dirección
    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    // Validar que la dirección esté completa
    const validateAddress = () => {
        if (!address.fullName || !address.addressLine || !address.city || !address.postalCode || !address.country) {
            setError('Por favor, completa todos los campos de la dirección');
            return false;
        }
        setError('');
        return true;
    };

    // Procesar el checkout y guardar la orden en Firestore
    const handleCheckout = async () => {
        if (!validateAddress()) return;

        setLoading(true);

        const orderId = `order_${Date.now()}`;
        const totalPrice = getTotalPrice();
        const userId = auth.currentUser ? auth.currentUser.uid : null;

        try {
            await setDoc(doc(db, 'orders', orderId), {
                cartItems,
                address,
                totalPrice,
                userId, // Guardar el ID del usuario
                status: 'Pendiente',
                createdAt: new Date(),
            });

            navigate('/confirmation', { state: { cartItems, address, totalPrice } });
        } catch (error) {
            console.error('Error al guardar la orden:', error);
            setError('Hubo un problema al procesar tu pedido. Inténtalo nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>

            <Typography variant="h6" gutterBottom>
                Resumen del carrito:
            </Typography>
            <List>
                {cartItems.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText
                            primary={item.name}
                            secondary={`Cantidad: ${item.quantity} - Precio: $${item.price.toFixed(2)}`}
                        />
                        <TextField
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            sx={{ width: 80, mr: 2 }}
                        />
                        <Button color="error" onClick={() => removeFromCart(item.id)}>
                            Eliminar
                        </Button>
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6" gutterBottom>
                Total: ${getTotalPrice().toFixed(2)}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Dirección de envío:
            </Typography>

            <TextField
                label="Nombre completo"
                name="fullName"
                value={address.fullName}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Dirección"
                name="addressLine"
                value={address.addressLine}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Ciudad"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Código Postal"
                name="postalCode"
                value={address.postalCode}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="País"
                name="country"
                value={address.country}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
            />

            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            {loading ? (
                <CircularProgress />
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={handleCheckout}
                >
                    Confirmar y Comprar
                </Button>
            )}
        </Box>
    );
};

export default Checkout;
