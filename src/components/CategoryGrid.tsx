import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import catDresses from "@/assets/cat-summer-dresses.jpg";
import catSandals from "@/assets/cat-sandals.jpg";
import catShorts from "@/assets/cat-shorts.jpg";
import catBags from "@/assets/cat-bags.jpg";

const categories = [
  { title: "Summer Dresses", slug: "summer-dresses", cta: "Shop Dresses", image: catDresses },
  { title: "Trendy Sandals", slug: "trendy-sandals", cta: "Shop Sandals", image: catSandals },
  { title: "Casual Shorts", slug: "casual-shorts", cta: "Shop Shorts", image: catShorts },
  { title: "Chic Bags",     slug: "chic-bags",     cta: "Shop Bags",    image: catBags },
];

const CategoryGrid = () => {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-[48px] md:py-[80px] bg-[#F5EFEA]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] md:gap-[32px] max-w-6xl mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            to={`/category/${cat.slug}`}
            className="group bg-white rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col items-center pb-[20px] md:pb-[24px] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] transition-all duration-300 ease-out"
          >
            <div className="w-full h-[200px] md:h-[300px] overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                width={800}
                height={600}
              />
            </div>
            <h3 className="font-serif text-[20px] md:text-[26px] font-medium text-[#2D2A26] mt-5 mb-4 antialiased text-center">
              {cat.title}
            </h3>
            <Button className="bg-[#B09886] hover:bg-[#9E8675] hover:scale-[1.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] text-white rounded-full w-[calc(100%-32px)] md:w-auto px-8 min-h-[44px] py-3 md:py-5 h-auto text-[14px] md:text-[16px] font-medium transition-all duration-300 shadow-none border-none">
              {cat.cta}
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8 md:mt-10 px-4 sm:px-0">
        <Link to="/categories" className="w-full sm:w-auto">
          <Button className="bg-[#B09886] hover:bg-[#9A8475] text-white rounded-full w-full sm:w-auto px-[28px] min-h-[44px] py-[12px] h-auto text-[15px] font-medium transition-all duration-250 ease-in-out hover:scale-[105%] shadow-[0_6px_20px_rgba(0,0,0,0.08)] border-none">
            View All Categories
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;
