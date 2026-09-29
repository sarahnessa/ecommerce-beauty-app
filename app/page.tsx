"use client";
import Image from "next/image";

import { SubmitEvent, ReactNode, useEffect, useRef, useState } from "react";
import aboutImg from '../public/about-image.jpg';
import bodyProductImg from '../public/products/body.svg';
import candleProductImg from '../public/products/candle.svg';
import makeupProductImg from '../public/products/makeup.svg';
import serumProductImg from '../public/products/serum.svg';
import skincareProductImg from '../public/products/skincare.svg';
import toolProductImg from '../public/products/tool.svg';


type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
};

type CartItem = Product & { quantity: number };


const products: Product[] = [
  {
    id: 1,
    name: "Daily Cloud Cream",
    brand: "Daze & Dewy",
    category: "Skincare",
    price: 42,
    badge: "New",
    image: skincareProductImg,
  },
  {
    id: 2,
    name: "Soft Tint Lip Colour",
    brand: "Studio Form",
    category: "Makeup",
    price: 28,
    badge: "Bestseller",
    image: makeupProductImg,
  },
  {
    id: 3,
    name: "Dew Drop Serum",
    brand: "Daze & Dewy",
    category: "Skincare",
    price: 58,
    image: serumProductImg,
  },
  {
    id: 4,
    name: "Bonbon Bath Ritual Set",
    brand: "Bonbon Bloom",
    category: "Bath & Body",
    price: 64,
    badge: "Exclusive",
    image: bodyProductImg,
  },
  {
    id: 5,
    name: "Quiet Evening Candle",
    brand: "Soft Ritual",
    category: "Candles",
    price: 46,
    badge: "New",
    image: candleProductImg,
  },
  {
    id: 6,
    name: "Comfort Skin Balm",
    brand: "Daze & Dewy",
    category: "Skincare",
    price: 39,
    badge: "New",
    image: skincareProductImg,
  },
  {
    id: 7,
    name: "Daydream Colour Palette",
    brand: "Studio Form",
    category: "Makeup",
    price: 36,
    image: makeupProductImg,
  },
  {
    id: 8,
    name: "Smooth Stone Tool",
    brand: "Daze & Dewy",
    category: "Tools",
    price: 32,
    image: toolProductImg,
  },
  {
    id: 9,
    name: "Vanilla Taffy Body Wash",
    brand: "Bonbon Bloom",
    category: "Bath & Body",
    price: 36,
    badge: "Bestseller",
    image: bodyProductImg,
  },
  {
    id: 10,
    name: "Daily Soft Body Lotion",
    brand: "Soft Ritual",
    category: "Bath & Body",
    price: 38,
    image: bodyProductImg,
  },
  {
    id: 11,
    name: "Everyday Deodorant",
    brand: "Soft Ritual",
    category: "Bath & Body",
    price: 24,
    badge: "New",
    image: bodyProductImg,
  },
  {
    id: 12,
    name: "Soft Cloud Body Mist",
    brand: "Soft Ritual",
    category: "Bath & Body",
    price: 42,
    image: bodyProductImg,
  },
  {
    id: 13,
    name: "Marshmallow Melt Hand Cream",
    brand: "Bonbon Bloom",
    category: "Skincare",
    price: 22,
    image: skincareProductImg,
  },
  {
    id: 14,
    name: "Polishing Body Scrub",
    brand: "Daze & Dewy",
    category: "Bath & Body",
    price: 32,
    badge: "Exclusive",
    image: bodyProductImg,
  },
  {
    id: 15,
    name: "Rich Day Cream",
    brand: "Daze & Dewy",
    category: "Skincare",
    price: 28,
    badge: "Bestseller",
    image: skincareProductImg,
  },
  {
    id: 16,
    name: "Gentle Cleansing Bar",
    brand: "Soft Ritual",
    category: "Bath & Body",
    price: 18,
    image: bodyProductImg,
  },
  {
    id: 17,
    name: "Glow Body Oil",
    brand: "Daze & Dewy",
    category: "Bath & Body",
    price: 38,
    badge: "New",
    image: serumProductImg,
  },
  {
    id: 18,
    name: "Gentle Body Cleanser",
    brand: "Soft Ritual",
    category: "Bath & Body",
    price: 26,
    image: bodyProductImg,
  },
  {
    id: 19,
    name: "Sunbeam Candle",
    brand: "Wick & Wonder",
    category: "Candles",
    price: 34,
    image: candleProductImg,
  },
  {
    id: 20,
    name: "Evening Candle Set",
    brand: "Wick & Wonder",
    category: "Candles",
    price: 58,
    badge: "Exclusive",
    image: candleProductImg,
  },
];


const categories = ["New", "Skincare", "Makeup", "Bath & Body", "Candles"];

