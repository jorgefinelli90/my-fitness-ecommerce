import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { Box, Typography, Button, Grid, TextField, Card, CardContent, CardMedia, IconButton, useMediaQuery, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>Carrito de Compras</Typography>
            {cartItems.length === 0 ? (
                <Typography>No hay productos en el carrito</Typography>
            ) : (
                <Grid container spacing={2}>
                    {cartItems.map(item => (
                        <Grid item xs={12} key={item.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', p: 2 }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: isMobile ? '100%' : 100, height: isMobile ? 200 : 100, objectFit: 'cover' }}
                                        image={item.image}
                                        alt={item.name}
                                    />
                                    <CardContent sx={{
                                        flex: '1 0 auto',
                                        display: 'flex',
                                        flexDirection: isMobile ? 'column' : 'row',
                                        justifyContent: 'space-between',
                                        alignItems: isMobile ? 'flex-start' : 'center',
                                        gap: 2
                                    }}>
                                        <Box>
                                            <Typography variant="h6">{item.name}</Typography>
                                            <Typography variant="subtitle1" color="text.secondary">
                                                ${item.price}
                                            </Typography>
                                        </Box>
                                        <TextField
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            inputProps={{ min: 1 }}
                                            sx={{ width: 60 }}
                                        />
                                        <Typography variant="subtitle1">
                                            Total: ${(item.price * item.quantity).toFixed(2)}
                                        </Typography>
                                        <IconButton onClick={() => removeFromCart(item.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Box sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'stretch' : 'center',
                gap: 2
            }}>
                <Typography variant="h5">Total: ${calculateTotal()}</Typography>
                <Button variant="contained" color="primary" size="large" fullWidth={isMobile}>
                    Proceder al Pago
                </Button>
            </Box>
        </Box>
    );
};

export default Cart;