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

const filters = ["Filter by Style", "Filter by Material", "All Filters"];

const CategoryPage = () => {
  return (
    <div className="min-h-screen bg-[#F5EFEA]">
      {/* Header */}
      <section className="px-4 md:px-8 lg:px-16 pt-[80px] pb-0 text-center">
        <h1 className="font-serif text-[40px] md:text-[52px] font-normal text-[#2D2A26] tracking-tight antialiased mb-[24px]">
          All Categories
        </h1>
        <p className="text-[17px] md:text-[19px] text-[#6F6A64] leading-[1.6] antialiased mb-[32px]">
          Explore trending outfits you'll love
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter}
              className="flex items-center gap-2 px-5 py-[10px] rounded-full bg-[#EFE7DF] text-[#3A3733] text-[14px] font-medium cursor-pointer outline-none border border-black/5 transition-all duration-200 ease-out"
              style={{
                boxShadow: "0 6px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)";
              }}
              onMouseDown={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "inset 0 2px 6px rgba(0,0,0,0.12)";
              }}
              onMouseUp={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)";
              }}
            >
              {filter}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 4L6 8L10 4" stroke="#3A3733" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="px-4 md:px-8 lg:px-16 py-[60px]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] mt-[40px]">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group bg-white rounded-[20px] p-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] flex flex-col items-center hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-pointer"
            >
              {/* Image */}
              <div className="w-full h-[220px] overflow-hidden rounded-[12px]">
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
              <h3 className="font-serif text-[22px] font-medium text-[#2D2A26] mt-5 mb-3 text-center antialiased">
                {cat.title}
              </h3>

              {/* Button */}
              <Link to={`/category/${cat.slug}`}>
                <Button className="bg-[#B09886] hover:bg-[#9A8475] text-white rounded-full px-[20px] py-[10px] h-auto text-[14px] font-medium transition-all duration-250 ease-in-out hover:scale-[1.05] shadow-[0_4px_14px_rgba(0,0,0,0.06)] border-none mt-[12px]">
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
