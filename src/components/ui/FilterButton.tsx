import React, { ButtonHTMLAttributes, forwardRef } from "react";

export const filterBtnClass =
  "flex flex-shrink-0 items-center justify-center gap-2 px-[18px] py-[10px] min-h-[44px] rounded-full bg-[#EFE7DF] text-[#3A3733] text-[14px] font-medium cursor-pointer outline-none border border-black/5 transition-all duration-200 ease-out";

export const filterBtnStyle = {
  boxShadow: "0 6px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
} as const;

export const filterBtnHoverStyle = {
  transform: "translateY(-2px)",
  boxShadow: "0 10px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
} as const;

export const filterBtnActiveStyle = {
  transform: "translateY(0)",
  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.12)",
} as const;

export interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ children, isActive = false, className = "", style = {}, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onClick, ...props }, ref) => {
    // Determine conditional classes and styles
    const activeClass = isActive ? "bg-[#B09886] !text-white border-transparent" : "";
    const activeStyle = isActive 
      ? { boxShadow: "0 6px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)" } 
      : filterBtnStyle;

    return (
      <button
        ref={ref}
        className={`${filterBtnClass} ${activeClass} ${className}`.trim()}
        style={{ ...activeStyle, ...style }}
        onClick={onClick}
        onMouseEnter={(e) => {
          if (!isActive) Object.assign(e.currentTarget.style, filterBtnHoverStyle);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (!isActive) Object.assign(e.currentTarget.style, filterBtnStyle);
          onMouseLeave?.(e);
        }}
        onMouseDown={(e) => {
          Object.assign(e.currentTarget.style, filterBtnActiveStyle);
          onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          Object.assign(e.currentTarget.style, filterBtnHoverStyle);
          onMouseUp?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FilterButton.displayName = "FilterButton";
export default FilterButton;
