```jsx
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
  Package,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, token, logout } = useAuthStore();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const cartItems = getTotalItems();

  const handleLogout = () => {
    toast.success("Logged out successfully!");

    setTimeout(() => {
      logout();
      navigate("/");
      setMobileOpen(false);
    }, 500);
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
      
      {/* Top Gradient Line */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            onClick={closeMobile}
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 transition duration-500 group-hover:scale-110 group-hover:rotate-6">
              <ShoppingBag className="relative h-6 w-6 text-white" />

              <div className="absolute inset-0 translate-y-full bg-white/20 transition duration-500 group-hover:translate-y-0" />
            </div>

            <div className="leading-none">
              <span className="block text-xl font-black tracking-tight text-white">
                Shop
                <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Mart
                </span>
              </span>

              <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.3em] text-slate-500 sm:block">
                Shop smarter
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden items-center gap-2 md:flex">

            <Link
              to="/"
              className="group relative rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 transition duration-300 hover:bg-white/5 hover:text-white"
            >
              Home

              <span className="absolute bottom-1 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition duration-300 group-hover:scale-x-100" />
            </Link>

            <Link
              to="/products"
              className="group relative rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 transition duration-300 hover:bg-white/5 hover:text-white"
            >
              Products

              <span className="absolute bottom-1 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition duration-300 group-hover:scale-x-100" />
            </Link>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="hidden items-center gap-2 md:flex">

            {/* CART */}
            <Link
              to="/cart"
              className="group relative flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-white"
            >
              <ShoppingCart className="h-5 w-5 transition duration-300 group-hover:scale-110" />

              <span className="hidden text-sm font-semibold lg:block">
                Cart
              </span>

              {cartItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-1 text-[10px] font-black text-white shadow-lg shadow-blue-500/40">
                  {cartItems}
                </span>
              )}
            </Link>

            {token ? (
              <>
                {/* ORDERS */}
                <Link
                  to="/orders"
                  className="group flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-white"
                  title="My Orders"
                >
                  <Package className="h-5 w-5 transition duration-300 group-hover:scale-110" />

                  <span className="hidden text-sm font-semibold lg:block">
                    Orders
                  </span>
                </Link>

                {/* ADMIN */}
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-purple-500/40"
                  >
                    Admin
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                )}

                {/* USER */}
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-md">
                    <User className="h-4 w-4 text-white" />
                  </div>

                  <span className="max-w-[100px] truncate text-sm font-semibold text-slate-200">
                    {user?.name || "User"}
                  </span>
                </div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition duration-300 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-400"
                >
                  <LogOut className="h-5 w-5 transition group-hover:scale-110" />
                </button>
              </>
            ) : (
              /* LOGIN */
              <Link
                to="/login"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/30"
              >
                <User className="h-4 w-4 transition group-hover:scale-110" />
                Login
              </Link>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:bg-white/10 hover:text-white md:hidden"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="border-t border-white/10 py-4 md:hidden">
            <div className="space-y-2">

              {/* HOME */}
              <Link
                to="/"
                onClick={closeMobile}
                className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 font-semibold text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
              >
                Home
                <ChevronRight className="h-4 w-4" />
              </Link>

              {/* PRODUCTS */}
              <Link
                to="/products"
                onClick={closeMobile}
                className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 font-semibold text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
              >
                Products
                <ChevronRight className="h-4 w-4" />
              </Link>

              {/* CART */}
              <Link
                to="/cart"
                onClick={closeMobile}
                className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 font-semibold text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  Cart
                </span>

                {cartItems > 0 && (
                  <span className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItems}
                  </span>
                )}
              </Link>

              {token ? (
                <>
                  {/* ORDERS */}
                  <Link
                    to="/orders"
                    onClick={closeMobile}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 font-semibold text-slate-200 transition hover:bg-purple-500/10 hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <Package className="h-5 w-5" />
                      My Orders
                    </span>

                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  {/* ADMIN */}
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={closeMobile}
                      className="flex items-center justify-between rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 px-4 py-3 font-bold text-white"
                    >
                      Admin Dashboard
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}

                  {/* USER */}
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
                      <User className="h-4 w-4 text-white" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Signed in as
                      </p>

                      <p className="font-semibold text-white">
                        {user?.name || "User"}
                      </p>
                    </div>
                  </div>

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 font-semibold text-red-400 transition hover:bg-red-500/20"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                /* MOBILE LOGIN */
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-4 py-3 font-bold text-white shadow-lg"
                >
                  <User className="h-5 w-5" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```
