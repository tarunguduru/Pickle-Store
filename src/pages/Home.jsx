import ProductGrid from "../features/products/ProductGrid";

export default function Home() {
  return (
    <div className="py-2">
      <h2 className="text-xl font-semibold ">
        Delicious homemade pickles, freshly curated for you.
      </h2>
      <div className="mt-6">
        <ProductGrid />
      </div>
    </div>
  );
}
