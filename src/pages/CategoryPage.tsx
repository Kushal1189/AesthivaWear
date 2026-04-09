import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import catDresses from "@/assets/cat-summer-dresses.jpg";
import catSandals from "@/assets/cat-sandals.jpg";
import catShorts from "@/assets/cat-shorts.jpg";
import catBags from "@/assets/cat-bags.jpg";
import { Button } from "@/components/ui/button";
import FilterButton from "@/components/ui/FilterButton";

const FILTER_SECTIONS = [
  { id: "category", title: "Category", options: ["Summer Dresses", "Sandals", "Shorts", "Bags"] },
  { id: "price", title: "Price", options: ["Under $50", "$50 - $100", "Over $100"] },
  { id: "trending", title: "Trending", options: ["Y2K", "Minimalist", "Boho"] },
  { id: "occasion", title: "Occasion", options: ["Casual", "Party", "Vacation"] }
];
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

const chevronDown = (isOpen: boolean) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CategoryPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const sortBtnRef = useRef<HTMLButtonElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (option: string) => {
    setActiveFilters(prev => 
      prev.includes(option) ? prev.filter(f => f !== option) : [...prev, option]
    );
  };

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      filterPanelRef.current && !filterPanelRef.current.contains(e.target as Node) &&
      filterBtnRef.current && !filterBtnRef.current.contains(e.target as Node) &&
      mobilePanelRef.current && !mobilePanelRef.current.contains(e.target as Node)
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

  useEffect(() => {
    if (isFilterOpen && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isFilterOpen]);

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
        <div className="flex items-center justify-between gap-[12px] w-full max-w-6xl mx-auto mt-[24px] mb-[32px] md:mb-[40px]">

          {/* Left Side: Quick Filters + All Filters */}
          <div className="flex items-center gap-[12px]">
            
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-[12px]">
              {["Category", "Trending", "New Arrivals", "Price", "Occasion"].map(filter => (
                <FilterButton key={filter} className="w-auto">
                  {filter}
                  {chevronDown(false)}
                </FilterButton>
              ))}
            </div>

            {/* All Filters Button */}
            <div className="relative flex-shrink-0">
              <FilterButton
                ref={filterBtnRef}
                className="w-auto"
                isActive={isFilterOpen}
                onClick={() => setIsFilterOpen((v) => !v)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                All Filters
              </FilterButton>

              {/* Desktop Filter Dropdown Panel */}
              <div
                ref={filterPanelRef}
                className="absolute left-0 top-full z-50 origin-top bg-white rounded-[16px] overflow-hidden hidden md:block"
                style={{
                  transform: isFilterOpen ? "translateY(0)" : "translateY(-10px)",
                  opacity: isFilterOpen ? 1 : 0,
                  pointerEvents: isFilterOpen ? "auto" : "none",
                  transition: "opacity 0.22s ease, transform 0.22s ease",
                  marginTop: "8px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  minWidth: "260px",
                  maxHeight: "60vh",
                  overflowY: "auto"
                }}
              >
                <div className="flex flex-col py-3 px-5">
                  {FILTER_SECTIONS.map(section => (
                    <div key={section.id} className="mb-5 last:mb-2">
                      <p className="text-[14px] text-[#2D2A26] font-bold mb-2">{section.title}</p>
                      <div className="flex flex-col gap-1">
                        {section.options.map(option => {
                          const isActive = activeFilters.includes(option);
                          return (
                            <button
                              key={option}
                              className={`text-left text-[14px] px-3 py-2 rounded-[8px] transition-colors flex items-center justify-between ${isActive ? "bg-[#EFE7DF] font-medium text-[#2D2A26]" : "hover:bg-[#F5EFEA] text-[#6F6A64]"}`}
                              onClick={() => toggleFilter(option)}
                            >
                              <span>{option}</span>
                              {isActive && (
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                  <path d="M1 7l3.5 4L13 2" />
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sort Button */}
          <div className="relative flex-shrink-0">
            <FilterButton
              ref={sortBtnRef}
              className="w-auto"
              isActive={isSortOpen}
              onClick={() => setIsSortOpen((v) => !v)}
            >
              {sortValue ? SORT_OPTIONS.find(o => o.value === sortValue)?.label : "Sort by"}
              {chevronDown(isSortOpen)}
            </FilterButton>

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
        <div className="max-w-6xl mx-auto">
          {/* Active Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 transition-all duration-300">
              {activeFilters.map(filter => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className="flex items-center gap-1.5 px-[12px] py-[6px] bg-[#EFE7DF] rounded-full text-[13px] text-[#2D2A26] font-medium transition-all hover:opacity-80 active:scale-[0.97]"
                  style={{ animation: "fadeIn 0.2s ease-out" }}
                >
                  {filter}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M1 9L9 1M1 1l8 8" />
                  </svg>
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[32px]">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#F5EFEA] text-center text-[#6F6A64] text-[15px] border-t border-[#EAE3DE] mt-4">
        © 2026 AesthivaWear. All rights reserved.
      </footer>
      {/* Mobile Bottom Sheet Filter Panel */}
      <div 
        className="fixed inset-0 z-[100] md:hidden flex justify-center items-end"
        style={{
          opacity: isFilterOpen ? 1 : 0,
          pointerEvents: isFilterOpen ? "auto" : "none",
          transition: "opacity 0.35s ease-out"
        }}
      >
        <div className="absolute inset-0 bg-black/30 w-full h-full" onClick={() => setIsFilterOpen(false)} />
        <div 
          ref={mobilePanelRef}
          className="relative w-full bg-white rounded-t-[20px] shadow-[0_-4px_24px_rgba(0,0,0,0.12)] flex flex-col"
          style={{
            transform: isFilterOpen ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.35s ease-out",
            height: "80vh"
          }}
        >
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex justify-between items-center shrink-0">
            <h2 className="font-serif text-[20px] font-medium text-[#2D2A26]">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-1 active:scale-95 transition-transform text-[#2D2A26]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 13L13 1M1 1l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 pb-[120px] no-scrollbar">
            {FILTER_SECTIONS.map(section => (
              <div key={section.id} className="mb-6 last:mb-0">
                <p className="text-[16px] text-[#2D2A26] font-bold mb-3">{section.title}</p>
                <div className="flex flex-wrap gap-2">
                  {section.options.map(option => {
                    const isActive = activeFilters.includes(option);
                    return (
                      <button
                        key={option}
                        className={`text-[14px] px-4 py-2 rounded-full transition-all active:scale-[0.97] border ${isActive ? "bg-[#2D2A26] text-white border-transparent" : "bg-white text-[#2D2A26] border-[#EAE3DE] hover:border-[#D4CFCB]"}`}
                        onClick={() => toggleFilter(option)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-5 flex flex-col gap-3 rounded-t-[20px]">
            <Button 
              className="w-full rounded-full min-h-[48px] bg-[#2D2A26] hover:bg-black text-white text-[15px] font-medium shadow-[0_4px_14px_rgba(0,0,0,0.08)] active:scale-[0.97] transition-all"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters {activeFilters.length > 0 ? `(${activeFilters.length})` : ""}
            </Button>
            <button 
              className="text-[14px] text-[#6F6A64] font-medium active:scale-[0.97] transition-transform hover:text-[#2D2A26]"
              onClick={() => setActiveFilters([])}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
