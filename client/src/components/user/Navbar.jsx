import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Package } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, token, logout } = useAuthStore();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setTimeout(() => {
      logout();
      navigate("/");
    }, 500);
  };

  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">SG</span>
            </div>
            <span className="text-gray-800 text-xl font-bold">ShopMart</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-600 transition font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-orange-600 transition font-medium"
            >
              Products
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-orange-600 transition"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {token ? (
              <>
                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-orange-600 transition font-medium"
                >
                  <Package size={24} />
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition"
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <User size={20} className="text-gray-700" />
                  <span className="text-gray-700 text-sm font-medium">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg transition font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
