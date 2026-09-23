import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { BAKERY_INFO } from '../data/bakeryInfo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = subtotal;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="overlay"
          onClick={onClose}
        />
      )}

      {/* Slide Drawer */}
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} id="cartDrawer">
        {/* Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flex items-center gap-2">
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Your Fresh Cart</h3>
              <span
                style={{
                  background: 'var(--cream)',
                  color: 'var(--primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '999px',
                }}
              >
                {cart.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              className="icon-btn"
              id="closeCartBtn"
              onClick={onClose}
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Store Pickup Notice Banner */}
        <div
          style={{
            padding: '12px 18px',
            background: 'var(--cream)',
            borderBottom: '1px solid rgba(122,18,61,0.08)',
            fontSize: '0.82rem',
          }}
        >
          <div className="flex items-center gap-1.5 text-stone-900 font-bold mb-0.5">
            <ShoppingBag className="w-4 h-4 text-[#7A123D] shrink-0" />
            <span>Store Pickup at Four Road, Neyveli / Vadalur</span>
          </div>
          <p className="text-[11px] text-stone-600">
            Pre-book now &middot; Choose your pickup date and time slot at checkout!
          </p>
        </div>

        {/* Items List */}
        <div className="cart-items" id="cartItems">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 12px' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '8px' }}>🧁</span>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.85rem', color: '#6d5a5d', maxWidth: '240px', margin: '0 auto 16px' }}>
                Explore our freshly baked cakes and pick your celebration treat!
              </p>
              <button
                onClick={onClose}
                className="btn btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.85rem' }}
              >
                Browse Cakes
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} referrerPolicy="no-referrer" />
                <div style={{ minWidth: 0 }}>
                  <div className="flex items-start justify-between gap-1">
                    <h4 style={{ fontSize: '0.95rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      style={{ border: 0, background: 'transparent', color: '#998', cursor: 'pointer', padding: '2px' }}
                      title="Remove"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5 hover:text-rose-600" />
                    </button>
                  </div>

                  <small style={{ color: '#6d5a5d', display: 'block', marginTop: '2px', fontSize: '0.78rem' }}>
                    {item.weight} · {item.isEggless ? 'Eggless' : 'Regular'} · ₹{item.price}
                  </small>

                  {item.customMessage && (
                    <div
                      style={{
                        fontSize: '0.72rem',
                        fontStyle: 'italic',
                        color: 'var(--primary)',
                        background: '#fff',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        marginTop: '4px',
                        border: '1px solid rgba(122,18,61,0.1)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      &ldquo;{item.customMessage}&rdquo;
                    </div>
                  )}

                  <div className="qty">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <strong style={{ fontSize: '0.95rem', color: 'var(--text)', whiteSpace: 'nowrap' }}>
                  ₹{item.price * item.quantity}
                </strong>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        {cart.length > 0 && (
          <div className="cart-summary">
            <div style={{ fontSize: '0.88rem', color: '#6d5a5d', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 700, color: 'var(--text)' }}>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Store Pickup (Four Road)</span>
                <span>
                  <strong style={{ color: '#1e7040' }}>FREE</strong>
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                margin: '10px 0 16px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(122,18,61,0.08)',
                fontWeight: 700,
              }}
            >
              <span style={{ fontSize: '1rem' }}>Total Payable</span>
              <span id="cartTotal" className="price" style={{ fontSize: '1.4rem' }}>
                ₹{grandTotal}
              </span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="btn btn-primary full"
              id="checkoutBtn"
            >
              <span>Proceed to Pre-Book &amp; Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.78rem', color: '#887' }}>
              <span>Pay at store or advance UPI</span>
              <button
                onClick={onClearCart}
                style={{ border: 0, background: 'transparent', color: '#a24', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
