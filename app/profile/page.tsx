import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { getUserOrders } from "@/services/order.service";

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access")?.value;

    let orderList = [];
    try {
        if (token) {
            const response = await getUserOrders(token);
            orderList = response?.orders || (Array.isArray(response) ? response : []);
        }
    } catch (error) {
        console.error("Failed to fetch orders:", error);
    }

    return (
        <div className="bg-[#161616] min-h-screen pt-20 pb-40 px-[60px]">
            <div className="max-w-[1320px] mx-auto flex flex-col items-center">
                <div className="w-full">
                    <h2 className="text-white text-[48px] font-bold mb-16 tracking-tight text-left">
                        My Orders
                    </h2>

                    <div className="flex flex-col gap-4">
                        {!token ? (
                            <div className="text-white/50 text-center py-20 bg-[#202020] rounded-[12px] border border-white/5">
                                <p className="text-lg">Please login to view your orders.</p>
                                <Link href="/login" className="mt-4 inline-block bg-white text-black px-8 py-3 rounded-full font-bold">
                                    Login
                                </Link>
                            </div>
                        ) : orderList.length > 0 ? (
                            orderList.map((order: any, index: number) => {
                                const date = new Date(order.created_at || new Date());
                                const day = date.getDate();
                                const suffix = (day % 10 === 1 && day !== 11) ? "st" : (day % 10 === 2 && day !== 12) ? "nd" : (day % 10 === 3 && day !== 13) ? "rd" : "th";
                                const timeStr = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
                                const monthStr = date.toLocaleDateString("en-US", { month: "short" });
                                const yearStr = date.getFullYear();
                                const formattedDate = `${timeStr}, ${day}${suffix} ${monthStr} ${yearStr}`;

                                return (
                                    <div key={order.id || order.order_id || index} className="w-full bg-[#202020] rounded-[16px] p-6 flex items-center gap-8 border border-white/[0.05] transition-all hover:bg-[#252525]">
                                        <div className="w-[120px] h-[120px] bg-[#2A2A2A] rounded-[12px] flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#9EFF00_0%,_transparent_70%)]" />
                                            <img
                                                src={order.product?.image || order.product_image || order.image || "/assets/product-placeholder.png"}
                                                alt={order.product?.name || order.product_name || "Nike Product"}
                                                className="w-[90%] h-[90%] object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] relative z-10"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col h-full justify-center">
                                                <h3 className="text-white font-bold text-[24px] leading-tight mb-2">
                                                    {order.product_name || order.product?.name || order.name || "Nike Product"}
                                                </h3>
                                                <p className="font-inter font-medium text-[16px] text-white/40 mb-6">
                                                    UK {order.size || "7"}, {order.color_name || order.color || order.product?.color || "N/A"}
                                                </p>
                                                <p className="text-white/40 text-[14px] font-medium tracking-wide">
                                                    {formattedDate}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right flex-shrink-0 flex items-center gap-4">
                                            <span className="text-white font-bold text-[22px]">
                                                ₹{order.price || order.sale_price || order.product?.price || order.total_amount || "0"}
                                            </span>
                                            {(order.mrp || order.product?.mrp || order.original_price) && (
                                                <span className="font-inter font-normal text-[16px] line-through text-white/30">
                                                    ₹{order.mrp || order.product?.mrp || order.original_price}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-white/50 text-center py-20 bg-[#202020] rounded-[12px] border border-white/5">
                                <p className="text-lg">No orders found.</p>
                            </div>
                        )}
                    </div>
                </div>

                <Link
                    href="/"
                    className="mt-16 bg-white text-black px-12 py-4 rounded-full text-[14px] font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
