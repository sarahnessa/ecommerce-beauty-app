import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from './page';

class ImmediateIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string;
  readonly thresholds: number[];

  constructor(
    private readonly callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.rootMargin = options?.rootMargin ?? '0px';
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0];
  }

  observe(target: Element) {
    this.callback(
      [
        {
          target,
          isIntersecting: true,
          intersectionRatio: 1,
        } as IntersectionObserverEntry,
      ],
      this
    );
  }

  disconnect() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
}

describe('password gate accessibility and interaction', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'preview');
    vi.stubEnv('NEXT_PUBLIC_PREVIEW_PASSWORD', 'test-preview-password');
    window.sessionStorage.clear();
    window.location.hash = '';
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it('renders a named password field without an initial error', async () => {
    render(<App />);

    const passwordInput = await screen.findByLabelText('Password');

    expect(passwordInput.getAttribute('type')).toBe('password');
    expect(passwordInput.getAttribute('aria-invalid')).toBeNull();
    expect(passwordInput.getAttribute('aria-describedby')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('announces an invalid password and clears the error when edited', async () => {
    const user = userEvent.setup();
    render(<App />);

    const passwordInput = await screen.findByLabelText('Password');
    await user.type(passwordInput, 'wrong-password');
    await user.keyboard('{Enter}');

    const error = await screen.findByRole('alert');
    expect(error.textContent).toContain(
      'Incorrect password. Please try again.'
    );
    expect(passwordInput.getAttribute('aria-invalid')).toBe('true');
    expect(passwordInput.getAttribute('aria-describedby')).toBe(error.id);

    await user.type(passwordInput, 'a');

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeNull();
      expect(passwordInput.getAttribute('aria-invalid')).toBeNull();
      expect(passwordInput.getAttribute('aria-describedby')).toBeNull();
    });
  });

  it('protects a direct hash route until the configured password is entered', async () => {
    const user = userEvent.setup();
    window.location.hash = '#contact';
    render(<App />);

    const passwordInput = await screen.findByLabelText('Password');
    expect(
      screen.queryByRole('heading', { name: "Let's talk beauty." })
    ).toBeNull();

    await user.type(passwordInput, 'test-preview-password');
    await user.keyboard('{Enter}');

    expect(
      await screen.findByRole('heading', { name: "Let's talk beauty." })
    ).toBeTruthy();
  });
});

