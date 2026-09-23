import React from 'react';
import { MessageCircle, Download, X, MapPin, ExternalLink } from 'lucide-react';
import { OrderDetails } from '../types';
import { BAKERY_INFO } from '../data/bakeryInfo';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const pickupDate = order.pickupDate || order.deliveryDate;
  const pickupTime = order.pickupTime || order.deliveryTime;

  const generateWhatsAppLink = () => {
    const itemsSummary = order.items
      .map(
        (i) =>
          `• ${i.name} (${i.weight}) x ${i.quantity} ${i.isEggless ? '[Eggless]' : ''}${
            i.customMessage ? ` - "${i.customMessage}"` : ''
          }`
      )
      .join('\n');

    const msg =
      `Hello We3 Cakes Shop (${BAKERY_INFO.shortAddress})! 🎂\nI have pre-booked a cake for Store Pickup:\n\n` +
      `*Pre-Booking ID*: ${order.orderNumber}\n` +
      `*Customer*: ${order.customerName}\n` +
      `*Phone*: ${order.phone}\n` +
      `*Store Pickup Slot*: ${pickupDate} at ${pickupTime}\n` +
      `*Pickup Location*: ${BAKERY_INFO.shortAddress}\n` +
      `*Payment Method*: ${order.paymentMethod}\n` +
      `*Total Amount*: ₹${order.total}\n\n` +
      `*Items*:\n${itemsSummary}\n\n` +
      (order.notes ? `*Notes*: ${order.notes}\n\n` : '') +
      `Please confirm receipt. Thank you!`;

    return `${BAKERY_INFO.whatsappBaseUrl}?text=${encodeURIComponent(msg)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="overlay" />

      <div
        className="modal-content success-box"
        style={{ textAlign: 'center' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div style={{ fontSize: '3.2rem', marginBottom: '8px' }}>🎉</div>
        <h2>Pre-Booking Confirmed!</h2>
        <p style={{ fontSize: '0.92rem', color: '#6d5a5d', marginTop: '6px' }}>
          Thank you for pre-booking with We3 Cakes Shop. Your cake will be baked fresh and ready for pickup at our shop at {BAKERY_INFO.shortAddress}.
        </p>

        {/* Receipt Box */}
        <div
          id="receiptBox"
          style={{
            background: 'var(--cream)',
            border: '1px solid rgba(122,18,61,0.12)',
            padding: '18px',
            borderRadius: '20px',
            margin: '20px 0',
            textAlign: 'left',
            fontSize: '0.85rem',
          }}
        >
          <div className="flex justify-between items-center pb-2 border-b border-stone-200">
            <span style={{ color: '#7a6a6d' }}>Pre-Booking Reference:</span>
            <strong style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '1rem' }}>
              {order.orderNumber}
            </strong>
          </div>

          <div className="space-y-1.5 mt-2.5">
            <div className="flex justify-between">
              <span style={{ color: '#7a6a6d' }}>Customer:</span>
              <strong>{order.customerName} ({order.phone})</strong>
            </div>

            <div className="flex justify-between">
              <span style={{ color: '#7a6a6d' }}>Store Pickup Slot:</span>
              <strong>{pickupDate} · {pickupTime}</strong>
            </div>

            <div className="flex justify-between gap-4">
              <span style={{ color: '#7a6a6d', flexShrink: 0 }}>Pickup Point:</span>
              <span style={{ textAlign: 'right', fontWeight: 600, color: '#7A123D' }}>
                {BAKERY_INFO.shortAddress}
              </span>
            </div>

            <div className="flex justify-between">
              <span style={{ color: '#7a6a6d' }}>Payment Mode:</span>
              <strong>{order.paymentMethod}</strong>
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold">
              <span>Total Payable:</span>
              <span className="price" style={{ fontSize: '1.25rem' }}>₹{order.total}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-200/80 text-[11px] text-stone-600 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#7A123D]" />
              {BAKERY_INFO.openingHours}
            </span>
            <a
              href={BAKERY_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7A123D] font-semibold underline inline-flex items-center gap-0.5"
            >
              Get Store Directions <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        <div className="space-y-2.5">
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn full"
            style={{
              background: '#1e7040',
              color: '#fff',
              fontSize: '0.9rem',
              boxShadow: '0 4px 14px rgba(30,112,64,0.25)',
            }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Booking on WhatsApp ({BAKERY_INFO.whatsappDisplay})</span>
          </a>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="btn btn-secondary flex-1"
              style={{ fontSize: '0.85rem' }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={onClose}
              className="btn btn-secondary flex-1"
              style={{ fontSize: '0.85rem' }}
            >
              <span>Back to Cakes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
