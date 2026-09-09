import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { adminProductAPI } from "../../services/api";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [pagination, setPagination] = useState({});

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
      const params = { page, limit: 10 };
      if (category !== "All") params.category = category;
      if (search) params.search = search;

      const response = await adminProductAPI.getAll(params);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await adminProductAPI.delete(id);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
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

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Image
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Stock
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <img
                          src={
                            product.images[0] ||
                            "https://via.placeholder.com/100"
                          }
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {product.slug}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-orange-600">
                        ₹{product.price}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            product.stock > 10
                              ? "bg-orange-100 text-orange-800"
                              : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center py-6 space-x-2 border-t">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => fetchProducts(page)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        pagination.page === page
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