describe('storefront accessibility and keyboard interactions', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'preview');
    vi.stubEnv('NEXT_PUBLIC_PREVIEW_PASSWORD', 'test-preview-password');
    window.sessionStorage.setItem('site_unlocked', 'true');
    window.location.hash = '';
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    window.location.hash = '';
  });

  it('renders native headings and safe external links', async () => {
    render(<App />);

    expect(await screen.findByRole('heading', { level: 1 })).toBeTruthy();
    expect(
      screen.getByRole('link', { name: 'Instagram' }).getAttribute('rel')
    ).toContain('noopener');
  });

  it('supports keyboard selection in search suggestions', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: 'Search' }));
    const search = screen.getByRole('combobox', { name: 'Search products' });
    await user.type(search, 'daily');
    expect(
      screen.getByRole('listbox', { name: 'Matching products' })
    ).toBeTruthy();

    await user.keyboard('{ArrowDown}');
    expect(search.getAttribute('aria-activedescendant')).toBe(
      'search-suggestion-0'
    );
    await user.keyboard('{Enter}');

    expect(
      await screen.findByRole('heading', { name: 'Search results' })
    ).toBeTruthy();
    expect(screen.getByText('Results for “Daily Cloud Cream”')).toBeTruthy();
  });

  it('announces empty search and cart states', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: 'Search' }));
    const search = screen.getByRole('combobox', { name: 'Search products' });
    await user.type(search, 'no-such-product');
    expect(screen.getByRole('status').textContent).toBe('No matching products');

    await user.keyboard('{Escape}');
    await user.click(await screen.findByRole('button', { name: 'Open bag' }));
    expect(screen.getByText('Your bag is waiting.')).toBeTruthy();
  });

  it('renders two matching groups for the continuous Home marquee', async () => {
    render(<App />);

    const marquee = await screen.findByRole('region', { name: 'Our values' });
    expect(marquee.querySelectorAll('.marquee-group')).toHaveLength(2);
  });

  it('dismisses the cart with its named semantic overlay button', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: 'Open bag' }));
    const dismissButton = screen.getByRole('button', {
      name: 'Close shopping bag',
    });
    expect(dismissButton.className).toContain('visible');

    await user.click(dismissButton);
    expect(dismissButton.className).not.toContain('visible');
  });

  it('updates the current route after a popstate event', async () => {
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1 })).toBeTruthy();

    act(() => {
      window.history.pushState(null, '', '#contact');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(
      await screen.findByRole('heading', { name: "Let's talk beauty." })
    ).toBeTruthy();
  });

  it('reveals the Our Story bubbles and decorative lines when they enter view', async () => {
    vi.stubGlobal('IntersectionObserver', ImmediateIntersectionObserver);
    window.location.hash = '#about';
    render(<App />);

    await screen.findByText('This is Daze & Dewy');

    expect(document.querySelector('.values-grid')?.classList).toContain(
      'is-visible'
    );
    expect(document.querySelector('.about-cta')?.classList).toContain(
      'is-visible'
    );
  });

  it('navigates to a product, changes its quantity, and adds that quantity to the bag', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getAllByRole('link', { name: 'Daily Cloud Cream' })[0]
    );
    expect(
      await screen.findByRole('heading', { name: 'Daily Cloud Cream' })
    ).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }));
    await user.click(screen.getByRole('button', { name: 'Increase quantity' }));
    expect(
      screen.getByText('3', { selector: '[aria-live="polite"]' })
    ).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Decrease quantity' }));
    expect(
      screen.getByText('2', { selector: '[aria-live="polite"]' })
    ).toBeTruthy();

    await user.click(
      screen.getByRole('button', { name: 'Add to bag · $84.00' })
    );
    const cart = screen.getByRole('complementary', { name: 'Shopping bag' });
    expect(
      within(cart).getByRole('heading', { name: 'Daily Cloud Cream' })
    ).toBeTruthy();
    expect(within(cart).getByText('$84.00')).toBeTruthy();

    await user.click(
      within(cart).getByRole('button', { name: 'Add one Daily Cloud Cream' })
    );
    expect(within(cart).getByText('$126.00')).toBeTruthy();
    await user.click(
      within(cart).getByRole('button', { name: 'Remove one Daily Cloud Cream' })
    );
    expect(within(cart).getByText('$84.00')).toBeTruthy();
  });

  it('completes checkout and payment after switching shipping methods', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getAllByRole('link', { name: 'Daily Cloud Cream' })[0]
    );
    await user.click(
      await screen.findByRole('button', { name: 'Add to bag · $42.00' })
    );
    await user.click(screen.getByRole('button', { name: 'Checkout' }));

    await screen.findByRole('heading', { name: 'Checkout' });
    await user.type(
      within(screen.getByRole('main')).getByLabelText('Email address'),
      'shopper@example.com'
    );
    await user.type(screen.getByLabelText('First name'), 'Jamie');
    await user.type(screen.getByLabelText('Last name'), 'Taylor');
    await user.type(screen.getByLabelText('Address'), '123 Main Street');
    await user.type(screen.getByLabelText('City'), 'Savannah');
    await user.type(screen.getByLabelText('Postal code'), '31401');
    await user.selectOptions(
      screen.getByLabelText('Country or region'),
      'United States'
    );

    const standardShipping = screen.getByRole('radio', {
      name: /Standard shipping/,
    });
    const expeditedShipping = screen.getByRole('radio', {
      name: /Expedited shipping/,
    });
    expect(standardShipping).toHaveProperty('checked', true);
    await user.click(expeditedShipping);
    expect(expeditedShipping).toHaveProperty('checked', true);
    await user.click(standardShipping);
    expect(standardShipping).toHaveProperty('checked', true);
    await user.click(expeditedShipping);
    expect(expeditedShipping).toHaveProperty('checked', true);

    await user.click(
      screen.getByRole('button', { name: /Continue to payment/ })
    );
    await screen.findByRole('heading', { name: 'Payment' });
    expect(screen.getByText('FedEx expedited')).toBeTruthy();
    await user.type(screen.getByLabelText('Name on card'), 'Jamie Taylor');
    await user.type(screen.getByLabelText('Card number'), '4242424242424242');
    await user.type(screen.getByLabelText('Expiration date'), '12/30');
    await user.type(screen.getByLabelText('Security code'), '123');

    await user.click(screen.getByRole('button', { name: 'Pay $60.00' }));
    expect(
      await screen.findByRole('heading', {
        name: 'A little joy is on its way.',
      })
    ).toBeTruthy();
    expect(screen.getByText('shopper@example.com')).toBeTruthy();
  });

  it('submits the newsletter form and clears its status when edited', async () => {
    const user = userEvent.setup();
    render(<App />);

    const emailInput = screen.getByLabelText('Email address');
    expect(emailInput.getAttribute('required')).not.toBeNull();
    await user.type(emailInput, 'reader@example.com');
    await user.click(screen.getByRole('button', { name: 'Join newsletter' }));

    expect((await screen.findByRole('status')).textContent).toBe(
      'Thanks for joining our newsletter.'
    );
    await user.type(emailInput, 'm');
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('closes the mobile menu and cart drawer with Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    const menuToggle = screen.getByRole('button', { name: 'Open menu' });
    await user.click(menuToggle);
    expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Visit & contact')).toBeTruthy();
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Visit & contact')).toBeNull();
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');

    await user.click(await screen.findByRole('button', { name: 'Open bag' }));
    const cart = screen.getByRole('complementary', { name: 'Shopping bag' });
    expect(cart.className).toContain('open');
    await user.keyboard('{Escape}');
    expect(cart.className).not.toContain('open');
  });

  it('closes search and suggestions when clicking outside the search control', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: 'Search' }));
    const search = screen.getByRole('combobox', { name: 'Search products' });
    await user.type(search, 'daily');
    expect(
      screen.getByRole('listbox', { name: 'Matching products' })
    ).toBeTruthy();

    await user.click(screen.getAllByRole('link', { name: 'Our story' })[0]);
    expect(
      screen.queryByRole('listbox', { name: 'Matching products' })
    ).toBeNull();
    expect(search.getAttribute('aria-expanded')).toBe('false');
  });
});
