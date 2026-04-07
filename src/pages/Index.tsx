import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductSection from "@/components/ProductSection";

import prodLinenSet from "@/assets/prod-linen-set.jpg";
import prodFloralMaxi from "@/assets/prod-floral-maxi.jpg";
import prodStrawTote from "@/assets/prod-straw-tote.jpg";
import prodGoldHoops from "@/assets/prod-gold-hoops.jpg";
import prodRibbedCrop from "@/assets/prod-ribbed-crop.jpg";
import prodCanvasTote from "@/assets/prod-canvas-tote.jpg";

const topPicks = [
  { image: prodLinenSet, name: "The Viral Linen Set", price: 68, originalPrice: 68, rating: 5, reviewCount: 10, isLifestyle: true },
  { image: prodFloralMaxi, name: "Glow Floral Maxi", price: 55, originalPrice: 55, rating: 4, reviewCount: 50 },
  { image: prodStrawTote, name: "Classic Straw Tote", price: 42, originalPrice: 42, rating: 5, reviewCount: 10 },
];

const bestSellers = [
  { image: prodLinenSet, name: "The Viral Linen Set", price: 68, rating: 5, reviewCount: 10 },
  { image: prodFloralMaxi, name: "Glow Floral Maxi", price: 55, rating: 4, reviewCount: 50 },
  { image: prodStrawTote, name: "Classic Straw Tote", price: 42, rating: 5, reviewCount: 10 },
];

const underTwentyFive = [
  { image: prodGoldHoops, name: "Simple Gold Hoops", price: 18, buttonLabel: "Add to Bag" },
  { image: prodRibbedCrop, name: "Basic Ribbed Crop", price: 22, buttonLabel: "Add to Bag" },
  { image: prodCanvasTote, name: "Canvas Tote Bag", price: 24, buttonLabel: "Add to Bag" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F5EFEA]">
      <HeroSection />
      <CategoryGrid />
      
      <ProductSection title="Top Picks" products={topPicks} isFeaturedLayout={true} bgColor="#F5EFEA" />
      <ProductSection title="Best Sellers" products={bestSellers} bgColor="#F8F3EE" />
      <ProductSection title="Under $25" products={underTwentyFive} bgColor="#F5EFEA" />

      <footer className="py-12 bg-[#F5EFEA] text-center text-[#6F6A64] text-[15px] border-t border-[#EAE3DE] mt-10">
        © 2026 AesthivaWear. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
