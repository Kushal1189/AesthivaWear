import { Button } from "@/components/ui/button";
import catDresses from "@/assets/cat-summer-dresses.jpg";
import catSandals from "@/assets/cat-sandals.jpg";
import catShorts from "@/assets/cat-shorts.jpg";
import catBags from "@/assets/cat-bags.jpg";

const categories = [
  { title: "Summer Dresses", cta: "Shop Dresses", image: catDresses },
  { title: "Trendy Sandals", cta: "Shop Sandals", image: catSandals },
  { title: "Casual Shorts", cta: "Shop Shorts", image: catShorts },
  { title: "Chic Bags", cta: "Shop Bags", image: catBags },
];

const CategoryGrid = () => {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-[80px] bg-[#F5EFEA]">
      <div className="grid grid-cols-2 gap-[32px] max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="group bg-white rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col items-center pb-[24px] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] transition-all duration-300 ease-out"
          >
            <div className="w-full h-[280px] md:h-[300px] overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                width={800}
                height={600}
              />
            </div>
            <h3 className="font-serif text-[22px] md:text-[26px] font-medium text-[#2D2A26] mt-6 mb-4 antialiased">
              {cat.title}
            </h3>
            <Button className="bg-[#B09886] hover:bg-[#9E8675] hover:scale-[1.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] text-white rounded-full px-8 py-5 h-auto text-[14px] md:text-[16px] font-medium transition-all duration-300 shadow-none border-none">
              {cat.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
