"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import type { Product, ProductColorVariation } from "@/types/product";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { purchaseProduct } from "@/services/order.service";

interface ProductCardProps {
  product: Product;
  index: number;
}

const BG_COLORS = [
  "bg-[#9ADA2A]",
  "bg-[#9D333B]",
  "bg-[#840D91]",
  "bg-[#DB8CAE]",
];

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const bgColor = BG_COLORS[index % BG_COLORS.length];

  const [selectedColor, setSelectedColor] = useState<ProductColorVariation | null>(
    product.variation_colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    if (selectedColor?.sizes?.length) {
      setSelectedSize(selectedColor.sizes[0].size_id);
    }
  }, [selectedColor]);

  const { token } = useAuthStore();
  const router = useRouter();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handleBuyNow = async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const selectedSizeObj = selectedColor?.sizes.find(s => s.size_id === selectedSize);
    if (!selectedSizeObj) return;

    try {
      setIsPurchasing(true);


      const payload: any = {
        variation_product_id: selectedSizeObj?.variation_product_id
      };

      console.log("Placing order with payload:", payload);

      const res = await purchaseProduct(payload, token);
      console.log("Purchase Response:", res);

      const params = new URLSearchParams({
        orderId: res.order?.id || "N/A",
        name: product.name,
        price: (selectedSizeObj?.price || 0).toString(),
        mrp: product.mrp.toString(),
        image: currentImage || "",
        size: selectedSizeObj?.size_name || "N/A",
        color: selectedColor?.color_name || ""
      });

      router.push(`/order-success?${params.toString()}`);
    } catch (error: any) {
      console.error("Purchase failed", error);
      alert(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsPurchasing(false);
    }
  };

  const onHover = () => {
    if (!detailsRef.current) return;

    gsap.to(detailsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    if (!detailsRef.current) return;

    gsap.to(detailsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.in",
    });
  };

  const currentImage = selectedColor?.color_images?.[0] || product.product_images?.[0]?.product_image;

  return (
    <div
      ref={containerRef}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="bg-[#1A1A1A] rounded-sm overflow-hidden flex flex-col items-center pt-0 pb-10 px-6 relative w-full h-full"
    >
      <h1 className="absolute top-[35%] left-[-10%] text-[180px] font-black text-white/[0.03] pointer-events-none select-none italic font-sans leading-none">
        NIKE
      </h1>

      <div className="relative z-10 w-full h-[320px] flex items-center justify-center mt-4">
        <img
          key={currentImage}
          ref={imgRef}
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)] transition-all duration-300"
        />
      </div>

      <div className="relative z-10 text-center w-full mt-4">
        <h3 className="text-white font-extrabold text-2xl tracking-wide uppercase">
          {product.name}
        </h3>
      </div>

      <div
        ref={detailsRef}
        className="relative z-10 w-full flex flex-col items-center gap-6 mt-6 opacity-0 translate-y-5"
      >
        <div className="flex items-center gap-4">
          <span className="text-white text-xs font-bold tracking-widest uppercase">Size:</span>
          <div className="flex gap-2">
            {selectedColor?.sizes?.map((size) => (
              <button
                key={size.size_id}
                onClick={() => setSelectedSize(size.size_id)}
                className={`w-10 h-10 flex items-center justify-center text-sm font-bold transition-all
                  ${selectedSize === size.size_id
                    ? "bg-[#331111] text-white"
                    : "bg-white text-black hover:bg-gray-200"}`}
              >
                {size.size_name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white text-xs font-bold tracking-widest uppercase">Color:</span>
          <div className="flex gap-3">
            {product.variation_colors?.map((variant) => (
              <button
                key={variant.color_id}
                type="button"
                onClick={() => {
                  console.log("Selecting color:", variant.color_name);
                  setSelectedColor(variant);
                }}
                className={`w-6 h-6 rounded-full border-2 transition-all p-0.5
                  ${selectedColor?.color_id === variant.color_id ? "border-white scale-110" : "border-transparent hover:scale-105"}`}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: variant.color_name.toLowerCase() }}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          disabled={isPurchasing}
          className="bg-white text-black font-extrabold px-12 py-3 rounded-md uppercase tracking-tight hover:bg-gray-200 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPurchasing ? "Placing Order..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
};
