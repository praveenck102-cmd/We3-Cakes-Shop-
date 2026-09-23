import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Cake } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  cakes: Cake[];
  onRemoveFromWishlist: (cakeId: string) => void;
  onAddToCart: (cake: Cake) => void;
  onExploreCakes: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  cakes,
  onRemoveFromWishlist,
  onAddToCart,
  onExploreCakes,
}) => {
  if (!isOpen) return null;

  const wishlistedCakes = cakes.filter((cake) => wishlistIds.includes(cake.id));

  return (
    <div className="modal" onClick={onClose}>
      <div className="overlay" />

      <div
        className="modal-content"
        style={{ maxWidth: '540px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="Close wishlist"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-[#7A123D] fill-[#7A123D]" />
          <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Saved Cakes</h3>
          <span
            style={{
              background: 'var(--cream)',
              color: 'var(--primary)',
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px',
            }}
          >
            {wishlistedCakes.length}
          </span>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {wishlistedCakes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--cream)',
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 12px',
                  color: 'var(--primary)',
                }}
              >
                <Heart className="w-7 h-7" />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>No cakes saved yet</h4>
              <p style={{ fontSize: '0.85rem', color: '#6d5a5d', maxWidth: '280px', margin: '0 auto 16px' }}>
                Tap the heart icon on any cake in our catalogue to save your favorites for later!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreCakes();
                }}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '10px 20px' }}
              >
                Browse Cakes
              </button>
            </div>
          ) : (
            wishlistedCakes.map((cake) => (
              <div
                key={cake.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '18px',
                  background: '#fffdfb',
                  border: '1px solid rgba(122,18,61,0.08)',
                }}
              >
                <img
                  src={cake.image}
                  alt={cake.name}
                  style={{ width: '64px', height: '64px', borderRadius: '14px', objectFit: 'cover' }}
                  referrerPolicy="no-referrer"
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {cake.category}
                  </span>
                  <h4
                    style={{
                      fontSize: '0.95rem',
                      margin: '2px 0',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {cake.name}
                  </h4>
                  <span className="price" style={{ fontSize: '0.95rem' }}>
                    From ₹{cake.basePrice500g}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(cake)}
                    className="add-cart"
                    style={{ padding: '8px 12px', fontSize: '0.78rem' }}
                    title="Add 500g to Cart"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(cake.id)}
                    style={{
                      border: 0,
                      background: 'transparent',
                      color: '#998',
                      cursor: 'pointer',
                      padding: '6px',
                    }}
                    title="Remove"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4 hover:text-rose-600" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistedCakes.length > 0 && (
          <div className="mt-4 pt-3 border-t border-stone-100 text-center">
            <button
              onClick={() => {
                onClose();
                onExploreCakes();
              }}
              style={{
                border: 0,
                background: 'transparent',
                color: 'var(--primary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Continue Browsing Cakes →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
