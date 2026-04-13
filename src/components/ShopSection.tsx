import { useState, useMemo } from "react";
import {
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

// --- 1. IMAGE IMPORTS ---
import imgDemo1 from "@/assets/imgdemo.jpg";
import imgDemo2 from "@/assets/imgdemo2.jpg";

// --- 2. FULL NESTED CATALOG DATA ---
const catalogData = [
  {
    name: "Instant Showers",
    subcategories: [
      {
        name: "Salty Water Showers",
        products: [
          {
            name: "Salty Water Instant Shower – Standard",
            price: 10500,
            image: imgDemo1,
          },
          {
            name: "Salty Water Instant Shower – Premium",
            price: 13500,
            image: imgDemo2,
          },
        ],
      },
      {
        name: "Fresh Water Showers",
        products: [
          {
            name: "Fresh Water Instant Shower – Economy",
            price: 10500,
            image: imgDemo1,
          },
          {
            name: "Fresh Water Instant Shower – Swivel Head",
            price: 12000,
            image: imgDemo2,
          },
        ],
      },
      {
        name: "Shower Accessories",
        products: [
          { name: "Universal Shower Hose 1.5M", price: 850, image: imgDemo1 },
          { name: "Shower Head Holder – Chrome", price: 650, image: imgDemo2 },
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
          { name: "Crystal Chandelier – 6 Arm", price: 18500, image: imgDemo1 },
          { name: "Modern Ring Chandelier LED", price: 14200, image: imgDemo2 },
        ],
      },
      {
        name: "Pendant Lights",
        products: [
          {
            name: "Modern Pendant Ceiling Light",
            price: 4500,
            image: imgDemo1,
          },
          {
            name: "Industrial Pendant Light – Black",
            price: 3800,
            image: imgDemo2,
          },
        ],
      },
      {
        name: "Wall Lights",
        products: [
          {
            name: "LED Wall Sconce – Warm White",
            price: 2800,
            image: imgDemo1,
          },
          { name: "Outdoor Wall Light – IP65", price: 3200, image: imgDemo2 },
        ],
      },
    ],
  },
  {
    name: "Indoor Ceiling Lighting",
    subcategories: [
      {
        name: "Profile Lighting",
        products: [
          { name: "LED Profile Light 1.2M", price: 3500, image: imgDemo1 },
        ],
      },
      {
        name: "Bulbs",
        products: [
          { name: "LED Bulb 12W – Warm White", price: 350, image: imgDemo2 },
          { name: "LED Filament Bulb – E27", price: 550, image: imgDemo1 },
        ],
      },
      {
        name: "Spotlights",
        products: [
          { name: "Recessed LED Downlight 18W", price: 1500, image: imgDemo2 },
        ],
      },
      {
        name: "Track & Downlights",
        products: [
          { name: "LED Tracklight 30W – Black", price: 2800, image: imgDemo1 },
          { name: "Surface Mount Downlight 24W", price: 1800, image: imgDemo2 },
        ],
      },
    ],
  },
  {
    name: "Outdoor Lighting",
    subcategories: [
      {
        name: "Electric Outdoor Lights",
        products: [
          {
            name: "Outdoor Solar Garden Light Set",
            price: 3200,
            image: imgDemo1,
          },
        ],
      },
      {
        name: "Home Security Fixtures",
        products: [
          {
            name: "Motion Sensor Floodlight 50W",
            price: 4500,
            image: imgDemo2,
          },
        ],
      },
      {
        name: "Solar Outdoor Lights",
        products: [
          {
            name: "Solar Path Light – Pack of 4",
            price: 2200,
            image: imgDemo1,
          },
        ],
      },
    ],
  },
  {
    name: "Sockets & Switches",
    subcategories: [
      {
        name: "VIP Sockets & Switches",
        products: [
          { name: "13A Single Luxury Glass Gold", price: 850, image: imgDemo1 },
          { name: "13A Twin Luxury Glass Gold", price: 1850, image: imgDemo2 },
        ],
      },
      {
        name: "Standard Sockets",
        products: [
          { name: "Smart Dimmer Switch", price: 1800, image: imgDemo1 },
          { name: "Gang Socket Extension", price: 950, image: imgDemo2 },
        ],
      },
    ],
  },
  {
    name: "Electrical Fittings",
    subcategories: [
      {
        name: "Accessories",
        products: [
          { name: "LED Strip Light Kit 5M", price: 2500, image: imgDemo1 },
        ],
      },
      {
        name: "Cables",
        products: [
          {
            name: "Twin & Earth Cable 2.5mm – 100M",
            price: 8500,
            image: imgDemo2,
          },
        ],
      },
      {
        name: "Circuit Protection",
        products: [
          { name: "MCB 20A Single Pole", price: 650, image: imgDemo1 },
          { name: "Consumer Unit 12-Way", price: 4500, image: imgDemo2 },
        ],
      },
    ],
  },
];

const ShopSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { items, addItem, removeItem, updateQty, total, count } = useCart();

  const handleAdd = (name: string, price: number, image: string) => {
    addItem({ name, price, image }, 1);
    setToast(`${name.substring(0, 15)}... added`);
    setTimeout(() => setToast(null), 2000);
  };

  const currentCategoryData = useMemo(
    () => catalogData.find((c) => c.name === activeCategory),
    [activeCategory]
  );

  const filteredProducts = useMemo(() => {
    if (!currentCategoryData) return [];
    if (activeSub === "All")
      return currentCategoryData.subcategories.flatMap((s) => s.products);
    return (
      currentCategoryData.subcategories.find((s) => s.name === activeSub)
        ?.products || []
    );
  }, [currentCategoryData, activeSub]);

  const checkout = () => {
    const itemsList = items.map((i) => `${i.qty}x ${i.name}`).join("\n");
    const msg = `Hi Brisk Electricals, I'd like to order:\n\n${itemsList}\n\nTotal: KSh ${total}`;
    window.open(
      `https://wa.me/254722648765?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <section
      id="shop"
      className="py-2 px-3 max-w-7xl mx-auto min-h-screen relative"
    >
      {/* --- FLOATING CART ICON --- */}
      <div className="sticky top-4 z-40 flex justify-end pr-2 pointer-events-none">
        <button
          onClick={() => setCartOpen(true)}
          className="pointer-events-auto bg-black text-white p-3 rounded-full shadow-2xl relative active:scale-95 transition-transform"
        >
          <ShoppingCart className="w-5 h-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {count}
            </span>
          )}
        </button>
      </div>

      {/* --- TOAST NOTIFICATION --- */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-gray-900/90 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}

      {activeCategory ? (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 pt-2">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                setActiveCategory(null);
                setActiveSub("All");
              }}
              className="flex items-center gap-1 text-gray-400 hover:text-blue-600 text-[10px] font-bold uppercase tracking-widest"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
            <h2 className="text-sm font-black uppercase tracking-tighter text-gray-900">
              {activeCategory}
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {[
              "All",
              ...(currentCategoryData?.subcategories.map((s) => s.name) || []),
            ].map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSub(sub)}
                className={`px-3 py-1.5 whitespace-nowrap text-[10px] font-black uppercase tracking-widest border transition-all ${
                  activeSub === sub
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-100 text-gray-400 hover:border-gray-300"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {filteredProducts.map((p) => (
              <ProductCard key={p.name} product={p} onAdd={handleAdd} />
            ))}
          </div>
        </div>
      ) : (
        <div className="pt-2">
          {catalogData.map((cat) => (
            <div key={cat.name} className="mb-8">
              <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-1">
                <div className="relative">
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-gray-900">
                    {cat.name}
                  </h2>
                  <div className="absolute -bottom-[5px] left-0 w-8 h-0.5 bg-blue-600"></div>
                </div>
                <button
                  onClick={() => setActiveCategory(cat.name)}
                  className="flex items-center text-blue-600 font-black text-[9px] tracking-widest hover:gap-1"
                >
                  EXPLORE <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {cat.subcategories
                  .flatMap((s) => s.products)
                  .slice(0, 4)
                  .map((p) => (
                    <ProductCard key={p.name} product={p} onAdd={handleAdd} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- CART DRAWER WITH "X" CLOSE --- */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px] cursor-pointer"
            onClick={() => setCartOpen(false)}
          />

          <div className="relative w-full max-w-[340px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header with X Close */}
            <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
                <h3 className="font-black text-xs uppercase tracking-widest">
                  My Order ({count})
                </h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-black" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300">
                  <ShoppingCart className="w-12 h-12 mb-3 opacity-10" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                    Cart is Empty
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-4 text-blue-600 text-[9px] font-black uppercase tracking-widest hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between bg-white p-2 rounded-sm border border-gray-100 shadow-sm"
                  >
                    <div className="flex-1 pr-3">
                      <p className="text-[10px] font-bold line-clamp-2 uppercase text-gray-800 leading-tight mb-1">
                        {item.name}
                      </p>
                      <p className="text-blue-600 font-black text-xs">
                        KSh {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded">
                      <button
                        onClick={() => updateQty(item.name, -1)}
                        className="p-1 hover:text-blue-600 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[10px] font-black min-w-[12px] text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.name, 1)}
                        className="p-1 hover:text-blue-600 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <div className="w-[1px] h-3 bg-gray-200 mx-1" />
                      <button
                        onClick={() => removeItem(item.name)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            <div className="p-4 border-t bg-gray-50 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Total Amount
                </span>
                <span className="text-lg font-black text-gray-900 tracking-tighter">
                  KSh {total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={checkout}
                disabled={items.length === 0}
                className="w-full bg-green-600 disabled:bg-gray-300 text-white py-4 rounded-sm font-black flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.15em] hover:bg-green-700 transition-all shadow-lg active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" /> Send to WhatsApp
              </button>
              <p className="text-[8px] text-center text-gray-400 font-bold uppercase tracking-tight">
                Finalizing this will open WhatsApp to complete payment.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// --- PRODUCT CARD COMPONENT ---
const ProductCard = ({ product, onAdd }: { product: any; onAdd: any }) => (
  <div className="group bg-white rounded-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
    <div className="aspect-square bg-[#fbfbfb] overflow-hidden p-2 relative flex items-center justify-center border-b border-gray-50">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-1.5 flex flex-col flex-1">
      <h3 className="text-[10px] font-bold text-gray-700 line-clamp-2 leading-[1.2] min-h-[1.5rem] mb-1 uppercase">
        {product.name}
      </h3>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-black text-gray-900 text-[11px] tracking-tighter">
          KSh {product.price.toLocaleString()}
        </span>
        <button
          onClick={() => onAdd(product.name, product.price, product.image)}
          className="bg-blue-600 text-white p-1.5 rounded-sm hover:bg-black active:scale-95 transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
);

export default ShopSection;
