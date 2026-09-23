import React from 'react';
import { Phone, MapPin, Clock, Instagram, MessageCircle } from 'lucide-react';
import { BAKERY_INFO } from '../data/bakeryInfo';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenCustomModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenCustomModal }) => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="logo-mark" style={{ width: '38px', height: '38px', fontSize: '1rem' }}>
              W3
            </div>
            <h3 style={{ fontSize: '1.35rem' }}>We3 Cakes Shop</h3>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#5c4b4f' }}>
            Handcrafted celebration cakes, chilled ice cakes, and bespoke themed creations. Freshly baked every day at Four Road, Neyveli / Vadalur.
          </p>

          <div className="flex items-center gap-2 mt-4">
            <a
              href={BAKERY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FFF1E5] text-[#962fbf] hover:bg-pink-100 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#d62976]" />
              <span>{BAKERY_INFO.instagramHandle}</span>
            </a>

            <a
              href={`${BAKERY_INFO.whatsappBaseUrl}?text=Hello%20We3%20Cakes%20Shop!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#e8f7ee] text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#cakes">Cakes Catalogue</a>
          <a href="#flavours">Flavours &amp; Care</a>
          <a
            href="#custom"
            onClick={(e) => {
              e.preventDefault();
              onOpenCustomModal();
            }}
          >
            Custom Cakes
          </a>
          <a href="#about">About &amp; Store Location</a>
        </div>

        {/* Popular Picks */}
        <div>
          <h4>Popular Picks</h4>
          <a
            href="#cakes"
            onClick={() => onSelectCategory('Chocolate')}
          >
            Belgian Chocolate Truffle
          </a>
          <a
            href="#cakes"
            onClick={() => onSelectCategory('Red Velvet')}
          >
            Red Velvet Cream Cheese
          </a>
          <a
            href="#cakes"
            onClick={() => onSelectCategory('Fresh Fruit')}
          >
            Fresh Fruit Gateau
          </a>
          <a
            href="#cakes"
            onClick={() => onSelectCategory('Pineapple')}
          >
            Pineapple Ice Cake
          </a>
          <a
            href="#cakes"
            onClick={() => onSelectCategory('Kids Cakes')}
          >
            Kids Cartoon Cakes
          </a>
        </div>

        {/* Bakery Info */}
        <div>
          <h4>Store Location &amp; Hours</h4>
          <p style={{ fontSize: '0.85rem', margin: '6px 0', color: '#5c4b4f' }} className="flex items-start gap-1.5">
            <MapPin className="w-4 h-4 text-[#7A123D] shrink-0 mt-0.5" />
            <span>
              <strong>{BAKERY_INFO.shortAddress}</strong>
              <br />
              <small className="text-stone-500">{BAKERY_INFO.fullAddress}</small>
            </span>
          </p>
          <p style={{ fontSize: '0.85rem', margin: '6px 0', color: '#5c4b4f' }} className="flex items-center gap-1.5 flex-wrap">
            <Phone className="w-3.5 h-3.5 text-[#7A123D] shrink-0" />
            <a href={BAKERY_INFO.phoneTel} className="font-semibold text-stone-900 hover:text-[#7A123D]">
              ☎ {BAKERY_INFO.phoneDisplay}
            </a>
            <span className="text-stone-300">|</span>
            <a href={BAKERY_INFO.landlineTel} className="text-stone-600 hover:text-[#7A123D]">
              Shop: {BAKERY_INFO.landline}
            </a>
          </p>
          <p style={{ fontSize: '0.85rem', margin: '6px 0', color: '#5c4b4f' }} className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#7A123D] shrink-0" />
            <span>{BAKERY_INFO.openingHours}</span>
          </p>
          <p style={{ fontSize: '0.85rem', margin: '6px 0', color: '#1e7040', fontWeight: 600 }}>
            🛍️ Online Pre-Booking &amp; Fresh In-Store Pickup
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 We3 Cakes Shop. Made with love. Baked for your moments.</span>
        <span>100% Pure Veg Eggless Available · FSSAI Certified</span>
      </div>
    </footer>
  );
};
