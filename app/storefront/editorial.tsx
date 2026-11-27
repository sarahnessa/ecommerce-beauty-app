'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Action, Heading, Icon, NavLink } from './shared';
import { aboutImg, skincareProductImg } from './shared';

export function BlogPage({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  const news = [
    {
      date: 'September 24, 2026',
      title: 'The beauty launches catching our eye this month',
      copy: "CEW's September product watch surveys a month of new launches, where heritage, science, and playful ideas share the shelf.",
      source: 'CEW Product Watch',
      href: 'https://cew.org/beauty_news/cew-product-watch-september-2026/',
    },
    {
      date: 'September 10, 2026',
      title: "A first look at September's new beauty launches",
      copy: "NewBeauty rounds up the month's debuts, including firsts from OLAPLEX and MAKE UP FOR EVER.",
      source: 'NewBeauty',
      href: 'https://www.newbeauty.com/view/launch-list-september-2026',
    },
    {
      date: 'September 10, 2026',
      title: 'When skincare and makeup meet in the middle',
      copy: "BeautyMatter's weekly launch notes spotlight the growing mix of makeup and skincare, from a mineral skin tint to a replenishing serum.",
      source: 'BeautyMatter',
      href: 'https://beautymatter.com/articles/2026-week-37-beauty-brand-and-product-launches',
    },
  ];

  const tutorials = [
    {
      number: '01',
      category: 'SKINCARE HOW-TO',
      title: "Build a routine you'll actually keep",
      copy: 'Start with the steps you already enjoy. Keep the order simple, give each layer a moment, and add new products one at a time so you can find your rhythm.',
      steps: [
        'Cleanse at your own pace',
        'Choose a comfortable moisturizer',
        'Finish with the daytime steps that work for you',
      ],
      tone: 'journal-tutorial-peach',
    },
    {
      number: '02',
      category: 'MAKEUP HOW-TO',
      title: 'Make soft color feel like you',
      copy: 'A little color goes a long way. Use a light hand, blend the edges, and build slowly until the finish feels right for your day.',
      steps: [
        'Prep with a texture you like',
        'Tap color on in thin layers',
        'Soften the edges with clean fingertips or a brush',
      ],
      tone: 'journal-tutorial-lavender',
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
            <p className="kicker">What&apos;s happening out there</p>
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
            Good everyday care doesn&apos;t need a complicated routine. We
            picked Daily Cloud Cream for the comforting feel and easy place it
            finds in a morning or evening ritual.
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

export function AboutPage({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  const valuesRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const canObserve =
    typeof window !== 'undefined' && 'IntersectionObserver' in window;
  const [valuesVisible, setValuesVisible] = useState(!canObserve);
  const [ctaVisible, setCtaVisible] = useState(!canObserve);

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
      { threshold: 0.15, rootMargin: '0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [ctaVisible]);

  useEffect(() => {
    const section = valuesRef.current;
    if (!section || valuesVisible || !canObserve) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setValuesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [canObserve, valuesVisible]);

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
        className={`values-grid${valuesVisible ? ' is-visible' : ''}`}
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
          <p>
            Warm advice, honest answers, and a studio door that&apos;s open.
          </p>
        </div>
      </section>
      <section
        ref={ctaRef}
        className={`about-cta${ctaVisible ? ' is-visible' : ''}`}
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

export function ContactPage() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <main className="contact-page">
      <section className="contact-intro">
        <p className="kicker">We&apos;d love to hear from you</p>
        <Heading as="page" className="page-title">
          Let&apos;s talk beauty.
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
          <div
            className="map"
            role="img"
            aria-label="Map showing studio location"
          >
            <div className="map-streets" />
            <div className="map-pin">
              <span>DAZE & DEWY</span>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label>
            <span>Name</span>
            <input
              required
              name="name"
              placeholder="Your name"
              autoComplete="name"
            />
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
            {sent ? 'Message sent — thank you' : 'Send your note'}
            {sent ? null : <Icon name="arrow" size={18} />}
          </Action>
        </form>
      </section>
    </main>
  );
}

export function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

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
          <form
            className="email-field"
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setNewsletterSubmitted(true);
            }}
          >
            <input
              name="footer_email"
              type="email"
              aria-label="Email address"
              placeholder="Your email address"
              required
              onChange={() => setNewsletterSubmitted(false)}
            />
            <Action type="submit" ariaLabel="Join newsletter">
              <Icon name="arrow" />
            </Action>
          </form>
          {newsletterSubmitted && (
            <p role="status">Thanks for joining our newsletter.</p>
          )}
        </div>
        <div className="footer-links">
          <div>
            <span>SHOP</span>
            {[
              'New',
              'Skincare',
              'Makeup',
              'Bath & Body',
              'Candles',
              'Tools',
            ].map((item) => (
              <NavLink
                key={item}
                page={item === 'New' ? 'new' : `category:${item}`}
                onNavigate={onNavigate}
              >
                {item}
              </NavLink>
            ))}
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
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.pinterest.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pinterest
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </a>
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

export function PolicyPage({
  page,
  onNavigate,
}: {
  page: 'privacy' | 'terms' | 'shipping';
  onNavigate: (page: string) => void;
}) {
  const content = {
    privacy: {
      title: 'Privacy, with care',
      intro:
        'Your trust matters to us. This sample privacy page describes, in broad strokes, how Daze & Dewy may handle information when you visit our little corner of the internet.',
      sections: [
        [
          'Information you share',
          'If you write to us, join our mailing list, or place an order, you may choose to share details like your name, email address, and delivery information. This placeholder copy will be updated with the specific information our store collects.',
        ],
        [
          'How it may be used',
          'Information may help us answer your questions, keep the shop running, and make your experience feel a little more personal. We will add details about our actual service providers and uses here.',
        ],
        [
          'Your choices',
          'You can contact us with questions about your information or ask to update your preferences. This sample text is not a complete account of your privacy rights or choices.',
        ],
      ],
    },
    terms: {
      title: 'A few ground rules',
      intro:
        'These draft terms are a friendly placeholder for the guidelines that will apply when you browse or shop with Daze & Dewy.',
      sections: [
        [
          'Using this site',
          'Please use the shop in a considerate, lawful way. Product descriptions, imagery, and other site content are shared to help you explore our edit and may be updated as the shop grows.',
        ],
        [
          'Orders and availability',
          'Any order details, pricing, availability, and purchase conditions will be shown during checkout. This sample page does not yet set out the complete terms of sale.',
        ],
        [
          'Questions',
          'If something is unclear, send us a note through the contact page and we will be happy to help. Final terms will be posted here when ready.',
        ],
      ],
    },
    shipping: {
      title: 'Shipping, made simple',
      intro:
        'We want your finds to reach you smoothly. This sample page is a starting point for shipping information; the options shown at checkout will have the details for your order.',
      sections: [
        [
          'Packing your order',
          'We take care when preparing each order. Processing times and carrier details will be added here once our shipping schedule is finalized.',
        ],
        [
          'Rates and timing',
          'Available shipping methods, delivery estimates, and costs depend on the destination and order. Review the options presented at checkout for your current order.',
        ],
        [
          'Need a hand?',
          'If you have a question about a delivery, contact us with your order details and we will help you find the next step.',
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
