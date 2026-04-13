import { useState } from "react";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  X,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// --- TUNGSTEN CATALOG DATA WITH LOCAL ASSETS ---
const catalogData = [
  {
    name: "Instant Showers",
    subcategories: [
      {
        name: "Salty Water Showers",
        products: [
          {
            name: "Vezor Tankless Salty Water Heater + Rainshower",
            price: 22500,
            image: "@/assets/imgdemo.jpg",
          },
          {
            name: "White Cesium T02 Tankless Heater with Pump",
            price: 15500,
            image: "@/assets/imgdemo2.jpg",
          },
          {
            name: "Vezor Salty Water Heater + Square Showerhead",
            price: 22000,
            image: "@/assets/imgdemo.jpg",
          },
          {
            name: "Vezor Black Rainshower Salty Water Edition",
            price: 25500,
            image: "@/assets/imgdemo2.jpg",
          },
        ],
      },
    ],
  },
  {
    name: "Decorative Lights",
    subcategories: [
      {
        name: "Chandeliers & Pendants",
        products: [
          {
            name: "Modern Ring LED Chandelier",
            price: 14200,
            image: "@/assets/imgdemo.jpg",
          },
          {
            name: "Modern Geometric Pendant Light",
            price: 8500,
            image: "@/assets/imgdemo2.jpg",
          },
          {
            name: "7 Head LED Low Ceiling Lamp",
            price: 9500,
            image: "@/assets/imgdemo.jpg",
          },
          {
            name: "3 Light Wood Color Resin Pendant",
            price: 10500,
            image: "@/assets/imgdemo2.jpg",
          },
        ],
      },
    ],
  },
  {
    name: "Sockets & Switches",
    subcategories: [
      {
        name: "VIP & Standard",
        products: [
          {
            name: "Ultra Thin 45A DP Shower Switch VIP",
            price: 650,
            image: "@/assets/imgdemo.jpg",
          },
          {
            name: "Luxury Two Tone Black Cooker Socket",
            price: 1200,
            image: "@/assets/imgdemo2.jpg",
          },
          {
            name: "Big Button 3-Gang Luxury Switch",
            price: 300,
            image: "@/assets/imgdemo.jpg",
          },
          {
            name: "Waterproof Twin Outdoor Socket",
            price: 1800,
            image: "@/assets/imgdemo2.jpg",
          },
        ],
      },
    ],
  },
];

const ShopSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  const currentCategoryData = catalogData.find(
    (c) => c.name === activeCategory
  );
  const allProductsForActive = currentCategoryData
    ? currentCategoryData.subcategories.flatMap((s) => s.products)
    : [];

  return (
    <section id="shop" className="py-1 px-3 max-w-7xl mx-auto min-h-screen">
      {activeCategory ? (
        <div className="animate-in fade-in duration-500">
          <button
            onClick={() => setActiveCategory(null)}
            className="flex items-center gap-1 text-gray-400 hover:text-blue-600 mb-3 text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back Home
          </button>
          <div className="relative mb-6">
            <h2 className="text-lg font-black uppercase tracking-tighter text-gray-900">
              {activeCategory}
            </h2>
            <div className="w-8 h-1 bg-blue-600 mt-1"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {allProductsForActive.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                onAdd={handleAdd}
              />
            ))}
          </div>
        </div>
      ) : (
        catalogData.map((cat) => (
          <div key={cat.name} className="mb-6">
            <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-1">
              <div className="relative">
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-gray-900">
                  {cat.name}
                </h2>
                <div className="absolute -bottom-[5px] left-0 w-6 h-0.5 bg-blue-600"></div>
              </div>
              <button
                onClick={() => setActiveCategory(cat.name)}
                className="flex items-center text-blue-600 font-black text-[9px] tracking-widest hover:gap-1 transition-all"
              >
                EXPLORE <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {cat.subcategories
                .flatMap((s) => s.products)
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    onAdd={handleAdd}
                  />
                ))}
            </div>
          </div>
        ))
      )}

      {/* --- CART DRAWER --- */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative w-full max-w-[320px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-black text-sm uppercase tracking-tight">
                Cart ({count})
              </h3>
              <button onClick={() => setCartOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-100"
                >
                  <div className="flex-1 pr-2">
                    <p className="text-[10px] font-bold line-clamp-1 uppercase text-gray-600">
                      {item.name}
                    </p>
                    <p className="text-blue-600 font-black text-xs">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQty(item.name, -1)}
                      className="p-1 border rounded bg-white"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="text-[10px] font-black">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.name, 1)}
                      className="p-1 border rounded bg-white"
                    >
                      <Plus className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={() => removeItem(item.name)}
                      className="text-red-400 pl-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t space-y-3">
              <div className="flex justify-between font-black text-xs uppercase">
                <span>Total:</span>
                <span className="text-blue-600">
                  KSh {total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={checkout}
                className="w-full bg-green-600 text-white py-3 rounded font-black flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// --- ULTRA COMPACT PRODUCT CARD ---
const ProductCard = ({ product, onAdd }: { product: any; onAdd: any }) => (
  <div className="group bg-white rounded-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
    <div className="aspect-square bg-[#fbfbfb] overflow-hidden p-1.5 relative flex items-center justify-center border-b border-gray-50">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div className="p-1.5 sm:p-2 flex flex-col flex-1">
      <h3 className="text-[10px] sm:text-[11px] font-bold text-gray-700 line-clamp-2 leading-[1.2] min-h-[1.5rem] mb-1">
        {product.name}
      </h3>

      <div className="flex items-center justify-between mt-auto">
        <span className="font-black text-gray-900 text-[11px] sm:text-xs tracking-tighter">
          KSh {product.price.toLocaleString()}
        </span>
        <button
          onClick={() => onAdd(product.name, product.price)}
          className="bg-blue-600 text-white p-1.5 rounded-sm hover:bg-black active:scale-90 transition-all shadow-sm shrink-0"
        >
          <ShoppingCart className="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
);

export default ShopSection;
