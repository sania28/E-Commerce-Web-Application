import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Download, Eye } from "lucide-react";
import { adminOrderAPI } from "../../services/api";
import toast from "react-hot-toast";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [pagination, setPagination] = useState({});

  const statuses = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    fetchOrders();
  }, [status, search]);

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const params = { page, limit: 10 };
      if (status !== "All") params.status = status;
      if (search) params.search = search;

      const response = await adminOrderAPI.getAll(params);
      setOrders(response.data.orders);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await adminOrderAPI.export(selectedOrders);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `orders-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Orders exported successfully");
    } catch (error) {
      toast.error("Failed to export orders");
      console.error(error);
    }
  };

  const toggleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedOrders((prev) =>
      prev.length === orders.length ? [] : orders.map((order) => order._id)
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Processing: "bg-orange-100 text-orange-800",
      Shipped: "bg-orange-100 text-orange-800",
      Delivered: "bg-orange-100 text-orange-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Orders</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>
        {selectedOrders.length > 0 && (
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            <Download size={20} />
            <span>Export ({selectedOrders.length})</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by Order ID or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedOrders.length === orders.length}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Order ID
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Customer
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Total
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Items
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order._id)}
                          onChange={() => toggleSelectOrder(order._id)}
                          className="w-4 h-4 text-orange-600 rounded"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          to={`/admin/orders/${order._id}`}
                          className="font-semibold text-orange-600 hover:text-orange-700"
                        >
                          {order.orderId}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {order.user?.name || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.user?.email || "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-orange-600">
                        ₹{order.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold">
                          {order.items.length}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          to={`/admin/orders/${order._id}`}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition inline-flex items-center"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
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
                      onClick={() => fetchOrders(page)}
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
