// src/products.js

const products = [
  { id: 1, name: 'Aretes de Diamante', price: 1299.99, category: 'Aretes' },
  { id: 2, name: 'Pulsera de Oro', price: 2899.99, category: 'Pulseras' },
  { id: 3, name: 'Anillo de Compromiso', price: 2499.99, category: 'Anillos' },
  { id: 4, name: 'Lentes de Sol de Diseñador', price: 399.99, category: 'Lentes' },
  { id: 5, name: 'Vincha de Seda', price: 149.99, category: 'Vinchas' },
  { id: 6, name: 'Cinturón de Cuero Italiano', price: 299.99, category: 'Cinturones' },
  { id: 7, name: 'Collar de Perlas', price: 799.99, category: 'Collares' },
  { id: 8, name: 'Tobillera de Plata', price: 199.99, category: 'Tobilleras' },
  { id: 9, name: 'Broche de Pelo de Cristal', price: 99.99, category: 'Broches para pelo' },
  { id: 10, name: 'Diadema de Lujo', price: 249.99, category: 'Diademas' },
  { id: 11, name: 'Bolso de Noche Elegante', price: 499.99, category: 'Bolsos pequeños/Neceseres' },
];

// Función para obtener el precio más bajo
export const getMinPrice = () => {
  return Math.min(...products.map(product => product.price));
};

// Función para obtener el precio más alto
export const getMaxPrice = () => {
  return Math.max(...products.map(product => product.price));
};

export default products;
