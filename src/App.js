import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Container, Box, Drawer, List, ListItem, ListItemText, Badge, Avatar, Divider } from '@mui/material';
import { createTheme, ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider, CartContext } from './components/CartContext';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import SlideInCart from './components/SlideInCart';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import { signOut, onAuthStateChanged } from 'firebase/auth'; // Firebase imports
import { auth } from './firebase'; 
import ScrollToTop from './components/ScrollToTop'; // Importamos ScrollToTop
import Checkout from './pages/Checkout'; 
import Confirmation from './pages/Confirmation'; 
import Orders from './components/Orders'



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
      secondary: '#4a4a4a',
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
});

function CartButton({ onClick }) {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <IconButton color="inherit" onClick={onClick} sx={{ marginRight: 2 }}>
      <Badge badgeContent={itemCount} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [user, setUser] = useState(null); // Estado para almacenar el usuario

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Obtenemos el usuario autenticado de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const drawer = (
    <Box sx={{ textAlign: 'center', height: '100%' }}>
      {/* Sección superior */}
      <Box onClick={handleDrawerToggle} sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ my: 2 }}>Lux-acc</Typography>
        <List>
          {[
            user && {
              text: `Hola, ${user.displayName || 'Usuario'}`,
              to: '/profile',
              icon: user.photoURL ? (
                <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 24, height: 24 }} />
              ) : (
                <AccountCircleIcon />
              )
            },
            { text: 'Productos', to: '/productos', icon: <StorefrontIcon /> },
            { text: 'Carrito', to: '#', icon: <ShoppingCartIcon />, action: handleCartToggle },
            { text: 'Regalería', to: '/regaleria', icon: <CardGiftcardIcon /> },
          ].filter(item => item).map((item) => (
            <ListItem
              key={item.text}
              component={item.to !== '#' ? Link : 'div'}
              to={item.to}
              onClick={item.action ? item.action : handleDrawerToggle}
            >
              <IconButton>
                {item.icon}
              </IconButton>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      {/* Sección inferior */}
      <Box sx={{ backgroundColor: 'rgba(240,240,240,0.9)', position: 'absolute', bottom: 0, width: '100%' }}>
        <List>
          {[
            user
              ? { text: 'Cerrar sesión', to: '#', icon: <LogoutIcon />, action: handleLogout }
              : { text: 'Login', to: '/login', icon: <LoginIcon /> },
            !user && { text: 'Registrarse', to: '/register', icon: <PersonAddIcon /> },
          ].filter(item => item).map((item) => (
            <ListItem
              key={item.text}
              component={item.to !== '#' ? Link : 'div'}
              to={item.to}
              onClick={item.action ? item.action : handleDrawerToggle}
            >
              <IconButton>
                {item.icon}
              </IconButton>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar
              position="sticky"
              color="transparent"
              elevation={0}
              sx={{
                zIndex: 1000,
                backgroundColor: 'white',
              }}
            >
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {isMobile ? (
                  <>
                    <CartButton onClick={handleCartToggle} />
                    <Typography
                      variant="h6"
                      component={Link}
                      to="/"
                      style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', flexGrow: 1 }}
                    >
                      Lux-acc
                    </Typography>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="end"
                      onClick={handleDrawerToggle}
                    >
                      <MenuIcon />
                    </IconButton>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}
                  >
                    <CartButton onClick={handleCartToggle} />
                    <Typography
                      variant="h6"
                      component={Link}
                      to="/"
                      style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, textAlign: 'center' }}
                    >
                      Lux-acc
                    </Typography>

                    {user ? (
                      <>
                        <Typography variant="body1" sx={{ mr: 2 }}>Hola, {user.displayName || 'Usuario'}</Typography>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                          {user.photoURL ? (
                            <Avatar
                              alt={user.displayName}
                              src={user.photoURL}
                              sx={{ width: 40, height: 40, cursor: 'pointer' }}
                            />
                          ) : (
                            <IconButton color="inherit" component={Link} to="/profile">
                              <AccountCircleIcon />
                            </IconButton>
                          )}
                        </Link>
                        <IconButton color="inherit" onClick={handleLogout}>
                          <LogoutIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton color="inherit" component={Link} to="/login">
                          <LoginIcon />
                        </IconButton>
                        <IconButton color="inherit" component={Link} to="/register">
                          <PersonAddIcon />
                        </IconButton>
                      </>
                    )}
                  </motion.div>
                )}
              </Toolbar>
            </AppBar>

            <nav>
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
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
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/productos" element={<ProductsPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/confirmation" element={<Confirmation />} /> 
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
              </Box>
            </Container>
            <Footer />
          </div>

          <AnimatePresence>
            {isCartOpen && (
              <SlideInCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                isMobile={isMobile}
              />
            )}
          </AnimatePresence>
        </Router>
      </ThemeProvider>
    </CartProvider>
  );
}
