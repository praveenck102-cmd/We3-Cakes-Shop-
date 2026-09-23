import { Cake } from '../types';

export const CAKES: Cake[] = [
  {
    id: 'choc-truffle-supreme',
    name: 'Belgian Chocolate Truffle Cake',
    category: 'Chocolate',
    flavour: 'Dutch Dark Chocolate',
    description: 'Rich layers of moist chocolate sponge filled with velvety Belgian dark chocolate ganache and crowned with chocolate rosettes.',
    basePrice500g: 549,
    prices: {
      '500g': 549,
      '1kg': 999,
      '1.5kg': 1449,
      '2kg': 1899,
    },
    rating: 4.9,
    reviewsCount: 168,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isEgglessAvailable: true,
    tags: ['Bestseller', 'Chocolate Lover', 'Celebration']
  },
  {
    id: 'red-velvet-dream',
    name: 'Classic Red Velvet Cream Cheese',
    category: 'Red Velvet',
    flavour: 'Red Velvet with Cream Cheese',
    description: 'Iconic crimson velvet sponge layered with silky imported cream cheese frosting and dusted with delicate ruby cake crumbs.',
    basePrice500g: 599,
    prices: {
      '500g': 599,
      '1kg': 1099,
      '1.5kg': 1599,
      '2kg': 2099,
    },
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isEgglessAvailable: true,
    tags: ['Anniversary', 'Romantic', 'Signature']
  },
  {
    id: 'fresh-fruit-gateau',
    name: 'Exotic Fresh Fruit Gateau',
    category: 'Fresh Fruit',
    flavour: 'Vanilla & Seasonal Exotic Fruits',
    description: 'Fluffy vanilla chiffon infused with light whipped dairy cream, crowned with fresh kiwi, pomegranate, pineapple, and glazed strawberries.',
    basePrice500g: 549,
    prices: {
      '500g': 549,
      '1kg': 999,
      '1.5kg': 1449,
      '2kg': 1899,
    },
    rating: 4.8,
    reviewsCount: 119,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isEgglessAvailable: true,
    tags: ['Refreshing', 'Summer Special', 'Light']
  },
  {
    id: 'black-forest-traditional',
    name: 'German Black Forest Cherry Cake',
    category: 'Black Forest',
    flavour: 'Dark Cocoa & Maraschino Cherries',
    description: 'Traditional chocolate sponge layered with whipped vanilla cream, tart dark cherries, and generous curls of dark chocolate flakes.',
    basePrice500g: 480,
    prices: {
      '500g': 480,
      '1kg': 899,
      '1.5kg': 1299,
      '2kg': 1699,
    },
    rating: 4.8,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isEgglessAvailable: true,
    tags: ['Classic', 'Family Favourite', 'Birthdays']
  },
  {
    id: 'butterscotch-crunch',
    name: 'Caramel Butterscotch Crunch',
    category: 'Butterscotch',
    flavour: 'Butterscotch & Praline Crunch',
    description: 'Golden caramel sponge filled with house-made butterscotch crunch praline and drizzled with warm brown sugar butter caramel.',
    basePrice500g: 499,
    prices: {
      '500g': 499,
      '1kg': 920,
      '1.5kg': 1340,
      '2kg': 1750,
    },
    rating: 4.9,
    reviewsCount: 134,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isEgglessAvailable: true,
    tags: ['Crunchy', 'Caramel', 'Sweet Treat']
  },
  {
    id: 'vanilla-berry-bliss',
    name: 'Madagascar Vanilla Bean & Berry',
    category: 'Vanilla',
    flavour: 'Pure Madagascar Vanilla Bean',
    description: 'Infused with fragrant Madagascar vanilla pods, layered with whipped mascarpone cream and fresh berry compote.',
    basePrice500g: 470,
    prices: {
      '500g': 470,
      '1kg': 870,
      '1.5kg': 1250,
      '2kg': 1600,
    },
    rating: 4.7,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isEgglessAvailable: true,
    tags: ['Pure Vanilla', 'Gentle Sweetness']
  },
  {
    id: 'pineapple-sunshine',
    name: 'Glazed Tropical Pineapple Ice Cake',
    category: 'Pineapple',
    flavour: 'Tropical Juicy Pineapple',
    description: 'Cool sponge cake soaked in fresh pineapple reduction, frosted with chilled feather-light cream and crowned with candied pineapple cherries.',
    basePrice500g: 480,
    prices: {
      '500g': 480,
      '1kg': 890,
      '1.5kg': 1290,
      '2kg': 1680,
    },
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isEgglessAvailable: true,
    tags: ['Ice Cake', 'Fruity', 'Light']
  },
  {
    id: 'kids-superhero-safari',
    name: 'Jungle Safari Adventure Kids Cake',
    category: 'Kids Cakes',
    flavour: 'Milk Chocolate & Buttercream',
    description: 'Delightful vibrant children celebration cake with handcrafted edible fondant jungle characters and playful piped grass detailing.',
    basePrice500g: 650,
    prices: {
      '500g': 650,
      '1kg': 1199,
      '1.5kg': 1699,
      '2kg': 2199,
    },
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isEgglessAvailable: true,
    tags: ['Kids Party', 'Theme Cake', 'Custom Piped']
  },
  {
    id: 'custom-photo-delight',
    name: 'Custom Edible Sugar-Sheet Photo Cake',
    category: 'Photo Cakes',
    flavour: 'Flavour of Choice (Vanilla/Chocolate)',
    description: 'Upload your beloved memory or family photo, printed on high-resolution edible sugar sheets with food-safe colors and decorative cream borders.',
    basePrice500g: 580,
    prices: {
      '500g': 580,
      '1kg': 1050,
      '1.5kg': 1500,
      '2kg': 1950,
    },
    rating: 4.9,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isEgglessAvailable: true,
    tags: ['Edible Photo', 'Personalized', 'Memories']
  },
  {
    id: 'royal-wedding-elegance',
    name: 'Rose & Pearl Tiered Wedding Cake',
    category: 'Wedding Cakes',
    flavour: 'White Chocolate Raspberry & Almond',
    description: 'Stately tiered cake finished with semi-naked white chocolate frosting, delicate edible pearl dragées, and fresh hand-arranged roses.',
    basePrice500g: 850,
    prices: {
      '500g': 850,
      '1kg': 1550,
      '1.5kg': 2250,
      '2kg': 2950,
    },
    rating: 5.0,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1529513247457-9f2f1f8b0af6?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isEgglessAvailable: true,
    tags: ['Wedding', 'Tiered', 'Luxury Floral']
  },
  {
    id: 'choco-nutella-overload',
    name: 'Nutella Hazelnut Drip Ice Cake',
    category: 'Chocolate',
    flavour: 'Nutella & Roasted Hazelnuts',
    description: 'Rich dark chocolate sponge drenched in premium Nutella drizzle, studded with toasted chopped hazelnuts and Ferrero chocolates.',
    basePrice500g: 620,
    prices: {
      '500g': 620,
      '1kg': 1150,
      '1.5kg': 1650,
      '2kg': 2150,
    },
    rating: 4.9,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isEgglessAvailable: true,
    tags: ['Nutella', 'Hazelnut', 'Decadent']
  },
  {
    id: 'bespoke-custom-sculpt',
    name: 'Bespoke Theme & Celebration Cake',
    category: 'Custom Cakes',
    flavour: 'Customized upon consultation',
    description: 'Handcrafted according to your custom reference image, party theme, character design, or anniversary milestone.',
    basePrice500g: 699,
    prices: {
      '500g': 699,
      '1kg': 1299,
      '1.5kg': 1850,
      '2kg': 2400,
    },
    rating: 4.9,
    reviewsCount: 187,
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isEgglessAvailable: true,
    tags: ['100% Custom', 'Theme Cake', 'Artisanal']
  }
];

