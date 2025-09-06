import ProductGrid from "../features/products/ProductGrid";

export default function Home() {
  return (
    <div className="py-2">
      <h2 className="text-xl font-semibold">All Pickles</h2>
      <p className="mt-1 text-slate-600 dark:text-slate-300">
        Fetched from MockAPI.
      </p>
      <div className="mt-6">
        <ProductGrid />
      </div>
    </div>
  );
}
