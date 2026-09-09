import { useState, useEffect } from "react";
import { Package } from "lucide-react";
import { orderAPI } from "../../services/api";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAll();
      setOrders(response.data.orders);
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center glass-card p-12 rounded-2xl max-w-md w-full">
          <Package className="w-24 h-24 mx-auto text-gray-400 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Orders Yet
          </h2>
          <p className="text-gray-600">Your order history will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="glass-card rounded-2xl p-6">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Order {order.orderId}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <span className="text-2xl font-bold text-orange-600">
                    ₹{order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {item.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity}
                      </p>
                      <p className="font-bold text-orange-600">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Shipping Address
                </h4>
                <p className="text-gray-600 text-sm">
                  {order.shippingAddress.fullName}
                  <br />
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                  <br />
                  {order.shippingAddress.country}
                  <br />
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
