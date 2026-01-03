import React from "react";
import Image from "next/image";
import Link from "next/link";

interface OrderSuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
    name?: string;
    price?: string;
    mrp?: string;
    image?: string;
    size?: string;
    color?: string;
  }>;
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const params = await searchParams;

  const name = params.name;
  const price = params.price;
  const mrp = params.mrp;
  const image = params.image;
  const size = params.size;
  const color = params.color;

  const now = new Date();
  const datePart = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timePart = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const currentDate = `${timePart},${datePart} `;

  return (
    <div className="min-h-[85vh] bg-[#161616] flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-[548px] rounded-sm p-12 flex flex-col items-center border relative overflow-hidden">

        <div className="mb-2 relative z-10">
          <Image
            src="/images/logo.svg"
            alt="Nike Logo"
            width={70}
            height={24}
            className="brightness-0 invert"
          />
        </div>

        <h1 className="text-white text-4xl font-black capitalize tracking-tight mb-2 relative z-10">
          Successfully Ordered!
        </h1>
        <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">
          Order ID: {params.orderId || "Processing"}
        </p>
        <p className="text-gray-500 text-sm font-bold tracking-[0.2em] mb-9 relative z-10 text-center">
          {currentDate}
        </p>

        <div className="w-full bg-[#202020] rounded-[12px] p-5 flex items-center gap-6 border border-none/5 relative z-10">
          <div className="w-20 h-20 bg-[#2A2A2A] rounded-sm flex items-center justify-center overflow-hidden flex-shrink-0">
            {image ? (
              <img
                src={image}
                alt={name || "Product"}
                className="w-[85%] h-[85%] object-contain drop-shadow-lg"
              />
            ) : (
              <div className="w-full h-full bg-[#333] animate-pulse" />
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base leading-tight truncate mb-1">
              {name || "Nike Product"}
            </h3>
            <p className="font-inter font-semibold text-[15px] leading-[15px] tracking-[-0.04em] text-white/40 whitespace-nowrap">
              UK {size}, {color}
            </p>
          </div>

          {/* Price */}
          <div className="text-right flex-shrink-0 flex flex-row items-center gap-2">
            <span className="text-white font-semibold text-[16.57px] block leading-none">
              ₹{price}
            </span>
            {mrp && (
              <span className="block font-inter font-normal text-[13.46px] leading-[18.64px] tracking-normal line-through text-white/50 mt-1">
                ₹{mrp}
              </span>
            )}
          </div>
        </div>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="mt-12 bg-white text-black px-10 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors relative z-10"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}