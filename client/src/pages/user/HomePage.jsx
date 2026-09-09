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
      icon: Package,
      description: "Knowledge & inspiration",
    },
    {
      name: "Sports",
      icon: ShoppingBag,
      description: "Gear for an active life",
    },
  ];

  const features = [
    {
      icon: ShoppingBag,
      title: "Quality Products",
      desc: "Carefully selected products for you",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Quick and reliable doorstep delivery",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      desc: "Your data and account stay protected",
    },
    {
      icon: Package,
      title: "Easy Returns",
      desc: "Simple and hassle-free returns",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-200 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-orange-100 rounded-full opacity-60 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white shadow-sm border border-orange-100 text-orange-600 font-medium">
                <Sparkles className="w-4 h-4" />
                Your everyday shopping destination
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">
                Shop Smart.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
                  Live Better.
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover quality products, amazing deals, and everything you
                need — all in one place.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-white border-2 border-orange-200 text-orange-600 font-bold text-lg hover:bg-orange-50 transition duration-300"
                >
                  Explore Products
                </Link>
              </div>

              {/* Small stats */}
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-8">
                <div>
                  <p className="text-2xl font-bold text-gray-900">12+</p>
                  <p className="text-sm text-gray-500">Products</p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900">6+</p>
                  <p className="text-sm text-gray-500">Categories</p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-500">Shopping</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden md:block">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-[3rem] rotate-6 opacity-20"></div>

                <div className="relative bg-white rounded-[3rem] shadow-2xl p-8 border border-orange-100">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-sm text-gray-500">ShopMart</p>
                      <h3 className="text-2xl font-bold">Featured Picks</h3>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                      <ShoppingBag className="text-orange-600 w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50">
                      <div className="w-16 h-16 rounded-xl bg-orange-200 flex items-center justify-center">
                        <Headphones className="w-8 h-8 text-orange-700" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Wireless Headphones</p>
                        <p className="text-sm text-gray-500">
                          Premium sound experience
                        </p>
                      </div>
                      <span className="font-bold text-orange-600">₹299</span>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                      <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center">
                        <Watch className="w-8 h-8 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Smart Fitness Watch</p>
                        <p className="text-sm text-gray-500">
                          Track your everyday goals
                        </p>
                      </div>
                      <span className="font-bold text-orange-600">₹249</span>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                      <div>
                        <p className="font-bold">Special Offers</p>
                        <p className="text-sm text-orange-100">
                          Discover something new today
                        </p>
                      </div>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -right-5 top-10 bg-white shadow-xl rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Star className="w-5 h-5 fill-orange-500 text-orange-500" />
                  <span className="font-semibold">Top Picks</span>
                </div>

                <div className="absolute -left-6 bottom-10 bg-white shadow-xl rounded-2xl px-4 py-3">
                  <p className="text-xs text-gray-500">Shopping made</p>
                  <p className="font-bold text-orange-600">Simple & Easy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-orange-600 font-semibold uppercase tracking-wider text-sm">
                Explore
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
                Shop by Category
              </h2>
              <p className="text-gray-500 mt-3">
                Find exactly what you're looking for.
              </p>
            </div>

            <Link
              to="/products"
              className="text-orange-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  to={`/products?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className="group p-6 rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-orange-50 hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-5 group-hover:bg-orange-500 transition duration-300">
                    <Icon className="w-7 h-7 text-orange-600 group-hover:text-white transition duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {category.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    {category.description}
                  </p>

                  <div className="mt-5 text-orange-600 text-sm font-semibold flex items-center gap-2">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 px-6 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              Handpicked for you
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Featured Products
            </h2>

            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Explore some of our most popular products and discover your next
              favorite.
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={
                        product.images?.[0] ||
                        "https://via.placeholder.com/500"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />

                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-gray-700">
                      {product.category}
                    </div>

                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <ArrowRight className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-orange-400 text-orange-400"
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">
                        Popular
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[40px]">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-5">
                      <span className="text-2xl font-extrabold text-orange-600">
                        ₹{Number(product.price).toFixed(2)}
                      </span>

                      <span className="text-sm font-semibold text-gray-500 group-hover:text-orange-600 transition">
                        View Product →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
              <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                Featured products will appear here.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-900 text-white font-bold hover:bg-orange-600 hover:shadow-xl transition duration-300"
            >
              Browse All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-500 to-orange-700 px-8 py-12 md:px-14 md:py-14">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white opacity-10"></div>
            <div className="absolute -left-10 -bottom-32 w-80 h-80 rounded-full bg-white opacity-10"></div>

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="text-white max-w-2xl">
                <p className="text-orange-100 font-semibold mb-2">
                  YOUR SHOPPING JOURNEY STARTS HERE
                </p>

                <h2 className="text-3xl md:text-4xl font-extrabold">
                  Find something you'll love.
                </h2>

                <p className="mt-3 text-orange-100">
                  Browse our collection and discover products made for your
                  everyday needs.
                </p>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-orange-600 rounded-full font-bold shadow-lg hover:scale-105 transition duration-300 whitespace-nowrap"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-orange-600 font-semibold uppercase tracking-wider text-sm">
              Shop with confidence
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Why Choose ShopMart?
            </h2>

            <p className="text-gray-500 mt-3">
              Everything you need for a smooth shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group p-7 rounded-3xl border border-gray-100 bg-white hover:bg-orange-50 hover:border-orange-100 hover:shadow-lg transition duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-5 group-hover:bg-orange-500 transition duration-300">
                    <Icon className="w-7 h-7 text-orange-600 group-hover:text-white transition duration-300" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500 flex items-center justify-center mb-6">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Ready to start shopping?
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Explore our collection and find your next favorite product.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 hover:scale-105 transition duration-300"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
