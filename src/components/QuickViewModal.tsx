import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, Heart, MessageCircle } from 'lucide-react';
import { Cake } from '../types';
import { BAKERY_INFO } from '../data/bakeryInfo';

interface QuickViewModalProps {
  cake: Cake | null;
  onClose: () => void;
  onAddToCart: (
    cake: Cake,
    weight: '500g' | '1kg' | '1.5kg' | '2kg',
    quantity: number,
    isEggless: boolean,
    customMessage: string
  ) => void;
  isWishlisted: boolean;
  onToggleWishlist: (cakeId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  cake,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<'500g' | '1kg' | '1.5kg' | '2kg'>('500g');
  const [quantity, setQuantity] = useState(1);
  const [isEggless, setIsEggless] = useState(true);
  const [customMessage, setCustomMessage] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!cake) return null;

  const currentPrice = cake.prices[selectedWeight] * quantity;

  const handleAdd = () => {
    onAddToCart(cake, selectedWeight, quantity, isEggless, customMessage);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  const handleDirectWhatsApp = () => {
    const text =
      `Hello We3 Cakes Shop (${BAKERY_INFO.shortAddress})! 🎂\nI would like to order directly:\n` +
      `*Cake*: ${cake.name}\n` +
      `*Weight*: ${selectedWeight}\n` +
      `*Dietary*: ${isEggless ? '100% Eggless' : 'Regular'}\n` +
      `*Quantity*: ${quantity}\n` +
      `*Total*: ₹${currentPrice}\n` +
      `*Message on Cake*: "${customMessage || 'Happy Birthday'}"\n` +
      `Please confirm pre-booking for Store Pickup at Four Road, Neyveli / Vadalur!`;
    window.open(`${BAKERY_INFO.whatsappBaseUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="overlay" />

      <div
        className="modal-content"
        style={{ maxWidth: '780px', padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Cake Image Left */}
          <div className="relative bg-stone-100 min-h-[280px] md:min-h-[420px]">
            <img
              src={cake.image}
              alt={cake.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {cake.isBestseller && (
              <span className="badge" style={{ top: '16px', left: '16px' }}>
                Bestseller
              </span>
            )}
            <button
              onClick={() => onToggleWishlist(cake.id)}
              className={`wish ${isWishlisted ? 'active' : ''}`}
              style={{ top: '16px', right: '16px' }}
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#7A123D] text-[#7A123D]' : 'text-stone-700'}`} />
            </button>
          </div>

          {/* Configuration Right */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="font-semibold text-[#7A123D] uppercase tracking-wider text-[11px]">
                  {cake.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{cake.rating.toFixed(1)}</span>
                  <span className="text-stone-400 text-xs">({cake.reviewsCount} reviews)</span>
                </div>
              </div>

              <h3 className="font-serif font-bold text-2xl text-stone-900 leading-snug">
                {cake.name}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {cake.description}
              </p>
            </div>

            {/* Weight Options */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-600 font-medium">
                <span>Select Weight:</span>
                <span className="font-bold text-stone-900">{selectedWeight}</span>
              </div>
              <div className="weight-selector" style={{ margin: 0 }}>
                {(['500g', '1kg', '1.5kg', '2kg'] as const).map((wt) => (
                  <button
                    key={wt}
                    type="button"
                    onClick={() => setSelectedWeight(wt)}
                    className={selectedWeight === wt ? 'active' : ''}
                    style={{ padding: '6px 4px' }}
                  >
                    {wt}
                  </button>
                ))}
              </div>
            </div>

            {/* Eggless Option Checkbox */}
            <label
              className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer select-none"
              style={{ background: 'var(--cream)', border: '1px solid rgba(122,18,61,0.08)' }}
            >
              <input
                type="checkbox"
                checked={isEggless}
                onChange={(e) => setIsEggless(e.target.checked)}
                className="accent-[#7A123D] w-4 h-4"
              />
              <span className="text-xs font-semibold text-stone-800">
                100% Pure Vegetarian Eggless Recipe
              </span>
            </label>

            {/* Custom Message on Cake */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-700">
                Piped Message on Cake (Optional)
              </label>
              <input
                type="text"
                maxLength={40}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="e.g. Happy Birthday Priya!"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-[#7A123D]"
              />
            </div>

            {/* Quantity & Total */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-4">
              <div className="qty" style={{ margin: 0 }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <span className="w-6 text-center text-xs font-bold text-stone-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <div>
                <span className="block text-[10px] text-stone-400 font-semibold uppercase">Total Price</span>
                <span className="price" style={{ fontSize: '1.5rem' }}>
                  ₹{currentPrice}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleAdd}
                className="btn btn-primary full"
                style={{ padding: '12px 18px', fontSize: '0.88rem' }}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (₹{currentPrice})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="btn btn-secondary full"
                style={{
                  padding: '10px 18px',
                  fontSize: '0.84rem',
                  color: '#1e7040',
                  borderColor: 'rgba(30,112,64,0.2)',
                }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Order</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
