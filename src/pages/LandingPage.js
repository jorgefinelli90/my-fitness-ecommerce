import React, { useRef } from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion'; // Animaciones con Framer Motion
import { Link } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import products from '../data/products';

// Importar imágenes de banner
import bannerDesktop from '../assets/images/img-product/banner-desktop.jpg';
import bannerMobile from '../assets/images/img-product/banner-mobile.jpg';

// Definir HeroBanner con Material UI y animaciones
const HeroBanner = styled(motion(Box))(({ theme }) => ({
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay oscuro
    },
}));

// Botones de navegación estilizados
const NavButton = styled(Button)(({ theme }) => ({
    color: 'white',
    margin: theme.spacing(0, 1),
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hover sutil
    },
}));

// Card de productos destacadas
const ProductCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[4],
    },
}));

export default function LandingPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detectar si es móvil
    const aboutUsRef = useRef(null);

    const scrollToAboutUs = () => {
        aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Box>
            {/* Hero Banner con animaciones */}
            <HeroBanner
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }} // Animación de aparición del banner
                sx={{ backgroundImage: `url(${isMobile ? bannerMobile : bannerDesktop})` }}
            >
                {/* Navegación */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, p: 4 }}>
                    <motion.nav
                        initial={{ opacity: 0, y: -20 }} // Inicia fuera del viewport
                        animate={{ opacity: 1, y: 0 }} // Aparece de arriba hacia abajo
                        transition={{ duration: 0.5 }} // Duración de la animación
                    >
                    </motion.nav>
                </Box>

                {/* Contenido principal del Banner */}
                <Box sx={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} // Inicia más abajo
                        animate={{ opacity: 1, y: 0 }} // Se desliza hacia arriba
                        transition={{ duration: 0.5, delay: 0.2 }} // Añadir retraso
                    >
                        <Typography variant="h1" component="h1" gutterBottom>
                            The Luxury Shop
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            Descubre la elegancia en cada detalle
                        </Typography>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ShoppingBagIcon />}
                                component={Link}
                                to="/productos"
                                sx={{
                                    mt: 2,
                                    backgroundColor: 'white',
                                    color: 'black',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    },
                                }}
                            >
                                Explorar Colección
                            </Button>
                        </motion.div>
                    </motion.div>
                </Box>
            </HeroBanner>

            {/* Sección de Productos Destacados */}
            <Container maxWidth="lg" sx={{ my: 8 }}>
                <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
                    Productos Destacados
                </Typography>
                <Grid container spacing={4}>
                    {products.slice(0, 4).map((product, index) => (
                        <Grid item key={product.id} xs={12} sm={6} md={3}>
                            <motion.div
                                style={{ height: isMobile ? 450 : 450 }} // Ajustar el tamaño en móviles
                                initial={{ opacity: 0, y: 20 }} // Entrada desde abajo
                                animate={{ opacity: 1, y: 0 }} // Subida suave
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ProductCard>
                                    <CardMedia
                                        ref={aboutUsRef}
                                        component="img"
                                        height={isMobile ? "250" : "350"} // Ajuste en móvil
                                        image={product.image}
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.category}
                                        </Typography>
                                        <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                                            ${product.price.toFixed(2)}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            component={Link}
                                            to={`/product/${product.id}`}
                                        >
                                            Ver Detalles
                                        </Button>
                                    </CardContent>
                                </ProductCard>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Sección de Ventajas */}
                <Box sx={{ mt: 4, bgcolor: 'background.paper', py: 8 }}>
                    <Container maxWidth="md">
                        <Typography variant="h3" component="h2" gutterBottom align="center">
                            Por qué elegirnos
                        </Typography>
                        <Grid container spacing={4} sx={{ mt: 4 }}>
                            {[
                                { title: 'Calidad Premium', description: 'Productos de la más alta calidad y artesanía excepcional' },
                                { title: 'Diseño Exclusivo', description: 'Piezas únicas que reflejan tu estilo personal' },
                                { title: 'Servicio Personalizado', description: 'Atención al cliente dedicada y asesoramiento experto' }
                            ].map((feature, index) => (
                                <Grid item key={feature.title} xs={12} md={4}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }} // Entrada suave desde abajo
                                        animate={{ opacity: 1, y: 0 }} // Suavidad de la animación
                                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    >
                                        <Typography variant="h5" component="h3" gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body1">
                                            {feature.description}
                                        </Typography>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Container>
        </Box>
    );
}
