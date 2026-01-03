export const dynamic = "force-dynamic";



async function getProducts() {
  try {
    const res = await fetch(
      "https://skilltestnextjs.evidam.zybotechlab.com/api/new-products/"
    );

    if (!res.ok) {
      console.error("API failed:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}



import ProductGrid from "@/components/product/ProductGrid";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="bg-[#161616] min-h-screen pt-20 pb-40 px-[60px]">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-white text-[48px] font-bold mb-16 tracking-tight">
          Men&apos;s Jordan Shoes
        </h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
