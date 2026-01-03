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

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))
      )}
    </div>
  );
}
