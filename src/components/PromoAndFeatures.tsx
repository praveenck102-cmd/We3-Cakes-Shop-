import React from 'react';

interface PromoAndFeaturesProps {
  onOrderNow: () => void;
}

export const PromoAndFeatures: React.FC<PromoAndFeaturesProps> = ({ onOrderNow }) => {
  return (
    <>
      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-inner">
            <div>
              <span
                className="eyebrow"
                style={{
                  background: 'rgba(255, 255, 255, 0.18)',
                  color: '#fff',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                Same-Day Fresh Pre-Booking
              </span>
              <h3 style={{ marginTop: '12px' }}>Need a fresh cake in Neyveli or Vadalur today?</h3>
              <p>
                Pre-book online 2–3 hours in advance and pick up your freshly decorated cake from our shop at Four Road, 19 Thai Towers.
              </p>
            </div>
            <button
              onClick={onOrderNow}
              className="btn btn-light"
              id="promoOrderBtn"
              style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              Pre-Book for Today
            </button>
          </div>
        </div>
      </section>

      {/* Why We3 Features Section */}
      <section className="section" id="flavours">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-tag">Why We3 Cakes Shop</span>
              <h2>The artisan standard in Neyveli &amp; Vadalur</h2>
              <p className="text-sm text-stone-600 mt-1 max-w-xl">
                We believe a celebration is only as memorable as the cake at its center. That is why we refuse shortcuts with ingredients or craftsmanship.
              </p>
            </div>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <span className="feature-icon">✨</span>
              <h3>Freshly Baked to Order</h3>
              <p>
                Prepared fresh on the day of your event for your specific pickup slot. Never pre-frozen, preserving maximum fluffiness and moist texture.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">🍓</span>
              <h3>Pure Premium Ingredients</h3>
              <p>
                Rich cocoa, fresh dairy creams, real vanilla, and unadulterated fruit purees crafted with hygiene and precision.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">🛍️</span>
              <h3>Store Pickup at Four Road</h3>
              <p>
                Collect in person at 19 Thai Towers, Four Road. Insulated packaging guarantees your cream and ice cakes stay perfectly intact.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">👑</span>
              <h3>Bespoke Custom Designs</h3>
              <p>
                From playful kids cartoon themes to edible photo sheets and multi-tier wedding centrepieces made to your dream specs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
