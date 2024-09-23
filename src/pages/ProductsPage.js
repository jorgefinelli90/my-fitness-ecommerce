import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Slider, 
  Button, 
  IconButton, 
  Modal,
  CardActions
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../components/CartContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import products, { getMinPrice, getMaxPrice } from '../data/products';

export default function ProductsPage() {
  const { addToCart } = useContext(CartContext);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    const min = getMinPrice();
    const max = getMaxPrice();
    setMinPrice(min);
    setMaxPrice(max);
    setPriceRange([min, max]);
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filteredProducts = products.filter(
    (product) =>
      (category === '' || product.category === category) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    setModalProduct(product);
    setModalOpen(true);

    setTimeout(() => {
      setModalOpen(false);
    }, 1500);
  };

  return (
    <Box sx={{ flexGrow: 1, py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" gutterBottom align="center">
          Nuestra Colección
        </Typography>
      </motion.div>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Categoría</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                label="Categoría"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">Todas</MenuItem>
                {Array.from(new Set(products.map(p => p.category))).map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography id="price-range-slider" gutterBottom>
              Rango de Precio
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="price-range-slider"
              min={minPrice}
              max={maxPrice}
            />
          </Grid>
        </Grid>
      </Box>

      <AnimatePresence>
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Categoría: {product.category}
                    </Typography>
                    <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(product)}
                    >
                      Agregar
                    </Button>
                    <Box>
                      <IconButton aria-label="add to wishlist">
                        <FavoriteBorderIcon />
                      </IconButton>
                      <Button
                        component={Link}
                        to={`/product/${product.id}`}
                        variant="outlined"
                        size="small"
                      >
                        Ver detalles
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </AnimatePresence>

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
          {modalProduct && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Typography variant="h6" gutterBottom>
                {modalProduct.name} agregado al carrito
              </Typography>
              <ShoppingCartIcon sx={{ fontSize: 40, color: 'primary.main', mt: 2 }} />
            </motion.div>
          )}
        </Box>
      </Modal>
    </Box>
  );
}