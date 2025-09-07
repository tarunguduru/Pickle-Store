import { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "../../api/Products";
import ProductCard from "../../components/ProductCard";
import FilterBar from "./FilterBar";

function CardSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 animate-pulse bg-white dark:bg-zinc-900">
      <div className="h-40 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-2 h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 h-9 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

export default function ProductGrid() {
  const [state, setState] = useState({ loading: true, error: "", items: [] });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const items = await fetchProducts();
        if (mounted) setState({ loading: false, error: "", items });
      } catch (e) {
        if (mounted)
          setState({
            loading: false,
            error: e.message || "Error",
            items: [],
          });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...state.items];

    // search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    // category
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    // sort
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [state.items, search, category, sort]);

  if (state.loading) {
    return (
      <div>
        <FilterBar />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
        {state.error}
      </div>
    );
  }

  return (
    <div>
      <FilterBar
        onSearch={setSearch}
        onCategory={setCategory}
        onSort={setSort}
      />

      {filtered.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-zinc-500 dark:text-zinc-400">
          No products found
        </div>
      )}
    </div>
  );
}
