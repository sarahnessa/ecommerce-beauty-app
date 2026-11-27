'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import type { FormEvent } from 'react';
import {
  Icon,
  products,
  sessionUnlockedEvent,
  subscribeToSessionUnlock,
  getSessionUnlockSnapshot,
  getServerSessionUnlockSnapshot,
} from './storefront/shared';
import type {
  CartItem,
  OrderDetails,
  Product,
  ShippingMethod,
} from './storefront/shared';
import {
  AboutPage,
  BlogPage,
  ContactPage,
  Footer,
  PolicyPage,
} from './storefront/editorial';
import { Header, Home, ProductPage, ShopPage } from './storefront/catalog';
import {
  CartDrawer,
  CheckoutPage,
  PaymentPage,
  OrderConfirmationPage,
} from './storefront/commerce';

export default function App() {
  const isVercelEnv =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

  const sessionUnlocked = useSyncExternalStore(
    subscribeToSessionUnlock,
    getSessionUnlockSnapshot,
    getServerSessionUnlockSnapshot
  );
  const isAuthenticated = !isVercelEnv || sessionUnlocked;

  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [page, setPage] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutShipping, setCheckoutShipping] =
    useState<ShippingMethod>('standard');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(
    null
  );

  useEffect(() => {
    const onHash = () => setPage(window.location.hash.slice(1) || 'home');
    onHash();
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
    };
  }, []);

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const expectedPassword = process.env.NEXT_PUBLIC_PREVIEW_PASSWORD;

    if (expectedPassword && passwordInput === expectedPassword) {
      sessionStorage.setItem('site_unlocked', 'true');
      window.dispatchEvent(new Event(sessionUnlockedEvent));
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect password. Please try again.');
      setPasswordInput('');
    }
  };

  if (isVercelEnv && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 font-sans text-stone-800">
        <div className="w-full max-w-md bg-white border border-stone-200 rounded-2xl p-8 shadow-sm text-center">
          <div className="flex justify-center text-stone-700 mb-4">
            <Icon name="flower" size={40} />
          </div>

          <h1 className="text-2xl font-serif tracking-wide mb-2">
            Shopify Beauty
          </h1>
          <p className="text-sm text-stone-500 mb-6">
            This preview project is private. Enter the security password to view
            the storefront content.
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="preview-password" className="sr-only">
                Password
              </label>
              <input
                id="preview-password"
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setErrorMessage('');
                }}
                aria-describedby={
                  errorMessage ? 'preview-password-error' : undefined
                }
                aria-invalid={errorMessage ? true : undefined}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg text-sm bg-stone-50 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600 focus:border-stone-600 transition-all text-center"
              />
            </div>

            {errorMessage && (
              <p
                id="preview-password-error"
                role="alert"
                className="text-xs text-rose-600 font-medium"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-stone-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-stone-800 active:bg-stone-950 transition-colors tracking-wide"
            >
              Access Storefront
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-stone-100 text-[10px] text-stone-400 tracking-wider uppercase">
            Protected Preview Environment
          </div>
        </div>
      </div>
    );
  }

  function navigate(next: string) {
    setPage(next);
    window.history.pushState(null, '', `#${next}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              : item
          )
        : [...current, { ...product, quantity }];
    });
    setCartOpen(true);
  }

  function changeQuantity(id: number, change: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function addCheckoutSuggestion(product: Product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...current, { ...product, quantity: 1 }];
    });
  }

  function completeOrder() {
    const deliveryDate = new Date();
    let businessDays = checkoutShipping === 'expedited' ? 3 : 7;
    while (businessDays > 0) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6)
        businessDays -= 1;
    }
    setConfirmedOrder({
      email: checkoutEmail,
      shipping: checkoutShipping,
      orderNumber: `DD-${Date.now().toString().slice(-8)}`,
      estimatedDelivery: deliveryDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    });
    setCart([]);
    navigate('confirmation');
  }

  let content;
  if (page === 'home') {
    content = <Home onNavigate={navigate} onAdd={addToCart} />;
  } else if (page === 'about') {
    content = <AboutPage onNavigate={navigate} />;
  } else if (page === 'contact') {
    content = <ContactPage />;
  } else if (page === 'checkout') {
    content = (
      <CheckoutPage
        items={cart}
        onNavigate={navigate}
        onContinue={(email, shipping) => {
          setCheckoutEmail(email);
          setCheckoutShipping(shipping);
          navigate('payment');
        }}
        onAddSuggestion={addCheckoutSuggestion}
      />
    );
  } else if (page === 'payment') {
    content = (
      <PaymentPage
        items={cart}
        email={checkoutEmail}
        shipping={checkoutShipping}
        onNavigate={navigate}
        onComplete={completeOrder}
      />
    );
  } else if (page === 'confirmation' && confirmedOrder) {
    content = (
      <OrderConfirmationPage order={confirmedOrder} onNavigate={navigate} />
    );
  } else if (page === 'blog') {
    content = <BlogPage onNavigate={navigate} />;
  } else if (page === 'privacy' || page === 'terms' || page === 'shipping') {
    content = <PolicyPage page={page} onNavigate={navigate} />;
  } else if (page === 'new') {
    content = (
      <ShopPage selected="New" onNavigate={navigate} onAdd={addToCart} />
    );
  } else if (page.startsWith('product:')) {
    const productId = Number(page.slice('product:'.length));
    const product = products.find((item) => item.id === productId);
    content = product ? (
      <ProductPage product={product} onNavigate={navigate} onAdd={addToCart} />
    ) : (
      <ShopPage onNavigate={navigate} onAdd={addToCart} />
    );
  } else if (page.startsWith('category:')) {
    content = (
      <ShopPage
        selected={page.replace('category:', '')}
        onNavigate={navigate}
        onAdd={addToCart}
      />
    );
  } else if (page.startsWith('brand:')) {
    content = (
      <ShopPage
        selectedBrand={decodeURIComponent(page.slice('brand:'.length))}
        onNavigate={navigate}
        onAdd={addToCart}
      />
    );
  } else if (page.startsWith('search:')) {
    content = (
      <ShopPage
        searchQuery={decodeURIComponent(page.slice('search:'.length))}
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
          navigate('checkout');
        }}
      />
    </div>
  );
}
