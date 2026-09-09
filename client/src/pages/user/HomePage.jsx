import { Link } from "react-router-dom";
import { ShoppingBag, Package, Shield, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { productAPI } from "../../services/api";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productAPI.getAll({ limit: 6 });
        setFeaturedProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="absolute inset-0 bg-white bg-opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-float">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              ShopMart
            </span>
          </h1>

          <Link
            to="/products"
            className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-100 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShoppingBag,
                title: "Quality Products",
                desc: "Premium quality guaranteed",
              },
              {
                icon: Truck,
                title: "Fast Shipping",
                desc: "Delivered to your door",
              },
              {
                icon: Shield,
                title: "Secure Payment",
                desc: "100% secure transactions",
              },
              {
                icon: Package,
                title: "Easy Returns",
                desc: "30-day return policy",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-8 rounded-2xl text-center transform hover:scale-105 transition duration-300"
              >
                <feature.icon className="w-16 h-16 mx-auto mb-4 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="glass-card rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={product.images[0] || "https://via.placeholder.com/400"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
