import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation(); // Obtiene la ruta actual

    useEffect(() => {
        window.scrollTo(0, 20); // Desplaza la ventana a la parte superior
    }, [pathname]); // Se ejecuta cada vez que la ruta (pathname) cambia

    return null;
};

export default ScrollToTop;