export const CATEGORIES = [
  'All Cakes',
  'Chocolate',
  'Fresh Fruit',
  'Red Velvet',
  'Butterscotch',
  'Black Forest',
  'Vanilla',
  'Pineapple',
  'Kids Cakes',
  'Photo Cakes',
  'Wedding Cakes',
  'Custom Cakes'
];

export const TESTIMONIALS = [
  {
    id: 'rev-1',
    name: 'Priya Sundaram',
    location: 'Indira Nagar, Neyveli',
    comment: 'The Belgian Chocolate Truffle cake was extraordinarily fresh, soft and exquisitely decorated! Picked it up right on time at Four Road, packed securely with candles and knife.',
    rating: 5,
    occasion: 'Daughter\'s 10th Birthday'
  },
  {
    id: 'rev-2',
    name: 'Arun Kumar',
    location: 'Block 24, Neyveli Township',
    comment: 'Ordered a customized red velvet cake for our anniversary. The cream cheese frosting was sublime, and everyone at home loved it.',
    rating: 5,
    occasion: 'Wedding Anniversary'
  },
  {
    id: 'rev-3',
    name: 'Divya Murugan',
    location: 'Main Bazaar, Indira Nagar',
    comment: 'Amazing taste and beautiful custom cartoon design for my son. We3 Cakes is now our permanent go-to bakery in Neyveli!',
    rating: 5,
    occasion: 'Kids Birthday Party'
  }
];

export const FAQS = [
  {
    q: 'Where is We3 Cakes Shop located and what are your opening hours?',
    a: 'We are located at Four Road, 19 Thai Towers, East Coast Rd, near Vadalur, Neyveli 607303. We are open daily from 8:00 AM to 11:00 PM. You can call or WhatsApp us at +91 80720 10686 (Store: 04142 259 256), or follow @we3_cakes_neyveli on Instagram.'
  },
  {
    q: 'How does Pre-Booking and Store Pickup work?',
    a: 'Choose your cake, weight, and custom message online, select your preferred pickup date and time, and confirm your booking. Our bakers will bake and decorate your cake fresh right before your pickup slot. You can then collect it fresh from our shop at Four Road, 19 Thai Towers, Neyveli / Vadalur.'
  },
  {
    q: 'Do you offer doorstep delivery or is it store pickup only?',
    a: 'We operate strictly on a Pre-Booking & In-Store Pickup model. In-store pickup guarantees that delicate celebration cream cakes, ice cakes, and multi-tier fondant designs reach you in pristine, perfectly chilled condition without damage during transit. Simply pick up at your booked slot!'
  },
  {
    q: 'How many hours in advance should I pre-book?',
    a: 'Standard fresh cream, chocolate, and ice cakes can be pre-booked for same-day pickup with just 2–3 hours advance notice. Custom 3D fondant, tiered, and photo cakes require a minimum 24-hour advance booking.'
  },
  {
    q: 'Do you make custom and photo cakes?',
    a: 'Yes! We craft bespoke custom designs, 3D fondant themes, and edible photo prints on sugar sheets. You can fill out our custom cake form or share your design with us on WhatsApp (+91 80720 10686) or Instagram DM.'
  },
  {
    q: 'Are eggless cakes available?',
    a: 'Yes, 100% pure vegetarian eggless options are available for all our cakes without compromising on moisture or fluffiness.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'You can Pay at Store on Pickup (Cash or direct UPI QR code), pay advance via UPI (Google Pay, PhonePe, Paytm to we3cakes@okaxis), or pay online.'
  }
];
