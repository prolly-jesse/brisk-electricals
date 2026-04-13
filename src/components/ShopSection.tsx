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

// --- 1. LOCAL IMAGE ASSET IMPORTS ---
import imgDemo1 from "@/assets/imgdemo.jpg";
import imgDemo2 from "@/assets/imgdemo2.jpg";

// ... (catalogData remains the same as before)

const ShopSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const { items, addItem, removeItem, updateQty, total, count } = useCart();

  const handleAdd = (name: string, price: number, image: string) => {
    addItem({ name, price, image }, 1);
    setToast(`${name.substring(0, 15)}... added`);
    setTimeout(() => setToast(null), 2000);
  };

  const allProducts = useMemo(
    () =>
      catalogData.flatMap((cat) =>
        cat.subcategories.flatMap((sub) => sub.products)
      ),
    []
  );

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
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
      className="py-2 px-3 max-w-7xl mx-auto min-h-screen relative bg-white dark:bg-black transition-colors duration-300"
    >
      {/* --- STICKY TOP CONTROLS --- */}
      <div className="sticky top-4 z-40 flex justify-end items-center gap-2 pr-2 pointer-events-none">
        {/* Search Input - Dark Mode Ready */}
        <div
          className={`pointer-events-auto flex items-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl rounded-full overflow-hidden transition-all duration-300 ${
            searchOpen ? "w-48 px-3 py-1" : "w-0 px-0 py-0 border-none"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            className="text-[10px] font-bold uppercase w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus={searchOpen}
          />
        </div>

        {/* Search Toggle */}
        <button
          onClick={() => {
            setSearchOpen(!searchOpen);
            if (searchOpen) setSearchQuery("");
          }}
          className="pointer-events-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-2xl active:scale-95 transition-transform"
        >
          {searchOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>

        {/* Cart Button */}
        <button
          onClick={() => setCartOpen(true)}
          className="pointer-events-auto bg-black dark:bg-blue-600 text-white p-3 rounded-full shadow-2xl relative active:scale-95 transition-transform"
        >
          <ShoppingCart className="w-5 h-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 dark:bg-white dark:text-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
              {count}
            </span>
          )}
        </button>
      </div>

      {/* --- TOAST --- */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 dark:bg-blue-600 text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}

      {/* --- CONTENT AREA --- */}
      {searchQuery ? (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300 pt-2 mb-10">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 border-b dark:border-gray-800 pb-2">
            Results for: {searchQuery}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {searchResults.map((p) => (
              <ProductCard key={p.name} product={p} onAdd={handleAdd} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {activeCategory ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 pt-2">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => {
                    setActiveCategory(null);
                    setActiveSub("All");
                  }}
                  className="flex items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 text-[10px] font-bold uppercase tracking-widest"
                >
                  <ArrowLeft className="w-3 h-3" /> Back
                </button>
                {/* CATEGORY TEXT - DARK MODE FIX */}
                <h2 className="text-sm font-black uppercase tracking-tighter text-gray-900 dark:text-white">
                  {activeCategory}
                </h2>
              </div>

              {/* SUBCATEGORY TABS - DARK MODE FIX */}
              <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                {[
                  "All",
                  ...(currentCategoryData?.subcategories.map((s) => s.name) ||
                    []),
                ].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSub(sub)}
                    className={`px-3 py-1.5 whitespace-nowrap text-[10px] font-black uppercase tracking-widest border transition-all ${
                      activeSub === sub
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-500 hover:border-gray-300"
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
                  <div className="flex items-center justify-between mb-3 border-b border-gray-100 dark:border-gray-800 pb-1">
                    <div className="relative">
                      {/* MAIN CATEGORY TEXT - DARK MODE FIX */}
                      <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">
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

      {/* --- CART DRAWER - DARK MODE FIX --- */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative w-full max-w-[340px] bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between mt-16">
              <h3 className="font-black text-xs uppercase tracking-widest dark:text-white">
                My Order ({count})
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* ... rest of the cart items loop ... */}
          </div>
        </div>
      )}
    </section>
  );
};

// --- PRODUCT CARD - DARK MODE FIX ---
const ProductCard = ({ product, onAdd }: { product: any; onAdd: any }) => (
  <div className="group bg-white dark:bg-gray-900 rounded-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
    <div className="aspect-square bg-[#fbfbfb] dark:bg-gray-800 overflow-hidden p-2 relative flex items-center justify-center border-b dark:border-gray-800">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-1.5 flex flex-col flex-1">
      <h3 className="text-[10px] font-bold text-gray-700 dark:text-gray-300 line-clamp-2 leading-[1.2] min-h-[1.5rem] mb-1 uppercase">
        {product.name}
      </h3>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-black text-gray-900 dark:text-white text-[11px] tracking-tighter">
          KSh {product.price.toLocaleString()}
        </span>
        <button
          onClick={() => onAdd(product.name, product.price, product.image)}
          className="bg-blue-600 text-white p-1.5 rounded-sm active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
);

export default ShopSection;
