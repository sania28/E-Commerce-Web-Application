import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-xl z-40">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center">
            <span className="text-white font-bold text-xl">SG</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">ShopMart</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-200 absolute bottom-8 left-6 right-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
