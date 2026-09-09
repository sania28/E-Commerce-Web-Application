import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ShoppingCart,
  Package,
  User,
  LogIn,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, token, logout } = useAuthStore();

  const cartItems = user?.cart || [];
  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white shadow-xl backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMobile}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 transition duration-300 group-hover:scale-105 group-hover:rotate-3">
            <ShoppingBag className="h-6 w-6" />
          </div>

          <div>
            <div className="text-xl font-black tracking-tight">
              Shop<span className="text-cyan-400">Mart</span>
            </div>
            <div className="hidden text-[9px] font-bold tracking-[0.25em] text-slate-500 sm:block">
              SMART SHOPPING
            </div>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className={
              "relative rounded-xl px-4 py-2.5 text-sm font-semibold transition " +
              (isActive("/")
                ? "text-cyan-300"
                : "text-slate-300 hover:bg-white/5 hover:text-white")
            }
          >
            Home

            {isActive("/") && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-cyan-400" />
            )}
          </Link>

          <Link
            to="/products"
            className={
              "relative rounded-xl px-4 py-2.5 text-sm font-semibold transition " +
              (isActive("/products")
                ? "text-cyan-300"
                : "text-slate-300 hover:bg-white/5 hover:text-white")
            }
          >
            Products

            {isActive("/products") && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-cyan-400" />
            )}
          </Link>

          {token && (
            <Link
              to="/orders"
              className={
                "relative rounded-xl px-4 py-2.5 text-sm font-semibold transition " +
                (isActive("/orders")
                  ? "text-cyan-300"
                  : "text-slate-300 hover:bg-white/5 hover:text-white")
              }
            >
              Orders

              {isActive("/orders") && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-cyan-400" />
              )}
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="ml-1 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/10 hover:text-purple-200"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-3 md:flex">
          {/* CART */}
          <Link
            to="/cart"
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-cyan-400/20 hover:bg-white/10"
            title="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5 text-slate-300 transition group-hover:text-cyan-300" />

            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-1 text-[10px] font-black text-white shadow-lg shadow-blue-500/30">
                {cartCount}
              </span>
            )}
          </Link>

          {token ? (
            <>
              {/* USER */}
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-cyan-400/20 hover:bg-white/10"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
                  <User className="h-4 w-4" />
                </div>

                <div className="max-w-[110px]">
                  <p className="truncate text-xs font-bold text-white">
                    {user?.name || "User"}
                  </p>
                  <p className="text-[9px] font-medium text-slate-500">
                    ACCOUNT
                  </p>
                </div>
              </Link>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-5 py-2.5 text-sm font-bold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>

        {/* MOBILE BUTTONS */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/cart"
            onClick={closeMobile}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5"
          >
            <ShoppingCart className="h-5 w-5" />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-black">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-950 px-5 pb-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-4">
            <Link
              to="/"
              onClick={closeMobile}
              className={
                "rounded-xl px-4 py-3 text-sm font-semibold transition " +
                (isActive("/")
                  ? "bg-cyan-500/10 text-cyan-300"
                  : "text-slate-300 hover:bg-white/5")
              }
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={closeMobile}
              className={
                "rounded-xl px-4 py-3 text-sm font-semibold transition " +
                (isActive("/products")
                  ? "bg-cyan-500/10 text-cyan-300"
                  : "text-slate-300 hover:bg-white/5")
              }
            >
              Products
            </Link>

            {token && (
              <Link
                to="/orders"
                onClick={closeMobile}
                className={
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition " +
                  (isActive("/orders")
                    ? "bg-cyan-500/10 text-cyan-300"
                    : "text-slate-300 hover:bg-white/5")
                }
              >
                <Package className="h-4 w-4" />
                Orders
              </Link>
            )}

            {token && (
              <Link
                to="/profile"
                onClick={closeMobile}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={closeMobile}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/10"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin Dashboard
              </Link>
            )}

            {token ? (
              <button
                onClick={handleLogout}
                className="mt-2 flex items-center gap-3 rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-left text-sm font-semibold text-red-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMobile}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-4 py-3 text-sm font-bold"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
