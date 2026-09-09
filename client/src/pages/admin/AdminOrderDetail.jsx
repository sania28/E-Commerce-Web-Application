import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { adminOrderAPI } from "../../services/api";
import toast from "react-hot-toast";

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNote, setSavingNote] = useState(false);

  const statuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await adminOrderAPI.getById(id);
      setOrder(response.data.order);
      setNewStatus(response.data.order.status);
    } catch (error) {
      toast.error("Failed to fetch order details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!window.confirm(`Change order status to ${newStatus}?`)) return;

    try {
      setSavingStatus(true);
      await adminOrderAPI.updateStatus(id, newStatus);
      toast.success("Order status updated successfully");
      fetchOrder();
    } catch (error) {
      toast.error("Failed to update order status");
      console.error(error);
    } finally {
      setSavingStatus(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;

    try {
      setSavingNote(true);
      await adminOrderAPI.addNote(id, note);
      toast.success("Note added successfully");
      setNote("");
      fetchOrder();
    } catch (error) {
      toast.error("Failed to add note");
      console.error(error);
    } finally {
      setSavingNote(false);
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
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Order not found</p>
        <button
          onClick={() => navigate("/admin/orders")}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate("/admin/orders")}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Orders</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Header */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Order {order.orderId}
                </h1>
                <p className="text-gray-600">
                  Placed on {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Customer</p>
                <p className="font-semibold text-gray-800">
                  {order.user?.name || "N/A"}
                </p>
                <p className="text-gray-600 text-sm">
                  {order.user?.email || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-orange-600">
                  ₹{order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Price: ₹{item.price.toFixed(2)} each
                    </p>
                    <p className="font-bold text-orange-600 mt-1">
                      Total: ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Shipping Address
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-gray-800">
                {order.shippingAddress.fullName}
              </p>
              <p className="text-gray-600 mt-2">
                {order.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
              </p>
              <p className="text-gray-600">{order.shippingAddress.country}</p>
              <p className="text-gray-600 mt-2">
                Phone: {order.shippingAddress.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Update Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Update Status
            </h2>
            <div className="space-y-4">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                onClick={handleUpdateStatus}
                disabled={savingStatus || newStatus === order.status}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} />
                <span>{savingStatus ? "Updating..." : "Update Status"}</span>
              </button>
            </div>
          </div>

          {/* Add Note */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Add Admin Note
            </h2>
            <form onSubmit={handleAddNote} className="space-y-4">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter note..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={savingNote || !note.trim()}
                className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingNote ? "Adding..." : "Add Note"}
              </button>
            </form>
          </div>

          {/* Admin Notes */}
          {order.adminNotes && order.adminNotes.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Admin Notes
              </h2>
              <div className="space-y-3">
                {order.adminNotes.map((adminNote, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{adminNote.note}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(adminNote.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
