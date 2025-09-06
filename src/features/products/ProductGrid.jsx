import { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "../../api/products";
import ProductCard from "../../components/ProductCard";
import FilterBar from "./FilterBar";

function CardSkeleton() {
  /* keep as is */
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
          setState({ loading: false, error: e.message || "Error", items: [] });
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
    /* keep existing error UI */
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
        <div className="text-center py-16 text-slate-500 dark:text-slate-400">
          No products found 🥒
        </div>
      )}
    </div>
  );
}
