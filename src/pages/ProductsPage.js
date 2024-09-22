// src/pages/ProductsPage.js

import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, FormControl, InputLabel, Select, MenuItem, Slider, Button, IconButton, Modal } from '@mui/material';
import { CartContext } from '../components/CartContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import products, { getMinPrice, getMaxPrice } from '../data/products';

export default function ProductsPage() {
  const { addToCart } = useContext(CartContext); // Contexto del carrito
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  // Cargar precios mínimos y máximos
  useEffect(() => {
    const min = getMinPrice();
    const max = getMaxPrice();
    setMinPrice(min);
    setMaxPrice(max);
    setPriceRange([min, max]);
  }, []);

  // Cambiar categoría seleccionada
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Cambiar rango de precios
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Mostrar productos filtrados
  const filteredProducts = products.filter(
    (product) =>
      (category === '' || product.category === category) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  // Abrir modal al agregar al carrito
  const handleAddToCart = (product) => {
    addToCart(product);
    setModalProduct(product);
    setModalOpen(true);

    // Cerrar automáticamente el modal después de 500 milisegundos
    setTimeout(() => {
      setModalOpen(false);
    }, 1500);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h2" gutterBottom>
        Nuestra Colección
      </Typography>

      {/* Filtros de categoría y precio */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Selector de categoría */}
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
                <MenuItem value="Aretes">Aretes</MenuItem>
                <MenuItem value="Pulseras">Pulseras</MenuItem>
                <MenuItem value="Anillos">Anillos</MenuItem>
                <MenuItem value="Lentes">Lentes</MenuItem>
                <MenuItem value="Vinchas">Vinchas</MenuItem>
                <MenuItem value="Cinturones">Cinturones</MenuItem>
                <MenuItem value="Collares">Collares</MenuItem>
                <MenuItem value="Tobilleras">Tobilleras</MenuItem>
                <MenuItem value="Broches para pelo">Broches para pelo</MenuItem>
                <MenuItem value="Diademas">Diademas</MenuItem>
                <MenuItem value="Bolsos pequeños/Neceseres">Bolsos pequeños/Neceseres</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Slider de rango de precio */}
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

      {/* Mostrar productos filtrados */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Categoría: {product.category}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  ${product.price.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                  sx={{ mt: 2 }}
                >
                  Agregar al carrito
                </Button>
                <IconButton aria-label="add to wishlist" sx={{ ml: 1 }}>
                  <FavoriteBorderIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal elegante */}
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
          }}
        >
          {modalProduct && (
            <Typography variant="h6" gutterBottom>
              {modalProduct.name} agregado al carrito
            </Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
