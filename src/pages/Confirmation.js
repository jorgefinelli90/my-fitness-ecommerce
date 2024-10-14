import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom'; // Para obtener los datos de la navegación
import { motion } from 'framer-motion'; // Animación para la confirmación

const Confirmation = () => {
    const location = useLocation(); // Usamos useLocation para recibir el estado pasado desde Checkout
    const { cartItems, address, totalPrice } = location.state || {}; // Desestructuramos el estado

    // Loading para el caso que no haya datos
    if (!cartItems || !address) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Confirmación de Pedido
                </Typography>

                {/* Resumen de la dirección */}
                <Typography variant="h6" gutterBottom>
                    Dirección de Envío:
                </Typography>
                <Typography>{address.fullName}</Typography>
                <Typography>{address.addressLine}</Typography>
                <Typography>{`${address.city}, ${address.postalCode}, ${address.country}`}</Typography>

                {/* Resumen de los productos */}
                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                    Productos en tu pedido:
                </Typography>
                <List>
                    {cartItems.map((item) => (
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={item.name}
                                secondary={`Cantidad: ${item.quantity} - Precio: $${item.price.toFixed(2)}`}
                            />
                        </ListItem>
                    ))}
                </List>

                {/* Total */}
                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                    Total del Pedido: ${totalPrice.toFixed(2)}
                </Typography>
            </Box>
        </motion.div>
    );
};

export default Confirmation;
