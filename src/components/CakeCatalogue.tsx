import React, { useState } from 'react';
import { Search, Heart, Eye, ShoppingBag, Star, Check, X } from 'lucide-react';
import { Cake } from '../types';
import { CATEGORIES } from '../data/cakes';

interface CakeCatalogueProps {
  cakes: Cake[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  wishlist: string[];
  onToggleWishlist: (cakeId: string) => void;
  onQuickView: (cake: Cake) => void;
  onAddToCart: (cake: Cake, weight: '500g' | '1kg' | '1.5kg' | '2kg') => void;
  onOpenCustomBuilder: () => void;
}

export const CakeCatalogue: React.FC<CakeCatalogueProps> = ({
  cakes,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  wishlist,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  onOpenCustomBuilder,
}) => {
  const [selectedWeights, setSelectedWeights] = useState<Record<string, '500g' | '1kg' | '1.5kg' | '2kg'>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [egglessOnly, setEgglessOnly] = useState<boolean>(false);

  const getSelectedWeight = (cakeId: string): '500g' | '1kg' | '1.5kg' | '2kg' => {
    return selectedWeights[cakeId] || '500g';
  };

  const handleWeightChange = (cakeId: string, weight: '500g' | '1kg' | '1.5kg' | '2kg') => {
    setSelectedWeights(prev => ({ ...prev, [cakeId]: weight }));
  };

  const handleAdd = (cake: Cake) => {
    const weight = getSelectedWeight(cake.id);
    onAddToCart(cake, weight);
    setJustAddedId(cake.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  // Filter cakes
  const filteredCakes = cakes.filter(cake => {
    const matchesCategory = selectedCategory === 'All Cakes' || cake.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || (
      cake.name.toLowerCase().includes(query) ||
      cake.category.toLowerCase().includes(query) ||
      cake.flavour.toLowerCase().includes(query) ||
      cake.description.toLowerCase().includes(query) ||
      cake.tags.some(t => t.toLowerCase().includes(query))
    );
    const matchesEggless = !egglessOnly || cake.isEgglessAvailable;
    return matchesCategory && matchesSearch && matchesEggless;
  });

  return (
    <section className="section" id="cakes">
      <div className="container">
        {/* Section Heading & Search */}
        <div className="section-head">
          <div>
            <span className="section-tag">Our Cakes</span>
            <h2>Choose from customer favourites</h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Freshly baked with pure butter, dairy cream, and high-grade cocoa in Indira Nagar, Neyveli.
            </p>
          </div>

          <div className="search-wrap">
            <input
              type="text"
              id="searchInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cakes, flavours..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="filters" id="filters">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-btn ${isActive ? 'active' : ''}`}
              >
                {cat}
              </button>
            );
          })}

          {/* Eggless filter */}
          <label className="filter-btn flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={egglessOnly}
              onChange={(e) => setEgglessOnly(e.target.checked)}
              className="accent-[#7A123D] w-3.5 h-3.5"
            />
            <span className="text-xs font-semibold">100% Eggless Only</span>
          </label>

          {(searchQuery || selectedCategory !== 'All Cakes' || egglessOnly) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Cakes');
                setEgglessOnly(false);
              }}
              className="text-xs font-semibold text-[#7A123D] hover:underline ml-auto cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredCakes.length > 0 ? (
          <div className="product-grid" id="productGrid">
            {filteredCakes.map((cake) => {
              const currentWeight = getSelectedWeight(cake.id);
              const currentPrice = cake.prices[currentWeight];
              const isWishlisted = wishlist.includes(cake.id);
              const isAdded = justAddedId === cake.id;

              return (
                <div key={cake.id} className="product-card">
                  {/* Media */}
                  <div className="product-media">
                    {cake.isBestseller && (
                      <span className="badge">Bestseller</span>
                    )}
                    {!cake.isBestseller && cake.isEgglessAvailable && (
                      <span className="badge badge-green">Pure Veg</span>
                    )}

                    <button
                      onClick={() => onToggleWishlist(cake.id)}
                      className={`wish ${isWishlisted ? 'active' : ''}`}
                      aria-label="Save to wishlist"
                      title={isWishlisted ? 'Remove from saved' : 'Save cake'}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#7A123D] text-[#7A123D]' : 'text-stone-700'}`} />
                    </button>

                    <img
                      src={cake.image}
                      alt={cake.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    <button
                      onClick={() => onQuickView(cake)}
                      className="quick-view"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Body */}
                  <div className="product-body">
                    <div>
                      <div className="meta">
                        <span className="font-semibold text-[#7A123D] text-xs uppercase tracking-wider">
                          {cake.category}
                        </span>
                        <span className="text-xs font-medium text-stone-500">
                          {currentWeight}
                        </span>
                      </div>

                      <h3
                        onClick={() => onQuickView(cake)}
                        className="cursor-pointer hover:text-[#7A123D] transition-colors"
                        title={cake.name}
                      >
                        {cake.name}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {cake.description}
                      </p>

                      <div className="rating">
                        <span className="font-bold text-amber-600 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          ★ {cake.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-stone-400">({cake.reviewsCount} reviews)</span>
                      </div>

                      {/* Weight Selector */}
                      <div className="weight-selector">
                        {(['500g', '1kg', '1.5kg', '2kg'] as const).map((wt) => (
                          <button
                            key={wt}
                            type="button"
                            onClick={() => handleWeightChange(cake.id, wt)}
                            className={currentWeight === wt ? 'active' : ''}
                          >
                            {wt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price and Cart */}
                    <div className="price-row">
                      <span className="price">₹{currentPrice}</span>

                      <button
                        onClick={() => handleAdd(cake)}
                        className="add-cart"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200 max-w-md mx-auto shadow-sm">
            <span className="text-4xl block mb-2">🧁</span>
            <h3 className="font-serif font-bold text-xl text-stone-900">No cakes found</h3>
            <p className="text-xs text-stone-500 mt-1">
              We couldn&apos;t find any cake matching &ldquo;{searchQuery}&rdquo;. Try another search term or create a custom cake!
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Cakes');
                  setEgglessOnly(false);
                }}
                className="btn btn-secondary text-xs"
                style={{ padding: '10px 18px' }}
              >
                Clear Filters
              </button>
              <button
                onClick={onOpenCustomBuilder}
                className="btn btn-primary text-xs"
                style={{ padding: '10px 18px' }}
              >
                Design Custom Cake
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
