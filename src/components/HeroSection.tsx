import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-[#F5EFEA]">
      {/* Background Image */}
      <img
        src={heroBg}
        alt="Silk fabric texture"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Gradient Overlay covering the image to blend it into the main page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-[#F5EFEA]" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-5 pt-[60px] pb-[40px] md:pt-0 md:pb-0 md:px-4">
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[60px] lg:text-[72px] font-normal text-[#2D2A26] tracking-tighter mb-3 md:mb-4 antialiased leading-[1.1]">
          AesthivaWear
        </h1>
        <p className="text-[14px] sm:text-[16px] md:text-[20px] text-[#6F6A64] leading-[1.7] antialiased mb-7 md:mb-10 font-normal max-w-[280px] sm:max-w-none">
          Trendy Outfits for Women ✨<br />
          Shop Viral Looks You'll Love 💗
        </p>
        <Button className="bg-[#B09886] hover:bg-[#9E8675] hover:scale-[1.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] text-white rounded-full w-full max-w-[260px] sm:w-auto px-[32px] py-[14px] md:py-[28px] min-h-[44px] h-auto text-[15px] md:text-[18px] font-medium transition-all duration-300 ease-in-out border-none shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
          Shop Latest Outfits
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
