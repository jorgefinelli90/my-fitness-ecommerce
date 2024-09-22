import React from 'react';
import { Box, Container, Typography, IconButton, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    Lux-acc
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    Elevando tu estilo con accesorios de lujo
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
                    <Link color="inherit" href="https://lux-acc.com/">
                        Lux-acc
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'. '}
                    Buenos Aires, Argentina
                </Typography>
            </Container>
        </Box>
    );
}
