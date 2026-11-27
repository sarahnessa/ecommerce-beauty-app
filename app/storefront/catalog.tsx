'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Action, Heading, Icon, NavLink } from './shared';
import type { Product } from './shared';
import { categories, marqueePhrases, products } from './shared';

export function Header({
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
  const [searchText, setSearchText] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchControlRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchMatches = searchText.trim()
    ? products
        .filter((product) =>
          `${product.name} ${product.brand} ${product.category}`
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
        )
        .slice(0, 4)
    : [];

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const closeSearchOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !searchControlRef.current?.contains(event.target)
      ) {
        setSearchOpen(false);
        setSearchText('');
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', closeSearchOutside);
    return () => document.removeEventListener('mousedown', closeSearchOutside);
  }, [searchOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    document.addEventListener('keydown', closeMenuOnEscape);
    return () => document.removeEventListener('keydown', closeMenuOnEscape);
  }, [mobileOpen]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchText.trim();
    if (!query) {
      searchInputRef.current?.focus();
      return;
    }
    onSearch(query);
    setSearchOpen(false);
    setSearchText('');
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
          ariaExpanded={mobileOpen}
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
          <div
            ref={searchControlRef}
            className={`search-control${searchOpen ? ' is-open' : ''}`}
          >
            <Action
              className="search-button"
              onClick={() => setSearchOpen((open) => !open)}
              ariaLabel={searchOpen ? 'Close search' : 'Search'}
              ariaExpanded={searchOpen}
            >
              <Icon name={searchOpen ? 'close' : 'search'} size={18} />
            </Action>
            <form className="header-search-form" onSubmit={submitSearch}>
              <input
                ref={searchInputRef}
                name="search_input"
                type="search"
                role="combobox"
                aria-autocomplete="list"
                aria-label="Search products"
                placeholder="Search products"
                value={searchText}
                aria-controls={
                  searchOpen && searchText.trim()
                    ? 'search-suggestions'
                    : undefined
                }
                aria-expanded={searchOpen && searchText.trim().length > 0}
                aria-activedescendant={
                  focusedIndex >= 0
                    ? `search-suggestion-${focusedIndex}`
                    : undefined
                }
                onChange={(event) => {
                  setSearchText(event.target.value);
                  setFocusedIndex(-1);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setSearchOpen(false);
                    setSearchText('');
                    setFocusedIndex(-1);
                  } else if (
                    event.key === 'ArrowDown' &&
                    searchMatches.length
                  ) {
                    event.preventDefault();
                    setFocusedIndex((index) =>
                      index < searchMatches.length - 1 ? index + 1 : 0
                    );
                  } else if (event.key === 'ArrowUp' && searchMatches.length) {
                    event.preventDefault();
                    setFocusedIndex((index) =>
                      index > 0 ? index - 1 : searchMatches.length - 1
                    );
                  } else if (
                    event.key === 'Enter' &&
                    focusedIndex >= 0 &&
                    searchMatches[focusedIndex]
                  ) {
                    event.preventDefault();
                    onSearch(searchMatches[focusedIndex].name);
                    setSearchOpen(false);
                    setSearchText('');
                    setFocusedIndex(-1);
                  }
                }}
                tabIndex={searchOpen ? 0 : -1}
              />
            </form>
            {searchOpen && searchText.trim() && (
              <div className="search-suggestions">
                {searchMatches.length ? (
                  <div
                    id="search-suggestions"
                    role="listbox"
                    aria-label="Matching products"
                  >
                    {searchMatches.map((product, index) => (
                      <div
                        key={product.id}
                        id={`search-suggestion-${index}`}
                        aria-selected={focusedIndex === index}
                        role="option"
                        tabIndex={-1}
                        onClick={() => {
                          onSearch(product.name);
                          setSearchOpen(false);
                          setSearchText('');
                          setFocusedIndex(-1);
                        }}
                      >
                        <span>{product.name}</span>
                        <small>{product.brand}</small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p role="status">No matching products</p>
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
          {['home', 'shop', 'new', 'about', 'contact'].map((item) => (
            <NavLink
              key={item}
              page={item}
              onNavigate={(page) => {
                onNavigate(page);
                setMobileOpen(false);
              }}
            >
              {item === 'contact'
                ? 'Visit & contact'
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

export function ProductPage({
  product,
  onNavigate,
  onAdd,
}: {
  product: Product;
  onNavigate: (page: string) => void;
  onAdd: (product: Product, quantity?: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [galleryState, setGalleryState] = useState<{
    productId: Product['id'];
    view: 'main' | 'detail' | 'note';
  }>({ productId: product.id, view: 'main' });
  const activeGalleryView =
    galleryState.productId === product.id ? galleryState.view : 'main';
  const editorialNotes: Record<
    string,
    { tone: string; icon: ReactNode; firstLine: string; secondLine: string }
  > = {
    Skincare: {
      tone: 'skincare',
      icon: '✿',
      firstLine: 'Chosen with care.',
      secondLine: 'Made for your everyday.',
    },
    Makeup: {
      tone: 'makeup',
      icon: '✦',
      firstLine: 'Color outside the lines.',
      secondLine: 'Softly worn, all yours.',
    },
    'Bath & Body': {
      tone: 'bath-body',
      icon: (
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 33C18 25 23 18 30 8" />
          <path d="M16 27c-5-1-8-4-8-8 5 0 8 3 8 8Z" />
          <path d="M22 19c-1-5 1-9 5-11 2 5 0 9-5 11Z" />
          <path d="M27 13c2-4 6-6 10-5-1 5-5 7-10 5Z" />
          <path d="M12 32c-3 0-5 2-6 5" />
        </svg>
      ),
      firstLine: 'Slow down and soak it in.',
      secondLine: 'Comfort from head to toe.',
    },
    Candles: {
      tone: 'candles',
      icon: '✺',
      firstLine: 'Light a little warmth.',
      secondLine: 'Made for slower evenings.',
    },
    Tools: {
      tone: 'tools',
      icon: '✾',
      firstLine: 'Thoughtful by design.',
      secondLine: 'An easy lift for daily rituals.',
    },
  };
  const editorialNote =
    editorialNotes[product.category] ?? editorialNotes.Skincare;
  const related = products.filter((item) => item.id !== product.id).slice(0, 4);
  const categoryCopy: Record<string, string> = {
    Skincare:
      'A considered daily essential made to bring a little more comfort and care to your routine. Easy to reach for, lovely to use, and designed for real life.',
    Makeup:
      'Playful color with a soft, wearable feel. Make it your own, keep it close, and bring a little extra joy to the everyday.',
    'Bath & Body':
      'A feel-good staple for everyday rituals, with a comforting texture and an easy, feel-good finish from head to toe.',
    Candles:
      'A gentle glow for slower evenings and softer starts. Light it when you want your space to feel a little more like yours.',
    Tools:
      'A simple, thoughtful tool designed to make your everyday routine feel easy, calming, and just a little more special.',
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
          <button
            type="button"
            className={`product-gallery-main${activeGalleryView === 'note' ? ` product-gallery-note product-gallery-note--${editorialNote.tone}` : ''}`}
            aria-label="View main product image"
            aria-pressed={activeGalleryView === 'main'}
            onClick={() =>
              setGalleryState({ productId: product.id, view: 'main' })
            }
          >
            {activeGalleryView === 'note' ? (
              <>
                <span className="flower-mark" aria-hidden="true">
                  {editorialNote.icon}
                </span>
                <p>
                  {editorialNote.firstLine}
                  <br />
                  {editorialNote.secondLine}
                </p>
              </>
            ) : (
              <>
                <Image
                  width={900}
                  height={900}
                  src={product.image}
                  alt={product.name}
                />
                {activeGalleryView === 'main' && product.badge && (
                  <span
                    className={`product-badge ${product.badge.toLowerCase()}`}
                  >
                    {product.badge}
                  </span>
                )}
              </>
            )}
          </button>
          <button
            type="button"
            className="product-gallery-detail"
            aria-label="View detail product image"
            aria-pressed={activeGalleryView === 'detail'}
            onClick={() =>
              setGalleryState({ productId: product.id, view: 'detail' })
            }
          >
            <Image
              width={900}
              height={900}
              src={product.image}
              alt={`${product.name}, close-up`}
            />
          </button>
          <button
            type="button"
            className={`product-gallery-note product-gallery-note--${editorialNote.tone}`}
            aria-label="View editorial note"
            aria-pressed={activeGalleryView === 'note'}
            onClick={() =>
              setGalleryState({ productId: product.id, view: 'note' })
            }
          >
            <span className="flower-mark" aria-hidden="true">
              {editorialNote.icon}
            </span>
            <p>
              {editorialNote.firstLine}
              <br />
              {editorialNote.secondLine}
            </p>
          </button>
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

export function Home({
  onNavigate,
  onAdd,
}: {
  onNavigate: (page: string) => void;
  onAdd: (product: Product) => void;
}) {
  const storyRef = useRef<HTMLElement | null>(null);
  const featuredRef = useRef<HTMLDivElement | null>(null);
  const [storyVisible, setStoryVisible] = useState(() => {
    if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
      return true;
    }
    return false;
  });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateFeaturedScrollState = () => {
    const scroller = featuredRef.current;
    if (!scroller) return;

    setCanScrollLeft(scroller.scrollLeft > 4);
    setCanScrollRight(
      scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 4
    );
  };

  useEffect(() => {
    updateFeaturedScrollState();
    window.addEventListener('resize', updateFeaturedScrollState);
    return () =>
      window.removeEventListener('resize', updateFeaturedScrollState);
  }, []);

  useEffect(() => {
    const section = storyRef.current;
    if (!section || storyVisible) return;
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStoryVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30% 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [storyVisible]);

  return (
    <main>
      <section className="hero">
        <Image
          className="hero-image w-full h-auto"
          width={1600}
          height={1067}
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
          onScroll={updateFeaturedScrollState}
        >
          <ProductGrid
            items={products.slice(0, 9)}
            onAdd={onAdd}
            onNavigate={onNavigate}
          />
        </div>
        <div className="featured-scroll-controls">
          {canScrollLeft && (
            <Action
              className="featured-scroll-next featured-scroll-back"
              ariaLabel="Scroll back to earlier featured products"
              onClick={() =>
                featuredRef.current?.scrollBy({
                  left: -featuredRef.current.clientWidth * 0.8,
                  behavior: 'smooth',
                })
              }
            >
              <Icon name="arrow" size={21} />
            </Action>
          )}
          {canScrollRight && (
            <Action
              className="featured-scroll-next"
              ariaLabel="Scroll to more featured products"
              onClick={() =>
                featuredRef.current?.scrollBy({
                  left: featuredRef.current.clientWidth * 0.8,
                  behavior: 'smooth',
                })
              }
            >
              <Icon name="arrow" size={21} />
            </Action>
          )}
        </div>
      </section>

      <section
        ref={storyRef}
        className={`category-story${storyVisible ? ' is-visible' : ''}`}
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
            you&apos;re in.
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
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy}>
              {marqueePhrases.map((phrase) => (
                <span key={phrase}>
                  {phrase}
                  <Icon name="flower" size={28} />
                </span>
              ))}
            </div>
          ))}
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

export function ShopPage({
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
    (searchQuery ? 'Search results' : 'All beauty');
  const normalizedSearch = searchQuery?.trim().toLowerCase();
  const shown = normalizedSearch
    ? products.filter((item) =>
        `${item.name} ${item.brand} ${item.category}`
          .toLowerCase()
          .includes(normalizedSearch)
      )
    : selectedBrand
      ? products.filter((item) => item.brand === selectedBrand)
      : title === 'All beauty'
        ? products
        : title === 'New'
          ? products.filter((item) => item.badge === 'New')
          : products.filter((item) => item.category === title);
  return (
    <main className="listing-page">
      <div className="listing-hero">
        <p className="kicker">
          {searchQuery
            ? `Results for “${searchQuery}”`
            : selectedBrand
              ? 'The brand edit'
              : 'The Daze & Dewy edit'}
        </p>
        <Heading as="page" className="page-title">
          {title}
        </Heading>
        <p>
          {shown.length} thoughtful {shown.length < 2 ? 'find' : 'finds'} for
          your ritual
        </p>
      </div>
      <div className="category-nav">
        {categories.map((category) => (
          <NavLink
            key={category}
            page={category === 'New' ? 'new' : `category:${category}`}
            onNavigate={onNavigate}
            className={category === title ? 'active' : ''}
          >
            {category}
          </NavLink>
        ))}
        <NavLink
          page="shop"
          onNavigate={onNavigate}
          className={title === 'All beauty' ? 'active' : ''}
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
