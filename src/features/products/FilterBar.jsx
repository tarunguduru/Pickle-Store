import { useState } from "react";

export default function FilterBar({ onSearch, onCategory, onSort }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch?.(value);
  };

  const handleCategory = (value) => {
    setCategory(value);
    onCategory?.(value);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
    onSort?.(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
      {/* search */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearch}
        className="w-full sm:w-64 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      {/* category */}
      <div className="flex gap-2">
        {["all", "veg", "non-veg", "groceries"].map((c) => (
          <button
            key={c}
            onClick={() => handleCategory(c)}
            className={`px-3 py-1.5 rounded-lg text-sm capitalize transition ${
              category === c
                ? "bg-emerald-500 text-white"
                : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* sort */}
      <select
        value={sort}
        onChange={handleSort}
        className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-3 py-2 text-sm"
      >
        <option value="">Sort by</option>
        <option value="asc">Price: Low → High</option>
        <option value="desc">Price: High → Low</option>
      </select>
    </div>
  );
}
