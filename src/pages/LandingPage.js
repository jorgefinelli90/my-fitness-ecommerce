import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DiamondIcon from '@mui/icons-material/Diamond';

export default function LandingPage() {
    return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Typography variant="h1" component="h1" gutterBottom>
                    Lux-acc
                </Typography>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <Typography variant="h4" component="h2" gutterBottom color="text.secondary">
                    Accesorios de lujo para elevar tu estilo
                </Typography>
            </motion.div>

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
                        { name: 'Aretes de Diamante', price: '$1,299.99' },
                        { name: 'Bolso de Noche Elegante', price: '$499.99' },
                        { name: 'Reloj de Lujo', price: '$2,999.99' }
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
                                    justifyContent: 'center',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    p: 2,
                                }}
                            >
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
    );
}
