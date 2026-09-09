import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, DollarSign, Clock } from "lucide-react";
import { adminOrderAPI } from "../../services/api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await adminOrderAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      toast.error("Failed to fetch dashboard stats");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">
                Total Orders
              </p>
              <p className="text-3xl font-bold text-gray-800">
                {stats.totalOrders}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <ShoppingBag className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">
                Pending Orders
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats?.pendingOrders || 0}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-gray-800">
                ₹{stats.totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <DollarSign className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">
                Total Products
              </p>
              <p className="text-3xl font-bold text-gray-800">
                {stats.totalProducts}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Package className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Orders by Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Orders by Status
          </h2>
          <div className="space-y-3">
            {stats?.ordersByStatus?.map((item) => (
              <div key={item._id} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{item._id}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full font-semibold">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/admin/products/new"
              className="block w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold text-center hover:shadow-lg transition"
            >
              Add New Product
            </Link>
            <Link
              to="/admin/orders"
              className="block w-full py-3 bg-orange-500 text-white rounded-lg font-semibold text-center hover:bg-orange-600 transition"
            >
              View All Orders
            </Link>
            <Link
              to="/admin/products"
              className="block w-full py-3 bg-gray-500 text-white rounded-lg font-semibold text-center hover:bg-gray-600 transition"
            >
              Manage Products
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Customer
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Total
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      {order.orderId}
                    </Link>
                  </td>
                  <td className="py-3 px-4">{order.user?.name || "N/A"}</td>
                  <td className="py-3 px-4 font-semibold">
                    ₹{order.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Delivered"
                          ? "bg-orange-100 text-orange-800"
                          : order.status === "Shipped"
                          ? "bg-orange-100 text-orange-800"
                          : order.status === "Processing"
                          ? "bg-orange-100 text-orange-800"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
