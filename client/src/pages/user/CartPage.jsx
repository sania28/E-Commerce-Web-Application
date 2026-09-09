import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center glass-card p-12 rounded-2xl max-w-md w-full">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some products to get started!
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row gap-6"
              >
                <img
                  src={
                    item.product.images[0] || "https://via.placeholder.com/200"
                  }
                  alt={item.product.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link
                        to={`/products/${item.product._id}`}
                        className="hover:text-orange-600 transition"
                      >
                        <h3 className="text-xl font-semibold text-gray-800">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm">
                        {item.product.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity - 1)
                        }
                        className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                        className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{item.product.price} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Items ({getTotalItems()})</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-orange-600">FREE</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-orange-600">
                      ₹{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-center hover:shadow-xl transform hover:scale-105 transition duration-300"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block w-full py-3 mt-3 glass-dark text-white text-center rounded-xl font-semibold hover:bg-opacity-30 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
