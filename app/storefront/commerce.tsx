'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Action, Heading, Icon, NavLink } from './shared';
import type { CartItem, OrderDetails, Product, ShippingMethod } from './shared';
import { getShippingCost, products } from './shared';

export function CartDrawer({
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
  useEffect(() => {
    if (!open) return;

    const closeCartOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', closeCartOnEscape);
    return () => document.removeEventListener('keydown', closeCartOnEscape);
  }, [onClose, open]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const remaining = Math.max(0, 75 - subtotal);
  return (
    <>
      <button
        type="button"
        className={`cart-overlay ${open ? 'visible' : ''}`}
        onClick={onClose}
        aria-label="Close shopping bag"
      />
      <aside
        className={`cart-drawer ${open ? 'open' : ''}`}
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
                  <Image
                    width={900}
                    height={900}
                    src={item.image}
                    alt={item.name}
                  />
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

export function CheckoutPage({
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
  const [shipping, setShipping] = useState<ShippingMethod>('standard');
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
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
            onContinue(String(formData.get('checkout_email')), shipping);
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
                <input
                  name="delivery_name"
                  autoComplete="given-name"
                  required
                />
              </label>
              <label>
                Last name
                <input
                  name="delivery_last_name"
                  autoComplete="family-name"
                  required
                />
              </label>
              <label className="checkout-field-wide">
                Address
                <input
                  name="delivery_address"
                  autoComplete="street-address"
                  required
                />
              </label>
              <label>
                City
                <input
                  name="delivery_address_2"
                  autoComplete="address-level2"
                  required
                />
              </label>
              <label>
                Postal code
                <input
                  name="delivery_postal_code"
                  autoComplete="postal-code"
                  required
                />
              </label>
              <label className="checkout-field-wide">
                Country or region
                <select
                  name="delivery_country"
                  autoComplete="country-name"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select country or region
                  </option>
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
                  checked={shipping === 'standard'}
                  onChange={() => setShipping('standard')}
                />
                <span>
                  <strong>Standard shipping</strong>
                  <small>5–7 business days · USPS</small>
                </span>
                <b>{subtotal >= 75 ? 'Free' : '$6.00'}</b>
              </label>
              <label className="shipping-option">
                <input
                  type="radio"
                  name="shipping_method"
                  value="expedited"
                  checked={shipping === 'expedited'}
                  onChange={() => setShipping('expedited')}
                />
                <span>
                  <strong>Expedited shipping</strong>
                  <small>2–3 business days · FedEx</small>
                </span>
                <b>$18.00</b>
              </label>
            </div>
            <p className="shipping-free-note">
              Standard shipping is on us when your order is $75 or more.
            </p>
          </section>
          <Action className="checkout-button checkout-continue" type="submit">
            Continue to payment <Icon name="arrow" size={18} />
          </Action>
        </form>
        <aside className="checkout-summary">
          <Heading as="subsection">Your bag</Heading>
          {items.length ? (
            items.map((item) => (
              <div className="checkout-summary-item" key={item.id}>
                <Image width={900} height={900} src={item.image} alt="" />
                <div>
                  <strong>{item.name}</strong>
                  <span>
                    {item.quantity} × ${item.price.toFixed(2)}
                  </span>
                </div>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p>Your bag is empty.</p>
          )}
          <div className="checkout-summary-total">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="checkout-summary-total checkout-shipping-total">
            <span>Shipping</span>
            <strong>
              {getShippingCost(subtotal, shipping) === 0
                ? 'Free'
                : `$${getShippingCost(subtotal, shipping).toFixed(2)}`}
            </strong>
          </div>
          <p className="checkout-summary-note">Taxes calculated at checkout.</p>
          {suggestions.length > 0 && (
            <section className="checkout-suggestions">
              <p className="kicker">A little something extra</p>
              <Heading as="subsection">You might love</Heading>
              {suggestions.map((product) => (
                <article className="checkout-suggestion" key={product.id}>
                  <Image src={product.image} width={900} height={900} alt="" />
                  <div>
                    <strong>{product.name}</strong>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                  <Action
                    className="checkout-add-suggestion"
                    onClick={() => onAddSuggestion(product)}
                  >
                    Add
                  </Action>
                </article>
              ))}
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}

export function PaymentPage({
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
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = getShippingCost(subtotal, shipping);
  const shippingLabel =
    shipping === 'expedited' ? 'FedEx expedited' : 'Standard shipping';
  return (
    <main className="checkout-page">
      <CheckoutTopline onNavigate={onNavigate} />
      <div className="checkout-layout payment-layout">
        <form
          className="checkout-form"
          onSubmit={(event) => {
            event.preventDefault();
            onComplete();
          }}
        >
          <p className="kicker">One last little step</p>
          <Heading as="page" className="checkout-title">
            Payment
          </Heading>
          <p className="payment-demo-note">
            This is a static storefront preview. No payment will be processed.
          </p>
          <section>
            <Heading as="subsection">Payment details</Heading>
            <label className="payment-field-wide">
              Name on card
              <input
                name="card_name"
                autoComplete="cc-name"
                required
                placeholder="Full name"
              />
            </label>
            <label className="payment-field-wide">
              Card number
              <input
                name="card_number"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                required
                placeholder="Any length is accepted in this preview"
              />
            </label>
            <div className="checkout-fields payment-fields">
              <label>
                Expiration date
                <input
                  name="card_expiry"
                  type="text"
                  autoComplete="cc-exp"
                  required
                  placeholder="MM / YY"
                />
              </label>
              <label>
                Security code
                <input
                  name="card_cvc"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  required
                  placeholder="CVC"
                />
              </label>
            </div>
          </section>
          <Action className="checkout-button checkout-continue" type="submit">
            Pay ${(subtotal + shippingCost).toFixed(2)}{' '}
            <Icon name="arrow" size={18} />
          </Action>
        </form>
        <aside className="checkout-summary">
          <Heading as="subsection">Order summary</Heading>
          <p className="payment-summary-email">
            Confirmation sent to <strong>{email}</strong>
          </p>
          {items.map((item) => (
            <div className="checkout-summary-item" key={item.id}>
              <Image width={900} height={900} src={item.image} alt="" />
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.quantity} × ${item.price.toFixed(2)}
                </span>
              </div>
              <span>${(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="checkout-summary-total">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="checkout-summary-total checkout-shipping-total">
            <span>{shippingLabel}</span>
            <strong>
              {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
            </strong>
          </div>
          <div className="checkout-summary-total payment-grand-total">
            <span>Total</span>
            <strong>${(subtotal + shippingCost).toFixed(2)}</strong>
          </div>
          <p className="checkout-summary-note">Taxes calculated at checkout.</p>
        </aside>
      </div>
    </main>
  );
}

export function CheckoutTopline({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="checkout-topline">
      <NavLink page="shop" onNavigate={onNavigate} className="checkout-back">
        ← Continue shopping
      </NavLink>
      <span className="checkout-wordmark">Daze & Dewy</span>
      <span className="checkout-secure">Secure checkout</span>
    </div>
  );
}

export function OrderConfirmationPage({
  order,
  onNavigate,
}: {
  order: OrderDetails;
  onNavigate: (page: string) => void;
}) {
  return (
    <main className="confirmation-page">
      <div className="checkout-topline">
        <NavLink page="home" onNavigate={onNavigate} className="checkout-back">
          DAZE & DEWY
        </NavLink>
        <span className="checkout-wordmark">Thank you</span>
        <NavLink
          page="shop"
          onNavigate={onNavigate}
          className="checkout-secure"
        >
          Keep exploring
        </NavLink>
      </div>
      <section className="confirmation-card">
        <span className="confirmation-sparkle" aria-hidden="true">
          ✿
        </span>
        <p className="kicker">Your order is in</p>
        <Heading as="page" className="checkout-title">
          A little joy is on its way.
        </Heading>
        <p className="confirmation-order-number">
          Order #: <span>{order.orderNumber}</span>
        </p>
        <div className="confirmation-details">
          <div>
            <span>Estimated delivery</span>
            <strong>{order.estimatedDelivery}</strong>
          </div>
          <div>
            <span>Confirmation email</span>
            <strong>{order.email}</strong>
          </div>
        </div>
        <p>
          We’ll send you an email confirmation for this order. Once your order
          ships, we’ll send another message with a link to track your delivery.
        </p>
        <div className="confirmation-actions">
          <NavLink page="shop" onNavigate={onNavigate} className="primary-link">
            Back to the store <Icon name="arrow" size={18} />
          </NavLink>
        </div>
      </section>
    </main>
  );
}
