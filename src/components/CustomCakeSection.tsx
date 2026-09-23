import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Upload, X, Sparkles } from 'lucide-react';
import { CustomCakeRequest } from '../types';
import { BAKERY_INFO } from '../data/bakeryInfo';

interface CustomCakeSectionProps {
  onRequestSubmitted: (request: CustomCakeRequest) => void;
}

export const CustomCakeSection: React.FC<CustomCakeSectionProps> = ({ onRequestSubmitted }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [cakeType, setCakeType] = useState('Birthday Cake');
  const [flavour, setFlavour] = useState('Chocolate');
  const [weight, setWeight] = useState('1kg');
  const [isEggless, setIsEggless] = useState(true);
  const [messageOnCake, setMessageOnCake] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('17:00');
  const [designDescription, setDesignDescription] = useState('');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<CustomCakeRequest | null>(null);

  const customPills = [
    'Birthday Cake',
    'Wedding Cake',
    'Kids Theme',
    'Photo Cake',
    'Anniversary',
    'Cartoon Theme',
    'Custom Design',
  ];

  // Calculate live estimate
  const getEstimatedPrice = () => {
    let base = 600;
    if (cakeType === 'Wedding Cake') base = 900;
    if (cakeType === 'Photo Cake') base = 650;
    if (cakeType === 'Kids Theme' || cakeType === 'Cartoon Theme') base = 750;

    let multiplier = 1;
    if (weight === '500g') multiplier = 1;
    if (weight === '1kg') multiplier = 1.8;
    if (weight === '1.5kg') multiplier = 2.6;
    if (weight === '2kg') multiplier = 3.3;
    if (weight === '3kg+') multiplier = 4.8;

    return Math.round(base * multiplier);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !deliveryDate) return;

    const req: CustomCakeRequest = {
      id: `W3-CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      phone,
      cakeType,
      flavour,
      weight,
      isEggless,
      messageOnCake,
      pickupDate: deliveryDate,
      pickupTime: deliveryTime,
      deliveryDate,
      deliveryTime,
      designDescription,
      referenceImage: referenceImage || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setSubmittedRequest(req);
    setIsSubmitted(true);
    onRequestSubmitted(req);
  };

  const generateWhatsAppMessage = (req: CustomCakeRequest) => {
    const text =
      `Hello We3 Cakes Shop (${BAKERY_INFO.shortAddress})! 🎂\nI would like to Pre-Book a Custom Cake for Store Pickup:\n` +
      `*ID*: ${req.id}\n` +
      `*Name*: ${req.customerName}\n` +
      `*Phone*: ${req.phone}\n` +
      `*Type*: ${req.cakeType}\n` +
      `*Flavour*: ${req.flavour}\n` +
      `*Weight*: ${req.weight} (${req.isEggless ? '100% Eggless' : 'Regular'})\n` +
      `*Message on Cake*: "${req.messageOnCake || 'None'}"\n` +
      `*Pickup Date & Time*: ${req.deliveryDate} at ${req.deliveryTime}\n` +
      `*Pickup Location*: ${BAKERY_INFO.shortAddress}\n` +
      `*Instructions*: ${req.designDescription || 'None'}\n\nPlease confirm quote & pickup readiness. Thank you!`;
    return `${BAKERY_INFO.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="section" id="custom">
      <div className="container custom-grid">
        {/* Left Column */}
        <div>
          <span className="section-tag">Custom Orders</span>
          <h2 style={{ marginTop: '12px' }}>Your idea. Our baked masterpiece.</h2>
          <p style={{ marginTop: '14px' }}>
            Have a dream theme, character cake, photo cake or multi-tier wedding design?
            Send your requirements and our master patissiers will bake it fresh for your celebration at {BAKERY_INFO.shortAddress}.
          </p>

          <div className="custom-pills">
            {customPills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setCakeType(pill)}
                className={cakeType === pill ? 'active' : ''}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Estimate Card */}
          <div
            className="feature-card"
            style={{ marginTop: '28px', background: 'var(--cream)', borderColor: 'rgba(122,18,61,0.1)' }}
          >
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[#7A123D]">
                Price Estimate Guide
              </span>
              <span className="text-emerald-700 font-bold">Store Pickup (Free)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="price" style={{ fontSize: '2rem' }}>
                ~₹{getEstimatedPrice()}
              </span>
              <span className="text-xs text-stone-600 font-medium">
                for {weight} {cakeType} ({isEggless ? 'Eggless' : 'Regular'})
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-2" style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
              Final price confirmed after reviewing reference photos and handcrafted sugar elements. Baked fresh for store pickup.
            </p>
          </div>
        </div>

        {/* Right Column: Form or Success */}
        {isSubmitted && submittedRequest ? (
          <div className="custom-form text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-stone-900">
              Custom Cake Pre-Booking Sent!
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Reference ID: <strong className="text-[#7A123D]">{submittedRequest.id}</strong>
            </p>

            <div
              className="p-4 rounded-2xl text-left text-xs space-y-1.5 my-4"
              style={{ background: 'var(--bg)', border: '1px solid rgba(122,18,61,0.1)' }}
            >
              <div><span className="text-stone-400">Customer:</span> <strong>{submittedRequest.customerName} ({submittedRequest.phone})</strong></div>
              <div><span className="text-stone-400">Store Pickup:</span> <strong>{submittedRequest.deliveryDate} at {submittedRequest.deliveryTime}</strong></div>
              <div><span className="text-stone-400">Pickup Location:</span> <strong className="text-[#7A123D]">{BAKERY_INFO.shortAddress}</strong></div>
              <div><span className="text-stone-400">Specifications:</span> <strong>{submittedRequest.weight} {submittedRequest.cakeType} · {submittedRequest.flavour} ({submittedRequest.isEggless ? '100% Eggless' : 'Regular'})</strong></div>
              {submittedRequest.messageOnCake && (
                <div><span className="text-stone-400">Message:</span> <strong>&ldquo;{submittedRequest.messageOnCake}&rdquo;</strong></div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={generateWhatsAppMessage(submittedRequest)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary full"
                style={{ background: '#1e7040', fontSize: '0.88rem' }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setSubmittedRequest(null);
                  setDesignDescription('');
                  setMessageOnCake('');
                  setReferenceImage(null);
                }}
                className="btn btn-secondary full"
                style={{ fontSize: '0.85rem' }}
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form className="custom-form" id="customForm" onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="text"
                id="custName"
                placeholder="Your Name *"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />

              <input
                type="tel"
                id="custPhone"
                placeholder="Phone Number *"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <select
                id="custType"
                value={cakeType}
                onChange={(e) => setCakeType(e.target.value)}
              >
                <option>Birthday Cake</option>
                <option>Wedding Cake</option>
                <option>Kids Theme</option>
                <option>Photo Cake</option>
                <option>Anniversary</option>
                <option>Cartoon Theme</option>
                <option>Custom Design</option>
              </select>

              <select
                id="custFlavour"
                value={flavour}
                onChange={(e) => setFlavour(e.target.value)}
              >
                <option>Chocolate</option>
                <option>Vanilla</option>
                <option>Red Velvet</option>
                <option>Butterscotch</option>
                <option>Black Forest</option>
                <option>Pineapple Ice Cake</option>
                <option>Nutella Hazelnut</option>
                <option>Exotic Fresh Fruit</option>
              </select>

              <select
                id="custWeight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              >
                <option>500g</option>
                <option>1kg</option>
                <option>1.5kg</option>
                <option>2kg</option>
                <option>3kg+</option>
              </select>

              <input
                type="date"
                id="custDate"
                required
                min={today}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />

              <div style={{ gridColumn: '1 / -1' }} className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={isEggless}
                    onChange={(e) => setIsEggless(e.target.checked)}
                    className="accent-[#7A123D] w-4 h-4"
                  />
                  <span>100% Pure Eggless Recipe</span>
                </label>
              </div>

              <input
                type="text"
                id="custMessage"
                placeholder="Message on Cake (e.g., Happy 10th Birthday Aarav)"
                style={{ gridColumn: '1 / -1' }}
                value={messageOnCake}
                onChange={(e) => setMessageOnCake(e.target.value)}
              />

              <textarea
                id="custDesc"
                rows={3}
                placeholder="Describe design details, color scheme, characters, or dietary instructions..."
                value={designDescription}
                onChange={(e) => setDesignDescription(e.target.value)}
              />

              {/* Reference image upload */}
              <div style={{ gridColumn: '1 / -1' }}>
                {referenceImage ? (
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-stone-200">
                    <img src={referenceImage} alt="Uploaded reference preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setReferenceImage(null)}
                      className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer"
                      aria-label="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-stone-300 hover:border-[#7A123D] rounded-2xl bg-[#fffcf9] cursor-pointer text-xs text-stone-600 transition-colors">
                    <Upload className="w-4 h-4 text-stone-400" />
                    <span>Upload reference sketch or photo cake picture (Optional)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary full"
              style={{ marginTop: '16px' }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Custom Quote</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
