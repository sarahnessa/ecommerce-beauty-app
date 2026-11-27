'use client';
import type { ReactNode } from 'react';
import aboutImg from '../../public/about-image.jpg';
import bodyProductImg from '../../public/products/body.svg';
import candleProductImg from '../../public/products/candle.svg';
import makeupProductImg from '../../public/products/makeup.svg';
import serumProductImg from '../../public/products/serum.svg';
import skincareProductImg from '../../public/products/skincare.svg';
import toolProductImg from '../../public/products/tool.svg';
export { skincareProductImg };

export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
};
export type CartItem = Product & { quantity: number };
export type ShippingMethod = 'standard' | 'expedited';
export type OrderDetails = {
  email: string;
  shipping: ShippingMethod;
  orderNumber: string;
  estimatedDelivery: string;
};

export function getShippingCost(subtotal: number, method: ShippingMethod) {
  if (method === 'expedited') return 18;
  return subtotal >= 75 ? 0 : 6;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Daily Cloud Cream',
    brand: 'Daze & Dewy',
    category: 'Skincare',
    price: 42,
    badge: 'New',
    image: skincareProductImg,
  },
  {
    id: 2,
    name: 'Soft Tint Lip Colour',
    brand: 'Studio Form',
    category: 'Makeup',
    price: 28,
    badge: 'Bestseller',
    image: makeupProductImg,
  },
  {
    id: 3,
    name: 'Dew Drop Serum',
    brand: 'Daze & Dewy',
    category: 'Skincare',
    price: 58,
    image: serumProductImg,
  },
  {
    id: 4,
    name: 'Bonbon Bath Ritual Set',
    brand: 'Bonbon Bloom',
    category: 'Bath & Body',
    price: 64,
    badge: 'Exclusive',
    image: bodyProductImg,
  },
  {
    id: 5,
    name: 'Quiet Evening Candle',
    brand: 'Soft Ritual',
    category: 'Candles',
    price: 46,
    badge: 'New',
    image: candleProductImg,
  },
  {
    id: 6,
    name: 'Comfort Skin Balm',
    brand: 'Daze & Dewy',
    category: 'Skincare',
    price: 39,
    badge: 'New',
    image: skincareProductImg,
  },
  {
    id: 7,
    name: 'Daydream Colour Palette',
    brand: 'Studio Form',
    category: 'Makeup',
    price: 36,
    image: makeupProductImg,
  },
  {
    id: 8,
    name: 'Smooth Stone Tool',
    brand: 'Daze & Dewy',
    category: 'Tools',
    price: 32,
    image: toolProductImg,
  },
  {
    id: 9,
    name: 'Vanilla Taffy Body Wash',
    brand: 'Bonbon Bloom',
    category: 'Bath & Body',
    price: 36,
    badge: 'Bestseller',
    image: bodyProductImg,
  },
  {
    id: 10,
    name: 'Daily Soft Body Lotion',
    brand: 'Soft Ritual',
    category: 'Bath & Body',
    price: 38,
    image: bodyProductImg,
  },
  {
    id: 11,
    name: 'Everyday Deodorant',
    brand: 'Soft Ritual',
    category: 'Bath & Body',
    price: 24,
    badge: 'New',
    image: bodyProductImg,
  },
  {
    id: 12,
    name: 'Soft Cloud Body Mist',
    brand: 'Soft Ritual',
    category: 'Bath & Body',
    price: 42,
    image: bodyProductImg,
  },
  {
    id: 13,
    name: 'Marshmallow Melt Hand Cream',
    brand: 'Bonbon Bloom',
    category: 'Skincare',
    price: 22,
    image: skincareProductImg,
  },
  {
    id: 14,
    name: 'Polishing Body Scrub',
    brand: 'Daze & Dewy',
    category: 'Bath & Body',
    price: 32,
    badge: 'Exclusive',
    image: bodyProductImg,
  },
  {
    id: 15,
    name: 'Rich Day Cream',
    brand: 'Daze & Dewy',
    category: 'Skincare',
    price: 28,
    badge: 'Bestseller',
    image: skincareProductImg,
  },
  {
    id: 16,
    name: 'Gentle Cleansing Bar',
    brand: 'Soft Ritual',
    category: 'Bath & Body',
    price: 18,
    image: bodyProductImg,
  },
  {
    id: 17,
    name: 'Glow Body Oil',
    brand: 'Daze & Dewy',
    category: 'Bath & Body',
    price: 38,
    badge: 'New',
    image: serumProductImg,
  },
  {
    id: 18,
    name: 'Gentle Body Cleanser',
    brand: 'Soft Ritual',
    category: 'Bath & Body',
    price: 26,
    image: bodyProductImg,
  },
  {
    id: 19,
    name: 'Sunbeam Candle',
    brand: 'Wick & Wonder',
    category: 'Candles',
    price: 34,
    image: candleProductImg,
  },
  {
    id: 20,
    name: 'Evening Candle Set',
    brand: 'Wick & Wonder',
    category: 'Candles',
    price: 58,
    badge: 'Exclusive',
    image: candleProductImg,
  },
];

export const categories = [
  'New',
  'Skincare',
  'Makeup',
  'Bath & Body',
  'Candles',
  'Tools',
];
export const marqueePhrases = [
  'SMALL-BATCH BEAUTY',
  'CULT-FAVORITE BRANDS',
  'RITUALS FOR REAL LIFE',
  'GOOD SKIN DAYS',
  'COLOR OUTSIDE THE LINES',
  'YOUR DAILY DOSE OF JOY',
];

export const sessionUnlockedEvent = 'daze-dewy:session-unlocked';

export function subscribeToSessionUnlock(onChange: () => void) {
  window.addEventListener(sessionUnlockedEvent, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(sessionUnlockedEvent, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function getSessionUnlockSnapshot() {
  return window.sessionStorage.getItem('site_unlocked') === 'true';
}

export function getServerSessionUnlockSnapshot() {
  return false;
}

export function Icon({
  name,
  size = 20,
}: {
  name:
    'bag' | 'arrow' | 'menu' | 'close' | 'plus' | 'minus' | 'search' | 'flower';
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

export function Action({
  children,
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
  ariaExpanded,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  ariaLabel?: string;
  ariaExpanded?: boolean;
}) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
    >
      {children}
    </button>
  );
}

export function NavLink({
  children,
  page,
  onNavigate,
  className = '',
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

export function Heading({
  as = 'section',
  children,
  className = '',
}: {
  as?: 'page' | 'section' | 'subsection';
  children: ReactNode;
  className?: string;
}) {
  const level = as === 'page' ? 1 : as === 'section' ? 2 : 3;
  if (level === 1) return <h1 className={className}>{children}</h1>;
  if (level === 2) return <h2 className={className}>{children}</h2>;
  return <h3 className={className}>{children}</h3>;
}

export { aboutImg };
