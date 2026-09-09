import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Package } from "lucide-react";
import { productAPI } from "../../services/api";
import { useCartStore } from "../../store/cartStore";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data.product);
    } catch (error) {
      toast.error("Failed to fetch product details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-card p-12 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <Link
            to="/products"
            className="text-orange-600 hover:text-orange-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center text-white hover:text-orange-300 transition mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Products
        </Link>

        <div className="glass-card rounded-2xl overflow-hidden p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="mb-4 rounded-xl overflow-hidden">
                <img
                  src={
                    product.images[selectedImage] ||
                    "https://via.placeholder.com/600"
                  }
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      onClick={() => setSelectedImage(index)}
                      className={`h-20 object-cover rounded-lg cursor-pointer transition ${
                        selectedImage === index
                          ? "ring-4 ring-purple-500"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {product.category}
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {product.description}
              </p>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="text-3xl font-bold text-orange-600">
                      ₹{product.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Weight</p>
                    <p className="text-2xl font-semibold text-gray-800">
                      {product.weight} kg
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="text-gray-500" size={20} />
                  <span className="text-gray-700">
                    {product.stock > 0 ? (
                      <span className="text-orange-600 font-semibold">
                        {product.stock} in stock
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Out of stock
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold"
                      >
                        -
                      </button>
                      <span className="text-2xl font-semibold w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(Math.min(product.stock, quantity + 1))
                        }
                        className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={24} />
                    <span>Add to Cart</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
