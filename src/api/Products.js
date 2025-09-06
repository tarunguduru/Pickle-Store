const API_URL =
  "https://68bbb94a84055bce63f299cf.mockapi.io/api/v1/products/pickels";

function mapProduct(p) {
  return {
    id: p.id,
    name: p.name,
    price: Number(p.price) ?? 0,
    image: p.imgUrl,
    category: p.category, // 'veg' | 'non-veg' | 'groceries'
    ingredients:
      typeof p.ingredients === "string"
        ? p.ingredients
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : Array.isArray(p.ingredients)
        ? p.ingredients
        : [],
    quantity: p.quantity || "",
  };
}

export async function fetchProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return Array.isArray(data) ? data.map(mapProduct) : [];
}
