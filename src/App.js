import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, ThemeProvider, CssBaseline, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductsPage from './pages/ProductsPage';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import theme from './theme/theme'; // Asegúrate de que el archivo de tema está correctamente importado

export default function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica si el dispositivo es móvil
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Lux-acc
      </Typography>
      <List>
        {['Productos', 'Nosotros', 'Regalería', 'Login', 'Register'].map((item) => (
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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                Lux-acc
              </Typography>
              {isMobile ? (
                <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/productos">
                    Productos
                  </Button>
                  <Button color="inherit" component={Link} to="/nosotros">
                    Nosotros
                  </Button>
                  <Button color="inherit" component={Link} to="/regaleria">
                    Regalería
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
                keepMounted: true, // Mejora el rendimiento en dispositivos móviles
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          </nav>

          <Container style={{ flex: 1 }}>
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
