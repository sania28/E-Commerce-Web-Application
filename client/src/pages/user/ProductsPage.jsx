import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
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
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const params = { page, limit: 12 };
      if (category !== "All") params.category = category;
      if (search) params.search = search;

      const response = await productAPI.getAll(params);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Our Products</h1>
          <p className="text-xl text-white glass-dark px-6 py-2 rounded-full inline-block">
            Discover Amazing Products
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-2xl">
            <p className="text-2xl text-gray-600">No products found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="glass-card rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300"
                >
                  <Link to={`/products/${product._id}`}>
                    <div className="h-48 overflow-hidden">
                      <img
                        src={
                          product.images[0] || "https://via.placeholder.com/400"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/products/${product._id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-orange-600 transition">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-2xl font-bold text-orange-600">
                        ₹{product.price}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`w-full py-2 rounded-lg font-semibold transition ${
                        product.stock === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg"
                      }`}
                    >
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center mt-12 space-x-2">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => fetchProducts(page)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        pagination.page === page
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                          : "glass-card text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
