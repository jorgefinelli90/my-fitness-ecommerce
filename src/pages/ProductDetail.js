import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Grid,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Modal
} from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import products from '../data/products';
import { CartContext } from '../components/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const [selectedSize, setSelectedSize] = useState(product?.size[0] || '');
    const [modalOpen, setModalOpen] = useState(false);
    const { addToCart } = useContext(CartContext);

    if (!product) {
        return <Typography>Producto no encontrado</Typography>;
    }

    const handleAddToCart = () => {
        addToCart({ ...product, size: selectedSize });
        setModalOpen(true);

        setTimeout(() => {
            setModalOpen(false);
        }, 700);
    };

    return (
        <Box sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* Imágenes del producto */}
                <Grid item xs={12} md={5}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: 700, // Establece una altura máxima para el contenedor
                                overflow: 'hidden', // Evita que la imagen se salga del contenedor
                                borderRadius: 2,
                                boxShadow: 3,
                                position: 'relative', // Importante para el efecto de zoom
                            }}
                        >
                            <Box
                                component="img"
                                src={product.image}
                                alt={product.name}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover', // Asegura que la imagen se ajuste bien al contenedor
                                    transition: 'transform 0.5s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)', // Zoom en la imagen
                                    },
                                }}
                            />
                        </Box>
                        {/* Espacio para imágenes adicionales en el futuro */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            {[1, 2, 3].map((_, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        bgcolor: 'grey.300',
                                        mx: 1,
                                        borderRadius: 1,
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </Box>
                    </motion.div>
                </Grid>

                {/* Información del producto */}
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Typography variant="h3" component="h1" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h4" color="primary" gutterBottom>
                            ${product.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {product.description}
                        </Typography>

                        {/* Selección de tamaño */}
                        {Array.isArray(product.size) && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Tamaño:
                                </Typography>
                                {product.size.map((size) => (
                                    <Chip
                                        key={size}
                                        label={size}
                                        onClick={() => setSelectedSize(size)}
                                        color={selectedSize === size ? "primary" : "default"}
                                        sx={{ mr: 1, mb: 1 }}
                                    />
                                ))}
                            </Box>
                        )}

                        {/* Botones de acción */}
                        <Box sx={{ mt: 4 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ShoppingCartIcon />}
                                size="large"
                                onClick={handleAddToCart}
                                sx={{
                                    mr: 2,
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: 4,
                                    },
                                }}
                            >
                                Agregar al carrito
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FavoriteBorderIcon />}
                                size="large"
                                sx={{
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: 2,
                                    },
                                }}
                            >
                                Agregar a favoritos
                            </Button>
                        </Box>

                        {/* Detalles adicionales */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <TableContainer component={Paper} sx={{ mt: 4 }}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Categoría</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Tamaño</TableCell>
                                            <TableCell>{Array.isArray(product.size) ? product.size.join(', ') : product.size}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Cuidados</TableCell>
                                            <TableCell>{product.cuidados}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </motion.div>
                    </motion.div>
                </Grid>
            </Grid>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        width: 300,
                        textAlign: 'center',
                        borderRadius: 2,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <Typography variant="h6" gutterBottom>
                            {product.name} agregado al carrito
                        </Typography>
                        <ShoppingCartIcon sx={{ fontSize: 40, color: 'primary.main', mt: 2 }} />
                    </motion.div>
                </Box>
            </Modal>
        </Box>
    );
};

export default ProductDetail;