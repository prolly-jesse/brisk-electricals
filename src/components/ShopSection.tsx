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
  Search,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// --- 1. ASSET IMPORTS ---
import imgDemo1 from "@/assets/imgdemo.jpg";
import imgDemo2 from "@/assets/imgdemo2.jpg";

// --- 2. CATALOG DATA ---
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const { items, addItem, removeItem, updateQty, total, count } = useCart();

  // --- HANDLERS ---
  const handleAdd = (name: string, price: number, image: string) => {
    addItem({ name, price, image }, 1);
    setToast(`${name.substring(0, 15)}... added`);
    setTimeout(() => setToast(null), 2000);
  };

  const checkout = () => {
    const itemsList = items.map((i) => `${i.qty}x ${i.name}`).join("\n");
    const msg = `Hi Brisk Electricals, I'd like to order:\n\n${itemsList}\n\nTotal: KSh ${total}`;
    window.open(
      `https://wa.me/254722648765?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  // --- DERIVED STATE ---
  const allProducts = useMemo(
    () =>
      catalogData.flatMap((cat) =>
        cat.subcategories.flatMap((sub) => sub.products)
      ),
    []
  );

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return allProducts.filter((p) => p.name.toLowerCase().includes(query));
  }, [searchQuery, allProducts]);

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

  return (
    <section
      id="shop"
      className="py-6 px-4 max-w-7xl mx-auto min-h-screen relative bg-white dark:bg-black transition-colors duration-500"
    >
      {/* --- TOP CONTROLS --- */}
      <div className="sticky top-4 z-40 flex justify-end items-center gap-3 pr-2 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-xl rounded-full overflow-hidden transition-all duration-300 ${
            searchOpen
              ? "w-56 px-4 py-2"
              : "w-0 px-0 py-0 border-none opacity-0"
          }`}
        >
          <input
            type="text"
            placeholder="Search items..."
            className="text-[11px] font-black uppercase w-full bg-transparent outline-none text-gray-800 dark:text-neutral-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button
          onClick={() => {
            setSearchOpen(!searchOpen);
            if (searchOpen) setSearchQuery("");
          }}
          className="pointer-events-auto bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 text-gray-800 dark:text-neutral-200 p-3 rounded-full shadow-lg active:scale-90 transition-all"
        >
          {searchOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={() => setCartOpen(true)}
          className="pointer-events-auto bg-black dark:bg-blue-600 text-white p-3 rounded-full shadow-lg relative active:scale-90 transition-all"
        >
          <ShoppingCart className="w-5 h-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 dark:bg-white dark:text-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-black">
              {count}
            </span>
          )}
        </button>
      </div>

      {/* --- TOAST --- */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 dark:bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}

      <div className="mt-8">
        {searchQuery ? (
          <div className="animate-in fade-in">
            <h2 className="text-[11px] font-black uppercase text-gray-400 dark:text-neutral-600 mb-6 border-b dark:border-neutral-800 pb-2 flex justify-between">
              Found ({searchResults.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {searchResults.map((p) => (
                <ProductCard key={p.name} product={p} onAdd={handleAdd} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {activeCategory ? (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => {
                      setActiveCategory(null);
                      setActiveSub("All");
                    }}
                    className="flex items-center gap-2 text-gray-400 dark:text-neutral-500 text-[11px] font-black uppercase tracking-widest transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <h2 className="text-sm font-black uppercase tracking-tighter text-gray-900 dark:text-neutral-100">
                    {activeCategory}
                  </h2>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
                  {[
                    "All",
                    ...(currentCategoryData?.subcategories.map((s) => s.name) ||
                      []),
                  ].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setActiveSub(sub)}
                      className={`px-4 py-2 text-[10px] font-black uppercase border rounded-sm transition-all ${
                        activeSub === sub
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "bg-white dark:bg-neutral-900 border-gray-100 dark:border-neutral-800 text-gray-400 dark:text-neutral-500"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {filteredProducts.map((p) => (
                    <ProductCard key={p.name} product={p} onAdd={handleAdd} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {catalogData.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-end justify-between mb-4 border-b border-gray-100 dark:border-neutral-800 pb-1">
                      <div className="relative">
                        <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-gray-900 dark:text-neutral-100">
                          {cat.name}
                        </h2>
                        <div className="absolute -bottom-[5px] left-0 w-8 h-0.5 bg-blue-600"></div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveCategory(cat.name);
                          setSearchQuery("");
                        }}
                        className="text-blue-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        EXPLORE <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {cat.subcategories
                        .flatMap((s) => s.products)
                        .slice(0, 4)
                        .map((p) => (
                          <ProductCard
                            key={p.name}
                            product={p}
                            onAdd={handleAdd}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* --- CART DRAWER --- */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative w-full max-w-[340px] bg-white dark:bg-neutral-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-6 border-b dark:border-neutral-800 flex items-center justify-between mt-16 md:mt-20">
              <h3 className="font-black text-xs uppercase tracking-widest dark:text-neutral-100">
                Order List ({count})
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300 opacity-20">
                  <ShoppingCart className="w-12 h-12 mb-3" />
                  <p className="text-[10px] font-black uppercase">Empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between bg-white dark:bg-neutral-800 p-2 rounded-sm border border-gray-100 dark:border-neutral-700 shadow-sm"
                  >
                    <div className="flex-1 pr-3">
                      <p className="text-[10px] font-bold line-clamp-2 uppercase dark:text-neutral-200 leading-tight">
                        {item.name}
                      </p>
                      <p className="text-blue-600 font-black text-xs">
                        KSh {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-950 p-1 rounded">
                      <button
                        onClick={() => updateQty(item.name, -1)}
                        className="p-1 dark:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[10px] font-black dark:text-white min-w-[12px] text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.name, 1)}
                        className="p-1 dark:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.name)}
                        className="text-red-500 ml-1 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 space-y-4 pb-12">
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Total
                </span>
                <span className="text-lg font-black text-gray-900 dark:text-white">
                  KSh {total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={checkout}
                disabled={items.length === 0}
                className="w-full bg-green-600 text-white py-4 rounded-sm font-black flex items-center justify-center gap-3 text-[11px] uppercase shadow-lg active:scale-95 transition-transform"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Order
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// --- PRODUCT CARD COMPONENT ---
const ProductCard = ({ product, onAdd }: { product: any; onAdd: any }) => (
  <div className="group bg-white dark:bg-neutral-900 rounded-sm border border-gray-100 dark:border-neutral-800/50 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
    <div className="aspect-square bg-[#fbfbfb] dark:bg-neutral-800/20 overflow-hidden p-4 relative flex items-center justify-center border-b dark:border-neutral-800/50">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-2.5 flex flex-col flex-1">
      <h3 className="text-[10px] font-bold text-gray-700 dark:text-neutral-300 line-clamp-2 leading-tight min-h-[1.5rem] mb-2 uppercase tracking-tight">
        {product.name}
      </h3>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-black text-gray-900 dark:text-neutral-100 text-[11px] tracking-tighter">
          KSh {product.price.toLocaleString()}
        </span>
        <button
          onClick={() => onAdd(product.name, product.price, product.image)}
          className="bg-blue-600 text-white p-2 rounded-sm active:scale-90 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default ShopSection;
