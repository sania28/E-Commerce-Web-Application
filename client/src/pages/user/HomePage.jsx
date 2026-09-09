```jsx
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
  Zap,
  Search,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { productAPI } from "../../services/api";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingWords = ["Smarter.", "Better.", "Faster.", "Together."];

  /* ================= TYPING ANIMATION ================= */
  useEffect(() => {
    const currentWord = typingWords[wordIndex];
    const typingSpeed = isDeleting ? 70 : 130;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentWord.substring(
          0,
          typedText.length + 1
        );

        setTypedText(nextText);

        if (nextText === currentWord) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1200);
        }
      } else {
        const nextText = currentWord.substring(
          0,
          Math.max(typedText.length - 1, 0)
        );

        setTypedText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typingWords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

  /* ================= PRODUCTS ================= */
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
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />

        <div
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl"
          style={{ animation: "blobMove 8s ease-in-out infinite" }}
        />

        <div
          className="absolute -right-40 top-20 h-[550px] w-[550px] rounded-full bg-purple-500/20 blur-3xl"
          style={{
            animation: "blobMove 10s ease-in-out infinite reverse",
          }}
        />

        <div
          className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-cyan-400/10 blur-3xl"
          style={{ animation: "float 7s ease-in-out infinite" }}
        />

        <div className="absolute left-[10%] top-[20%] h-2 w-2 animate-ping rounded-full bg-cyan-300" />
        <div className="absolute right-[15%] top-[35%] h-2 w-2 animate-ping rounded-full bg-purple-300" />
        <div className="absolute bottom-[20%] left-[45%] h-2 w-2 animate-ping rounded-full bg-blue-300" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-24">
          {/* HERO TEXT */}
          <div
            className="text-center lg:text-left"
            style={{ animation: "fadeUp 0.9s ease-out" }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-300 shadow-lg shadow-cyan-500/5 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Welcome to the future of shopping
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
            </div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block text-white">Shop</span>

              <span className="block min-h-[1.15em] bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {typedText}
                <span className="ml-1 inline-block h-[0.8em] w-[4px] animate-pulse bg-cyan-300 align-middle" />
              </span>

              <span className="block text-white">Live Better.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-slate-300 lg:mx-0">
              Discover amazing products, explore new collections and enjoy
              a seamless shopping experience — all in one place.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-8 py-4 text-lg font-bold shadow-xl shadow-blue-500/20 transition duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition duration-700 group-hover:translate-x-full" />

                <ShoppingBag className="relative h-5 w-5" />
                <span className="relative">Shop Now</span>

                <ArrowRight className="relative h-5 w-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10"
              >
                <Search className="h-5 w-5 transition group-hover:scale-110" />
                Explore Collection
              </Link>
            </div>

            <div className="mt-12 flex justify-center gap-7 sm:gap-12 lg:justify-start">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-white">12+</p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Products
                </p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-white">6+</p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Categories
                </p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-white">24/7</p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Shopping
                </p>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div
            className="relative mx-auto w-full max-w-lg"
            style={{ animation: "fadeUp 1.1s ease-out" }}
          >
            <div
              className="absolute -inset-12 rounded-full bg-blue-500/20 blur-3xl"
              style={{ animation: "pulseGlow 4s ease-in-out infinite" }}
            />

            <div
              className="relative rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-2xl"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.25em] text-cyan-300">
                    SHOPMART
                  </p>

                  <h3 className="mt-1 text-2xl font-black">
                    Trending Picks
                  </h3>
                </div>

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg shadow-blue-500/30">
                  <ShoppingBag className="h-6 w-6" />

                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-400 ring-4 ring-slate-900/50" />
                </div>
              </div>

              <div className="group mb-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.08] p-4 transition duration-500 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.12]">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-400/20">
                  <Headphones className="h-8 w-8 text-cyan-300 transition group-hover:scale-110" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">
                    Wireless Headphones
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Premium sound experience
                  </p>
                </div>

                <span className="font-black text-cyan-300">₹299</span>
              </div>

              <div className="group mb-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition duration-500 hover:-translate-y-1 hover:border-purple-400/20 hover:bg-white/[0.1]">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-400/20">
                  <Watch className="h-8 w-8 text-purple-300 transition group-hover:scale-110" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">
                    Smart Fitness Watch
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Track your everyday goals
                  </p>
                </div>

                <span className="font-black text-purple-300">₹249</span>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-5 shadow-xl">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                      <p className="font-black">Special Offers</p>
                    </div>

                    <p className="mt-1 text-xs text-blue-100">
                      Something new awaits
                    </p>
                  </div>

                  <ArrowRight className="h-6 w-6 transition hover:translate-x-1" />
                </div>
              </div>
            </div>

            <div
              className="absolute -right-5 top-8 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-xl backdrop-blur-xl"
              style={{ animation: "float 4s ease-in-out infinite" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400/10">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">CUSTOMER</p>
                  <p className="text-sm font-bold">Top Picks</p>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-3 shadow-xl backdrop-blur-xl"
              style={{
                animation: "float 5s ease-in-out infinite reverse",
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />

                <div>
                  <p className="text-[10px] text-slate-500">EXPERIENCE</p>

                  <p className="text-sm font-bold text-cyan-300">
                    Simple & Easy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="relative bg-white px-6 py-24 text-slate-900">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="font-bold uppercase tracking-[0.25em] text-blue-600">
              Explore
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Shop by Category
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-slate-500">
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
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-7 shadow-sm transition duration-500 hover:-translate-y-3 hover:border-blue-200 hover:shadow-2xl"
                  style={{
                    animation: `fadeUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-500/5 transition duration-700 group-hover:scale-[2]" />

                  <div className="relative">
                    <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20 transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3 className="text-xl font-black">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {category.description}
                    </p>

                    <div className="mt-7 flex items-center gap-2 font-bold text-blue-600">
                      Explore
                      <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-slate-50 px-6 py-24 text-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.25em] text-purple-600">
                Handpicked
              </p>

              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                Featured Products
              </h2>

              <p className="mt-4 text-slate-500">
                Popular picks from our collection.
              </p>
            </div>

            <Link
              to="/products"
              className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 font-bold text-blue-600 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              View All
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-2" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
                  style={{
                    animation: `fadeUp 0.7s ease-out ${index * 0.08}s both`,
                  }}
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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                    <div className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                      {product.category}
                    </div>

                    <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-blue-600 opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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

                      <span className="ml-2 text-xs font-medium text-slate-400">
                        Popular
                      </span>
                    </div>

                    <h3 className="text-xl font-black transition group-hover:text-blue-600">
                      {product.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-relaxed text-slate-500">
                      {product.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-2xl font-black text-blue-600">
                        ₹{Number(product.price).toFixed(2)}
                      </span>

                      <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                        View Product
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] bg-white py-16 text-center shadow-sm">
              <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-slate-300" />
              <p className="text-slate-500">
                Products will appear here.
              </p>
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 rounded-full bg-slate-950 px-8 py-4 font-bold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-blue-600"
            >
              Browse All Products
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section className="px-6 py-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 shadow-2xl md:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-300/10 blur-2xl" />

          <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                <Sparkles className="h-4 w-4" />
                SHOPMART EXPERIENCE
              </div>

              <h2 className="text-3xl font-black md:text-4xl">
                Find something you'll love.
              </h2>

              <p className="mt-4 leading-relaxed text-blue-100">
                Explore our collection and discover products made for
                your everyday needs.
              </p>
            </div>

            <Link
              to="/products"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 font-black text-blue-600 shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-105"
            >
              Start Shopping
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY SHOPMART */}
      <section className="bg-white px-6 py-24 text-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="font-bold uppercase tracking-[0.25em] text-blue-600">
              Shop with confidence
            </p>

            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              Why ShopMart?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-slate-500">
              Everything you need for a better shopping experience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-[2rem] border border-slate-100 bg-white p-7 text-center shadow-sm transition duration-500 hover:-translate-y-2 hover:border-blue-100 hover:shadow-xl"
                  style={{
                    animation: `fadeUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20 transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-black">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-950 to-purple-950" />

        <div
          className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
          style={{ animation: "pulseGlow 5s ease-in-out infinite" }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-xl shadow-blue-500/20">
            <ShoppingBag className="h-8 w-8" />
          </div>

          <p className="font-bold uppercase tracking-[0.3em] text-cyan-300">
            Your shopping journey starts here
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            Ready to start shopping?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Explore our collection and discover your next favorite product.
          </p>

          <Link
            to="/products"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-8 py-4 text-lg font-black shadow-xl shadow-blue-500/20 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-purple-500/30"
          >
            Shop Now
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-14px);
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(35px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              opacity: 0.35;
              transform: scale(1);
            }

            50% {
              opacity: 0.75;
              transform: scale(1.1);
            }
          }

          @keyframes blobMove {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
            }

            33% {
              transform: translate(30px, -20px) scale(1.05);
            }

            66% {
              transform: translate(-20px, 25px) scale(0.95);
            }
          }
        `}
      </style>
    </div>
  );
}
```