function Icon({
  name,
  size = 20,
}: {
  name:
    | "bag"
    | "arrow"
    | "menu"
    | "close"
    | "plus"
    | "minus"
    | "search"
    | "flower";
  size?: number;
}) {
  const paths: Record<string, ReactNode> = {
    bag: (
      <>
        <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
        <path d="M6.5 8h11l1 9.5a2 2 0 0 1-2 2.2h-9a2 2 0 0 1-2-2.2L6.5 8Z" />
        <path d="M10.5 12.5c0-.9 1.1-1.2 1.5-.4.4-.8 1.5-.5 1.5.4 0 .7-.6 1.2-1.5 2-.9-.8-1.5-1.3-1.5-2Z" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 8h16M4 16h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </>
    ),
    flower: (
      <>
        <path d="M12 18.5C8.8 15.3 4.2 11.7 4.2 7.7c0-3.4 4.3-4.4 7.8 3.3" />
        <path d="M12 18.5c3.2-3.2 7.8-6.8 7.8-10.8 0-3.4-4.3-4.4-7.8 3.3" />
        <path d="M12 11c-3.2-5.8-1.9-7.5 0-7.5s3.2 1.7 0 7.5Z" />
        <path d="M12 18.5c-2-3.7-3.7-7.3-3.7-11.4M12 18.5c2-3.7 3.7-7.3 3.7-11.4" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Action({
  children,
  className = "",
  onClick,
  type = "button",
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

function NavLink({
  children,
  page,
  onNavigate,
  className = "",
}: {
  children: ReactNode;
  page: string;
  onNavigate: (page: string) => void;
  className?: string;
}) {
  return (
    <a
      href={`#${page}`}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(page);
      }}
      className={className}
    >
      {children}
    </a>
  );
}

function Heading({
  as = "section",
  children,
  className = "",
}: {
  as?: "page" | "section" | "subsection";
  children: ReactNode;
  className?: string;
}) {
  const level = as === "page" ? 1 : as === "section" ? 2 : 3;
  return (
    <div role="heading" aria-level={level} className={className}>
      {children}
    </div>
  );
}

function Header({
  cartCount,
  onCart,
  onNavigate,
  onSearch,
}: {
  cartCount: number;
  onCart: () => void;
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchMatches = searchText.trim()
    ? products
        .filter((product) =>
          `${product.name} ${product.brand} ${product.category}`
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()),
        )
        .slice(0, 4)
    : [];

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  function submitSearch(event: SubmitEvent) {
    event.preventDefault();
    const query = searchText.trim();
    if (!query) {
      searchInputRef.current?.focus();
      return;
    }
    onSearch(query);
    setSearchOpen(false);
    setSearchText("");
  }

  return (
    <>
      <div className="announcement">
        Complimentary shipping on orders $75+ · Welcome to Daze & Dewy
      </div>
      <header className="site-header">
        <Action
          className="mobile-control"
          onClick={() => setMobileOpen(true)}
          ariaLabel="Open menu"
        >
          <Icon name="menu" />
        </Action>
        <nav className="nav-left" aria-label="Main navigation">
          <NavLink page="shop" onNavigate={onNavigate}>
            Shop
          </NavLink>
          <NavLink page="new" onNavigate={onNavigate}>
            New
          </NavLink>
          <NavLink page="about" onNavigate={onNavigate}>
            Our story
          </NavLink>
        </nav>
        <NavLink page="home" onNavigate={onNavigate} className="wordmark">
          DAZE & DEWY
        </NavLink>
        <nav className="nav-right" aria-label="Secondary navigation">
          <NavLink page="contact" onNavigate={onNavigate}>
            Visit
          </NavLink>
          <div className={`search-control${searchOpen ? " is-open" : ""}`}>
            <Action
              className="search-button"
              onClick={() => setSearchOpen((open) => !open)}
              ariaLabel={searchOpen ? "Close search" : "Search"}
            >
              <Icon name={searchOpen ? "close" : "search"} size={18} />
            </Action>
            <form className="header-search-form" onSubmit={submitSearch}>
              <input
                ref={searchInputRef}
                name="search_input"
                type="search"
                aria-label="Search products"
                placeholder="Search products"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setSearchOpen(false);
                    setSearchText("");
                  }
                }}
                tabIndex={searchOpen ? 0 : -1}
              />
            </form>
            {searchOpen && searchText.trim() && (
              <div
                className="search-suggestions"
                role="listbox"
                aria-label="Matching products"
              >
                {searchMatches.length ? (
                  searchMatches.map((product, index) => (
                    <button
                      key={product.id}
                      type="button"
                      aria-selected={focusedIndex === index ? "true" : "false"}
                      role="option"
                      onClick={() => {
                        onSearch(product.name);
                        setSearchOpen(false);
                        setSearchText("");
                      }}
                    >
                      <span>{product.name}</span>
                      <small>{product.brand}</small>
                    </button>
                  ))
                ) : (
                  <p>No matching products</p>
                )}
              </div>
            )}
          </div>
          <Action className="bag-button" onClick={onCart} ariaLabel="Open bag">
            <Icon name="bag" size={19} />
            <span>Bag ({cartCount})</span>
          </Action>
        </nav>
      </header>
      {mobileOpen && (
        <div className="mobile-menu">
          <Action
            className="drawer-close"
            onClick={() => setMobileOpen(false)}
            ariaLabel="Close menu"
          >
            <Icon name="close" />
          </Action>
          <span className="wordmark">DAZE & DEWY</span>
          <div className="mobile-menu-actions" aria-label="Shopping tools">
            <Action
              className="mobile-menu-action"
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              ariaLabel="Search products"
            >
              <Icon name="search" size={18} />
              <span>Search</span>
            </Action>
            <Action
              className="mobile-menu-action"
              onClick={() => {
                setMobileOpen(false);
                onCart();
              }}
              ariaLabel={`Open bag, ${cartCount} items`}
            >
              <Icon name="bag" size={19} />
              <span>Bag ({cartCount})</span>
            </Action>
          </div>
          {["home", "shop", "new", "about", "contact"].map((item) => (
            <NavLink
              key={item}
              page={item}
              onNavigate={(page) => {
                onNavigate(page);
                setMobileOpen(false);
              }}
            >
              {item === "contact"
                ? "Visit & contact"
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}

function ProductCard({
  product,
  onAdd,
  onNavigate,
}: {
  product: Product;
  onAdd: (product: Product) => void;
  onNavigate: (page: string) => void;
}) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <NavLink
          page={`product:${product.id}`}
          onNavigate={onNavigate}
          className="product-card-link"
        >
          <Image
            src={product.image}
            width={900}
            height={900}
            alt={product.name}
            className="product-image"
          />
          {product.badge && (
            <span className={`product-badge ${product.badge.toLowerCase()}`}>
              {product.badge}
            </span>
          )}
        </NavLink>
        <Action className="quick-add" onClick={() => onAdd(product)}>
          Quick add <Icon name="plus" size={16} />
        </Action>
      </div>
      <div className="product-meta">
        <div>
          <NavLink
            page={`brand:${encodeURIComponent(product.brand)}`}
            onNavigate={onNavigate}
            className="eyebrow brand-link"
          >
            {product.brand}
          </NavLink>
          <NavLink
            page={`product:${product.id}`}
            onNavigate={onNavigate}
            className="product-detail-link"
          >
            <Heading as="subsection" className="product-name">
              {product.name}
            </Heading>
          </NavLink>
        </div>
        <span>${product.price}</span>
      </div>
    </article>
  );
}

function ProductGrid({
  items,
  onAdd,
  onNavigate,
}: {
  items: Product[];
  onAdd: (product: Product) => void;
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="product-grid">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

function ProductPage({
  product,
  onNavigate,
  onAdd,
}: {
  product: Product;
  onNavigate: (page: string) => void;
  onAdd: (product: Product, quantity?: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const related = products.filter((item) => item.id !== product.id).slice(0, 4);
  const categoryCopy: Record<string, string> = {
    Skincare:
      "A considered daily essential made to bring a little more comfort and care to your routine. Easy to reach for, lovely to use, and designed for real life.",
    Makeup:
      "Playful color with a soft, wearable feel. Make it your own, keep it close, and bring a little extra joy to the everyday.",
    "Bath & Body":
      "A feel-good staple for everyday rituals, with a comforting texture and an easy, feel-good finish from head to toe.",
    Candles:
      "A gentle glow for slower evenings and softer starts. Light it when you want your space to feel a little more like yours.",
    Tools:
      "A simple, thoughtful tool designed to make your everyday routine feel easy, calming, and just a little more special.",
  };

  return (
    <main className="product-page">
      <div className="product-breadcrumbs">
        <NavLink page="shop" onNavigate={onNavigate}>
          Shop
        </NavLink>
        <span>/</span>
        <NavLink page={`category:${product.category}`} onNavigate={onNavigate}>
          {product.category}
        </NavLink>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <section className="product-detail-layout">
        <div
          className="product-gallery"
          aria-label={`${product.name} product images`}
        >
          <div className="product-gallery-main">
            <Image width={900} height={900} src={product.image} alt={product.name} />
            {product.badge && (
              <span className={`product-badge ${product.badge.toLowerCase()}`}>
                {product.badge}
              </span>
            )}
          </div>
          <div className="product-gallery-detail">
            <Image width={900} height={900} src={product.image} alt={`${product.name}, close-up`} />
          </div>
          <div className="product-gallery-note">
            <span className="flower-mark" aria-hidden="true">
              ✿
            </span>
            <p>
              Chosen with care.
              <br />
              Made for your everyday.
            </p>
          </div>
        </div>
        <div className="product-purchase-panel">
          <p className="kicker">{product.category} · The Daze & Dewy edit</p>
          <NavLink
            page={`brand:${encodeURIComponent(product.brand)}`}
            onNavigate={onNavigate}
            className="eyebrow brand-link"
          >
            {product.brand}
          </NavLink>
          <Heading as="page" className="product-detail-title">
            {product.name}
          </Heading>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-description">
            {categoryCopy[product.category] || categoryCopy.Skincare}
          </p>
          <div className="product-purchase-row">
            <div className="product-quantity" aria-label="Quantity">
              <Action
                ariaLabel="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                <Icon name="minus" size={14} />
              </Action>
              <span aria-live="polite">{quantity}</span>
              <Action
                ariaLabel="Increase quantity"
                onClick={() => setQuantity((value) => value + 1)}
              >
                <Icon name="plus" size={14} />
              </Action>
            </div>
            <Action
              className="product-add-button"
              onClick={() => onAdd(product, quantity)}
            >
              Add to bag · ${(product.price * quantity).toFixed(2)}
              <Icon name="bag" size={19} />
            </Action>
          </div>
          <p className="product-shipping-note">
            Thoughtfully packed · Shipping options shown at checkout
          </p>
          <section className="product-story">
            <p className="kicker">A note from our edit</p>
            <Heading as="subsection">The story behind this selection</Heading>
            <p>
              We chose {product.name} for the little lift it brings to an
              everyday ritual. It feels considered without feeling complicated,
              and is the kind of find we love sharing with our community.
            </p>
          </section>
          <div className="product-accordions">
            <details open>
              <summary>
                Details <span>＋</span>
              </summary>
              <p>
                {categoryCopy[product.category] || categoryCopy.Skincare} A
                lovely little reminder that your ritual belongs to you.
              </p>
            </details>
            <details>
              <summary>
                How to enjoy <span>＋</span>
              </summary>
              <p>
                Make a little room in your routine, use whenever it feels right,
                and enjoy the moment at your own pace.
              </p>
            </details>
            <details>
              <summary>
                Shipping & returns <span>＋</span>
              </summary>
              <p>
                Shipping options and return eligibility are shared during
                checkout and in your order confirmation.
              </p>
            </details>
          </div>
        </div>
      </section>
      <section className="product-related">
        <div className="section-heading">
          <div>
            <p className="kicker">A few more good things</p>
            <Heading as="section">Keep the ritual going</Heading>
          </div>
          <NavLink page="shop" onNavigate={onNavigate} className="text-link">
            View all products <Icon name="arrow" size={16} />
          </NavLink>
        </div>
        <ProductGrid
          items={related}
          onAdd={(item) => onAdd(item, 1)}
          onNavigate={onNavigate}
        />
      </section>
    </main>
  );
}

function Home({
  onNavigate,
  onAdd,
}: {
  onNavigate: (page: string) => void;
  onAdd: (product: Product) => void;
}) {
  const storyRef = useRef<HTMLElement | null>(null);
  const featuredRef = useRef<HTMLDivElement | null>(null);
  const [storyVisible, setStoryVisible] = useState(false);
  const [featuredScrolledPastTwo, setFeaturedScrolledPastTwo] = useState(false);

  useEffect(() => {
    const section = storyRef.current;
    if (!section || storyVisible) return;
    if (!("IntersectionObserver" in window)) {
      setStoryVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStoryVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [storyVisible]);

  return (
    <main>
      <section className="hero">
        <Image
          className="hero-image w-full h-auto"
          width="0"
          height="0"
          sizes="100vw"
          loading="eager"
          src="https://images.squarespace-cdn.com/content/v1/546e7120e4b0f42617a4c8b4/1594843139074-CY32GUHYGQBJ1B9R2PFL/San%2BAntonio%2BSenior%2BPhotographer%2B3A9647.jpg"
          alt="Young woman resting among sunflowers in warm daylight"
        />
        <div className="hero-wash" />
        <div className="hero-content">
          <Heading as="page" className="hero-title">
            Find your
            <br />
            everyday radiance.
          </Heading>
          <p className="hero-copy">
            A thoughtful edit of beauty essentials, expressive color, and
            sensory rituals from brands we believe in.
          </p>
          <NavLink page="shop" onNavigate={onNavigate} className="primary-link">
            Shop the collection <Icon name="arrow" size={18} />
          </NavLink>
        </div>
        <div className="hero-stamp">
          <span>CURATED</span>
          <span className="stamp-flower">
            <Icon name="flower" size={26} />
          </span>
          <span>FOR YOU</span>
        </div>
      </section>

      <section className="intro-section">
        <p className="kicker">Our current obsessions</p>
        <Heading className="display-heading">
          Little luxuries, made
          <br />
          for your daily ritual.
        </Heading>
        <p className="intro-copy">
          Explore a small, spirited selection of the products we reach for again
          and again.
        </p>
      </section>

      <section className="featured-products">
        <div className="section-topline">
          <span>Featured</span>
          <NavLink page="shop" onNavigate={onNavigate} className="text-link">
            View all products <Icon name="arrow" size={16} />
          </NavLink>
        </div>
        <div
          className="featured-scroller"
          ref={featuredRef}
          onScroll={() => {
            const scroller = featuredRef.current;
            const thirdCard =
              scroller?.querySelectorAll<HTMLElement>(".product-card")[2];
            const threshold =
              thirdCard && scroller
                ? thirdCard.getBoundingClientRect().left -
                  scroller.getBoundingClientRect().left +
                  scroller.scrollLeft
                : Infinity;
            setFeaturedScrolledPastTwo(
              Boolean(scroller && scroller.scrollLeft >= threshold),
            );
          }}
        >
          <ProductGrid
            items={products.slice(0, 9)}
            onAdd={onAdd}
            onNavigate={onNavigate}
          />
        </div>
        <div className="featured-scroll-controls">
          {featuredScrolledPastTwo && (
            <Action
              className="featured-scroll-next featured-scroll-back"
              ariaLabel="Scroll back to earlier featured products"
              onClick={() =>
                featuredRef.current?.scrollBy({
                  left: -featuredRef.current.clientWidth * 0.8,
                  behavior: "smooth",
                })
              }
            >
              <Icon name="arrow" size={21} />
            </Action>
          )}
          <Action
            className="featured-scroll-next"
            ariaLabel="Scroll to more featured products"
            onClick={() =>
              featuredRef.current?.scrollBy({
                left: featuredRef.current.clientWidth * 0.8,
                behavior: "smooth",
              })
            }
          >
            <Icon name="arrow" size={21} />
          </Action>
        </div>
      </section>

      <section
        ref={storyRef}
        className={`category-story${storyVisible ? " is-visible" : ""}`}
      >
        <div className="story-image-shell">
          <Image
            width={665.5}
            height={460}
            src="https://images.unsplash.com/photo-1551184451-76b762941ad6?auto=format&fit=crop&w=1100&q=85"
            alt="Close-up beauty portrait"
          />
          <span className="image-note">SKIN, IN FULL BLOOM</span>
        </div>
        <div className="story-copy">
          <p className="kicker">The skincare shelf</p>
          <Heading className="display-heading">
            Care for the skin
            <br />
            you're in.
          </Heading>
          <p>
            High-performance formulas and comforting textures chosen to make
            your morning and evening rituals feel a little more beautiful.
          </p>
          <NavLink
            page="category:Skincare"
            onNavigate={onNavigate}
            className="outline-link"
          >
            Explore skincare <Icon name="arrow" size={18} />
          </NavLink>
        </div>
      </section>

      <section className="marquee" aria-label="Our values">
        <div>
          SMALL-BATCH BEAUTY{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
          CULT-FAVORITE BRANDS{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
          RITUALS FOR REAL LIFE{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
          GOOD SKIN DAYS{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
          COLOR OUTSIDE THE LINES{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
          YOUR DAILY DOSE OF JOY{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
          SMALL-BATCH BEAUTY{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
          CULT-FAVORITE BRANDS{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
          RITUALS FOR REAL LIFE{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
          GOOD SKIN DAYS{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
          COLOR OUTSIDE THE LINES{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
          YOUR DAILY DOSE OF JOY{" "}
          <span>
            <Icon name="flower" size={28} />
          </span>
        </div>
      </section>

      <section className="category-cards">
        <Heading className="display-heading">Shop by mood</Heading>
        <div className="mood-grid">
          <NavLink
            page="category:Makeup"
            onNavigate={onNavigate}
            className="mood-card coral"
          >
            <span>01 / COLOR PLAY</span>
            <strong>Makeup</strong>
            <Icon name="arrow" size={24} />
          </NavLink>
          <NavLink
            page="category:Bath & Body"
            onNavigate={onNavigate}
            className="mood-card blush"
          >
            <span>02 / SLOW DOWN</span>
            <strong>Bath & Body</strong>
            <Icon name="arrow" size={24} />
          </NavLink>
          <NavLink
            page="category:Candles"
            onNavigate={onNavigate}
            className="mood-card plum"
          >
            <span>03 / SET THE MOOD</span>
            <strong>Candles</strong>
            <Icon name="arrow" size={24} />
          </NavLink>
        </div>
      </section>
    </main>
  );
}

function BlogPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const news = [
    {
      date: "September 24, 2026",
      title: "The beauty launches catching our eye this month",
      copy: "CEW's September product watch surveys a month of new launches, where heritage, science, and playful ideas share the shelf.",
      source: "CEW Product Watch",
      href: "https://cew.org/beauty_news/cew-product-watch-september-2026/",
    },
    {
      date: "September 10, 2026",
      title: "A first look at September's new beauty launches",
      copy: "NewBeauty rounds up the month's debuts, including firsts from OLAPLEX and MAKE UP FOR EVER.",
      source: "NewBeauty",
      href: "https://www.newbeauty.com/view/launch-list-september-2026",
    },
    {
      date: "September 10, 2026",
      title: "When skincare and makeup meet in the middle",
      copy: "BeautyMatter's weekly launch notes spotlight the growing mix of makeup and skincare, from a mineral skin tint to a replenishing serum.",
      source: "BeautyMatter",
      href: "https://beautymatter.com/articles/2026-week-37-beauty-brand-and-product-launches",
    },
  ];

  const tutorials = [
    {
      number: "01",
      category: "SKINCARE HOW-TO",
      title: "Build a routine you'll actually keep",
      copy: "Start with the steps you already enjoy. Keep the order simple, give each layer a moment, and add new products one at a time so you can find your rhythm.",
      steps: [
        "Cleanse at your own pace",
        "Choose a comfortable moisturizer",
        "Finish with the daytime steps that work for you",
      ],
      tone: "journal-tutorial-peach",
    },
    {
      number: "02",
      category: "MAKEUP HOW-TO",
      title: "Make soft color feel like you",
      copy: "A little color goes a long way. Use a light hand, blend the edges, and build slowly until the finish feels right for your day.",
      steps: [
        "Prep with a texture you like",
        "Tap color on in thin layers",
        "Soften the edges with clean fingertips or a brush",
      ],
      tone: "journal-tutorial-lavender",
    },
  ];

  return (
    <main className="journal-page">
      <section className="journal-hero">
        <p className="kicker">Notes from the studio</p>
        <Heading as="page" className="journal-title">
          The Daze & Dewy Blog
        </Heading>
        <p>
          Beauty news, little rituals, and good things happening around the
          shop.
        </p>
        <span className="journal-flower" aria-hidden="true">
          ✿
        </span>
        <div className="journal-flower-sprinkles" aria-hidden="true">
          <span>✿</span>
          <span>✿</span>
          <span>✿</span>
          <span>✿</span>
          <span>✿</span>
          <span>✿</span>
          <span>✿</span>
        </div>
      </section>

      <section className="journal-section journal-news">
        <div className="journal-section-heading">
          <div>
            <p className="kicker">What's happening out there</p>
            <Heading as="section">The beauty edit</Heading>
          </div>
          <span className="journal-updated">Updated September 2026</span>
        </div>
        <div className="journal-news-grid">
          {news.map((article) => (
            <article className="journal-news-card" key={article.href}>
              <p className="journal-date">{article.date}</p>
              <Heading as="subsection">{article.title}</Heading>
              <p>{article.copy}</p>
              <a
                href={article.href}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Read at {article.source} <Icon name="arrow" size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="journal-events">
        <div className="journal-section-heading">
          <div>
            <p className="kicker">In Savannah</p>
            <Heading as="section">Gather with us</Heading>
          </div>
          <span className="journal-updated">Studio dates coming soon</span>
        </div>
        <div className="journal-event-grid">
          <article className="journal-event-card">
            <span className="journal-event-number">01 / SKIN</span>
            <Heading as="subsection">Sunday Skin School</Heading>
            <p>
              A relaxed studio session for swapping routine notes, exploring
              textures, and finding a few steps that feel good to come back to.
            </p>
            <NavLink
              page="contact"
              onNavigate={onNavigate}
              className="text-link"
            >
              Ask about the next date <Icon name="arrow" size={15} />
            </NavLink>
          </article>
          <article className="journal-event-card">
            <span className="journal-event-number">02 / COLOR</span>
            <Heading as="subsection">Color Play at the Studio</Heading>
            <p>
              Drop into a playful makeup try-on, experiment with a new shade,
              and leave room for happy accidents.
            </p>
            <NavLink
              page="contact"
              onNavigate={onNavigate}
              className="text-link"
            >
              Ask about the next date <Icon name="arrow" size={15} />
            </NavLink>
          </article>
        </div>
      </section>

      <section className="journal-featured-product">
        <div className="journal-featured-art">
          <Image
            width={900}
            height={900}
            src={skincareProductImg}
            alt="Daily Cloud Cream product illustration"
          />
          <span>THE EVERYDAY EDIT</span>
        </div>
        <div className="journal-featured-copy">
          <p className="kicker">A product we keep close</p>
          <Heading as="section">A softer start with Daily Cloud Cream</Heading>
          <p>
            Good everyday care doesn't need a complicated routine. We picked
            Daily Cloud Cream for the comforting feel and easy place it finds in
            a morning or evening ritual.
          </p>
          <NavLink
            page="product:1"
            onNavigate={onNavigate}
            className="text-link"
          >
            Meet the product <Icon name="arrow" size={16} />
          </NavLink>
        </div>
      </section>

      <section className="journal-section journal-howtos">
        <div className="journal-section-heading">
          <div>
            <p className="kicker">Little lessons, no rules</p>
            <Heading as="section">How-to, your way</Heading>
          </div>
        </div>
        <div className="journal-tutorial-grid">
          {tutorials.map((tutorial) => (
            <article
              className={`journal-tutorial-card ${tutorial.tone}`}
              key={tutorial.number}
            >
              <span className="journal-tutorial-number">{tutorial.number}</span>
              <p className="kicker">{tutorial.category}</p>
              <Heading as="subsection">{tutorial.title}</Heading>
              <p>{tutorial.copy}</p>
              <ol>
                {tutorial.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ShopPage({
  selected,
  selectedBrand,
  searchQuery,
  onNavigate,
  onAdd,
}: {
  selected?: string;
  selectedBrand?: string;
  searchQuery?: string;
  onNavigate: (page: string) => void;
  onAdd: (product: Product) => void;
}) {
  const title =
    selectedBrand ||
    selected ||
    (searchQuery ? "Search results" : "All beauty");
  const normalizedSearch = searchQuery?.trim().toLowerCase();
  const shown = normalizedSearch
    ? products.filter((item) =>
        `${item.name} ${item.brand} ${item.category}`
          .toLowerCase()
          .includes(normalizedSearch),
      )
    : selectedBrand
      ? products.filter((item) => item.brand === selectedBrand)
      : title === "All beauty"
        ? products
        : title === "New"
          ? products.filter((item) => item.badge === "New")
          : products.filter((item) => item.category === title);
  return (
    <main className="listing-page">
      <div className="listing-hero">
        <p className="kicker">
          {searchQuery
            ? `Results for “${searchQuery}”`
            : selectedBrand
              ? "The brand edit"
              : "The Daze & Dewy edit"}
        </p>
        <Heading as="page" className="page-title">
          {title}
        </Heading>
        <p>
          {shown.length} thoughtful {shown.length < 2 ? "find" : "finds"} for
          your ritual
        </p>
      </div>
      <div className="category-nav">
        {categories.map((category) => (
          <NavLink
            key={category}
            page={category === "New" ? "new" : `category:${category}`}
            onNavigate={onNavigate}
            className={category === title ? "active" : ""}
          >
            {category}
          </NavLink>
        ))}
        <NavLink
          page="shop"
          onNavigate={onNavigate}
          className={title === "All beauty" ? "active" : ""}
        >
          View all
        </NavLink>
      </div>
      {shown.length ? (
        <ProductGrid items={shown} onAdd={onAdd} onNavigate={onNavigate} />
      ) : (
        <p className="search-empty-state">No products matched that search.</p>
      )}
    </main>
  );
}

function AboutPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const valuesRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const [valuesVisible, setValuesVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const section = ctaRef.current;
    if (!section || ctaVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [ctaVisible]);

  useEffect(() => {
    const section = valuesRef.current;
    if (!section || valuesVisible) return;

    const revealWhenCentered = () => {
      const heading = section.parentElement?.querySelector(
        ".manifesto .display-heading",
      );
      if (!heading) return;

      const lineRange = document.createRange();
      lineRange.selectNodeContents(heading);
      const lineRects = Array.from(lineRange.getClientRects());
      const targetLine = lineRects[lineRects.length - 1];
      const targetLineBottom =
        targetLine?.bottom ?? heading.getBoundingClientRect().bottom;

      if (targetLineBottom <= window.innerHeight * 0.6) {
        setValuesVisible(true);
        window.removeEventListener("scroll", revealWhenCentered);
        window.removeEventListener("resize", revealWhenCentered);
      }
    };

    revealWhenCentered();
    window.addEventListener("scroll", revealWhenCentered, { passive: true });
    window.addEventListener("resize", revealWhenCentered);
    return () => {
      window.removeEventListener("scroll", revealWhenCentered);
      window.removeEventListener("resize", revealWhenCentered);
    };
  }, [valuesVisible]);

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-title-block">
          <p className="kicker">This is Daze & Dewy</p>
          <Heading as="page" className="page-title">
            Beauty should feel
            <br />
            like <em>you.</em>
          </Heading>
        </div>
        <div className="about-image-stage">
          <div className="about-image-flower-sprinkles" aria-hidden="true">
            <span>✿</span>
            <span>✿</span>
            <span>✿</span>
            <span>✿</span>
            <span>✿</span>
            <span>✿</span>
          </div>
          <div className="about-image-frame">
            <div className="about-image-photo">
              <Image
                width={800}
                height={1000}
                src={aboutImg}
                alt="Close-up portrait of a freckled woman with yellow, pink, and blue eyeshadow"
              />
              <Image
                width={800}
                height={1000}
                className="about-image-soft-blur"
                src={aboutImg}
                alt=""
                aria-hidden="true"
              />
              <div className="about-image-soft-wash" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
      <section className="manifesto">
        <Heading className="display-heading">
          A beauty shop for curious
          <br />
          people, not perfect ones.
        </Heading>
        <div className="manifesto-copy">
          <p>
            We started Daze & Dewy with one simple idea: discovering beauty
            should feel personal, joyful, and never overwhelming.
          </p>
          <p>
            So we keep our shelves intentionally small. Every formula, color,
            and scent earns its place through performance, pleasure, and the
            story behind the brand.
          </p>
        </div>
      </section>
      <section
        ref={valuesRef}
        className={`values-grid${valuesVisible ? " is-visible" : ""}`}
      >
        <div>
          <Heading as="subsection">Curated, always</Heading>
          <p>Fewer products. Better choices. Each one tried and truly loved.</p>
        </div>
        <div>
          <Heading as="subsection">Beauty, your way</Heading>
          <p>No rules, no fixing. Just tools for expression and daily care.</p>
        </div>
        <div>
          <Heading as="subsection">Here to help</Heading>
          <p>Warm advice, honest answers, and a studio door that's open.</p>
        </div>
      </section>
      <section
        ref={ctaRef}
        className={`about-cta${ctaVisible ? " is-visible" : ""}`}
      >
        <p className="kicker">Come say hello</p>
        <Heading className="display-heading">
          Beauty is better together.
        </Heading>
        <NavLink
          page="contact"
          onNavigate={onNavigate}
          className="primary-link"
        >
          Visit the studio <Icon name="arrow" size={18} />
        </NavLink>
      </section>
    </main>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  function submit(event: SubmitEvent) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <main className="contact-page">
      <section className="contact-intro">
        <p className="kicker">We'd love to hear from you</p>
        <Heading as="page" className="page-title">
          Let's talk beauty.
        </Heading>
        <p>
          Need a recommendation, have a question, or simply want to say hello?
          Drop us a note.
        </p>
      </section>
      <section className="contact-layout">
        <div className="contact-details">
          <Heading className="contact-heading">Visit our studio</Heading>
          <p>
            214 Laurel Street
            <br />
            Savannah, GA 31401
          </p>
          <p>
            Monday-Saturday, 10 AM - 6 PM
            <br />
            Sunday, 11 AM - 4PM
          </p>
          <p>
            hello@dazeanddewy.com
            <br />
            (912) 555-0148
          </p>
          <div className="map" aria-label="Map showing studio location">
            <div className="map-streets" />
            <div className="map-pin">
              <span>DAZE & DEWY</span>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label>
            <span>Name</span>
            <input required name="name" placeholder="Your name" autoComplete="name"/>
          </label>
          <label>
            <span>Email</span>
            <input
              required
              type="email"
              name="email"
              placeholder="you@email.com"
              autoComplete="email"
            />
          </label>
          <label>
            <span>What can we help with?</span>
            <select name="topic" defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              <option>Product recommendation</option>
              <option>Order support</option>
              <option>Press & partnerships</option>
              <option>Something else</option>
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Tell us a little more..."
            />
          </label>
          <Action type="submit" className="form-submit">
            {sent ? "Message sent — thank you" : "Send your note"}
            {sent ? null : <Icon name="arrow" size={18} />}
            
          </Action>
        </form>
      </section>
    </main>
  );
}

function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="newsletter">
          <p className="kicker">Notes from Daze & Dewy</p>
          <Heading className="footer-heading">
            Beautiful things,
            <br />
            thoughtfully shared.
          </Heading>
          <p>New arrivals, rituals, and studio happenings—sent occasionally.</p>
          <div className="email-field">
            <input
              name="footer_email"
              type="email"
              aria-label="Email address"
              placeholder="Your email address"
            />
            <Action ariaLabel="Join newsletter">
              <Icon name="arrow" />
            </Action>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <span>SHOP</span>
            {["New", "Skincare", "Makeup", "Bath & Body", "Candles"].map(
              (item) => (
                <NavLink
                  key={item}
                  page={item === "New" ? "new" : `category:${item}`}
                  onNavigate={onNavigate}
                >
                  {item}
                </NavLink>
              ),
            )}
          </div>
          <div>
            <span>DAZE & DEWY</span>
            <NavLink page="about" onNavigate={onNavigate}>
              Our story
            </NavLink>
            <NavLink page="contact" onNavigate={onNavigate}>
              Visit us
            </NavLink>
            <NavLink page="contact" onNavigate={onNavigate}>
              Contact
            </NavLink>
            <NavLink page="blog" onNavigate={onNavigate}>
              Blog
            </NavLink>
          </div>
          <div>
            <span>FOLLOW</span>
            <a href="https://www.instagram.com/" target="_blank">Instagram</a>
            <a href="https://www.pinterest.com/" target="_blank">Pinterest</a>
            <a href="https://www.tiktok.com/" target="_blank">TikTok</a>
          </div>
        </div>
      </div>
      <div className="footer-wordmark">DAZE & DEWY</div>
      <div className="footer-bottom">
        <span>© 2026 DAZE & DEWY BEAUTY CO.</span>
        <nav className="footer-legal" aria-label="Policies">
          <NavLink page="privacy" onNavigate={onNavigate}>
            Privacy
          </NavLink>
          <span aria-hidden="true">·</span>
          <NavLink page="terms" onNavigate={onNavigate}>
            Terms
          </NavLink>
          <span aria-hidden="true">·</span>
          <NavLink page="shipping" onNavigate={onNavigate}>
            Shipping
          </NavLink>
        </nav>
        <span>SAVANNAH, GEORGIA</span>
      </div>
    </footer>
  );
}

function PolicyPage({
  page,
  onNavigate,
}: {
  page: "privacy" | "terms" | "shipping";
  onNavigate: (page: string) => void;
}) {
  const content = {
    privacy: {
      title: "Privacy, with care",
      intro:
        "Your trust matters to us. This sample privacy page describes, in broad strokes, how Daze & Dewy may handle information when you visit our little corner of the internet.",
      sections: [
        [
          "Information you share",
          "If you write to us, join our mailing list, or place an order, you may choose to share details like your name, email address, and delivery information. This placeholder copy will be updated with the specific information our store collects.",
        ],
        [
          "How it may be used",
          "Information may help us answer your questions, keep the shop running, and make your experience feel a little more personal. We will add details about our actual service providers and uses here.",
        ],
        [
          "Your choices",
          "You can contact us with questions about your information or ask to update your preferences. This sample text is not a complete account of your privacy rights or choices.",
        ],
      ],
    },
    terms: {
      title: "A few ground rules",
      intro:
        "These draft terms are a friendly placeholder for the guidelines that will apply when you browse or shop with Daze & Dewy.",
      sections: [
        [
          "Using this site",
          "Please use the shop in a considerate, lawful way. Product descriptions, imagery, and other site content are shared to help you explore our edit and may be updated as the shop grows.",
        ],
        [
          "Orders and availability",
          "Any order details, pricing, availability, and purchase conditions will be shown during checkout. This sample page does not yet set out the complete terms of sale.",
        ],
        [
          "Questions",
          "If something is unclear, send us a note through the contact page and we will be happy to help. Final terms will be posted here when ready.",
        ],
      ],
    },
    shipping: {
      title: "Shipping, made simple",
      intro:
        "We want your finds to reach you smoothly. This sample page is a starting point for shipping information; the options shown at checkout will have the details for your order.",
      sections: [
        [
          "Packing your order",
          "We take care when preparing each order. Processing times and carrier details will be added here once our shipping schedule is finalized.",
        ],
        [
          "Rates and timing",
          "Available shipping methods, delivery estimates, and costs depend on the destination and order. Review the options presented at checkout for your current order.",
        ],
        [
          "Need a hand?",
          "If you have a question about a delivery, contact us with your order details and we will help you find the next step.",
        ],
      ],
    },
  }[page];

  return (
    <main className="legal-page">
      <p className="kicker">Sample policy copy</p>
      <Heading as="page" className="legal-title">
        {content.title}
      </Heading>
      <p className="legal-intro">{content.intro}</p>
      <div className="legal-sections">
        {content.sections.map(([heading, copy]) => (
          <section key={heading}>
            <Heading as="subsection">{heading}</Heading>
            <p>{copy}</p>
          </section>
        ))}
      </div>
      <NavLink page="shop" onNavigate={onNavigate} className="text-link">
        Back to the shop <Icon name="arrow" size={16} />
      </NavLink>
    </main>
  );
}

function CartDrawer({
  items,
  open,
  onClose,
  onQuantity,
  onCheckout,
}: {
  items: CartItem[];
  open: boolean;
  onClose: () => void;
  onQuantity: (id: number, change: number) => void;
  onCheckout: () => void;
}) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const remaining = Math.max(0, 75 - subtotal);
  return (
    <>
      <div
        className={`cart-overlay ${open ? "visible" : ""}`}
        onClick={onClose}
      />
      <aside
        className={`cart-drawer ${open ? "open" : ""}`}
        aria-label="Shopping bag"
      >
        <div className="cart-header">
          <div>
            <p className="kicker">Your selection</p>
            <Heading className="cart-title">Shopping bag</Heading>
          </div>
          <Action
            className="drawer-close"
            onClick={onClose}
            ariaLabel="Close bag"
          >
            <Icon name="close" />
          </Action>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart">
            <Heading className="cart-title">Your bag is waiting.</Heading>
            <p>Add something lovely to begin your ritual.</p>
            <Action className="form-submit" onClick={onClose}>
              Continue shopping
            </Action>
          </div>
        ) : (
          <>
            <div className="shipping-meter">
              <p>
                {remaining > 0
                  ? `You're $${remaining.toFixed(0)} away from complimentary shipping.`
                  : "You've unlocked complimentary shipping."}
              </p>
              <div>
                <span
                  style={{ width: `${Math.min(100, (subtotal / 75) * 100)}%` }}
                />
              </div>
            </div>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <Image width={900} height={900} src={item.image} alt={item.name} />
                  <div>
                    <p className="eyebrow">{item.brand}</p>
                    <Heading as="subsection">{item.name}</Heading>
                    <p>${item.price}</p>
                    <div className="quantity">
                      <Action
                        onClick={() => onQuantity(item.id, -1)}
                        ariaLabel={`Remove one ${item.name}`}
                      >
                        <Icon name="minus" size={14} />
                      </Action>
                      <span>{item.quantity}</span>
                      <Action
                        onClick={() => onQuantity(item.id, 1)}
                        ariaLabel={`Add one ${item.name}`}
                      >
                        <Icon name="plus" size={14} />
                      </Action>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-footer">
              <div className="subtotal">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <p>Taxes and shipping calculated at checkout.</p>
              <Action className="checkout-button" onClick={onCheckout}>
                Checkout <Icon name="arrow" size={18} />
              </Action>
              <div className="cart-assurance">
                <span>SECURE CHECKOUT</span>
                <span>EASY RETURNS</span>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

type ShippingMethod = "standard" | "expedited";

type OrderDetails = {
  email: string;
  shipping: ShippingMethod;
  orderNumber: string;
  estimatedDelivery: string;
};

function getShippingCost(subtotal: number, method: ShippingMethod) {
  if (method === "expedited") return 18;
  return subtotal >= 75 ? 0 : 6;
}

function CheckoutPage({
  items,
  onNavigate,
  onContinue,
  onAddSuggestion,
}: {
  items: CartItem[];
  onNavigate: (page: string) => void;
  onContinue: (email: string, shipping: ShippingMethod) => void;
  onAddSuggestion: (product: Product) => void;
}) {
  const [shipping, setShipping] = useState<ShippingMethod>("standard");
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const suggestions = products
    .filter((product) => !items.some((item) => item.id === product.id))
    .slice(0, 3);

  return (
    <main className="checkout-page">
      <div className="checkout-topline">
        <NavLink page="shop" onNavigate={onNavigate} className="checkout-back">
          ← Continue shopping
        </NavLink>
        <span className="checkout-wordmark">Daze & Dewy</span>
        <span className="checkout-secure">Secure checkout</span>
      </div>
      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            onContinue(String(formData.get("checkout_email")), shipping);
          }}
        >
          <p className="kicker">Your ritual, nearly there</p>
          <Heading as="page" className="checkout-title">
            Checkout
          </Heading>
          <section>
            <Heading as="subsection">Contact</Heading>
            <label>
              Email address
              <input
                name="checkout_email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
          </section>
          <section>
            <Heading as="subsection">Delivery</Heading>
            <div className="checkout-fields">
              <label>
                First name
                <input name="delivery_name" autoComplete="given-name" required />
              </label>
              <label>
                Last name
                <input name="delivery_last_name" autoComplete="family-name" required />
              </label>
              <label className="checkout-field-wide">
                Address
                <input name="delivery_address" autoComplete="street-address" required />
              </label>
              <label>
                City
                <input name="delivery_address_2" autoComplete="address-level2" required />
              </label>
              <label>
                Postal code
                <input name="delivery_postal_code" autoComplete="postal-code" required />
              </label>
              <label className="checkout-field-wide">
                Country or region
                <select name="delivery_country" autoComplete="country-name" defaultValue="" required>
                  <option value="" disabled>Select country or region</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </label>
            </div>
          </section>
          <section>
            <Heading as="subsection">Shipping method</Heading>
            <div className="shipping-options">
              <label className="shipping-option">
                <input
                  type="radio"
                  name="shipping_method"
                  value="standard"
                  checked={shipping === "standard"}
                  onChange={() => setShipping("standard")}
                />
                <span><strong>Standard shipping</strong><small>5–7 business days · USPS</small></span>
                <b>{subtotal >= 75 ? "Free" : "$6.00"}</b>
              </label>
              <label className="shipping-option">
                <input
                  type="radio"
                  name="shipping_method"
                  value="expedited"
                  checked={shipping === "expedited"}
                  onChange={() => setShipping("expedited")}
                />
                <span><strong>Expedited shipping</strong><small>2–3 business days · FedEx</small></span>
                <b>$18.00</b>
              </label>
            </div>
            <p className="shipping-free-note">Standard shipping is on us when your order is $75 or more.</p>
          </section>
          <Action className="checkout-button checkout-continue" type="submit">
            Continue to payment <Icon name="arrow" size={18} />
          </Action>
        </form>
        <aside className="checkout-summary">
          <Heading as="subsection">Your bag</Heading>
          {items.length ? items.map((item) => (
            <div className="checkout-summary-item" key={item.id}>
              <Image width={900} height={900} src={item.image} alt="" />
              <div>
                <strong>{item.name}</strong>
                <span>{item.quantity} × ${item.price.toFixed(2)}</span>
              </div>
              <span>${(item.quantity * item.price).toFixed(2)}</span>
            </div>
          )) : <p>Your bag is empty.</p>}
          <div className="checkout-summary-total"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
          <div className="checkout-summary-total checkout-shipping-total"><span>Shipping</span><strong>{getShippingCost(subtotal, shipping) === 0 ? "Free" : `$${getShippingCost(subtotal, shipping).toFixed(2)}`}</strong></div>
          <p className="checkout-summary-note">Taxes calculated at checkout.</p>
          {suggestions.length > 0 && (
            <section className="checkout-suggestions">
              <p className="kicker">A little something extra</p>
              <Heading as="subsection">You might love</Heading>
              {suggestions.map((product) => (
                <article className="checkout-suggestion" key={product.id}>
                  <Image src={product.image} width={900} height={900} alt="" />
                  <div><strong>{product.name}</strong><span>${product.price.toFixed(2)}</span></div>
                  <Action className="checkout-add-suggestion" onClick={() => onAddSuggestion(product)}>Add</Action>
                </article>
              ))}
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}

function PaymentPage({
  items,
  email,
  shipping,
  onNavigate,
  onComplete,
}: {
  items: CartItem[];
  email: string;
  shipping: ShippingMethod;
  onNavigate: (page: string) => void;
  onComplete: () => void;
}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = getShippingCost(subtotal, shipping);
  const shippingLabel = shipping === "expedited" ? "FedEx expedited" : "Standard shipping";
  return (
    <main className="checkout-page">
      <CheckoutTopline onNavigate={onNavigate} />
      <div className="checkout-layout payment-layout">
        <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); onComplete(); }}>
          <p className="kicker">One last little step</p>
          <Heading as="page" className="checkout-title">Payment</Heading>
          <p className="payment-demo-note">This is a static storefront preview. No payment will be processed.</p>
          <section>
            <Heading as="subsection">Payment details</Heading>
            <label className="payment-field-wide">Name on card<input name="card_name" autoComplete="cc-name" required placeholder="Full name" /></label>
            <label className="payment-field-wide">Card number<input name="card_number" type="text" inputMode="numeric" autoComplete="cc-number" required placeholder="Any length is accepted in this preview" /></label>
            <div className="checkout-fields payment-fields">
              <label>Expiration date<input name="card_expiry" type="text" autoComplete="cc-exp" required placeholder="MM / YY" /></label>
              <label>Security code<input name="card_cvc" type="text" inputMode="numeric" autoComplete="cc-csc" required placeholder="CVC" /></label>
            </div>
          </section>
          <Action className="checkout-button checkout-continue" type="submit">Pay ${ (subtotal + shippingCost).toFixed(2) } <Icon name="arrow" size={18} /></Action>
        </form>
        <aside className="checkout-summary">
          <Heading as="subsection">Order summary</Heading>
          <p className="payment-summary-email">Confirmation sent to <strong>{email}</strong></p>
          {items.map((item) => (
            <div className="checkout-summary-item" key={item.id}>
              <Image width={900} height={900} src={item.image} alt="" />
              <div><strong>{item.name}</strong><span>{item.quantity} × ${item.price.toFixed(2)}</span></div>
              <span>${(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="checkout-summary-total"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
          <div className="checkout-summary-total checkout-shipping-total"><span>{shippingLabel}</span><strong>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</strong></div>
          <div className="checkout-summary-total payment-grand-total"><span>Total</span><strong>${(subtotal + shippingCost).toFixed(2)}</strong></div>
          <p className="checkout-summary-note">Taxes calculated at checkout.</p>
        </aside>
      </div>
    </main>
  );
}

function CheckoutTopline({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="checkout-topline">
      <NavLink page="shop" onNavigate={onNavigate} className="checkout-back">← Continue shopping</NavLink>
      <span className="checkout-wordmark">Daze & Dewy</span>
      <span className="checkout-secure">Secure checkout</span>
    </div>
  );
}

function OrderConfirmationPage({ order, onNavigate }: { order: OrderDetails; onNavigate: (page: string) => void }) {
  return (
    <main className="confirmation-page">
      <div className="checkout-topline">
        <NavLink page="home" onNavigate={onNavigate} className="checkout-back">DAZE & DEWY</NavLink>
        <span className="checkout-wordmark">Thank you</span>
        <NavLink page="shop" onNavigate={onNavigate} className="checkout-secure">Keep exploring</NavLink>
      </div>
      <section className="confirmation-card">
        <span className="confirmation-sparkle" aria-hidden="true">✿</span>
        <p className="kicker">Your order is in</p>
        <Heading as="page" className="checkout-title">A little joy is on its way.</Heading>
        <p className="confirmation-order-number">Order #: <span>{order.orderNumber}</span></p>
        <div className="confirmation-details">
          <div><span>Estimated delivery</span><strong>{order.estimatedDelivery}</strong></div>
          <div><span>Confirmation email</span><strong>{order.email}</strong></div>
        </div>
        <p>We’ll send you an email confirmation for this order. Once your order ships, we’ll send another message with a link to track your delivery.</p>
        <div className="confirmation-actions">
          <NavLink page="shop" onNavigate={onNavigate} className="primary-link">Back to the store <Icon name="arrow" size={18} /></NavLink>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutShipping, setCheckoutShipping] = useState<ShippingMethod>("standard");
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const onHash = () => setPage(window.location.hash.slice(1) || "home");
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function navigate(next: string) {
    setPage(next);
    window.history.pushState(null, "", `#${next}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function searchProducts(query: string) {
    navigate(`search:${encodeURIComponent(query)}`);
  }

  function addToCart(product: Product, quantity = 1) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...current, { ...product, quantity }];
    });
    setCartOpen(true);
  }

  function changeQuantity(id: number, change: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function addCheckoutSuggestion(product: Product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
  }

  function completeOrder() {
    const deliveryDate = new Date();
    let businessDays = checkoutShipping === "expedited" ? 3 : 7;
    while (businessDays > 0) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) businessDays -= 1;
    }
    setConfirmedOrder({
      email: checkoutEmail,
      shipping: checkoutShipping,
      orderNumber: `DD-${Date.now().toString().slice(-8)}`,
      estimatedDelivery: deliveryDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    });
    setCart([]);
    navigate("confirmation");
  }

  let content;
  if (page === "home") {
    content = <Home onNavigate={navigate} onAdd={addToCart} />;
  } else if (page === "about") {
    content = <AboutPage onNavigate={navigate} />;
  } else if (page === "contact") {
    content = <ContactPage />;
  } else if (page === "checkout") {
    content = (
      <CheckoutPage
        items={cart}
        onNavigate={navigate}
        onContinue={(email, shipping) => {
          setCheckoutEmail(email);
          setCheckoutShipping(shipping);
          navigate("payment");
        }}
        onAddSuggestion={addCheckoutSuggestion}
      />
    );
  } else if (page === "payment") {
    content = (
      <PaymentPage
        items={cart}
        email={checkoutEmail}
        shipping={checkoutShipping}
        onNavigate={navigate}
        onComplete={completeOrder}
      />
    );
  } else if (page === "confirmation" && confirmedOrder) {
    content = <OrderConfirmationPage order={confirmedOrder} onNavigate={navigate} />;
  } else if (page === "blog") {
    content = <BlogPage onNavigate={navigate} />;
  } else if (page === "privacy" || page === "terms" || page === "shipping") {
    content = <PolicyPage page={page} onNavigate={navigate} />;
  } else if (page === "new") {
    content = (
      <ShopPage selected="New" onNavigate={navigate} onAdd={addToCart} />
    );
  } else if (page.startsWith("product:")) {
    const productId = Number(page.slice("product:".length));
    const product = products.find((item) => item.id === productId);
    content = product ? (
      <ProductPage product={product} onNavigate={navigate} onAdd={addToCart} />
    ) : (
      <ShopPage onNavigate={navigate} onAdd={addToCart} />
    );
  } else if (page.startsWith("category:")) {
    content = (
      <ShopPage
        selected={page.replace("category:", "")}
        onNavigate={navigate}
        onAdd={addToCart}
      />
    );
  } else if (page.startsWith("brand:")) {
    content = (
      <ShopPage
        selectedBrand={decodeURIComponent(page.slice("brand:".length))}
        onNavigate={navigate}
        onAdd={addToCart}
      />
    );
  } else if (page.startsWith("search:")) {
    content = (
      <ShopPage
        searchQuery={decodeURIComponent(page.slice("search:".length))}
        onNavigate={navigate}
        onAdd={addToCart}
      />
    );
  } else {
    content = <ShopPage onNavigate={navigate} onAdd={addToCart} />;
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-shell">
      <Header
        cartCount={cartCount}
        onCart={() => setCartOpen(true)}
        onNavigate={navigate}
        onSearch={searchProducts}
      />
      {content}
      <Footer onNavigate={navigate} />
      <CartDrawer
        items={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onQuantity={changeQuantity}
        onCheckout={() => {
          setCartOpen(false);
          navigate("checkout");
        }}
      />
    </div>
  );
}
