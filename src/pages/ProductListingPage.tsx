import { useParams } from "react-router-dom";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ProductCard from "@/components/ProductCard";

import prodLinenSet from "@/assets/prod-linen-set.jpg";
import prodFloralMaxi from "@/assets/prod-floral-maxi.jpg";
import prodStrawTote from "@/assets/prod-straw-tote.jpg";
import prodGoldHoops from "@/assets/prod-gold-hoops.jpg";
import prodRibbedCrop from "@/assets/prod-ribbed-crop.jpg";
import prodCanvasTote from "@/assets/prod-canvas-tote.jpg";
import catDresses from "@/assets/cat-summer-dresses.jpg";
import catSandals from "@/assets/cat-sandals.jpg";
import catShorts from "@/assets/cat-shorts.jpg";
import catBags from "@/assets/cat-bags.jpg";

// ─── Static mock data keyed by slug ──────────────────────────────────────────
const productData: Record<
  string,
  { image: string; name: string; price: number; rating: number; reviewCount: number }[]
> = {
  "summer-dresses": [
    { image: catDresses, name: "Breezy Linen Maxi", price: 64, rating: 5, reviewCount: 28 },
    { image: prodFloralMaxi, name: "Glow Floral Maxi", price: 55, rating: 4, reviewCount: 50 },
    { image: prodLinenSet, name: "The Viral Linen Set", price: 68, rating: 5, reviewCount: 10 },
    { image: catDresses, name: "Garden Party Sundress", price: 48, rating: 4, reviewCount: 22 },
    { image: prodFloralMaxi, name: "Boho Wrap Midi Dress", price: 59, rating: 5, reviewCount: 15 },
    { image: prodLinenSet, name: "Coastal Linen Shift", price: 72, rating: 4, reviewCount: 33 },
  ],
  "trendy-sandals": [
    { image: catSandals, name: "Braided Leather Sandal", price: 38, rating: 5, reviewCount: 19 },
    { image: prodStrawTote, name: "Espadrille Flatform", price: 45, rating: 4, reviewCount: 41 },
    { image: catSandals, name: "Minimalist Strappy Heel", price: 52, rating: 5, reviewCount: 12 },
    { image: prodStrawTote, name: "Ankle-Wrap Sandal", price: 41, rating: 4, reviewCount: 27 },
    { image: catSandals, name: "Cork Wedge Sandal", price: 49, rating: 5, reviewCount: 8 },
    { image: prodStrawTote, name: "Slide Sandal", price: 29, rating: 4, reviewCount: 63 },
  ],
  "casual-shorts": [
    { image: catShorts, name: "High-Waist Denim Shorts", price: 34, rating: 5, reviewCount: 45 },
    { image: prodRibbedCrop, name: "Linen Relaxed Shorts", price: 28, rating: 4, reviewCount: 30 },
    { image: catShorts, name: "Flowy Satin Shorts", price: 36, rating: 5, reviewCount: 17 },
    { image: prodRibbedCrop, name: "Ribbed Knit Bike Short", price: 22, rating: 4, reviewCount: 52 },
    { image: catShorts, name: "Paperbag Waist Short", price: 31, rating: 5, reviewCount: 11 },
    { image: prodRibbedCrop, name: "Terry Cloth Short", price: 26, rating: 4, reviewCount: 38 },
  ],
  "chic-bags": [
    { image: catBags, name: "Rattan Circle Bag", price: 42, rating: 5, reviewCount: 22 },
    { image: prodCanvasTote, name: "Canvas Tote Bag", price: 24, rating: 4, reviewCount: 74 },
    { image: prodStrawTote, name: "Classic Straw Tote", price: 38, rating: 5, reviewCount: 10 },
    { image: catBags, name: "Crescent Shoulder Bag", price: 55, rating: 5, reviewCount: 18 },
    { image: prodCanvasTote, name: "Mini Quilted Crossbody", price: 48, rating: 4, reviewCount: 29 },
    { image: prodStrawTote, name: "Raffia Bucket Bag", price: 46, rating: 5, reviewCount: 13 },
  ],
};

