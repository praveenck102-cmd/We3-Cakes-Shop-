export interface Cake {
  id: string;
  name: string;
  category: string;
  flavour: string;
  description: string;
  basePrice500g: number;
  prices: {
    '500g': number;
    '1kg': number;
    '1.5kg': number;
    '2kg': number;
  };
  rating: number;
  reviewsCount: number;
  image: string;
  isBestseller?: boolean;
  isEgglessAvailable: boolean;
  tags: string[];
}

export interface CartItem {
  id: string;
  cakeId: string;
  name: string;
  weight: '500g' | '1kg' | '1.5kg' | '2kg';
  price: number;
  quantity: number;
  isEggless: boolean;
  customMessage?: string;
  image: string;
}

export interface CustomCakeRequest {
  id: string;
  customerName: string;
  phone: string;
  cakeType: string;
  flavour: string;
  weight: string;
  isEggless: boolean;
  messageOnCake: string;
  pickupDate: string;
  pickupTime: string;
  designDescription: string;
  referenceImage?: string;
  status: 'pending' | 'reviewing' | 'confirmed';
  createdAt: string;
  // Legacy aliases for backward compatibility
  deliveryDate?: string;
  deliveryTime?: string;
}

export interface OrderDetails {
  orderNumber: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  customerArea?: string;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  notes: string;
  paymentMethod: 'Pay at Store on Pickup' | 'UPI Advance' | 'Pay Online' | 'Cash on Delivery' | 'UPI';
  subtotal: number;
  convenienceFee?: number;
  total: number;
  placedAt: string;
  // Legacy aliases
  address?: string;
  landmark?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  deliveryFee?: number;
}
