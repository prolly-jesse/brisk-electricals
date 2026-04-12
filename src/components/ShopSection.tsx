import { useState, useMemo } from "react";
import { ChevronDown, Search, ShoppingCart, Plus, Minus, Trash2, MessageCircle, Menu, X } from "lucide-react";
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
          { name: "Salty Water Instant Shower – Standard", price: 10500, image: "https://images.unsplash.com/photo-1585412459212-8def26f7db1f?w=400&h=400&fit=crop" },
          { name: "Salty Water Instant Shower – Premium", price: 13500, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Fresh Water Showers",
        products: [
          { name: "Fresh Water Instant Shower – Economy", price: 10500, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop" },
          { name: "Fresh Water Instant Shower – Swivel Head", price: 12000, image: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Shower Accessories",
        products: [
          { name: "Universal Shower Hose 1.5M", price: 850, image: "https://images.unsplash.com/photo-1585412459212-8def26f7db1f?w=400&h=400&fit=crop" },
          { name: "Shower Head Holder – Chrome", price: 650, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop" },
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
          { name: "Crystal Chandelier – 6 Arm", price: 18500, image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop" },
          { name: "Modern Ring Chandelier LED", price: 14200, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Pendant Lights",
        products: [
          { name: "Modern Pendant Ceiling Light", price: 4500, image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop" },
          { name: "Industrial Pendant Light – Black", price: 3800, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Wall Lights",
        products: [
          { name: "LED Wall Sconce – Warm White", price: 2800, image: "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=400&h=400&fit=crop" },
          { name: "Outdoor Wall Light – IP65", price: 3200, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop" },
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
          { name: "LED Profile Light 1.2M", price: 3500, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Bulbs",
        products: [
          { name: "LED Bulb 12W – Warm White", price: 350, image: "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=400&h=400&fit=crop" },
          { name: "LED Filament Bulb – E27", price: 550, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Spotlights",
        products: [
          { name: "Recessed LED Downlight 18W", price: 1500, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Tracklights & Downlights",
        products: [
          { name: "LED Tracklight 30W – Black", price: 2800, image: "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=400&h=400&fit=crop" },
          { name: "Surface Mount Downlight 24W", price: 1800, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop" },
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
          { name: "Outdoor Solar Garden Light Set", price: 3200, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Home Security Fixtures",
        products: [
          { name: "Motion Sensor Floodlight 50W", price: 4500, image: "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Solar Outdoor Lights",
        products: [
          { name: "Solar Path Light – Pack of 4", price: 2200, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop" },
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
          { name: "13A Single Luxury Tempered Glass Gold", price: 850, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop" },
          { name: "13A Twin Luxury Tempered Glass Gold", price: 1850, image: "https://images.unsplash.com/photo-1544724107-6d5c4caaff30?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Standard Sockets & Switches",
        products: [
          { name: "Smart Dimmer Switch", price: 1800, image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=400&fit=crop" },
          { name: "Gang Socket Extension", price: 950, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop" },
        ],
      },
    ],
  },
  {
    name: "Electrical Fittings",
    subcategories: [
      {
        name: "Electrical Accessories",
        products: [
          { name: "LED Strip Light Kit 5M", price: 2500, image: "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Cables",
        products: [
          { name: "Twin & Earth Cable 2.5mm – 100M", price: 8500, image: "https://images.unsplash.com/photo-1544724107-6d5c4caaff30?w=400&h=400&fit=crop" },
        ],
      },
      {
        name: "Circuit Protection",
        products: [
          { name: "MCB 20A Single Pole", price: 650, image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=400&fit=crop" },
          { name: "Consumer Unit 12-Way", price: 4500, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop" },
        ],
      },
    ],
  },
];

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

const ShopSection = () => {
  const [expandedCats, setExpandedCats] = useState<string[]>([]);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const { items, addItem, removeItem, updateQty, clearCart, total, count } = useCart();

  const toggleCat = (name: string) => {
    setExpandedCats((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const selectSubcategory = (catName: string, subName: string) => {
    setSelectedCat(catName);
    setSelectedSub(subName);
    setSidebarOpen(false);
  };

  const selectCategory = (catName: string) => {
    setSelectedCat(catName);
    setSelectedSub(null);
    setSidebarOpen(false);
  };

  const showAll = () => {
    setSelectedCat(null);
    setSelectedSub(null);
    setSidebarOpen(false);
  };

  // Gather products based on selection
  const products = useMemo(() => {
    let result: (Product & { category: string; subcategory: string })[] = [];

    for (const cat of catalogData) {
      for (const sub of cat.subcategories) {
        for (const p of sub.products) {
          result.push({ ...p, category: cat.name, subcategory: sub.name });
        }
      }
    }

    if (selectedCat && selectedSub) {
      result = result.filter((p) => p.category === selectedCat && p.subcategory === selectedSub);
    } else if (selectedCat) {
      result = result.filter((p) => p.category === selectedCat);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "name-asc": result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return result;
  }, [selectedCat, selectedSub, search, sort]);

  const getQty = (name: string) => quantities[name] || 1;
  const setQty = (name: string, val: number) => {
    if (val < 1) return;
    setQuantities((prev) => ({ ...prev, [name]: val }));
  };

  const handleAdd = (name: string, price: number) => {
    addItem({ name, price }, getQty(name));
    setQuantities((prev) => ({ ...prev, [name]: 1 }));
  };

  const checkout = () => {
    if (items.length === 0) return;
    const itemsList = items
      .map((i) => `${i.qty}x ${i.name} (KSh ${(i.price * i.qty).toLocaleString()})`)
      .join("\n");
    const msg = `Hi Brisk Electricals, I'd like to order:\n\n${itemsList}\n\nTotal: KSh ${total.toLocaleString()}`;
    window.open(`https://wa.me/254722648765?text=${encodeURIComponent(msg)}`, "_blank");
    clearCart();
  };

  const activeLabel = selectedSub || selectedCat || "All Products";

  // Sidebar content (reused for desktop sticky + mobile drawer)
  const sidebarContent = (
    <nav className="space-y-[0.125rem]">
      <button
        onClick={showAll}
        className={`w-full text-left px-[0.75rem] py-[0.5rem] text-sm font-medium rounded-lg transition-colors ${
          !selectedCat ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
        }`}
      >
        All Products
      </button>
      {catalogData.map((cat) => (
        <div key={cat.name}>
          <button
            onClick={() => toggleCat(cat.name)}
            className={`w-full flex items-center justify-between px-[0.75rem] py-[0.5rem] text-sm font-medium rounded-lg transition-colors ${
              selectedCat === cat.name && !selectedSub ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
            }`}
          >
            <span
              className="flex-1 text-left"
              onClick={(e) => {
                e.stopPropagation();
                selectCategory(cat.name);
              }}
            >
              {cat.name}
            </span>
            <ChevronDown
              className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                expandedCats.includes(cat.name) ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedCats.includes(cat.name) && (
            <div className="ml-[0.75rem] border-l border-border pl-[0.5rem] py-[0.25rem] space-y-[0.125rem]">
              {cat.subcategories.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => selectSubcategory(cat.name, sub.name)}
                  className={`w-full text-left px-[0.625rem] py-[0.375rem] text-xs rounded-md transition-colors ${
                    selectedSub === sub.name && selectedCat === cat.name
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <section id="shop" className="relative py-[2rem] sm:py-[3rem] px-[0.75rem] sm:px-[1rem] lg:px-[2rem]">
      <div className="max-w-[82rem] mx-auto">
        {/* Mobile Sidebar Toggle + Cart */}
        <div className="flex items-center justify-between lg:hidden mb-[0.75rem]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-[0.375rem] px-[0.75rem] py-[0.5rem] rounded-lg bg-secondary border border-border text-foreground text-sm font-medium"
          >
            <Menu className="w-4 h-4" />
            Categories
          </button>
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-[0.5rem] rounded-lg bg-secondary border border-border text-foreground"
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-[1.125rem] h-[1.125rem] rounded-full bg-destructive text-[0.6rem] font-bold flex items-center justify-center text-destructive-foreground">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <>
            <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
            <div className="fixed top-0 left-0 z-50 h-full w-[16rem] bg-card border-r border-border p-[1rem] overflow-y-auto lg:hidden animate-fade-in">
              <div className="flex items-center justify-between mb-[1rem]">
                <h3 className="font-bold text-sm text-foreground">Categories</h3>
                <button onClick={() => setSidebarOpen(false)} className="p-[0.25rem] text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {sidebarContent}
            </div>
          </>
        )}

        {/* Cart Drawer */}
        <div
          className={`fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity duration-300 ${cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setCartOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[22rem] bg-card border-l border-border flex flex-col transition-transform duration-300 ease-out ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-[1rem] border-b border-border">
            <h3 className="font-bold text-base text-foreground">Cart ({count})</h3>
            <button onClick={() => setCartOpen(false)} className="p-[0.25rem] text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-[0.75rem] space-y-[0.5rem]">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="w-10 h-10 text-muted-foreground/20 mb-[0.75rem]" />
                <p className="text-sm text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.name} className="p-[0.625rem] rounded-xl bg-secondary/40 border border-border">
                  <div className="flex items-start justify-between gap-[0.375rem] mb-[0.375rem]">
                    <p className="text-xs font-medium text-foreground flex-1 line-clamp-2">{item.name}</p>
                    <button onClick={() => removeItem(item.name)} className="p-[0.125rem] text-muted-foreground hover:text-destructive transition-colors shrink-0">
                      <Trash2 className="w-[0.75rem] h-[0.75rem]" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[0.25rem]">
                      <button onClick={() => updateQty(item.name, -1)} className="w-[2rem] h-[2rem] min-h-[40px] min-w-[40px] rounded-md bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary/10 active:scale-90 transition-all">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-[1.25rem] text-center text-xs font-bold tabular-nums text-foreground">{item.qty}</span>
                      <button onClick={() => updateQty(item.name, 1)} className="w-[2rem] h-[2rem] min-h-[40px] min-w-[40px] rounded-md bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary/10 active:scale-90 transition-all">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-xs font-bold text-primary">KSh {(item.price * item.qty).toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          {items.length > 0 && (
            <div className="p-[0.75rem] border-t border-border space-y-[0.5rem]">
              <div className="flex justify-between font-bold text-sm text-foreground">
                <span>Total</span>
                <span className="text-primary">KSh {total.toLocaleString()}</span>
              </div>
              <button onClick={() => { checkout(); setCartOpen(false); }} className="btn-whatsapp w-full justify-center min-h-[44px] text-sm">
                <MessageCircle className="w-4 h-4" />
                Checkout via WhatsApp
              </button>
              <button onClick={clearCart} className="w-full text-center text-xs text-muted-foreground hover:text-destructive transition-colors py-[0.25rem]">
                Clear cart
              </button>
            </div>
          )}
        </div>

        {/* Two-Column Layout */}
        <div className="flex gap-[1.5rem]">
          {/* Desktop Sticky Sidebar */}
          <aside className="hidden lg:block w-[14rem] shrink-0">
            <div className="sticky top-[5rem] bg-card/60 backdrop-blur-sm border border-border rounded-xl p-[0.75rem] max-h-[calc(100vh-6rem)] overflow-y-auto">
              <h3 className="font-bold text-sm text-foreground mb-[0.5rem] px-[0.75rem]">Categories</h3>
              {sidebarContent}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar: results count + search + sort + cart (desktop) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[0.5rem] mb-[1rem]">
              <div className="flex items-center gap-[0.75rem]">
                <h2 className="text-sm font-semibold text-foreground">{activeLabel}</h2>
                <span className="text-xs text-muted-foreground">
                  Showing {products.length} {products.length === 1 ? "result" : "results"}
                </span>
              </div>
              <div className="flex items-center gap-[0.5rem]">
                <div className="relative flex-1 sm:w-[14rem]">
                  <Search className="absolute left-[0.625rem] top-1/2 -translate-y-1/2 w-[0.875rem] h-[0.875rem] text-muted-foreground" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-[2rem] pr-[0.75rem] py-[0.375rem] rounded-lg bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="px-[0.625rem] py-[0.375rem] rounded-lg bg-secondary/60 border border-border text-foreground text-sm focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="default">Sort by: Default</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="name-asc">Name: A → Z</option>
                </select>
                {/* Desktop cart button */}
                <button
                  onClick={() => setCartOpen(true)}
                  className="hidden lg:flex relative items-center gap-[0.375rem] px-[0.75rem] py-[0.375rem] rounded-lg bg-secondary border border-border text-foreground text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                  {count > 0 && (
                    <span className="w-[1.125rem] h-[1.125rem] rounded-full bg-destructive text-[0.6rem] font-bold flex items-center justify-center text-destructive-foreground">
                      {count}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-[4rem] text-center">
                <Search className="w-10 h-10 text-muted-foreground/30 mb-[0.75rem]" />
                <p className="text-muted-foreground text-sm">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[0.5rem] sm:gap-[0.75rem]">
                {products.map((p) => (
                  <div
                    key={p.name + p.subcategory}
                    className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-[0.5rem] sm:p-[0.75rem]">
                      <h4 className="text-[0.65rem] sm:text-sm font-semibold leading-tight mb-[0.25rem] line-clamp-2 text-foreground">
                        {p.name}
                      </h4>
                      <p className="font-bold text-sm sm:text-base text-foreground mb-[0.375rem]">
                        KSh {p.price.toLocaleString()}
                      </p>

                      {/* Quantity + Add */}
                      <div className="flex items-center gap-[0.25rem] mb-[0.375rem]">
                        <button
                          onClick={() => setQty(p.name, getQty(p.name) - 1)}
                          className="w-[2rem] h-[2rem] min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 sm:w-[1.75rem] sm:h-[1.75rem] rounded-lg bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-primary/10 active:scale-90 transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-[1.5rem] text-center text-xs font-bold tabular-nums text-foreground">
                          {getQty(p.name)}
                        </span>
                        <button
                          onClick={() => setQty(p.name, getQty(p.name) + 1)}
                          className="w-[2rem] h-[2rem] min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 sm:w-[1.75rem] sm:h-[1.75rem] rounded-lg bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-primary/10 active:scale-90 transition-all"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleAdd(p.name, p.price)}
                        className="w-full min-h-[40px] rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm flex items-center justify-center gap-[0.25rem] hover:shadow-[0_0_24px_hsl(var(--voltage-blue)/0.4)] active:scale-95 transition-all duration-200"
                      >
                        <ShoppingCart className="w-[0.875rem] h-[0.875rem]" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
