import ProductCard from "@/components/ProductCard";

interface Product {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  buttonLabel?: string;
  badge?: string;
  isLifestyle?: boolean;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  isFeaturedLayout?: boolean;
  bgColor?: string;
}

const ProductSection = ({ title, products, isFeaturedLayout, bgColor = "#F5EFEA" }: ProductSectionProps) => {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-[40px] transition-colors duration-500" style={{ backgroundColor: bgColor }}>
      <div className="w-full max-w-6xl mx-auto flex flex-col">
        <h2 className="w-full text-center font-serif text-[32px] md:text-[36px] font-medium text-[#2D2A26] tracking-tight md:tracking-[-0.5px] mb-[40px] md:mb-[48px]">
          {title}
        </h2>
        <div 
          className="w-full gap-[28px] md:[&:has(:hover)>div]:opacity-70 md:[&:has(:hover)>div]:scale-[0.98] transition-all duration-300 grid grid-cols-1 md:grid-cols-3"
        >
          {products.map((product, index) => (
            <ProductCard 
              key={product.name} 
              {...product} 
              isFeatured={false}
              isTopPick={isFeaturedLayout}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
