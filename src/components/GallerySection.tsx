import React, { useState } from 'react';
import { X, Instagram, ExternalLink } from 'lucide-react';
import { BAKERY_INFO } from '../data/bakeryInfo';

interface GalleryItem {
  url: string;
  title: string;
  tag: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    url: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80',
    title: 'Whipped Vanilla & Golden Berry Cake',
    tag: 'Birthday Special',
  },
  {
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    title: 'Belgian Truffle Ganache Drip Cake',
    tag: 'Bestseller',
  },
  {
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    title: 'Safari Theme Kids Birthday Tier',
    tag: 'Kids Party',
  },
  {
    url: 'https://images.unsplash.com/photo-1529513247457-9f2f1f8b0af6?auto=format&fit=crop&w=800&q=80',
    title: 'Handcrafted White Rose Wedding Cake',
    tag: 'Wedding',
  },
  {
    url: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80',
    title: 'Boutique Rose Cupcake Assortment',
    tag: 'Pastry Box',
  },
  {
    url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
    title: 'Rainbow Sparkle Custom Design',
    tag: 'Custom Order',
  },
];

export const GallerySection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-tag">Our Creations</span>
            <h2>Fresh glimpses from our kitchen</h2>
            <p className="text-sm text-stone-600 mt-1">
              A look into the celebrations we&apos;ve sweetened across Neyveli.
            </p>
          </div>
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, index) => (
            <img
              key={index}
              src={item.url}
              alt={item.title}
              onClick={() => setActiveImage(item)}
              title={`${item.title} - Click to view`}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>

        {/* Instagram Follow Callout */}
        <div
          className="mt-10 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, #FFF1E5 0%, #FEE5ED 50%, #F7D9C5 100%)',
            border: '1px solid rgba(122,18,61,0.12)',
            boxShadow: '0 10px 30px rgba(122,18,61,0.06)',
          }}
        >
          <div className="flex items-center gap-4 text-center md:text-left">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
              style={{
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                color: '#fff',
              }}
            >
              <Instagram className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#7A123D]">
                Connect On Instagram
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-900 mt-0.5">
                {BAKERY_INFO.instagramHandle}
              </h3>
              <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-xl">
                Explore our daily fresh bake reels, custom birthday tiers, customer reviews, and new flavour releases!
              </p>
            </div>
          </div>

          <a
            href={BAKERY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn shrink-0"
            style={{
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: '#fff',
              border: 0,
              padding: '12px 24px',
              fontSize: '0.88rem',
              borderRadius: '999px',
              boxShadow: '0 4px 15px rgba(220,39,67,0.3)',
            }}
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="modal"
          onClick={() => setActiveImage(null)}
        >
          <div className="overlay" />
          <div
            className="modal-content"
            style={{ maxWidth: '680px', padding: 0, overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="modal-close"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div style={{ maxHeight: '65vh', overflow: 'hidden', background: '#000' }}>
              <img
                src={activeImage.url}
                alt={activeImage.title}
                style={{ width: '100%', height: 'auto', maxHeight: '65vh', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '20px 24px', background: '#fff' }}>
              <div className="flex items-center justify-between">
                <span className="eyebrow" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                  {activeImage.tag}
                </span>
                <a
                  href={BAKERY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#c13584] flex items-center gap-1 hover:underline"
                >
                  <Instagram className="w-3 h-3" />
                  <span>{BAKERY_INFO.instagramHandle}</span>
                </a>
              </div>
              <h3 style={{ marginTop: '8px', fontSize: '1.3rem' }}>{activeImage.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#7a6a6d', marginTop: '4px' }}>
                We3 Cakes Shop &middot; {BAKERY_INFO.shortAddress}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
