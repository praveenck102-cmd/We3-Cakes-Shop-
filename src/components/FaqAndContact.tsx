import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Instagram, ExternalLink, Navigation } from 'lucide-react';
import { FAQS } from '../data/cakes';
import { BAKERY_INFO } from '../data/bakeryInfo';

export const FaqAndContact: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="section" id="about">
      <div className="container faq-grid">
        {/* FAQ Column */}
        <div>
          <span className="section-tag">Help &amp; Answers</span>
          <h2 style={{ marginTop: '12px' }}>Frequently Asked Questions</h2>
          <p className="text-sm text-stone-600 mt-2 mb-6">
            Everything you need to know about online pre-booking, store pickup, custom themes, and eggless bakes in Neyveli &amp; Vadalur.
          </p>

          <div>
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{faq.q}</span>
                    <span className="text-stone-400 font-bold ml-2">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact & Store Column */}
        <div className="about-card" id="contact">
          <span className="section-tag">Visit or Call</span>
          <h2 style={{ marginTop: '12px' }}>We3 Cakes Shop</h2>
          <p style={{ marginTop: '10px' }}>
            Handcrafting fresh celebration moments with premium ingredients at Four Road, Neyveli / Vadalur. Pre-book online and pick up fresh at your selected time slot from our boutique bakery.
          </p>

          <div className="contact-list">
            {/* Phone */}
            <a href={BAKERY_INFO.phoneTel} className="group">
              <Phone className="w-4 h-4 text-[#7A123D] shrink-0" />
              <div>
                <span className="block font-semibold">☎ {BAKERY_INFO.phoneDisplay}</span>
                <small className="text-xs text-stone-500">Mobile &amp; WhatsApp Helpline</small>
              </div>
            </a>

            {/* Landline */}
            <a href={BAKERY_INFO.landlineTel} className="group">
              <Phone className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="block font-semibold">☎ {BAKERY_INFO.landline}</span>
                <small className="text-xs text-stone-500">Shop Telephone (Neyveli / Vadalur)</small>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`${BAKERY_INFO.whatsappBaseUrl}?text=Hello%20We3%20Cakes%20Shop!%20I%20would%20like%20to%20inquire%20about%20ordering%20a%20fresh%20cake.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1e7040' }}
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="block font-semibold">💬 WhatsApp Bakery Order</span>
                <small className="text-xs text-emerald-700">Chat with baker &middot; {BAKERY_INFO.whatsappDisplay}</small>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={BAKERY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#962fbf] hover:text-[#d62976]"
            >
              <Instagram className="w-4 h-4 text-[#d62976] shrink-0" />
              <div>
                <span className="block font-semibold flex items-center gap-1.5">
                  📸 Instagram: {BAKERY_INFO.instagramHandle}
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </span>
                <small className="text-xs text-stone-500">Follow for daily cake reels &amp; custom creations</small>
              </div>
            </a>

            {/* Address */}
            <a
              href={BAKERY_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7A123D]"
            >
              <MapPin className="w-4 h-4 text-[#7A123D] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 text-sm">{BAKERY_INFO.shortAddress}</strong>
                <span className="text-xs text-stone-600 block mt-0.5 leading-snug">
                  {BAKERY_INFO.fullAddress}
                </span>
              </div>
            </a>

            {/* Working Hours */}
            <div className="flex items-center gap-3 text-stone-800 text-sm">
              <Clock className="w-4 h-4 text-[#7A123D] shrink-0" />
              <div>
                <span className="block font-semibold">⏰ {BAKERY_INFO.openingHours}</span>
                <small className="text-xs text-emerald-700 font-medium">Closes 11:00 PM tonight</small>
              </div>
            </div>
          </div>

          {/* Quick directions link */}
          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
            <a
              href={BAKERY_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary inline-flex items-center gap-1.5 text-xs py-2 px-3"
            >
              <Navigation className="w-3.5 h-3.5 text-[#7A123D]" />
              <span>Get Directions to Store</span>
            </a>

            <a
              href={BAKERY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c13584] hover:underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Visit our Instagram</span>
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500">
            <strong className="block text-stone-700 mb-1">Bakery Serving Areas (Store Pickup at Four Road):</strong>
            {BAKERY_INFO.servingAreas.join(' · ')}
          </div>
        </div>
      </div>
    </section>
  );
};
