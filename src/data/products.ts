export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Collier d\'Or',
    category: 'Colar',
    price: 2500,
    rating: 4.8,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    description: 'Collar de oro de 18 quilates con diseño elegante',
  },
  {
    id: 2,
    name: 'Brincos Diamantados',
    category: 'Brincos',
    price: 1800,
    rating: 4.9,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1592591413191-c4e1efb0055b?w=400&h=400&fit=crop',
    description: 'Brincos con diamantes certificados',
  },
  {
    id: 3,
    name: 'Anel de Solitário',
    category: 'Anéis',
    price: 3200,
    rating: 4.7,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=400&h=400&fit=crop',
    description: 'Anillo de diamante solitario con certificado',
  },
  {
    id: 4,
    name: 'Pulseira Ouro Branco',
    category: 'Pulseiras',
    price: 1600,
    rating: 4.6,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    description: 'Pulsera de oro blanco con diseño minimalista',
  },
  {
    id: 5,
    name: 'Colar com Safira',
    category: 'Colar',
    price: 2200,
    rating: 4.9,
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
    description: 'Collar con zafiro azul natural de Sri Lanka',
  },
  {
    id: 6,
    name: 'Anel Trio de Ouro',
    category: 'Anéis',
    price: 1400,
    rating: 4.8,
    reviews: 22,
    image: 'https://images.unsplash.com/photo-1515377905703-c4b100091cd4?w=400&h=400&fit=crop',
    description: 'Juego de tres anillos de oro en diferentes tonos',
  },
  {
    id: 7,
    name: 'Brincos Pérola',
    category: 'Brincos',
    price: 980,
    rating: 4.7,
    reviews: 19,
    image: 'https://images.unsplash.com/photo-1538895917570-2b8fcdeac2b8?w=400&h=400&fit=crop',
    description: 'Pendientes de perla cultivada',
  },
  {
    id: 8,
    name: 'Pulseira Diamante',
    category: 'Pulseiras',
    price: 2800,
    rating: 5,
    reviews: 35,
    image: 'https://images.unsplash.com/photo-1519841726784-c6e9f280051a?w=400&h=400&fit=crop',
    description: 'Brazalete de diamantes en oro amarillo',
  },
];

export const categories = ['Todos', 'Colar', 'Brincos', 'Anéis', 'Pulseiras'];
