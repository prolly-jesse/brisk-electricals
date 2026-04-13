import { useState, useMemo } from "react";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface Product {
  name: string;
  price: number;
  image: string;
}

interface Subcategory {
  name: string;
  products: Product[];
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

const catalogData: Category[] = [
  {
    name: "Instant Showers",
    subcategories: [
      {
        name: "Salty Water Showers",
        products: [
          {
            name: "Salty Water Instant Shower – Standard",
            price: 10500,
            image:
              "https://images.unsplash.com/photo-1585412459212-8def26f7db1f?w=400&h=400&fit=crop",
          },
          {
            name: "Salty Water Instant Shower – Premium",
            price: 13500,
            image:
              "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop",
          },
        ],
      },
      {
        name: "Fresh Water Showers",
        products: [
          {
            name: "Fresh Water Instant Shower – Economy",
            price: 10500,
            image:
              "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
          },
          {
            name: "Fresh Water Instant Shower – Swivel Head",
            price: 12000,
            image:
              "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=400&h=400&fit=crop",
          },
        ],
      },
    ],
  },
  {
    name: "Decorative Lights",
    subcategories: [
      {
        name: "Chandeliers",
        products: [
          {
            name: "Crystal Chandelier – 6 Arm",
            price: 18500,
            image:
              "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
          },
          {
            name: "Modern Ring Chandelier LED",
            price: 14200,
            image:
              "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop",
          },
          {
            name: "Modern Pendant Ceiling Light",
            price: 4500,
            image:
              "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
          },
          {
            name: "Industrial Pendant Light",
            price: 3800,
            image:
              "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop",
          },
        ],
      },
    ],
  },
  {
    name: "Sockets & Switches",
    subcategories: [
      {
        name: "VIP Sockets",
        products: [
          {
            name: "13A Single Luxury Glass Gold",
            price: 850,
            image:
              "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
          },
          {
            name: "13A Twin Luxury Glass Gold",
            price: 1850,
            image:
              "https://images.unsplash.com/photo-1544724107-6d5c4caaff30?w=400&h=400&fit=crop",
          },
          {
            name: "Smart Dimmer Switch",
            price: 1800,
            image:
              "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=400&fit=crop",
          },
          {
            name: "Gang Socket Extension",
            price: 950,
            image:
              "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop",
          },
        ],
      },
    ],
  },
];

const ShopSection = () => {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, addItem, removeItem, updateQty, clearCart, total, count } =
    useCart();

  const handleAdd = (name: string, price: number) => {
    addItem({ name, price, image: "" }, 1);
    setCartOpen(true);
  };

  const checkout = () => {
    const itemsList = items.map((i) => `${i.qty}x ${i.name}`).join("\n");
    const msg = `Hi Brisk Electricals, I'd like to order:\n\n${itemsList}\n\nTotal: KSh ${total}`;
    window.open(
      `https://wa.me/254722648765?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <section id="shop" className="py-6 px-4 max-w-7xl mx-auto">
      {/* Category Sections */}
      {catalogData.map((cat) => (
        <div key={cat.name} className="mb-10">
          {/* Tungsten Style Header */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
            <div className="relative">
              <h2 className="text-xl font-bold uppercase tracking-tight text-gray-900">
                {cat.name}
              </h2>
              <div className="absolute -bottom-[9px] left-0 w-12 h-0.5 bg-blue-600"></div>
            </div>
            <button className="flex items-center text-blue-600 font-semibold text-sm hover:gap-1 transition-all">
              VIEW ALL <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cat.subcategories
              .flatMap((s) => s.products)
              .slice(0, 4)
              .map((product) => (
                <div
                  key={product.name}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                >
                  {/* 1:1 Square Image with Floating Effect */}
                  <div className="aspect-square bg-[#f9f9f9] overflow-hidden p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Minimalist Footer */}
                  <div className="p-3 space-y-2">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-700 line-clamp-2 h-10">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-gray-900 text-sm sm:text-base">
                        KSh {product.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleAdd(product.name, product.price)}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 active:scale-90 transition-all shadow-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg">Your Cart ({count})</h3>
              <button onClick={() => setCartOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-blue-600 font-bold">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQty(item.name, -1)}
                      className="p-1 border rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.name, 1)}
                      className="p-1 border rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item.name)}
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t space-y-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-blue-600">
                  KSh {total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={checkout}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> Checkout via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShopSection;
