import React, { useEffect } from 'react';
import { CheckCircle2, Heart, Sparkles, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info';
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast">
      {toast.type === 'cart' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {toast.type === 'wishlist' && <Heart className="w-5 h-5 text-rose-400 fill-rose-400 shrink-0" />}
      {toast.type === 'info' && <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />}

      <span style={{ fontWeight: 500 }}>{toast.message}</span>

      <button
        onClick={onClose}
        style={{
          border: 0,
          background: 'transparent',
          color: 'rgba(255,255,255,0.7)',
          cursor: 'pointer',
          padding: '2px',
          marginLeft: '8px',
        }}
        aria-label="Dismiss"
      >
        <X className="w-4 h-4 hover:text-white" />
      </button>
    </div>
  );
};
