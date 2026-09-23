import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Phone, MapPin, Sparkles, Instagram, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { BAKERY_INFO } from '../data/bakeryInfo';

interface HeaderProps {
  cart: CartItem[];
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearchFocus: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenCustomModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSearchFocus,
  onOpenCustomModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="container topbar-inner flex-wrap justify-between gap-y-1">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Freshly baked daily in Neyveli &amp; Vadalur</span>
          </span>
          <span className="hidden sm:flex items-center gap-1 text-[12px] opacity-90">
            <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate max-w-[280px]" title={BAKERY_INFO.fullAddress}>
              {BAKERY_INFO.shortAddress}
            </span>
          </span>
          <div className="flex items-center gap-3">
            <a
              href={BAKERY_INFO.phoneTel}
              className="flex items-center gap-1 font-semibold hover:text-amber-200 transition-colors"
              title="Call Bakery"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>☎ {BAKERY_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`${BAKERY_INFO.whatsappBaseUrl}?text=Hello%20We3%20Cakes%20Shop!%20I%20would%20like%20to%20order%20a%20cake.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-emerald-300 hover:text-white transition-colors"
              title="WhatsApp Bakery"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <a
              href={BAKERY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-pink-300 hover:text-white transition-colors"
              title={`Instagram ${BAKERY_INFO.instagramHandle}`}
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{BAKERY_INFO.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="header" id="header">
        <div className="container header-inner">
          {/* Brand Logo */}
          <a href="#home" className="logo" aria-label="We3 Cakes Shop Home">
            <div className="logo-mark">W3</div>
            <div>
              <strong>We3 Cakes Shop</strong>
              <small>Neyveli &middot; Vadalur</small>
            </div>
          </a>

          {/* Navigation */}
          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`} id="nav">
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#cakes" onClick={closeMenu}>Cakes</a>
            <a href="#flavours" onClick={closeMenu}>Flavours</a>
            <a href="#custom" onClick={closeMenu}>Custom Cakes</a>
            <a href="#about" onClick={closeMenu}>About Us</a>
            <a href="#contact" onClick={closeMenu}>Contact &amp; Store</a>
          </nav>

          {/* Action Icons */}
          <div className="header-actions">
            <a
              href={BAKERY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              title="Visit Instagram @we3_cakes_neyveli"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 text-pink-700" />
            </a>

            <button
              className="icon-btn"
              id="searchBtn"
              aria-label="Search"
              onClick={onSearchFocus}
              title="Search Cakes"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              className="icon-btn"
              id="wishlistBtn"
              aria-label="Wishlist"
              onClick={onOpenWishlist}
              title="Saved Cakes"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-[#7A123D] text-[#7A123D]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#7A123D] text-white w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              className="icon-btn cart-trigger"
              id="cartBtn"
              aria-label="Cart"
              onClick={onOpenCart}
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <small id="cartCount">{totalCartCount}</small>
            </button>

            <button
              onClick={onOpenCustomModal}
              className="btn btn-primary hidden md:inline-flex"
              style={{ padding: '9px 18px', fontSize: '0.84rem', borderRadius: '999px' }}
            >
              Custom Cake
            </button>

            <button
              className="menu-btn"
              id="menuBtn"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
