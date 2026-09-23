import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/cakes';

export const Testimonials: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-tag">Loved in Neyveli</span>
            <h2>Real words from happy homes</h2>
            <p className="text-sm text-stone-600 mt-1">
              See how our cakes made birthdays, anniversaries, and reunions unforgettable.
            </p>
          </div>
        </div>

        <div className="testimonial-row">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p>“{t.comment}”</p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <strong className="block text-sm text-stone-900">— {t.name}</strong>
                  <small className="text-xs text-stone-500">{t.location}</small>
                </div>
                <span className="text-[11px] font-bold text-[#7A123D] bg-[#FFF1E5] px-2.5 py-1 rounded-full border border-stone-200/50">
                  {t.occasion}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
