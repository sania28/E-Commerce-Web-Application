```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Star,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  Package,
} from "lucide-react";
import { productAPI } from "../../services/api";
import toast from "react-hot-toast";
import { useCartStore } from "../../store/cartStore";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [pagination, setPagination] = useState({});

  const addItem = useCartStore((state) => state.addItem);

  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Toys",
    "Food",
  ];

  useEffect(() => {
    fetchProducts(1);
  }, [category, search]);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);

      const params = {
        page: page,
        limit: 12,
      };

      if (category !== "All") {
        params.category = category;
      }

      if (search.trim() !== "") {
        params.search = search.trim();
      }

      const response = await productAPI.getAll(params);

      setProducts(response.data.products || []);
      setPagination(response.data.pagination || {});
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addItem(product, 1);
    toast.success(product.name + " added to cart!");
  };

  const getCategoryButtonClass = (cat) => {
    if (category === cat) {
      return "whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20";
    }

    return "whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600";
  };

  const getPaginationButtonClass = (page) => {
    if (pagination.page === page) {
      return "h-11 min-w-11 rounded-xl px-4 font-bold transition bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20";
    }

    return "h-11 min-w-11 rounded-xl px-4 font-bold transition bg-white text-slate-600 shadow-sm hover:bg-blue-50 hover:text-blue-600";
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 px-6 py-20">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Explore our collection
          </div>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Discover{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Amazing Products
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Browse our carefully selected collection and find products made
            for your everyday needs.
          </p>
        </div>
      </section>

      {/* FILTER AREA */}
      <section className="bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* SEARCH */}
              <div className="relative w-full lg:max-w-xl">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={21}
                />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-5 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* CATEGORY SELECT */}
              <div className="flex items-center gap-3">
                <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
                  <SlidersHorizontal size={19} />
                </div>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full min-w-[210px] rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* CATEGORY CHIPS */}
            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={getCategoryButtonClass(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-slate-50 px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          {/* RESULT COUNT */}
          {!loading && products.length > 0 && (
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Showing{" "}
                  <span className="font-black text-slate-800">
                    {products.length}
                  </span>{" "}
                  products
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-500 shadow-sm sm:flex">
                <Package size={16} />
                ShopMart Collection
              </div>
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[2rem] bg-white shadow-sm"
                >
                  <div className="h-64 animate-pulse bg-slate-200" />

                  <div className="space-y-3 p-6">
                    <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />

                    <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />

                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />

                    <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            /* EMPTY STATE */
            <div className="rounded-[2rem] bg-white px-6 py-24 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">
                <Search className="h-9 w-9 text-slate-400" />
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-800">
                No products found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-slate-500">
                Try changing your search or selecting a different category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-7 rounded-full bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-blue-600"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* PRODUCT GRID */}
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    style={{
                      animationName: "fadeUp",
                      animationDuration: "0.6s",
                      animationTimingFunction: "ease-out",
                      animationDelay: index * 0.06 + "s",
                      animationFillMode: "both",
                    }}
                  >
                    {/* IMAGE */}
                    <Link to={"/products/" + product._id}>
                      <div className="relative h-64 overflow-hidden bg-slate-100">
                        <img
                          src={
                            product.images &&
                            product.images.length > 0
                              ? product.images[0]
                              : "https://via.placeholder.com/500"
                          }
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />

                        {/* IMAGE OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                        {/* CATEGORY */}
                        <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                          {product.category}
                        </span>

                        {/* QUICK VIEW */}
                        <div className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white text-blue-600 opacity-0 shadow-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <ArrowRight size={19} />
                        </div>
                      </div>
                    </Link>

                    {/* DETAILS */}
                    <div className="p-6">
                      {/* RATING */}
                      <div className="mb-3 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}

                        <span className="ml-2 text-xs font-medium text-slate-400">
                          Popular
                        </span>
                      </div>

                      {/* NAME */}
                      <Link to={"/products/" + product._id}>
                        <h3 className="line-clamp-1 text-lg font-black text-slate-800 transition group-hover:text-blue-600">
                          {product.name}
                        </h3>
                      </Link>

                      {/* DESCRIPTION */}
                      <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-relaxed text-slate-500">
                        {product.description}
                      </p>

                      {/* PRICE */}
                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-2xl font-black text-blue-600">
                          ₹{Number(product.price).toFixed(2)}
                        </span>

                        {product.stock > 0 ? (
                          <span className="text-xs font-bold text-green-600">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-red-500">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* CART BUTTON */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className={
                          product.stock === 0
                            ? "mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition duration-300 cursor-not-allowed bg-slate-200 text-slate-400"
                            : "mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition duration-300 bg-slate-950 text-white shadow-lg hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-500/20"
                        }
                      >
                        <ShoppingCart size={18} />

                        {product.stock === 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              {pagination.pages > 1 && (
                <div className="mt-14 flex flex-wrap justify-center gap-2">
                  {Array.from(
                    { length: pagination.pages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => fetchProducts(page)}
                      className={getPaginationButtonClass(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
```
