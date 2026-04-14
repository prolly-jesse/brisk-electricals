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
  Maximize2,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// --- 1. ASSET IMPORTS ---
import imgDemo1 from "@/assets/imgdemo.jpg";
import imgDemo2 from "@/assets/imgdemo2.jpg";

// --- 2. FULL CATALOG DATA (RESTORED) ---
const catalogData = [
  {
    name: "Instant Showers",
    subcategories: [
      {
        name: "Salty Water Showers",
        products: [
          {
            sku: "ISH-SLT-STD",
            name: "Salty Water Instant Shower – Standard",
            price: 10500,
            mainImage: imgDemo1,
            images: [imgDemo1, imgDemo2],
            desc: "Durable design specifically engineered for salty water regions. Features long-lasting heating elements.",
          },
          {
            sku: "ISH-SLT-PRM",
            name: "Salty Water Instant Shower – Premium",
            price: 13500,
            mainImage: imgDemo2,
            images: [imgDemo2, imgDemo1],
            desc: "Premium grade shower with multi-temperature settings and enhanced durability for mineral-rich water.",
          },
        ],
      },
      {
        name: "Fresh Water Showers",
        products: [
          {
            sku: "ISH-FRSH-EC",
            name: "Fresh Water Instant Shower – Economy",
            price: 10500,
            mainImage: imgDemo1,
            images: [imgDemo1],
            desc: "Efficient heating for fresh water systems. Quick installation and energy-saving.",
          },
          {
            sku: "ISH-FRSH-SV",
            name: "Fresh Water Instant Shower – Swivel Head",
            price: 12000,
            mainImage: imgDemo2,
            images: [imgDemo2],
            desc: "Features a flexible swivel head for better coverage and modern bathroom aesthetics.",
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
            sku: "LGT-CHND-6",
            name: "Crystal Chandelier – 6 Arm",
            price: 18500,
            mainImage: imgDemo1,
            images: [imgDemo1, imgDemo2],
            desc: "Elegant 6-arm crystal design. Ideal for living rooms and high-ceiling foyers.",
          },
          {
            sku: "LGT-CHND-RNG",
            name: "Modern Ring Chandelier LED",
            price: 14200,
            mainImage: imgDemo2,
            images: [imgDemo2],
            desc: "Minimalist ring LED chandelier. Adjustable height and warm white illumination.",
          },
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
          {
            sku: "LGT-PROF-12",
            name: "LED Profile Light 1.2M",
            price: 3500,
            mainImage: imgDemo1,
            images: [imgDemo1],
            desc: "Sleek aluminum profile for modern strip lighting integration.",
          },
        ],
      },
      {
        name: "Bulbs",
        products: [
          {
            sku: "BLB-LED-12",
            name: "LED Bulb 12W – Warm White",
            price: 350,
            mainImage: imgDemo2,
            images: [imgDemo2],
            desc: "Energy-efficient 12W LED bulb with standard E27 base.",
          },
          {
            sku: "BLB-FIL-E27",
            name: "LED Filament Bulb – E27",
            price: 550,
            mainImage: imgDemo1,
            images: [imgDemo1],
            desc: "Vintage style filament bulb for decorative fixtures.",
          },
        ],
      },
      {
        name: "Spotlights",
        products: [
          {
            sku: "LGT-SPOT-18",
            name: "Recessed LED Downlight 18W",
            price: 1500,
            mainImage: imgDemo2,
            images: [imgDemo2],
            desc: "Flush mount spotlight for clean ceiling designs.",
          },
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
            sku: "OUT-SOL-SET",
            name: "Outdoor Solar Garden Light Set",
            price: 3200,
            mainImage: imgDemo1,
            images: [imgDemo1],
            desc: "Weatherproof garden lights for walkways and landscaping.",
          },
        ],
      },
      {
        name: "Home Security Fixtures",
        products: [
          {
            sku: "SEC-FLD-50",
            name: "Motion Sensor Floodlight 50W",
            price: 4500,
            mainImage: imgDemo2,
            images: [imgDemo2],
            desc: "High-power floodlight with PIR sensor for perimeter security.",
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
          {
            sku: "VIP-GLD-S",
            name: "13A Single Luxury Glass Gold",
            price: 850,
            mainImage: imgDemo1,
            images: [imgDemo1],
            desc: "Luxury tempered glass finish with gold accents. VIP Series.",
          },
          {
            sku: "VIP-GLD-T",
            name: "13A Twin Luxury Glass Gold",
            price: 1850,
            mainImage: imgDemo2,
            images: [imgDemo2],
            desc: "Twin socket luxury glass finish. Durable and easy to clean.",
          },
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
          {
            sku: "ACC-STRP-5",
            name: "LED Strip Light Kit 5M",
            price: 2500,
            mainImage: imgDemo1,
            images: [imgDemo1],
            desc: "Complete 5M strip kit with adhesive backing and power adapter.",
          },
        ],
      },
      {
        name: "Cables",
        products: [
          {
            sku: "CBL-2.5-100",
            name: "Twin & Earth Cable 2.5mm – 100M",
            price: 8500,
            mainImage: imgDemo2,
            images: [imgDemo2],
            desc: "Standard 2.5mm electrical cable for household wiring.",
          },
        ],
      },
      {
        name: "Circuit Protection",
        products: [
          {
            sku: "CIR-MCB-20",
            name: "MCB 20A Single Pole",
            price: 650,
            mainImage: imgDemo1,
            images: [imgDemo1],
            desc: "Reliable circuit breaker for domestic protection.",
          },
          {
            sku: "CIR-CU-12",
            name: "Consumer Unit 12-Way",
            price: 4500,
            mainImage: imgDemo2,
            images: [imgDemo2],
            desc: "12-way distribution board for centralized circuit control.",
          },
        ],
      },
    ],
  },
];

const ShopSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const { items, addItem, removeItem, updateQty, total, count } = useCart();

  // --- ACTIONS ---
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

  // --- DATA DERIVATION ---
  const allProducts = useMemo(
    () =>
      catalogData.flatMap((cat) =>
        cat.subcategories.flatMap((sub) => sub.products)
      ),
    []
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
          className={`pointer-events-auto flex items-center bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-xl rounded-full transition-all duration-300 ${
            searchOpen
              ? "w-56 px-4 py-2"
              : "w-0 px-0 py-0 border-none opacity-0"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
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

      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 dark:bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}

      <div className="mt-8">
        {selectedProduct ? (
          /* LEVEL 3: PRODUCT DETAIL */
          <div className="animate-in fade-in duration-500 space-y-12">
            <div className="flex items-center justify-between border-b dark:border-neutral-800 pb-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-2 text-gray-400 dark:text-neutral-500 text-[11px] font-black uppercase tracking-widest hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to catalog
              </button>
              <span className="text-[10px] font-black text-gray-300 dark:text-neutral-800 tracking-tighter">
                REF: {selectedProduct.sku}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                <div className="aspect-square bg-[#fbfbfb] dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 p-8 rounded-sm flex items-center justify-center">
                  <img
                    src={selectedProduct.mainImage}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {selectedProduct.images
                    .slice(0, 2)
                    .map((img: any, i: number) => (
                      <div
                        key={i}
                        className="aspect-video bg-[#fbfbfb] dark:bg-neutral-900 border dark:border-neutral-800 p-4 rounded-sm flex items-center justify-center"
                      >
                        <img
                          src={img}
                          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-950 dark:text-neutral-100 leading-[0.9]">
                    {selectedProduct.name}
                  </h1>
                  <p className="font-black text-5xl tracking-tighter text-blue-600 dark:text-neutral-100">
                    KSh {selectedProduct.price.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleAdd(
                      selectedProduct.name,
                      selectedProduct.price,
                      selectedProduct.mainImage
                    )
                  }
                  className="w-full bg-blue-600 hover:bg-black dark:hover:bg-white dark:hover:text-black text-white py-6 rounded-sm font-black text-[13px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95"
                >
                  Add to Your Order
                </button>

                <div className="border-t dark:border-neutral-800 pt-6">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    Specifications
                  </h4>
                  <p className="text-[11px] font-bold text-gray-600 dark:text-neutral-400 uppercase leading-relaxed tracking-wide">
                    {selectedProduct.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* MAIN GRID VIEW */
          <>
            {searchQuery ? (
              <div className="animate-in fade-in">
                <h2 className="text-2xl font-black uppercase text-gray-950 dark:text-neutral-100 mb-8 tracking-tighter">
                  Search Results ({searchResults.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {searchResults.map((p) => (
                    <ProductCard
                      key={p.sku || p.name}
                      product={p}
                      onAdd={handleAdd}
                      onSelect={() => setSelectedProduct(p)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {activeCategory ? (
                  <div className="animate-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between mb-8">
                      <button
                        onClick={() => {
                          setActiveCategory(null);
                          setActiveSub("All");
                        }}
                        className="flex items-center gap-2 text-gray-400 dark:text-neutral-500 text-[11px] font-black uppercase tracking-widest"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-gray-950 dark:text-neutral-100">
                        {activeCategory}
                      </h2>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-8 no-scrollbar">
                      {[
                        "All",
                        ...(currentCategoryData?.subcategories.map(
                          (s) => s.name
                        ) || []),
                      ].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setActiveSub(sub)}
                          className={`px-6 py-3 text-[10px] font-black uppercase border rounded-sm transition-all ${
                            activeSub === sub
                              ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                              : "bg-white dark:bg-neutral-900 border-gray-100 dark:border-neutral-800 text-gray-400 dark:text-neutral-500"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filteredProducts.map((p) => (
                        <ProductCard
                          key={p.sku || p.name}
                          product={p}
                          onAdd={handleAdd}
                          onSelect={() => setSelectedProduct(p)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-24">
                    {catalogData.map((cat) => (
                      <div key={cat.name}>
                        <div className="flex items-end justify-between mb-8 border-b-2 border-gray-100 dark:border-neutral-800 pb-3">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
                            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-gray-950 dark:text-neutral-100">
                              {cat.name}
                            </h2>
                          </div>
                          <button
                            onClick={() => {
                              setActiveCategory(cat.name);
                              setSearchQuery("");
                            }}
                            className="text-blue-600 font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-1 hover:gap-3 transition-all"
                          >
                            EXPLORE <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {cat.subcategories
                            .flatMap((s) => s.products)
                            .slice(0, 4)
                            .map((p) => (
                              <ProductCard
                                key={p.sku || p.name}
                                product={p}
                                onAdd={handleAdd}
                                onSelect={() => setSelectedProduct(p)}
                              />
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
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
            <div className="p-8 border-b dark:border-neutral-800 flex items-center justify-between mt-16 md:mt-20">
              <h3 className="font-black text-[12px] uppercase dark:text-neutral-100 tracking-widest">
                Cart Summary ({count})
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300 opacity-20">
                  <ShoppingCart className="w-16 h-16 mb-4" />
                  <p className="text-[11px] font-black uppercase tracking-widest">
                    Empty
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between bg-white dark:bg-neutral-800 p-3 rounded-sm border border-gray-100 dark:border-neutral-700 shadow-sm"
                  >
                    <div className="flex-1 pr-4">
                      <p className="text-[11px] font-bold line-clamp-2 uppercase dark:text-neutral-200 leading-tight mb-1">
                        {item.name}
                      </p>
                      <p className="text-blue-600 font-black text-xs">
                        KSh {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-neutral-950 p-2 rounded">
                      <button
                        onClick={() => updateQty(item.name, -1)}
                        className="p-1 dark:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[11px] font-black dark:text-white min-w-[14px] text-center">
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

            <div className="p-8 border-t dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 space-y-6 pb-16">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Subtotal
                </span>
                <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                  KSh {total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={checkout}
                disabled={items.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-sm font-black flex items-center justify-center gap-3 text-[12px] uppercase tracking-widest shadow-lg active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> Checkout on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ProductCard = ({
  product,
  onAdd,
  onSelect,
}: {
  product: any;
  onAdd: any;
  onSelect: any;
}) => (
  <div
    onClick={onSelect}
    className="group bg-white dark:bg-neutral-900 rounded-sm border border-gray-100 dark:border-neutral-800/50 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1.5"
  >
    <div className="aspect-square bg-[#fbfbfb] dark:bg-neutral-800/20 overflow-hidden p-6 relative flex items-center justify-center border-b dark:border-neutral-800/50">
      <img
        src={product.mainImage || product.image}
        alt={product.name}
        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-3 right-3 bg-white/80 dark:bg-black/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
        <Maximize2 className="w-3 h-3 text-blue-600" />
      </div>
    </div>
    <div className="p-4 flex flex-col flex-1">
      <h3 className="text-[11px] font-bold text-gray-700 dark:text-neutral-300 line-clamp-2 leading-tight min-h-[2rem] mb-3 uppercase tracking-tight">
        {product.name}
      </h3>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-black text-gray-950 dark:text-neutral-100 text-[12px] tracking-tighter">
          KSh {product.price.toLocaleString()}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(
              product.name,
              product.price,
              product.mainImage || product.image
            );
          }}
          className="bg-blue-600 text-white p-2.5 rounded-sm active:scale-90 transition-all shadow-md relative z-10 hover:bg-black dark:hover:bg-white dark:hover:text-black"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default ShopSection;
