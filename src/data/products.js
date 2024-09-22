// src/data/products.js

const products = [
  {
    id: 1,
    name: 'Aretes de Diamante',
    price: 1599.99,
    category: 'Aretes',
    image: 'https://img.freepik.com/fotos-premium/joyas-diamantes-joya-cristal-joya-piedra-brillante-lujo-aislado-blanco-gema-preciosa_851808-477.jpg'
  },
  {
    id: 2,
    name: 'Pulsera de Oro',
    price: 899.99,
    category: 'Pulseras',
    image: 'https://img.freepik.com/fotos-premium/joyas-diamantes-joya-cristal-joya-piedra-brillante-lujo-aislado-blanco-gema-preciosa_851808-477.jpg'
  },
  {
    id: 3,
    name: 'Anillo de Compromiso',
    price: 2499.99,
    category: 'Anillos',
    image: 'https://img.freepik.com/fotos-premium/joyas-diamantes-joya-cristal-joya-piedra-brillante-lujo-aislado-blanco-gema-preciosa_851808-477.jpg'
  },
  {
    id: 4,
    name: 'Lentes de Sol de Diseñador',
    price: 399.99,
    category: 'Lentes',
    image: 'https://img.freepik.com/fotos-premium/joyas-diamantes-joya-cristal-joya-piedra-brillante-lujo-aislado-blanco-gema-preciosa_851808-477.jpg'
  },
  {
    id: 5,
    name: 'Vincha de Seda',
    price: 149.99,
    category: 'Vinchas',
    image: 'https://img.freepik.com/fotos-premium/joyas-diamantes-joya-cristal-joya-piedra-brillante-lujo-aislado-blanco-gema-preciosa_851808-477.jpg'
  },
  // ... Agrega más productos si es necesario
];

// Exportamos funciones para obtener precios mínimos y máximos dinámicos
export const getMinPrice = () => Math.min(...products.map(product => product.price));
export const getMaxPrice = () => Math.max(...products.map(product => product.price));

export default products;
