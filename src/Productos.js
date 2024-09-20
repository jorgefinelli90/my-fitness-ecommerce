import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, ThemeProvider, createTheme, CssBaseline, useMediaQuery, Drawer, List, ListItem, ListItemText, Grid, Card, CardContent, CardMedia, FormControl, InputLabel, Select, MenuItem, Slider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#424242',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
    },
  },
});

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ACCFIT
      </Typography>
      <List>
        {['Productos', 'Nosotros', 'Login', 'Register'].map((item) => (
          <ListItem key={item} component={Link} to={`/${item.toLowerCase()}`}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <AppBar position="static" color="secondary" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                ACCFIT
              </Typography>
              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/productos">
                    Productos
                  </Button>
                  <Button color="inherit" component={Link} to="/about">
                    Nosotros
                  </Button>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                  <IconButton color="inherit" component={Link} to="/profile">
                    <AccountCircleIcon />
                  </IconButton>
                </>
              )}
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          </nav>

          <Container style={{flex: 1}}>
            <Box sx={{ my: 4 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/" element={<LandingPage />} />
              </Routes>
            </Box>
          </Container>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

function LandingPage() {
  // ... (El contenido de LandingPage permanece sin cambios)
}

function ProductsPage() {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const products = [
    { id: 1, name: 'Mancuernas Ajustables', price: 129.99, category: 'Pesas' },
    { id: 2, name: 'Banda de Resistencia', price: 24.99, category: 'Bandas' },
    { id: 3, name: 'Esterilla de Yoga', price: 39.99, category: 'Yoga' },
    { id: 4, name: 'Pelota de Pilates', price: 19.99, category: 'Pilates' },
    { id: 5, name: 'Kettlebell', price: 49.99, category: 'Pesas' },
    { id: 6, name: 'Cuerda de Saltar', price: 14.99, category: 'Cardio' },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (category === '' || product.category === category) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h2" gutterBottom>
        Nuestros Productos
      </Typography>
      
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
                <MenuItem value="Pesas">Pesas</MenuItem>
                <MenuItem value="Bandas">Bandas</MenuItem>
                <MenuItem value="Yoga">Yoga</MenuItem>
                <MenuItem value="Pilates">Pilates</MenuItem>
                <MenuItem value="Cardio">Cardio</MenuItem>
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
              min={0}
              max={150}
            />
          </Grid>
        </Grid>
      </Box>
      
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://media.vogue.es/photos/5f96bc1309a35f3441163801/master/w_1600%2Cc_limit/gimnasio%2520en%2520casa%25201.jpg"
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          ACCFIT
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Elevando tu fitness, un accesorio a la vez.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <IconButton color="inherit" aria-label="Instagram">
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Facebook">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Twitter">
            <TwitterIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          {'Copyright © '}
          <Link color="inherit" href="https://accfit.com/">
            ACCFIT
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}