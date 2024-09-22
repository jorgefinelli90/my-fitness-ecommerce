import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const SlideInCart = ({ isOpen, onClose, isMobile }) => {
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: isMobile ? '100%' : '30%',
                backgroundColor: 'white',
                boxShadow: '-4px 0 10px rgba(0, 0, 0, 0.1)',
                zIndex: 1300,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography variant="h6">Carrito de Compras</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                {cartItems.length === 0 ? (
                    <Typography>No hay productos en el carrito</Typography>
                ) : (
                    cartItems.map((item) => (
                        <Box key={item.id} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 10 }} />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">${item.price}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography component="span" sx={{ mx: 1 }}>{item.quantity}</Typography>
                                    <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                                <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                                <IconButton size="small" onClick={() => removeFromCart(item.id)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <Divider sx={{ mt: 2 }} />
                        </Box>
                    ))
                )}
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Total: ${calculateTotal()}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                    sx={{ mb: 1 }}
                >
                    Ir a checkout
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={onClose}
                >
                    Seguir comprando
                </Button>
            </Box>
        </motion.div>
    );
};

export default SlideInCart;