import { useState, useMemo, useEffect } from "react";
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
import imgDemo3 from "@/assets/imgbrisk2.jpg";
import imgDemo4 from "@/assets/topjet.jpg";
import imgDemo5 from "@/assets/horizon22.jpg";
import imgDemo6 from "@/assets/elementd.jpg";
import imgDemo7 from "@/assets/Heating-Element-For-Horizon.jpg";
import imgDemo8 from "@/assets/chand22.jpg";
import imgDemo882 from "@/assets/chand223.jpg";
import imgDemo883 from "@/assets/chands.jpg";
import imgDemo9 from "@/assets/chand9.jpg";
import imgDemo992 from "@/assets/chand992.jpg";
import imgDemo993 from "@/assets/chand993.jpg";
import imgDemo92 from "@/assets/chand92.jpg";
import imgDemo93 from "@/assets/ledchnd223.jpg";
import imgDemo94 from "@/assets/ledchnd224.jpg";
import imgDemop2 from "@/assets/pendnt2.jpg";
import imgDemop3 from "@/assets/pendnt22.jpg";
import imgDemop4 from "@/assets/pndt223.jpg";
import imgDemop5 from "@/assets/pendt25.jpg";
// --- 2. FULL CATALOG DATA (RESTORED) ---
const catalogData = [
  {
    name: "Instant Showers",
    subcategories: [
      {
        name: "Salty Water Showers",
        products: [
          {
            sku: "ISH-SLT-STK",
            name: "Vezor Tankless Instant Hot Shower for Salty Water + Silver Rainshower ",
            price: 22000,
            mainImage: imgDemo1,
            images: [imgDemo1],
            desc: "Durable design specifically engineered for salty water regions. Features long-lasting heating elements.",
          },
          {
            sku: "ISH-SLT-PRM",
            name: "Swivel Head Instant hot shower for Fresh and Salty water ",
            price: 9000,
            mainImage: imgDemo3,
            images: [imgDemo3],
            desc: "Premium grade shower with multi-temperature settings and enhanced durability for mineral-rich water.",
          },
        ],
      },
      {
        name: "Fresh Water Showers",
        products: [
          {
            sku: "ISH-FRSH-EC",
            name: "Fresh Water Lorenzetti Topjet",
            price: 10500,
            mainImage: imgDemo4,
            images: [imgDemo4],
            desc: "Efficient heating for fresh water systems. Quick installation and energy-saving.",
          },
          {
            sku: "ISH-FRSH-SV",
            name: "Fresh Water Horizon white instant shower ",
            price: 1500,
            mainImage: imgDemo5,
            images: [imgDemo5],
            desc: "Features a flexible swivel head for better coverage and modern bathroom aesthetics.",
          },
          {
            sku: "ISH-SLT-STD",
            name: "Grey Lorenzetti Bella Ducha 4t hot shower",
            price: 2800,
            mainImage: imgDemo2,
            images: [imgDemo2],
            desc: "Durable design specifically engineered for salty water regions. Features long-lasting heating elements.",
          },
        ],
      },
      {
        name: "Shower Accessories",
        products: [
          {
            sku: "ISH-SLT-STRR",
            name: "Lorenzetti Bella Ducha 4t Replacement Heating Element ",
            price: 1400,
            mainImage: imgDemo6,
            images: [imgDemo6],
            desc: "Spare heating element for Ducha 4t Replacement Heating Element.",
          },
          {
            sku: "ISH-SLT-PRMM",
            name: "Horizon Heating Element ",
            price: 300,
            mainImage: imgDemo7,
            images: [imgDemo7],
            desc: "Spare heating element for horizon instant shower.",
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
            name: "600MM Modern Dandelion Crystal Ceiling Light Suitable for Dining Room, Living Room, Bedroom,Warm White",
            price: 12500,
            mainImage: imgDemo8,
            images: [imgDemo882, imgDemo883],
            desc: "Surface through advanced green paint treatment, environmental protection is conducive to health. Fine technology, not fade.Colorful lamp body to choose from, colorful and attractive, random combination, mix and match to meet various customer needs,G9 lamp, practical and easy to replace.The lamp uses 18pc G9 LED light source, which is energy-saving and power-saving, with warm brightness",
          },
          {
            sku: "LGT-CHND-RNG",
            name: "Modern Tree Branch Crystal Chandelier Luxury Gold Crystal Pendant Lighting 30″ Contemporary 10-Light Chandeliers for Dining Room Kitchen Bedroom Living Room",
            price: 18200,
            mainImage: imgDemo9,
            images: [imgDemo992, imgDemo993],
            desc: "Modern Tree Branch Crystal Chandelier: The surface of the chandelier is completed by metal plating process, corrosion resistance, rust prevention, and easy installation. The gold stems are thickened and encrypted, and the branches can be adjusted manually. Sparkling crystals are strung across the branches of this light fixture. Crystal Tree branch chandelier lighting is perfect for luxury and it helps to create a luxurious and vibrant atmosphere in the room.Specification: AC110v. The diameter of the lamp body is 23.6 inches, and the height of the lamp is adjustable from 20 inches to 78.7 inches. After assembling all the branches, you simply hang the crystals on the branches and gently adjust each branch to achieve the desired effect. Vaulted or slanted ceilings are compatible.",
          },
          {
            sku: "LGT-CHND-667",
            name: "3 rings Gold LED chandelier | LED living room chandelier ",
            price: 6000,
            mainImage: imgDemo92,
            images: [imgDemo93, imgDemo94],
            desc: "LED chandelier.Easy to instal.We deliver & install at a fee",
          },
        ],
      },
      {
        name: "Pendant Lights",
        products: [
          {
            sku: "LGT-CHND-66",
            name: "2X LED Mounted Ceiling Lamp Decorative Lights for Hallway Square Warm Lights | Home & Garden ",
            price: 2000,
            mainImage: imgDemop2,
            images: [imgDemop3, imgDemop4],
            desc: "Elegant ceiling lamp ceiling fixture, perfect for any interior style.It has 5-10m² Lighting Area, with integrated LED lights, the light is cool and crisp without flicker.",
          },
          {
            sku: "LGT-CHND-RNG5",
            name: "Daphne Gold Mesh LED Pendant Light",
            price: 6000,
            mainImage: imgDemop5,
            images: [imgDemop5],
            desc: "Gold Mesh LED Pendant Light.",
          },
        ],
      },
      {
        name: "Wall Lights",
        products: [
          {
            sku: "LGT-CHND-665",
            name: "Crystal Hourglass Wall Light Fixture Simple Style 6 Lights Gold Up and Down Wall Sconce Light ",
            price: 5000,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776784011/Wimgwll_xsuqd4.jpg",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776784011/Wimgwll_xsuqd4.jpg",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776784089/wlllight2_fr27xt.jpg",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776784107/wlllight3_x5ajpu.jpg",
            ],
            desc: "High end finish.3 color display",
          },
          {
            sku: "LGT-CHND-RNG54",
            name: "Colorful LED Wall Lamp for Living Room TV Background | Creative Indoor Lamp",
            price: 2500,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776784980/walllihjt_q7y7n7.webp",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776784980/walllihjt_q7y7n7.webp",
            ],
            desc: "Creative design, penetrates the modern design concept, creates a strong sense of space, has a strong artistic tone, ingenious carving quality, rational and modern atmosphere.",
          },
          {
            sku: "LGT-CHND-6655",
            name: "Black LED Linear Tube Wall Sconce Minimalist Strip Wall Lamp ",
            price: 3500,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776785526/wall-light-7yf_yqo5qc.jpg",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776785547/wall-light-7yj_fmciol.webp",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776785526/wall-light-7yf_yqo5qc.jpg",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776785430/wall-light-7ydl_a04rhw.webp",
            ],
            desc: "Contemporary minimalist style wall lamp, black/gold finish strip linear wall sconce LED wall pack light geometric lighting fitting kits, which can complement the decoration of the space and add more to your home decoration personality",
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
            name: "50M 220-240V AC COB Aluminium Profile Strip Light |6500K | 3000K",
            price: 300,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776790299/AC-aluminium-COB-strip-light-2_ltshx5.jpg",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776790299/AC-aluminium-COB-strip-light-2_ltshx5.jpg",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776790306/AC-aluminium-COB-strip-light-3_anwvfo.jpg",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776790319/AC-aluminium-COB-strip-light-5_mg1vnc.jpg",
            ],

            desc: "This COB (Chip-on-Board) LED Strip Light is a game-changer for lighting both indoor and outdoor spaces.",
          },
          {
            sku: "LGT-PROF-122",
            name: "COB Running Water 24v 10mm LED strip light |Single-Color Chasing Flowing Cob Led Strip",
            price: 3000,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776790745/profile-light-q1w-600x600_yxdf43.jpg",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776790733/profile-light-q1w6_mg8kuj.jpg",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776790745/profile-light-q1w-600x600_yxdf43.jpg",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776790721/profile-light-q1w1_wm4d42.jpg",
            ],

            desc: "Runing water COB 10mm-24V-360D, IC WS2811.You will buy the power supply & controller separately.",
          },
        ],
      },
      {
        name: "Bulbs",
        products: [
          {
            sku: "BLB-LED-12",
            name: "GU10 Bulb White | Warm White",
            price: 250,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776791191/gu10-bulb-7_woa5uc.webp",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776791191/gu10-bulb-7_woa5uc.webp",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776791203/gu10-bulb-6_e1wyn9.jpg",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776791222/gu10-bulb-2_cgurdx.jpg",
            ],
            desc: "Energy-efficient 7W LED bulb with standard base.",
          },
          {
            sku: "BLB-LED-123",
            name: "Energy saving ST 64 Edison Bulb |Warm White | White Light Edison Bulbs",
            price: 300,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776791629/bulbb_vezxwt.jpg",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776791649/edison-bulb-2-1_wlvbc2.jpg",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776791629/bulbb_vezxwt.jpg",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776791636/blbr_rohrme.webp",
            ],
            desc: "Filament ST64 Edison Light Bulb is the perfect combination of vintage appeal and modern energy efficiency rating.",
          },
          {
            sku: "BLB-LED-124",
            name: "50W B22 Emergency Intelligent Bulb",
            price: 1000,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776792034/40w-50w_u192th.png",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776792034/40w-50w_u192th.png",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776792040/40w-50w-3_s5xbbu.webp",
            ],
            desc: "Emergency bulb.Stays on when there is a blackout,B22 holder",
          },
          {
            sku: "BLB-LED-1244",
            name: "Energy Saving G9 LED BULB 5W|Available in White & Warm White",
            price: 300,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776792333/g9-bulb-5_ww6v2c.png",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776792333/g9-bulb-5_ww6v2c.png",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776792350/g9-bulb-3_wo0he3.jpg",
            ],
            desc: "These are very small bulbs specific to certain light fixtures",
          },
        ],
      },
      {
        name: "Spotlights, Tracklights & Downlights",
        products: [
          {
            sku: "LGT-SPOT-18",
            name: "GU10 swivel Downlighter |Adjustable GU10 single downlighter",
            price: 600,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776792666/downlighter-2d_px6p84.jpg",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776792666/downlighter-2d_px6p84.jpg",
            ],
            desc: "Available in black & white.",
          },
          {
            sku: "LGT-SPOT-182",
            name: "Black Surface LED Cabinet Lighting 5W",
            price: 500,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776792832/SALFORD-CO_xzwjz5.webp",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776792832/SALFORD-CO_xzwjz5.webp",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776792897/61fhkSSIL._AC_SX679__btvrkc.jpg",
            ],
            desc: "Available in black & white.",
          },
          {
            sku: "LGT-SPOT-1822",
            name: "7w Swivel LED Downlighters | Warm White | White Downlighter",
            price: 500,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776793148/SALFORD-CO.-13_oecs2v.png",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776793148/SALFORD-CO.-13_oecs2v.png",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776793122/downligter-1_j4qhvr.jpg",
            ],
            desc: "Swivel down lighter.",
          },
          {
            sku: "LGT-SPOT-14",
            name: "LED Surface Mounted Track Light | Black | White Track light",
            price: 1000,
            mainImage:
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776793498/surface-track-light-hj_dsqxyf.webp",
            images: [
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776793498/surface-track-light-hj_dsqxyf.webp",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776793511/surface-track-light-4g_gb4gul.webp",
              "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776793525/surface-track-light-3_qhu7p3.webp",
            ],
            desc: "Surface mounted track light,Available in gold & black.",
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

  const handleAdd = (name: string, price: number, image: string) => {
    addItem({ name, price, image }, 1);

    setToast(`${name.substring(0, 15)}... added`);

    setTimeout(() => setToast(null), 2000);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchOpen(false);
  };

  const checkout = () => {
    const itemsList = items.map((i) => `${i.qty}x ${i.name}`).join("\n");
    const msg = `Hi Brisk Electricals, I'd like to order:\n\n${itemsList}\n\nTotal: KSh ${total}`;
    window.open(
      `https://wa.me/254722648765?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!selectedProduct || selectedProduct.images.length <= 1 || isPaused)
      return;

    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedProduct, isPaused]);

  // --- LOGIC: RELATED PRODUCTS BY CATEGORY ---
  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    const parentCategory = catalogData.find((cat) =>
      cat.subcategories.some((sub) =>
        sub.products.some((p) => p.sku === selectedProduct.sku)
      )
    );
    if (!parentCategory) return [];
    return parentCategory.subcategories
      .flatMap((sub) => sub.products)
      .filter((p) => p.sku !== selectedProduct.sku)
      .slice(0, 4);
  }, [selectedProduct]);

  // --- LOGIC: SEARCH & FILTERING ---
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

  const handleShopNow = () => {
    const element = document.getElementById("shop");
    if (element) {
      // We use an offset because of your sticky header
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <section
      id="shop"
      className="py-6 px-4 max-w-7xl mx-auto min-h-screen relative bg-white dark:bg-black transition-colors duration-500 scroll-mt-34"
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
          className="pointer-events-auto bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 text-gray-800 dark:text-neutral-200 p-3 rounded-full shadow-lg active:scale-90"
        >
          {searchOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={() => setCartOpen(true)}
          className="pointer-events-auto bg-black dark:bg-blue-600 text-white p-3 rounded-full shadow-lg relative active:scale-90"
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
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 dark:bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}

      <div className="mt-6">
        {selectedProduct ? (
          /* LEVEL 3: PRODUCT DETAIL VIEW (TIGHTER TYPOGRAPHY) */
          <div className="animate-in fade-in duration-500 space-y-8">
            {" "}
            {/* Reduced from 12 to 8 */}
            <div className="flex items-center justify-between border-b dark:border-neutral-800 pb-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-2 text-gray-400 dark:text-neutral-500 text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <span className="text-[9px] font-black text-gray-300 dark:text-neutral-800 uppercase tracking-tighter">
                SKU: {selectedProduct.sku}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                {/* MAIN IMAGE CAROUSEL */}
                <div className="relative aspect-square bg-[#fbfbfb] dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 p-6 rounded-sm flex items-center justify-center overflow-hidden">
                  <img
                    key={currentImgIndex} // Key helps React animate the transition
                    src={
                      selectedProduct.images[currentImgIndex] ||
                      selectedProduct.mainImage
                    }
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal animate-in fade-in zoom-in-95 duration-700"
                  />

                  {/* NAVIGATION DOTS */}
                  {selectedProduct.images.length > 1 && (
                    <div className="absolute bottom-4 flex gap-1.5">
                      {selectedProduct.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImgIndex(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            currentImgIndex === i
                              ? "w-6 bg-blue-600"
                              : "w-1.5 bg-gray-300 dark:bg-neutral-700"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* THUMBNAIL PREVIEWS (Optional: clickable to change image) */}
                {selectedProduct.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {selectedProduct.images.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setCurrentImgIndex(i)}
                        className={`aspect-square bg-white dark:bg-neutral-900 border p-2 rounded-sm cursor-pointer transition-all ${
                          currentImgIndex === i
                            ? "border-blue-600 ring-1 ring-blue-600"
                            : "border-gray-100 dark:border-neutral-800"
                        }`}
                      >
                        <img
                          src={img}
                          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-1">
                  <h1 className="text-xl font-black capitalize tracking-tight text-gray-950 dark:text-neutral-100 leading-tight">
                    {selectedProduct.name.toLowerCase()}
                  </h1>
                  <p className="font-black text-3xl tracking-tighter text-blue-600 dark:text-neutral-100">
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
                  className="w-full bg-blue-600 hover:bg-black dark:hover:bg-white dark:hover:text-black text-white py-4 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
                >
                  Add to Cart
                </button>
                <div className="border-t dark:border-neutral-800 pt-4 space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Description
                  </h4>
                  <p className="text-[10px] font-bold text-gray-600 dark:text-neutral-400 uppercase leading-relaxed tracking-wide">
                    {selectedProduct.desc}
                  </p>
                </div>
              </div>
            </div>
            {/* RELATED PRODUCTS */}
            {relatedProducts.length > 0 && (
              <div className="border-t dark:border-neutral-800 pt-10">
                <h4 className="text-[9px] font-black uppercase text-gray-400 dark:text-neutral-600 mb-6 tracking-[0.3em] text-center">
                  Similar Options
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedProducts.map((p) => (
                    <ProductCard
                      key={p.sku}
                      product={p}
                      onAdd={handleAdd}
                      onSelect={() => setSelectedProduct(p)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* GRID VIEW: LEVEL 1 & 2 (TIGHT SPACING) */
          <>
            {searchQuery ? (
              <div className="animate-in fade-in">
                <h2 className="text-xl font-black uppercase text-gray-900 dark:text-neutral-100 mb-6 tracking-tighter">
                  Search Results
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {searchResults.map((p) => (
                    <ProductCard
                      key={p.sku}
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
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={() => {
                          setActiveCategory(null);
                          setActiveSub("All");
                        }}
                        className="flex items-center gap-2 text-gray-400 dark:text-neutral-500 text-[10px] font-black uppercase tracking-widest"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <h2 className="text-xl font-black uppercase tracking-tighter text-gray-950 dark:text-neutral-100">
                        {activeCategory}
                      </h2>
                    </div>
                    {/* Subcategories buttons */}
                    <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
                      {[
                        "All",
                        ...(currentCategoryData?.subcategories.map(
                          (s) => s.name
                        ) || []),
                      ].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setActiveSub(sub)}
                          className={`px-4 py-2 text-[9px] font-black uppercase border rounded-sm transition-all ${
                            activeSub === sub
                              ? "bg-blue-600 border-blue-600 text-white shadow-md"
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
                          key={p.sku}
                          product={p}
                          onAdd={handleAdd}
                          onSelect={() => setSelectedProduct(p)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {catalogData.map((cat) => (
                      <div key={cat.name}>
                        <div className="flex items-end justify-between mb-4 border-b-2 border-gray-100 dark:border-neutral-800 pb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-7 bg-blue-600 rounded-full"></div>
                            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tighter text-gray-950 dark:text-neutral-100">
                              {cat.name}
                            </h2>
                          </div>
                          <button
                            onClick={() => {
                              setActiveCategory(cat.name);
                              clearSearch();
                            }}
                            className="text-blue-600 font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-1 hover:gap-2 transition-all"
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
                                key={p.sku}
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
          <div className="relative w-full max-w-[340px] bg-white dark:bg-neutral-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l dark:border-neutral-800">
            <div className="p-8 border-b dark:border-neutral-800 flex items-center justify-between mt-16 md:mt-20">
              <h3 className="font-black text-[11px] uppercase dark:text-neutral-100 tracking-widest">
                Selection ({count})
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between bg-white dark:bg-neutral-800 p-3 rounded-sm border border-gray-100 dark:border-neutral-700 shadow-sm"
                >
                  <div className="flex-1 pr-4">
                    <p className="text-[10px] font-bold line-clamp-2 uppercase dark:text-neutral-200 leading-tight mb-1">
                      {item.name}
                    </p>
                    <p className="text-blue-600 font-black text-xs">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-950 p-1.5 rounded">
                    <button
                      onClick={() => updateQty(item.name, -1)}
                      className="p-1 dark:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] font-black dark:text-white">
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
              ))}
            </div>
            <div className="p-8 border-t dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 space-y-6 pb-16">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Total
                </span>
                <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                  KSh {total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={checkout}
                disabled={items.length === 0}
                className="w-full bg-green-600 text-white py-4 rounded-sm font-black flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> Order via WhatsApp
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
    className="group bg-white dark:bg-neutral-900 rounded-sm border border-gray-100 dark:border-neutral-800/50 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
  >
    <div className="aspect-square bg-[#fbfbfb] dark:bg-neutral-800/20 overflow-hidden p-4 relative flex items-center justify-center border-b dark:border-neutral-800/50">
      <img
        src={product.mainImage}
        alt={product.name}
        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-2 right-2 bg-white/80 dark:bg-black/80 backdrop-blur-md p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
        <Maximize2 className="w-3 h-3 text-blue-600" />
      </div>
    </div>

    <div className="p-3 flex flex-col flex-1">
      {/* Increased to 13px, added semi-bold and Title Case logic */}
      <h3 className="text-[13px] font-semibold text-gray-800 dark:text-neutral-200 line-clamp-2 leading-snug min-h-[2.4rem] mb-3 tracking-tight">
        {product.name
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </h3>

      <div className="flex items-center justify-between mt-auto">
        {/* Price is now 14px and bolder for better 'at-a-glance' shopping */}
        <span className="font-black text-blue-600 dark:text-blue-400 text-[14px] tracking-tighter">
          KSh {product.price.toLocaleString()}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product.name, product.price, product.mainImage);
          }}
          className="bg-blue-600 text-white p-2 rounded-sm active:scale-90 transition-all shadow-md relative z-10 hover:bg-black dark:hover:bg-white dark:hover:text-black"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default ShopSection;
