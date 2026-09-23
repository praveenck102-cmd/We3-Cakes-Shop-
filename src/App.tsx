/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CakeCatalogue } from './components/CakeCatalogue';
import { PromoAndFeatures } from './components/PromoAndFeatures';
import { CustomCakeSection } from './components/CustomCakeSection';
import { Testimonials } from './components/Testimonials';
import { GallerySection } from './components/GallerySection';
import { FaqAndContact } from './components/FaqAndContact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { WishlistModal } from './components/WishlistModal';
import { Toast, ToastMessage } from './components/Toast';
import { CAKES } from './data/cakes';
import { Cake, CartItem, OrderDetails, CustomCakeRequest } from './types';

export default function App() {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('we3_cakes_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('we3_cakes_wishlist');
      return saved ? JSON.parse(saved) : ['choc-truffle-supreme', 'red-velvet-dream'];
    } catch {
      return ['choc-truffle-supreme'];
    }
  });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Cakes');

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewCake, setQuickViewCake] = useState<Cake | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('we3_cakes_cart', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('we3_cakes_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  const showToast = (type: 'cart' | 'wishlist' | 'info', message: string) => {
    setToast({
      id: Math.random().toString(),
      type,
      message,
    });
  };

  // Add to cart handler
  const handleAddToCart = (
    cake: Cake,
    weight: '500g' | '1kg' | '1.5kg' | '2kg' = '500g',
    quantity: number = 1,
    isEggless: boolean = true,
    customMessage: string = ''
  ) => {
    const itemPrice = cake.prices[weight];
    const itemIdentifier = `${cake.id}-${weight}-${isEggless ? 'eggless' : 'regular'}-${customMessage}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemIdentifier);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        const newItem: CartItem = {
          id: itemIdentifier,
          cakeId: cake.id,
          name: cake.name,
          weight,
          price: itemPrice,
          quantity,
          isEggless,
          customMessage: customMessage || undefined,
          image: cake.image,
        };
        return [...prev, newItem];
      }
    });

    showToast('cart', `Added ${quantity}x ${cake.name} (${weight}) to your cart!`);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('info', 'Cart has been cleared');
  };

  const handleToggleWishlist = (cakeId: string) => {
    const isSaved = wishlist.includes(cakeId);
    const targetCake = CAKES.find((c) => c.id === cakeId);
    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== cakeId));
      showToast('wishlist', `Removed ${targetCake?.name || 'cake'} from saved list`);
    } else {
      setWishlist((prev) => [...prev, cakeId]);
      showToast('wishlist', `Saved ${targetCake?.name || 'cake'} to your wishlist!`);
    }
  };

  const handleOrderPlaced = (order: OrderDetails) => {
    setPlacedOrder(order);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCart([]);
    showToast('info', `Order ${order.orderNumber} placed successfully!`);
  };

  const handleCustomRequestSubmitted = (req: CustomCakeRequest) => {
    showToast('info', `Custom request ${req.id} sent! Our baker will contact you shortly.`);
  };

  const scrollToCakes = () => {
    const el = document.getElementById('cakes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCustom = () => {
    const el = document.getElementById('custom');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchFocus = () => {
    scrollToCakes();
    setTimeout(() => {
      const input = document.getElementById('searchInput');
      if (input) {
        input.focus();
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] selection:bg-[#7A123D] selection:text-white">
      {/* Header */}
      <Header
        cart={cart}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearchFocus={handleSearchFocus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCustomModal={scrollToCustom}
      />

      <main id="home" className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCakes={scrollToCakes}
          onOpenCustomModal={scrollToCustom}
        />

        {/* Cakes Catalogue Section */}
        <CakeCatalogue
          cakes={CAKES}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          wishlist={wishlist}
          onQuickView={(cake) => setQuickViewCake(cake)}
          onAddToCart={(cake, weight) => handleAddToCart(cake, weight, 1, true)}
          onToggleWishlist={handleToggleWishlist}
          onOpenCustomBuilder={scrollToCustom}
        />

        {/* Promo Banner & Why We3 Features */}
        <PromoAndFeatures
          onOrderNow={scrollToCakes}
        />

        {/* Custom Cake Builder Section */}
        <CustomCakeSection
          onRequestSubmitted={handleCustomRequestSubmitted}
        />

        {/* Testimonials */}
        <Testimonials />

        {/* Gallery */}
        <GallerySection />

        {/* FAQ & Contact Details */}
        <FaqAndContact />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          scrollToCakes();
        }}
        onOpenCustomModal={scrollToCustom}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        cake={quickViewCake}
        onClose={() => setQuickViewCake(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewCake ? wishlist.includes(quickViewCake.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        cakes={CAKES}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(cake) => handleAddToCart(cake, '500g', 1, true)}
        onExploreCakes={scrollToCakes}
      />

      {/* Toast notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
