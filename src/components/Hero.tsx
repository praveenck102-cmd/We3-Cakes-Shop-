import React from 'react';
import { ArrowRight, Sparkles, Heart, Star, ShoppingBag, Instagram, MessageCircle, Clock } from 'lucide-react';
import { BAKERY_INFO } from '../data/bakeryInfo';

interface HeroProps {
  onExploreCakes: () => void;
  onOpenCustomModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCakes, onOpenCustomModal }) => {
  return (
    <section className="hero">
      <div className="container hero-grid">
        {/* Hero Content */}
        <div className="hero-content">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="eyebrow" style={{ margin: 0 }}>
              Pre-Book Online · Store Pickup at Four Road
            </span>
            <a
              href={BAKERY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#c13584] bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200/60 hover:bg-pink-100 transition-colors"
            >
              <Instagram className="w-3 h-3" />
              <span>{BAKERY_INFO.instagramHandle}</span>
            </a>
          </div>

          <h1>Made with love. Baked for your moments.</h1>

          <p>
            Fresh celebration cakes, chilled ice cakes and bespoke themes made specially for birthdays,
            anniversaries and sweet celebrations. Pre-book online and pick up freshly baked at Four Road, 19 Thai Towers, Neyveli / Vadalur.
          </p>

          <div className="hero-actions">
            <button
              onClick={onExploreCakes}
              className="btn btn-primary"
              id="exploreBtn"
            >
              <span>Explore Cakes</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCustomModal}
              className="btn btn-secondary"
              id="customBtn"
            >
              <span>Pre-Book Custom Cake</span>
            </button>

            <a
              href={`${BAKERY_INFO.whatsappBaseUrl}?text=Hello%20We3%20Cakes%20Shop!%20I%20would%20like%20to%20pre-book%20a%20fresh%20cake.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn hidden sm:inline-flex items-center gap-2"
              style={{
                background: '#1e7040',
                color: '#fff',
                borderColor: '#1e7040',
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Pre-Book</span>
            </a>
          </div>

          <div className="hero-highlights">
            <div>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>4.9 Rating (500+ Reviews)</span>
            </div>
            <div>
              <Heart className="w-4 h-4 text-[#7A123D] fill-[#7A123D]" />
              <span>100% Fresh Daily Bake</span>
            </div>
            <div>
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Pre-Booking &amp; Store Pickup</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hero-visual">
          <div className="cake-glow" />

          <div className="floating-card floating-one">
            <Sparkles className="w-5 h-5 text-amber-500 mb-1" />
            <strong className="text-sm text-stone-900">Freshly</strong>
            <span className="text-xs text-stone-500">Handmade</span>
          </div>

          <div className="floating-card floating-two">
            <span className="w-3 h-3 rounded-full bg-emerald-600 mb-1 inline-block" />
            <strong className="text-xs text-stone-900">100% Pure Veg</strong>
            <span className="text-[11px] text-stone-500">Eggless Options</span>
          </div>

          <div className="cake-hero">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80"
              alt="Signature Belgian Dark Chocolate Cake at We3 Cakes Shop Neyveli"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
