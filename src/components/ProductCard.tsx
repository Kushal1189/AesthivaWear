import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  buttonLabel?: string;
  badge?: string;
  isFeatured?: boolean;
  isTopPick?: boolean;
  isLifestyle?: boolean;
}

const ProductCard = ({
  image,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  buttonLabel = "View Details",
  badge,
  isFeatured,
  isTopPick,
  isLifestyle,
}: ProductCardProps) => {
  return (
    <div 
      className={`group bg-white rounded-[20px] overflow-hidden flex flex-col md:hover:!opacity-100 md:hover:!scale-[1.02] md:hover:-translate-y-[8px] transition-all duration-300 ease-out cursor-pointer ${
        isFeatured 
          ? "shadow-[0_15px_40px_rgba(0,0,0,0.07)] md:hover:shadow-[0_30px_70px_rgba(0,0,0,0.14)]" 
          : "shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
      } ${
        isTopPick ? "h-full justify-between p-[20px]" : "p-[16px]"
      }`}
    >
      <div className={`w-full overflow-hidden rounded-[12px] relative ${isTopPick ? "h-56 md:h-[240px] mb-0" : isFeatured ? "h-52 md:h-[320px] mb-4" : "h-[220px] md:h-52 mb-4"}`}>
        {badge && (
          <div className={`absolute backdrop-blur-sm px-[10px] py-[6px] rounded-full text-[12px] font-medium text-[#2D2A26] shadow-sm bg-white/90 ${isTopPick ? "top-[12px] left-[12px] z-[2]" : "top-3 left-3 z-20"}`}>
            {badge}
          </div>
        )}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-[400ms] ease-out md:group-hover:scale-[1.06] md:group-hover:brightness-105 ${isLifestyle ? "brightness-105 sepia-[.05]" : ""}`}
          width={512}
          height={640}
        />
        {/* Depth Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
      </div>
      <div className={`flex flex-col relative z-20 ${isTopPick ? "gap-[10px] mt-[12px] flex-1" : "gap-1 flex-1"}`}>
        <h4 className="font-sans text-[15px] md:text-[18px] font-medium text-[#2D2A26] leading-tight mb-0">{name}</h4>
        <div className="flex items-center gap-2 mb-1 md:mb-2">
          <span className="font-sans text-[15px] md:text-[16px] font-bold text-[#2D2A26]">${price}</span>
          {originalPrice && (
            <>
              <Star className="w-3.5 h-3.5 fill-[#B09886] text-[#B09886]" />
              <span className="text-[13px] text-[#A69E96] line-through">${originalPrice}</span>
            </>
          )}
        </div>
        {rating !== undefined && <StarRating rating={rating} count={reviewCount} />}
        <Button className={`bg-[#B09886] text-white rounded-full px-5 min-h-[44px] py-3 h-auto text-[14px] font-medium shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] border-none opacity-90 translate-y-[2px] md:group-hover:opacity-100 md:group-hover:translate-y-0 md:hover:scale-[1.05] md:hover:bg-[#9A8475] md:hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] transition-all duration-[250ms] ease-out w-full text-center ${isTopPick ? "mt-auto" : "mt-2 md:mt-3"}`}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
