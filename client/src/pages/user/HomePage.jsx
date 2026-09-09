import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Package,
  Shield,
  Truck,
  ArrowRight,
  Sparkles,
  Star,
  Headphones,
  Watch,
  Shirt,
  BookOpen,
  Dumbbell,
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { productAPI } from "../../services/api";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productAPI.getAll({ limit: 6 });
        setFeaturedProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    {
      name: "Electronics",
      icon: Headphones,
      description: "Smart gadgets & technology",
    },
    {
      name: "Clothing",
      icon: Shirt,
      description: "Style for every occasion",
    },
    {
      name: "Books",
      icon: BookOpen,
      description: "Knowledge & inspiration",
    },
    {
      name: "Sports",
      icon: Dumbbell,
      description: "Gear for an active life",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      desc: "Your account and information stay protected.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Quick and reliable delivery to your doorstep.",
    },
    {
      icon: Package,
      title: "Quality Products",
      desc: "Handpicked products for your everyday needs.",
    },
    {
      icon: Heart,
      title: "Customer First",
      desc: "A smooth and enjoyable shopping experience.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">

        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />

        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />

        <div
          className="absolute top-40 -right-32 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl"
          style={{
            animation: "float 7s ease-in-out infinite",
          }}
        />

        <div
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
          style={{
            animation: "float 9s ease-in-out infinite reverse",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">

          {/* Hero Text */}
          <div
            className="text-center lg:text-left"
            style={{
              animation: "fadeUp 0.9s ease-out",
            }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Welcome to the future of shopping
            </div>

            <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Shop
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Smarter.
              </span>
              <span className="block text-white">
                Live Better.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 lg:mx-0">
              Discover amazing products, explore new collections and enjoy
              a simple shopping experience — all in one place.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">

              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-bold shadow-lg shadow-blue-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/30"
              >
                Shop Now
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-bold backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Explore Collection
              </Link>

            </div>

            {/* Stats */}
            <div className="mt-12 flex justify-center gap-8 sm:gap-12 lg:justify-start">
              <div>
                <p className="text-2xl font-black text-white">12+</p>
                <p className="text-sm text-slate-400">Products</p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div>
                <p className="text-2xl font-black text-white">6+</p>
                <p className="text-sm text-slate-400">Categories</p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div>
                <p className="text-2xl font-black text-white">24/7</p>
                <p className="text-sm text-slate-400">Shopping</p>
              </div>
            </div>
          </div>

          {/* Hero Product Card */}
          <div
            className="relative mx-auto w-full max-w-lg"
            style={{
              animation: "fadeUp 1.1s ease-out",
            }}
          >

            <div
              className="absolute -inset-10 rounded-full bg-blue-500/20 blur-3xl"
              style={{
                animation: "pulseGlow 4s ease-in-out infinite",
              }}
            />

            <div
              className="relative rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
              style={{
                animation: "float 6s ease-in-out infinite",
              }}
            >

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">SHOPMART</p>
                  <h3 className="text-2xl font-bold">
                    Trending Picks
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                  <ShoppingBag className="h-6 w-6" />
                </div>
              </div>

              {/* Product Mini Card */}
              <div className="mb-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 transition hover:bg-white/15">

                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-400/20">
                  <Headphones className="h-8 w-8 text-cyan-300" />
                </div>

                <div className="flex-1">
                  <p className="font-bold">
                    Wireless Headphones
                  </p>
                  <p className="text-sm text-slate-400">
                    Premium sound experience
                  </p>
                </div>

                <span className="font-bold text-cyan-300">
                  ₹299
                </span>
              </div>

              {/* Second Card */}
              <div className="mb-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">

                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-400/20">
                  <Watch className="h-8 w-8 text-purple-300" />
                </div>

                <div className="flex-1">
                  <p className="font-bold">
                    Smart Fitness Watch
                  </p>
                  <p className="text-sm text-slate-400">
                    Track your everyday goals
                  </p>
                </div>

                <span className="font-bold text-purple-300">
                  ₹249
                </span>
              </div>

              {/* Offer */}
              <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-5 shadow-lg">

                <div>
                  <p className="font-black">
                    Special Offers
                  </p>
                  <p className="text-sm text-blue-100">
                    Something new awaits
                  </p>
                </div>

                <ArrowRight className="h-6 w-6" />
              </div>
            </div>

            {/* Floating Badge */}
            <div
              className="absolute -right-4 top-8 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-xl"
              style={{
                animation: "float 4s ease-in-out infinite",
              }}
            >
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">Top Picks</span>
              </div>
            </div>

            <div
              className="absolute -bottom-5 -left-5 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 shadow-xl backdrop-blur-xl"
              style={{
                animation: "float 5s ease-in-out infinite reverse",
              }}
            >
              <p className="text-xs text-slate-400">
                Shopping made
              </p>
              <p className="font-bold text-cyan-300">
                Simple & Easy
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="bg-white px-6 py-20 text-slate-900">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">
            <p className="font-semibold uppercase tracking-widest text-blue-600">
              Explore
            </p>

            <h2 className="mt-2 text-4xl font-black sm:text-5xl">
              Shop by Category
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              Find everything you need across our carefully selected
              categories.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {categories.map((category, index) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  to={`/products?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50 p-7 transition duration-500 hover:-translate-y-3 hover:border-blue-200 hover:shadow-2xl"
                  style={{
                    animation: `fadeUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >

                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 transition duration-500 group-hover:scale-150" />

                  <div className="relative">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3 className="text-xl font-black">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {category.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 font-bold text-blue-600">
                      Explore
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              );
            })}

          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="bg-slate-50 px-6 py-20 text-slate-900">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">

            <div>
              <p className="font-semibold uppercase tracking-widest text-purple-600">
                Handpicked
              </p>

              <h2 className="mt-2 text-4xl font-black sm:text-5xl">
                Featured Products
              </h2>

              <p className="mt-3 text-slate-500">
                Popular picks from our collection.
              </p>
            </div>

            <Link
              to="/products"
              className="group flex items-center gap-2 font-bold text-blue-600"
            >
              View All
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-2" />
            </Link>

          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
                >

                  <div className="relative h-64 overflow-hidden bg-slate-100">

                    <img
                      src={
                        product.images?.[0] ||
                        "https://via.placeholder.com/500"
                      }
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                      {product.category}
                    </div>

                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-blue-600 opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                      <ArrowRight className="h-5 w-5" />
                    </div>

                  </div>

                  <div className="p-6">

                    <div className="mb-3 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}

                      <span className="ml-2 text-xs text-slate-400">
                        Popular
                      </span>
                    </div>

                    <h3 className="text-xl font-black transition group-hover:text-blue-600">
                      {product.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-[40px] text-sm text-slate-500">
                      {product.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-2xl font-black text-blue-600">
                        ₹{Number(product.price).toFixed(2)}
                      </span>

                      <span className="text-sm font-bold text-slate-400 transition group-hover:text-blue-600">
                        View →
                      </span>

                    </div>
                  </div>
                </Link>
              ))}

            </div>
          ) : (
            <div className="rounded-3xl bg-white py-16 text-center shadow-sm">
              <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-slate-300" />
              <p className="text-slate-500">
                Products will appear here.
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-xl"
            >
              Browse All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ================= PROMO ================= */}
      <section className="px-6 py-10">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 shadow-2xl md:p-14">

          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                <Sparkles className="h-4 w-4" />
                SHOPMART EXPERIENCE
              </div>

              <h2 className="text-3xl font-black md:text-4xl">
                Find something you'll love.
              </h2>

              <p className="mt-3 text-blue-100">
                Explore our collection and discover products made for
                your everyday needs.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 font-black text-blue-600 shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-105"
            >
              Start Shopping
              <ArrowRight className="h-5 w-5" />
            </Link>

          </div>
        </div>
      </section>

      {/* ================= WHY SHOPMART ================= */}
      <section className="bg-white px-6 py-20 text-slate-900">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">
            <p className="font-semibold uppercase tracking-widest text-blue-600">
              Shop with confidence
            </p>

            <h2 className="mt-2 text-4xl font-black sm:text-5xl">
              Why ShopMart?
            </h2>

            <p className="mt-4 text-slate-500">
              Everything you need for a better shopping experience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-slate-100 bg-white p-7 text-center shadow-sm transition duration-500 hover:-translate-y-2 hover:border-blue-100 hover:shadow-xl"
                  style={{
                    animation: `fadeUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >

                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-black">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {feature.desc}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-24">

        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-950 to-purple-950" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
            <ShoppingBag className="h-8 w-8" />
          </div>

          <h2 className="text-4xl font-black sm:text-5xl">
            Ready to start shopping?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Explore our collection and discover your next favorite product.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-black shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-105"
          >
            Shop Now
            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>
      </section>

      {/* ================= ANIMATIONS ================= */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.08);
            }
          }
        `}
      </style>

    </div>
  );
}
