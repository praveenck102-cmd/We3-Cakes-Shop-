import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, Copy, Check, MapPin, ShoppingBag, Clock } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { BAKERY_INFO } from '../data/bakeryInfo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderPlaced: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderPlaced,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [customerArea, setCustomerArea] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('Evening (4 PM - 7 PM)');
  const [paymentMethod, setPaymentMethod] = useState<'Pay at Store on Pickup' | 'UPI Advance' | 'Pay Online'>('Pay at Store on Pickup');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const today = new Date().toISOString().split('T')[0];

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(BAKERY_INFO.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !pickupDate) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `W3-${Math.floor(10000 + Math.random() * 90000)}`;
      const order: OrderDetails = {
        orderNumber,
        items: [...cart],
        customerName,
        phone,
        customerArea: customerArea || 'Neyveli / Vadalur',
        pickupLocation: BAKERY_INFO.fullAddress,
        pickupDate,
        pickupTime,
        notes,
        paymentMethod,
        subtotal,
        total,
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        // Backward compatibility
        address: BAKERY_INFO.shortAddress,
        deliveryDate: pickupDate,
        deliveryTime: pickupTime,
        deliveryFee: 0,
      };

      setIsSubmitting(false);
      onOrderPlaced(order);
    }, 600);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="overlay" />

      <div
        className="modal-content checkout-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal-close"
          id="closeCheckout"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="section-tag">Store Pickup Pre-Booking</span>
        <h2 style={{ marginTop: '10px' }}>Confirm Pre-Booking</h2>
        <p style={{ fontSize: '0.88rem', color: '#6d5a5d', marginTop: '4px' }}>
          We bake fresh to order. Collect your cake fresh from our store at your chosen slot!
        </p>

        {/* Store Pickup Address Highlight Box */}
        <div
          style={{
            background: 'var(--cream)',
            border: '1px solid rgba(122,18,61,0.14)',
            borderRadius: '16px',
            padding: '12px 14px',
            marginTop: '12px',
          }}
        >
          <div className="flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-[#7A123D] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-stone-900 font-semibold mb-0.5">
                Pickup Location: {BAKERY_INFO.name}
              </strong>
              <span className="text-stone-600 block leading-relaxed">
                {BAKERY_INFO.fullAddress}
              </span>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-[#7A123D] font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {BAKERY_INFO.openingHours}
                </span>
                <a
                  href={BAKERY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-stone-900"
                >
                  View on Map
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Snapshot */}
        <div
          style={{
            background: '#fff',
            border: '1px solid rgba(122,18,61,0.1)',
            borderRadius: '16px',
            padding: '12px 16px',
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', display: 'block', color: 'var(--text)' }}>
              {cart.reduce((s, i) => s + i.quantity, 0)} Items in Order
            </span>
            <span style={{ fontSize: '0.78rem', color: '#1e7040', fontWeight: 600 }}>
              Store Pickup: FREE (₹0 Fee)
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#887', display: 'block' }}>Total Due</span>
            <span className="price" style={{ fontSize: '1.4rem' }}>₹{total}</span>
          </div>
        </div>

        <form className="checkout-form" id="orderForm" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              id="orderName"
              placeholder="e.g. Anandha Kumar"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Phone / WhatsApp Number *
            </label>
            <input
              type="tel"
              id="orderPhone"
              placeholder="e.g. 98765 43210"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Preferred Pickup Date *
            </label>
            <input
              type="date"
              id="orderDate"
              required
              min={today}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Preferred Pickup Time Slot *
            </label>
            <select
              id="orderSlot"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full"
            >
              <option>Morning (10:00 AM – 1:00 PM)</option>
              <option>Afternoon (1:00 PM – 4:00 PM)</option>
              <option>Evening (4:00 PM – 7:00 PM)</option>
              <option>Late Evening (7:00 PM – 10:30 PM)</option>
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Your Area / Locality (Optional reference)
            </label>
            <input
              type="text"
              id="orderArea"
              placeholder="e.g. Indira Nagar, Block 21 Neyveli, Vadalur Four Road"
              value={customerArea}
              onChange={(e) => setCustomerArea(e.target.value)}
              className="w-full"
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Payment Option
            </label>
            <select
              id="orderPayment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
              className="w-full"
            >
              <option value="Pay at Store on Pickup">Pay at Store on Pickup (Cash / UPI at Counter)</option>
              <option value="UPI Advance">UPI Advance (GPay / PhonePe / Paytm)</option>
              <option value="Pay Online">Online Card / Net Banking (Simulation)</option>
            </select>
          </div>

          {/* UPI details box if UPI selected */}
          {paymentMethod === 'UPI Advance' && (
            <div
              style={{
                gridColumn: '1 / -1',
                padding: '12px 14px',
                background: '#eefcf3',
                border: '1px solid #b7ebd0',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.82rem',
              }}
            >
              <QrCode className="w-8 h-8 text-emerald-700 shrink-0" />
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 700, color: '#10522c', display: 'block' }}>
                  Bakery UPI ID: {BAKERY_INFO.upiId}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#1e7040' }}>
                  Pay via any UPI app and show receipt during pickup
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="btn btn-secondary"
                style={{ padding: '6px 10px', fontSize: '0.75rem', borderRadius: '8px' }}
              >
                {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Cake Message &amp; Notes
            </label>
            <textarea
              id="orderNotes"
              rows={2}
              placeholder="e.g. Message to write on cake: 'Happy 5th Birthday Kavi', candle count, special packing..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary full"
            style={{ gridColumn: '1 / -1', marginTop: '6px' }}
          >
            {isSubmitting ? (
              <span>Confirming Pre-Booking...</span>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Confirm Pre-Booking &middot; Store Pickup (₹{total})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
