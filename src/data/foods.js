/* ═══════════════════════════════════════════════════════════ */
/*  FOOD DATA — Protéines, Accompagnements, Sauce              */
/* ═══════════════════════════════════════════════════════════ */

export const CATEGORIES = [
  {
    id: 'viande',
    name: 'Viande',
    sub: 'Pièce noble',
    photo: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&h=700&fit=crop&q=80',
    icon: 'steak',
    plateImg: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&h=600&fit=crop&q=85',
    emoji: '🥩',
    desc: 'Pièce de viande grillée à la perfection',
  },
  {
    id: 'poisson',
    name: 'Poisson',
    sub: 'Filet frais',
    photo: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=500&h=700&fit=crop&q=80',
    icon: 'fish',
    plateImg: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=600&fit=crop&q=85',
    emoji: '🐟',
    desc: 'Filet de poisson frais et fondant',
  },
  {
    id: 'legumes',
    name: 'Légumes',
    sub: 'Du marché',
    photo: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=500&h=700&fit=crop&q=80',
    icon: 'vegetable',
    plateImg: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&h=600&fit=crop&q=85',
    emoji: '🥬',
    desc: 'Légumes nobles du marché',
  },
];

export const STARCHES = [
  {
    id: 'frites',
    name: 'Frites',
    sub: 'Dorées & croustillantes',
    photo: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&h=700&fit=crop&q=80',
    plateImg: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&h=600&fit=crop&q=85',
    emoji: '🍟',
    desc: 'Frites dorées et croustillantes',
  },
  {
    id: 'pdt',
    name: 'Pommes de terre',
    sub: 'Fondantes',
    photo: 'https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=500&h=700&fit=crop&q=80',
    plateImg: 'https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=600&h=600&fit=crop&q=85',
    emoji: '🥔',
    desc: 'Pommes de terre fondantes',
  },
];

export const SIDES = [
  {
    id: 'legumes-verts',
    name: 'Légumes verts',
    sub: 'Croquants',
    photo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=700&fit=crop&q=80',
    plateImg: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=600&fit=crop&q=85',
    emoji: '🥬',
    desc: 'Légumes verts croquants et savoureux',
  },
  {
    id: 'pates',
    name: 'Pâtes',
    sub: 'Al dente',
    photo: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&h=700&fit=crop&q=80',
    plateImg: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=600&fit=crop&q=85',
    emoji: '🍝',
    desc: "Pâtes al dente nappées d'huile d'olive",
  },
];

export const SAUCE_LEVELS = [
  {
    id: 'light',
    name: 'Touche légère',
    sub: 'Un filet délicat',
    emoji: '💧',
    amount: 0.3,
  },
  {
    id: 'classic',
    name: 'Classique',
    sub: 'Une cuillère généreuse',
    emoji: '🥄',
    amount: 0.6,
  },
  {
    id: 'generous',
    name: 'Généreux',
    sub: 'Nappé doré',
    emoji: '🧈',
    amount: 1.0,
  },
];

export const JAR_URL = 'https://l-fds.com/cdn/shop/files/92D989F1-3F39-4DBA-B1B2-5671BB8FCCA2.png?v=1769201672';
export const LOGO_URL = 'https://l-fds.com/cdn/shop/files/84AAFEE7-23FA-4134-AA98-6196210200FC.png?v=1769643841';
export const PRODUCT_URL = '/products/harmonie-secrete-aux-herbes-d-exceptions';
