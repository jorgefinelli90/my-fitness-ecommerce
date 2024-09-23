// src/data/products.js
// Importa las imágenes
import anillo from '../assets/images/img-product/anillo.jpg';
import anteojos from '../assets/images/img-product/anteojos.jpg';
import aros from '../assets/images/img-product/aros.jpg';
import aros1 from '../assets/images/img-product/aros1.jpg';
import brazalete from '../assets/images/img-product/brazalete.jpg';
import cartera from '../assets/images/img-product/cartera.jpg';
import pulsera from '../assets/images/img-product/pulsera.jpg';

const products = [
  {
    id: 1,
    name: 'Anillo de Diamante',
    price: 1599.99,
    category: 'Anillos',
    image: anillo, // Usa la imagen importada
  },
  {
    id: 2,
    name: 'Anteojos de Sol',
    price: 799.99,
    category: 'Lentes',
    image: anteojos,
  },
  {
    id: 3,
    name: 'Aros de Plata',
    price: 299.99,
    category: 'Aretes',
    image: aros,
  },
  {
    id: 4,
    name: 'Aros Modernos',
    price: 349.99,
    category: 'Aretes',
    image: aros1,
  },
  {
    id: 5,
    name: 'Brazalete Dorado',
    price: 699.99,
    category: 'Pulseras',
    image: brazalete,
  },
  {
    id: 6,
    name: 'Cartera de Cuero',
    price: 1199.99,
    category: 'Bolsos pequeños/Neceseres',
    image: cartera,
  },
  {
    id: 7,
    name: 'Pulsera de Perlas',
    price: 499.99,
    category: 'Pulseras',
    image: pulsera,
  }
];
// Exportamos funciones para obtener precios mínimos y máximos dinámicos
export const getMinPrice = () => Math.min(...products.map(product => product.price));
export const getMaxPrice = () => Math.max(...products.map(product => product.price));

export default products;
