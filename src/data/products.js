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
    image: anillo,
    description: 'Este anillo de diamante es la representación máxima de elegancia y lujo. Con un diseño clásico y atemporal, el anillo está confeccionado en oro blanco de 18 quilates y engastado con un brillante diamante que refleja la luz desde todos los ángulos. Perfecto para ocasiones especiales o como un regalo inolvidable, este anillo es una joya que será atesorada por generaciones.',
    shortDescription: 'Anillo de diamante en oro blanco de 18 quilates.',
    size: ['6', '7', '8'], // Tamaños disponibles
    cuidados: 'Evitar el contacto con productos químicos y guardarlo en su caja original cuando no se utilice.'
  },
  {
    id: 2,
    name: 'Anteojos de Sol',
    price: 799.99,
    category: 'Lentes',
    image: anteojos,
    description: 'Estos anteojos de sol combinan estilo y funcionalidad a la perfección. Con una montura ligera pero duradera, ofrecen protección UV completa para tus ojos, mientras que su diseño moderno y minimalista se adapta a cualquier look. Ya sea que estés en la playa o en la ciudad, estos anteojos son el accesorio perfecto para complementar tu estilo.',
    shortDescription: 'Anteojos de sol con protección UV completa y diseño minimalista.',
    size: 'Tamaño estándar', // Tamaño único
    cuidados: 'Limpiar con un paño suave y evitar dejar expuestos al calor directo durante largos períodos.'
  },
  {
    id: 3,
    name: 'Aros de Plata',
    price: 299.99,
    category: 'Aretes',
    image: aros,
    description: 'Estos aros de plata son el accesorio perfecto para cualquier ocasión. Confeccionados en plata esterlina, su diseño delicado y brillante los convierte en una pieza versátil, ideal tanto para eventos formales como para el uso diario. Su cierre seguro asegura que se mantendrán en su lugar durante todo el día.',
    shortDescription: 'Aros de plata esterlina con diseño delicado.',
    size: 'Único',
    cuidados: 'Evitar el contacto con productos químicos y limpiar con un paño especial para plata después de cada uso.'
  },
  {
    id: 4,
    name: 'Aros Modernos',
    price: 349.99,
    category: 'Aretes',
    image: aros1,
    description: 'Los aros modernos son una declaración de estilo. Con un diseño geométrico innovador y líneas limpias, estos aros están diseñados para quienes buscan destacar. Fabricados en acero inoxidable hipoalergénico, son ligeros y cómodos de llevar, lo que los convierte en una opción ideal para el uso diario.',
    shortDescription: 'Aros geométricos modernos en acero inoxidable.',
    size: 'Único',
    cuidados: 'Limpiar regularmente con un paño suave y evitar golpes fuertes para preservar su forma.'
  },
  {
    id: 5,
    name: 'Brazalete Dorado',
    price: 699.99,
    category: 'Pulseras',
    image: brazalete,
    description: 'El brazalete dorado es el complemento perfecto para cualquier atuendo. Fabricado en acero inoxidable chapado en oro, su diseño minimalista y sofisticado lo convierte en una pieza versátil que se puede llevar solo o combinado con otras pulseras. Es resistente al desgaste y perfecto para uso diario o para ocasiones especiales.',
    shortDescription: 'Brazalete minimalista dorado en acero inoxidable.',
    size: ['S', 'M', 'L'], // Tamaños disponibles
    cuidados: 'Limpiar con un paño seco y evitar el contacto con agua para prolongar el brillo del chapado.'
  },
  {
    id: 6,
    name: 'Cartera de Cuero',
    price: 1199.99,
    category: 'Bolsos pequeños/Neceseres',
    image: cartera,
    description: 'Esta cartera de cuero es un clásico atemporal. Confeccionada en cuero genuino de alta calidad, cuenta con un diseño compacto pero espacioso que incluye múltiples compartimentos para mantener todo organizado. Su diseño elegante y funcional la convierte en un accesorio indispensable para el día a día.',
    shortDescription: 'Cartera compacta de cuero genuino con múltiples compartimentos.',
    size: 'Único',
    cuidados: 'Aplicar crema especial para cuero cada 3 meses para mantener el material hidratado y protegerlo del desgaste.'
  },
  {
    id: 7,
    name: 'Pulsera de Perlas',
    price: 499.99,
    category: 'Pulseras',
    image: pulsera,
    description: 'Esta delicada pulsera de perlas es un símbolo de elegancia y feminidad. Las perlas naturales cuidadosamente seleccionadas están ensartadas en un hilo de seda resistente, lo que garantiza durabilidad sin sacrificar la delicadeza del diseño. Ideal para ocasiones formales o como un regalo especial.',
    shortDescription: 'Pulsera de perlas naturales ensartadas en hilo de seda.',
    size: 'Único',
    cuidados: 'Evitar exponerla a productos de limpieza y perfumería. Guardar en una caja forrada cuando no esté en uso.'
  }
];

// Exportamos funciones para obtener precios mínimos y máximos dinámicos
export const getMinPrice = () => Math.min(...products.map(product => product.price));
export const getMaxPrice = () => Math.max(...products.map(product => product.price));

export default products;