// ─── Helper: slug → display title ────────────────────────────────────────────
const slugToTitle = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// ─── Filter button shared styles ──────────────────────────────────────────────
const filterBtnStyle = {
  boxShadow: "0 6px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
} as const;

const filterBtnHoverStyle = {
  transform: "translateY(-2px)",
  boxShadow: "0 10px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
} as const;

const filterBtnActiveStyle = {
  transform: "translateY(0)",
  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.12)",
} as const;

const filterBtnClass =
  "flex items-center gap-2 px-5 py-[10px] rounded-full bg-[#EFE7DF] text-[#3A3733] text-[14px] font-medium cursor-pointer outline-none border border-black/5 transition-all duration-200 ease-out";

const chevronDown = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 4L6 8L10 4" stroke="#3A3733" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Filter option types ───────────────────────────────────────────────────────
type FilterState = { price: string };
const initialFilters: FilterState = { price: "" };
const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "priceLow" },
  { label: "Price: High to Low", value: "priceHigh" },
  { label: "Trending",           value: "trending" },
  { label: "New Arrivals",       value: "new" },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────
const ProductListingPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const slug = categoryName ?? "";
  const title = slugToTitle(slug);
  const rawProducts = productData[slug] ?? [];

  // ── Filter panel state ──────────────────────────────────────────────────────
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pendingFilters, setPendingFilters] = useState<FilterState>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilters);
  const [activeFilterPill, setActiveFilterPill] = useState<string | null>(null);
  const [sortValue, setSortValue] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const allFiltersRef = useRef<HTMLButtonElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const sortBtnRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(e.target as Node) &&
      allFiltersRef.current &&
      !allFiltersRef.current.contains(e.target as Node)
    ) {
      setIsFilterOpen(false);
    }
    if (
      sortRef.current &&
      !sortRef.current.contains(e.target as Node) &&
      sortBtnRef.current &&
      !sortBtnRef.current.contains(e.target as Node)
    ) {
      setIsSortOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isFilterOpen || isSortOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isFilterOpen, isSortOpen, handleOutsideClick]);

  // ── Apply filters + sorting to products ────────────────────────────────────
  const displayedProducts = (() => {
    let list = [...rawProducts];

    // Price filter
    if (appliedFilters.price === "under25") list = list.filter((p) => p.price < 25);
    else if (appliedFilters.price === "25to50") list = list.filter((p) => p.price >= 25 && p.price <= 50);
    else if (appliedFilters.price === "50plus") list = list.filter((p) => p.price > 50);

    // Sort (from dropdown)
    if (sortValue === "priceLow") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortValue === "priceHigh") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortValue === "trending") list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    else if (sortValue === "new") list = [...list].reverse();

    return list;
  })();

  const handleApply = () => {
    setAppliedFilters(pendingFilters);
    setIsFilterOpen(false);
  };

  const handleClear = () => {
    setPendingFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setIsFilterOpen(false);
  };

  const activeFilterCount = Object.values(appliedFilters).filter(Boolean).length;

  // Filter pill labels (Style/Material/Size/Color are UI placeholders — All Filters handles full panel)
  const FILTER_PILLS = ["Style", "Material", "Size", "Color"] as const;

  return (
    <div className="min-h-screen bg-[#F5EFEA]">

      {/* ── Shared page container ── */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-[48px] md:pt-[72px] pb-[60px] md:pb-[80px]">

        {/* ── Title & Subtitle ── */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="font-serif text-[30px] md:text-[52px] font-normal text-[#2D2A26] tracking-tight antialiased mb-[8px] md:mb-[12px]">
            {title}
          </h1>
          <p className="text-[14px] md:text-[19px] text-[#6F6A64] leading-[1.6] antialiased">
            Explore handpicked styles for you
          </p>
        </div>

        {/* ── Filter Bar ── */}
        <div className="relative mb-6 md:mb-8">
          {/* Row: Filters left | Sort right */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} className="justify-between">

            {/* ── LEFT: Filter Pills — horizontally scrollable on mobile ── */}
            <div
              className="no-scrollbar flex items-center gap-3 overflow-x-auto pb-1"
              style={({ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties)}
            >

              {/* Style / Material / Size / Color pills */}
              {FILTER_PILLS.map((pill) => (
                <button
                  key={pill}
                  className={`${filterBtnClass} flex-shrink-0 hidden md:flex ${
                    activeFilterPill === pill ? "bg-[#B09886] text-white border-transparent" : ""
                  }`}
                  style={activeFilterPill === pill
                    ? { boxShadow: "0 6px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)" }
                    : filterBtnStyle
                  }
                  onClick={() => setActiveFilterPill((v) => (v === pill ? null : pill))}
                  onMouseEnter={e => { if (activeFilterPill !== pill) Object.assign((e.currentTarget as HTMLButtonElement).style, filterBtnHoverStyle); }}
                  onMouseLeave={e => { if (activeFilterPill !== pill) Object.assign((e.currentTarget as HTMLButtonElement).style, filterBtnStyle); }}
                  onMouseDown={e => Object.assign((e.currentTarget as HTMLButtonElement).style, filterBtnActiveStyle)}
                  onMouseUp={e => Object.assign((e.currentTarget as HTMLButtonElement).style, filterBtnHoverStyle)}
                >
                  {pill}
                  {chevronDown}
                </button>
              ))}

              {/* ── "All Filters" button — opens panel ── */}
              <button
                ref={allFiltersRef}
                id="all-filters-btn"
                className={`${filterBtnClass} flex-shrink-0 ${
                  isFilterOpen ? "bg-[#B09886] text-white border-transparent" : ""
                }`}
                style={isFilterOpen
                  ? { boxShadow: "0 6px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)" }
                  : filterBtnStyle
                }
                onClick={() => setIsFilterOpen((v) => !v)}
                onMouseEnter={e => { if (!isFilterOpen) Object.assign((e.currentTarget as HTMLButtonElement).style, filterBtnHoverStyle); }}
                onMouseLeave={e => { if (!isFilterOpen) Object.assign((e.currentTarget as HTMLButtonElement).style, isFilterOpen ? {} : filterBtnStyle); }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                All Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 bg-white text-[#B09886] text-[11px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center leading-none">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* ── RIGHT: Sort Dropdown ── */}
            <div className="relative flex items-center flex-shrink-0">
              <button
                ref={sortBtnRef}
                className={`${filterBtnClass} flex-shrink-0 ${
                  isSortOpen ? "bg-[#B09886] text-white border-transparent" : ""
                }`}
                style={isSortOpen
                  ? { boxShadow: "0 6px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)", width: "auto" }
                  : { ...filterBtnStyle, width: "auto" }
                }
                onClick={() => setIsSortOpen((v) => !v)}
                onMouseEnter={e => { if (!isSortOpen) Object.assign((e.currentTarget as HTMLButtonElement).style, filterBtnHoverStyle); }}
                onMouseLeave={e => { if (!isSortOpen) Object.assign((e.currentTarget as HTMLButtonElement).style, isSortOpen ? {} : filterBtnStyle); }}
              >
                {sortValue ? SORT_OPTIONS.find(o => o.value === sortValue)?.label : "Sort by"}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ transform: isSortOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Sort Dropdown Menu */}
              <div
                ref={sortRef}
                className="absolute right-0 top-full z-50 origin-top bg-white rounded-[16px] overflow-hidden"
                style={{
                  transform: isSortOpen ? "translateY(0)" : "translateY(-10px)",
                  opacity: isSortOpen ? 1 : 0,
                  pointerEvents: isSortOpen ? "auto" : "none",
                  transition: "opacity 0.22s ease, transform 0.22s ease",
                  marginTop: "8px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  minWidth: "160px"
                }}
              >
                <div className="flex flex-col py-2">
                  <button
                    className={`text-left px-5 py-[10px] text-[14px] hover:bg-[#F5EFEA] transition-colors ${
                      sortValue === "" ? "font-bold text-[#2D2A26]" : "text-[#6F6A64]"
                    }`}
                    onClick={() => {
                      setSortValue("");
                      setIsSortOpen(false);
                    }}
                  >
                    Sort by
                  </button>
                  {SORT_OPTIONS.map(({ label, value }) => (
                    <button
                      key={value}
                      className={`text-left px-5 py-[10px] text-[14px] hover:bg-[#F5EFEA] transition-colors ${
                        sortValue === value ? "font-bold text-[#2D2A26]" : "text-[#6F6A64]"
                      }`}
                      onClick={() => {
                        setSortValue(value);
                        setIsSortOpen(false);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Filter Panel (anchored from left of filter bar) ── */}
          <div
            ref={panelRef}
            id="filter-panel"
            className="absolute left-0 z-50 w-full max-w-2xl origin-top"
            style={{
              transform: isFilterOpen ? "translateY(0)" : "translateY(-10px)",
              opacity: isFilterOpen ? 1 : 0,
              pointerEvents: isFilterOpen ? "auto" : "none",
              transition: "opacity 0.22s ease, transform 0.22s ease",
              marginTop: "12px",
            }}
          >
            <div
              className="bg-white rounded-[16px] p-5 text-left"
              style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* A. Price Filter */}
                <div>
                  <p className="text-[13px] font-semibold text-[#2D2A26] uppercase tracking-widest mb-3">Price</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Under $25", value: "under25" },
                      { label: "$25 – $50", value: "25to50" },
                      { label: "$50+",      value: "50plus" },
                    ].map(({ label, value }) => (
                      <label key={value} className="flex items-center gap-3 cursor-pointer group">
                        <span className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-150 flex-shrink-0 ${pendingFilters.price === value ? "border-[#B09886] bg-[#B09886]" : "border-[#D4C8BF] group-hover:border-[#B09886]"}`}>
                          {pendingFilters.price === value && (
                            <span className="w-[7px] h-[7px] rounded-full bg-white block" />
                          )}
                        </span>
                        <input
                          type="radio"
                          name="price"
                          value={value}
                          checked={pendingFilters.price === value}
                          onChange={() => setPendingFilters((f) => ({ ...f, price: value }))}
                          className="sr-only"
                        />
                        <span className="text-[14px] text-[#3A3733]">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* B. Size Filter */}
                <div>
                  <p className="text-[13px] font-semibold text-[#2D2A26] uppercase tracking-widest mb-3">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {["XS", "S", "M", "L", "XL", "One size"].map((size) => (
                      <button
                        key={size}
                        className="px-4 py-[6px] rounded-full text-[13px] border border-[#D4C8BF] text-[#3A3733] hover:border-[#B09886] transition-colors duration-150 bg-transparent"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Panel footer ── */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#EAE3DE]">
                <button
                  onClick={handleClear}
                  className="text-[14px] text-[#6F6A64] hover:text-[#3A3733] transition-colors duration-150 underline underline-offset-2"
                >
                  Clear all
                </button>
                <button
                  onClick={handleApply}
                  className="bg-[#B09886] hover:bg-[#9A8475] text-white rounded-full px-[24px] py-[10px] text-[14px] font-medium transition-all duration-200 hover:scale-[1.03] shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Product Grid ── */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.name}
                {...product}
                buttonLabel="View Product"
                isFeatured={false}
                isTopPick={false}
              />
            ))}
          </div>
        ) : (
          <div className="mt-[60px] text-center text-[#6F6A64] text-[18px]">
            No products match your filters.
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="py-12 bg-[#F5EFEA] text-center text-[#6F6A64] text-[15px] border-t border-[#EAE3DE]">
        © 2026 AesthivaWear. All rights reserved.
      </footer>
    </div>
  );
};

export default ProductListingPage;
