import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import catDresses from "@/assets/cat-summer-dresses.jpg";
import catSandals from "@/assets/cat-sandals.jpg";
import catShorts from "@/assets/cat-shorts.jpg";
import catBags from "@/assets/cat-bags.jpg";
import { Button } from "@/components/ui/button";

const categories = [
  { title: "Summer Dresses", slug: "summer-dresses", image: catDresses, cta: "Explore" },
  { title: "Trendy Sandals", slug: "trendy-sandals", image: catSandals, cta: "Explore" },
  { title: "Casual Shorts", slug: "casual-shorts", image: catShorts, cta: "Explore" },
  { title: "Chic Bags", slug: "chic-bags", image: catBags, cta: "Explore" },
];

const SORT_OPTIONS = [
  { label: "Trending", value: "trending" },
  { label: "New", value: "new" },
  { label: "A–Z", value: "az" },
];

const filterBtnClass =
  "flex flex-shrink-0 items-center justify-center gap-2 px-[18px] py-[10px] min-h-[44px] rounded-full bg-[#EFE7DF] text-[#3A3733] text-[14px] font-medium cursor-pointer outline-none border border-black/5 transition-all duration-200 ease-out";

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

const chevronDown = (isOpen: boolean) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CategoryPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("");
  
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const sortBtnRef = useRef<HTMLButtonElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      filterPanelRef.current && !filterPanelRef.current.contains(e.target as Node) &&
      filterBtnRef.current && !filterBtnRef.current.contains(e.target as Node)
    ) {
      setIsFilterOpen(false);
    }
    if (
      sortRef.current && !sortRef.current.contains(e.target as Node) &&
      sortBtnRef.current && !sortBtnRef.current.contains(e.target as Node)
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

  return (
    <div className="min-h-screen bg-[#F5EFEA]">
      {/* Header */}
      <section className="px-4 md:px-8 lg:px-16 pt-[48px] md:pt-[80px] pb-0">
        <div className="text-center">
          <h1 className="font-serif text-[32px] md:text-[52px] font-normal text-[#2D2A26] tracking-tight antialiased mb-[12px] md:mb-[16px]">
            All Categories
          </h1>
          <p className="text-[15px] md:text-[19px] text-[#6F6A64] leading-[1.6] antialiased mb-0">
            Explore trending outfits you'll love
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-nowrap items-center justify-between gap-[12px] w-full max-w-6xl mx-auto mt-[24px] mb-[32px] md:mb-[40px]">
          
          {/* All Filters Button */}
          <div className="relative flex-shrink-0">
            <button
              ref={filterBtnRef}
              className={`${filterBtnClass} w-auto ${isFilterOpen ? "bg-[#B09886] text-white border-transparent" : ""}`}
              style={isFilterOpen ? { boxShadow: "0 6px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)" } : filterBtnStyle}
              onClick={() => setIsFilterOpen((v) => !v)}
              onMouseEnter={e => { if (!isFilterOpen) Object.assign(e.currentTarget.style, filterBtnHoverStyle); }}
              onMouseLeave={e => { if (!isFilterOpen) Object.assign(e.currentTarget.style, isFilterOpen ? {} : filterBtnStyle); }}
              onMouseDown={e => Object.assign(e.currentTarget.style, filterBtnActiveStyle)}
              onMouseUp={e => Object.assign(e.currentTarget.style, filterBtnHoverStyle)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              All Filters
            </button>

            {/* Dummy Filter Panel */}
            <div
              ref={filterPanelRef}
              className="absolute left-0 top-full z-50 origin-top bg-white rounded-[16px] overflow-hidden"
              style={{
                transform: isFilterOpen ? "translateY(0)" : "translateY(-10px)",
                opacity: isFilterOpen ? 1 : 0,
                pointerEvents: isFilterOpen ? "auto" : "none",
                transition: "opacity 0.22s ease, transform 0.22s ease",
                marginTop: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                minWidth: "220px",
                padding: "20px"
              }}
            >
              <p className="text-[14px] text-[#2D2A26] font-medium mb-2">Filters</p>
              <p className="text-[13px] text-[#6F6A64]">Advanced filtering options will appear here.</p>
            </div>
          </div>

          {/* Sort Button */}
          <div className="relative flex-shrink-0">
            <button
              ref={sortBtnRef}
              className={`${filterBtnClass} w-auto ${isSortOpen ? "bg-[#B09886] text-white border-transparent" : ""}`}
              style={isSortOpen ? { boxShadow: "0 6px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)" } : filterBtnStyle}
              onClick={() => setIsSortOpen((v) => !v)}
              onMouseEnter={e => { if (!isSortOpen) Object.assign(e.currentTarget.style, filterBtnHoverStyle); }}
              onMouseLeave={e => { if (!isSortOpen) Object.assign(e.currentTarget.style, isSortOpen ? {} : filterBtnStyle); }}
              onMouseDown={e => Object.assign(e.currentTarget.style, filterBtnActiveStyle)}
              onMouseUp={e => Object.assign(e.currentTarget.style, filterBtnHoverStyle)}
            >
              {sortValue ? SORT_OPTIONS.find(o => o.value === sortValue)?.label : "Sort"}
              {chevronDown(isSortOpen)}
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
                  className={`text-left px-5 py-[10px] text-[14px] hover:bg-[#F5EFEA] transition-colors ${sortValue === "" ? "font-bold text-[#2D2A26]" : "text-[#6F6A64]"}`}
                  onClick={() => { setSortValue(""); setIsSortOpen(false); }}
                >
                  Sort
                </button>
                {SORT_OPTIONS.map(({ label, value }) => (
                  <button
                    key={value}
                    className={`text-left px-5 py-[10px] text-[14px] hover:bg-[#F5EFEA] transition-colors ${sortValue === value ? "font-bold text-[#2D2A26]" : "text-[#6F6A64]"}`}
                    onClick={() => { setSortValue(value); setIsSortOpen(false); }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="px-4 md:px-8 lg:px-16 pb-[48px] md:pb-[60px]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[32px]">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group bg-white rounded-[20px] p-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] flex flex-col items-center hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-pointer"
            >
              {/* Image */}
              <div className="w-full h-[200px] md:h-[220px] overflow-hidden rounded-[12px]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                  width={800}
                  height={600}
                />
              </div>

              {/* Title */}
              <h3 className="font-serif text-[20px] md:text-[22px] font-medium text-[#2D2A26] mt-4 md:mt-5 mb-3 text-center antialiased">
                {cat.title}
              </h3>

              {/* Button */}
              <Link to={`/category/${cat.slug}`} className="w-full sm:w-auto">
                <Button className="bg-[#B09886] hover:bg-[#9A8475] text-white rounded-full w-full sm:w-auto px-[20px] min-h-[44px] py-[10px] h-auto text-[14px] font-medium transition-all duration-250 ease-in-out hover:scale-[1.05] shadow-[0_4px_14px_rgba(0,0,0,0.06)] border-none mt-[8px] md:mt-[12px]">
                  {cat.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#F5EFEA] text-center text-[#6F6A64] text-[15px] border-t border-[#EAE3DE] mt-4">
        © 2026 AesthivaWear. All rights reserved.
      </footer>
    </div>
  );
};

export default CategoryPage;
