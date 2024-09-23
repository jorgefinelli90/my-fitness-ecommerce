import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DiamondIcon from '@mui/icons-material/Diamond';

// Importar las imágenes
import bannerDesktop from '../assets/images/img-product/banner-desktop.jpg';
import bannerMobile from '../assets/images/img-product/banner-mobile.jpg';
import arosImage from '../assets/images/img-product/aros.jpg';
import carteraImage from '../assets/images/img-product/cartera.jpg';
import relojImage from '../assets/images/img-product/reloj.jpg';

export default function LandingPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ textAlign: 'center' }}>
            {/* Banner con efecto de brillo */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%', // Asegura que el banner ocupe todo el ancho
                    height: '100vh', // Ajusta la altura al 100% del viewport
                    backgroundImage: `url(${isMobile ? bannerMobile : bannerDesktop})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // Elimina cualquier padding o margen
                    padding: 0,
                    margin: 0,
                    // Efecto de brillo
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
                        animation: 'shine 4.5s infinite',
                        '@keyframes shine': {
                            '0%': { transform: 'translateX(-100%)' },
                            '100%': { transform: 'translateX(100%)' },
                        },
                    },
                }}
            >
                {/* Contenido del banner */}
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        p: 4,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        // Ajusta el ancho del contenido según sea necesario
                        width: { xs: '90%', md: '70%' },
                        // Centra el contenido verticalmente
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        // Ajusta la altura del contenido si es necesario
                        // height: '50%', // Descomenta y ajusta si quieres una altura específica
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography variant="h1" component="h1" gutterBottom sx={{ color: 'white' }}>
                            Lux-acc
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'white' }}>
                            Accesorios de lujo para elevar tu estilo
                        </Typography>
                    </motion.div>
                </Box>
            </Box>

            <Box sx={{ py: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2, mt: 6 }}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<DiamondIcon />}
                            component={Link}
                            to="/productos"
                            fullWidth
                        >
                            Explorar Colección
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="outlined"
                            size="large"
                            component={Link}
                            to="/regaleria"
                            fullWidth
                        >
                            Servicio de Regalería
                        </Button>
                    </motion.div>
                </Box>

                <Box sx={{ mt: 12 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        <Typography variant="h2" gutterBottom>
                            Productos Destacados
                        </Typography>
                    </motion.div>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', gap: 4, mt: 4 }}>
                        {[
                            { name: 'Aretes de Diamante', price: '$1,299.99', image: arosImage },
                            { name: 'Bolso de Noche', price: '$499.99', image: carteraImage },
                            { name: 'Reloj de Lujo', price: '$2,999.99', image: relojImage }
                        ].map((product, index) => (
                            <motion.div
                                key={product.name}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: '100%', md: 250 },
                                        height: 300,
                                        backgroundColor: 'background.paper',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        p: 2,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: 200,
                                            backgroundImage: `url(${product.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            mb: 2,
                                        }}
                                    />
                                    <Typography variant="h6" gutterBottom>{product.name}</Typography>
                                    <Typography variant="body1" color="text.secondary" gutterBottom>
                                        {product.price}
                                    </Typography>
                                    <Button variant="outlined" size="small">Ver Detalles</Button>
                                </Box>
                            </motion.div>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ mt: 12 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                    >
                        <Typography variant="h2" gutterBottom>
                            Por qué elegir Lux-acc
                        </Typography>
                    </motion.div>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', gap: 4, mt: 4 }}>
                        {[
                            { title: 'Calidad Premium', description: 'Materiales de la más alta calidad y artesanía excepcional' },
                            { title: 'Diseño Exclusivo', description: 'Piezas únicas que reflejan tu estilo personal' },
                            { title: 'Servicio de Regalería', description: 'Empaques elegantes y opciones de personalización' }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 + index * 0.2, duration: 0.8 }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: '100%', md: 250 },
                                        height: 200,
                                        backgroundColor: 'background.paper',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        p: 2,
                                    }}
                                >
                                    <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        {feature.description}
                                    </Typography>
                                </Box>
                            </motion.div>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}