import { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Added dropdown states
  const [howToOpen, setHowToOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const howToSteps = [
    {
      title: "1) Sign in or create an account",
      desc: "Login to access your dashboard and start ordering from restaurants near you.",
    },
    {
      title: "2) Browse restaurants and pick items",
      desc: "Open a restaurant, view the menu, and add your favourite items to the cart.",
    },
    {
      title: "3) Checkout securely",
      desc: "Enter your delivery address, choose a payment method, and place your order.",
    },
    {
      title: "4) Track your order",
      desc: "Follow your order status until it’s delivered to your door.",
    },
  ];

  const faqs = [
    {
      q: "How do I place an order on Zingo?",
      a: "Go to the dashboard, choose a restaurant, add items to your cart, then checkout and place the order.",
    },
    {
      q: "Can I edit my cart before checkout?",
      a: "Yes. You can update item quantity or remove items from the cart before placing the order.",
    },
    {
      q: "How do I track my order?",
      a: "After placing an order, go to Track Order (or My Orders) to see the current status.",
    },
    {
      q: "What payment options are available?",
      a: "Zingo supports checkout with available payment methods shown during the checkout step.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#ff4d2d]/15 blur-3xl" />
        <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-rose-200/25 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 backdrop-blur bg-white/80 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff4d2d] text-white font-bold">
              Z
            </span>
            <h1 className="text-xl font-extrabold tracking-tight">
              <span className="text-2xl-gray-900">Zingo</span>
            </h1>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-bold">
            <li>
              <Link className="hover:text-[#ff4d2d] transition" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#ff4d2d] transition" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#ff4d2d] transition" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/signin"
              className="px-4 py-2 rounded-lg font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition"
            >
              Login
            </Link>
            <Link
              to="/signin"
              className="px-4 py-2 rounded-lg font-semibold text-white bg-[#ff4d2d] hover:bg-[#e64323] transition shadow-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 hover:bg-gray-50 transition"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-b border-gray-100 bg-white/95 backdrop-blur">
            <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8 flex flex-col gap-3">
              <Link className="font-semibold hover:text-[#ff4d2d]" to="/">
                Home
              </Link>
              <Link className="font-semibold hover:text-[#ff4d2d]" to="/about">
                About
              </Link>
              <Link
                className="font-semibold hover:text-[#ff4d2d]"
                to="/contact"
              >
                Contact
              </Link>

              <div className="pt-2 flex gap-3">
                <Link
                  to="/signin"
                  className="flex-1 text-center px-4 py-2 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signin"
                  className="flex-1 text-center px-4 py-2 rounded-lg font-semibold text-white bg-[#ff4d2d] hover:bg-[#e64323] transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <main className="relative">
        <section className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-8 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-semibold text-gray-700">
                <span className="h-2 w-2 rounded-full bg-[#ff4d2d]" />
                Fast • Fresh • Reliable
              </p>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight">
                Fast & Fresh Food Delivery,
                <span className="text-[#ff4d2d]"> right to your door</span>.
              </h2>

              <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-xl">
                Discover top restaurants near you, track your order live, and
                get your meal delivered in minutes with Zingo.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center">
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-[#ff4d2d] hover:bg-[#e64323] transition shadow-sm"
                >
                  Get Started
                  <svg
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition"
                >
                  Learn more
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                <div className="rounded-2xl border border-gray-100 bg-white/70 p-4">
                  <p className="text-xl font-extrabold">1k+</p>
                  <p className="text-xs text-gray-600 mt-1">Happy customers</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/70 p-4">
                  <p className="text-xl font-extrabold">30min</p>
                  <p className="text-xs text-gray-600 mt-1">Avg delivery</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/70 p-4">
                  <p className="text-xl font-extrabold">50+</p>
                  <p className="text-xs text-gray-600 mt-1">Restaurants</p>
                </div>
              </div>
            </div>

            {/* Right visual placeholder */}
            <div className="relative flex items-center justify-center">
              <div className="rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-10 shadow-sm text-center w-full">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-[#ff4d2d]/10 flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-[#ff4d2d]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 3h18v13H3z" />
                    <path d="M8 21h8" />
                    <path d="M12 16v5" />
                  </svg>
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  Order food from top restaurants
                </h3>

                <p className="mt-2 text-gray-600 text-sm max-w-sm mx-auto">
                  Browse menus, add items to cart, and checkout securely in just
                  a few clicks with Zingo.
                </p>

                <Link
                  to="/signin"
                  className="inline-block mt-6 px-6 py-3 rounded-xl font-semibold text-white bg-[#ff4d2d] hover:bg-[#e64323] transition"
                >
                  Start Ordering
                </Link>
              </div>

              <div className="absolute -z-10 -bottom-6 -right-6 h-40 w-40 rounded-full bg-[#ff4d2d]/15 blur-2xl" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Nearby restaurants",
                desc: "Browse curated restaurants near you with clear ratings and menus.",
                icon: <path d="M4 7h16M4 12h10M4 17h16" />,
              },
              {
                title: "Fast delivery",
                desc: "Quick delivery with clear updates and reliable dispatch.",
                icon: <path d="M3 12h3l3-8h9l3 8h-3" />,
              },
              {
                title: "Secure payments",
                desc: "Protected checkout experience with safe and reliable payment flow.",
                icon: <path d="M7 11V8a5 5 0 0110 0v3M6 11h12v10H6z" />,
              },
            ].map((f, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="h-11 w-11 rounded-2xl bg-[#ff4d2d]/10 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-[#ff4d2d]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {f.icon}
                  </svg>
                </div>
                <h3 className="mt-4 font-bold text-lg">{f.title}</h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ NEW: How to Order + FAQ dropdowns (Landing page only) */}
        <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {/* How to Order */}
            <div className="rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-6 shadow-sm">
              <button
                type="button"
                className="w-full flex items-center justify-between text-left"
                onClick={() => setHowToOpen((v) => !v)}
                aria-expanded={howToOpen}
              >
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight">
                    How to order
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Quick steps to place your first order.
                  </p>
                </div>
                <svg
                  className={`h-5 w-5 text-gray-600 transition-transform ${
                    howToOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {howToOpen && (
                <div className="mt-4 space-y-3">
                  {howToSteps.map((s, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-gray-100 bg-white/70 p-4"
                    >
                      <p className="font-bold">{s.title}</p>
                      <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FAQ */}
            <div className="rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-6 shadow-sm">
              <button
                type="button"
                className="w-full flex items-center justify-between text-left"
                onClick={() => setFaqOpen((v) => !v)}
                aria-expanded={faqOpen}
              >
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight">FAQ</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Common questions about ordering and tracking.
                  </p>
                </div>
                <svg
                  className={`h-5 w-5 text-gray-600 transition-transform ${
                    faqOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {faqOpen && (
                <div className="mt-4 space-y-3">
                  {faqs.map((item, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-gray-100 bg-white/70 p-4"
                      >
                        <button
                          type="button"
                          className="w-full flex items-center justify-between text-left"
                          onClick={() =>
                            setOpenFaqIndex((cur) => (cur === idx ? null : idx))
                          }
                          aria-expanded={isOpen}
                        >
                          <p className="font-bold">{item.q}</p>
                          <span className="text-gray-600 font-bold">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        {isOpen && (
                          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                            {item.a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <div className="rounded-3xl border border-gray-100 bg-gradient-to-r from-[#ff4d2d]/10 to-orange-200/20 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight">
                Ready to order your next meal?
              </h3>
              <p className="mt-2 text-gray-600">
                Sign in and start exploring restaurants around you.
              </p>
            </div>
            <Link
              to="/signin"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-[#ff4d2d] hover:bg-[#e64323] transition shadow-sm"
            >
              Start Now
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff4d2d] text-white font-bold">
                Z
              </span>
              <p className="font-extrabold text-lg">Zingo</p>
            </div>
            <p className="mt-3 text-sm text-gray-600 max-w-md">
              Fast food, fast delivery — built for a smooth ordering experience.
            </p>
          </div>

          <div>
            <p className="font-semibold">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link className="hover:text-[#ff4d2d] transition" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#ff4d2d] transition" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#ff4d2d] transition" to="/privacy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold">Support</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link className="hover:text-[#ff4d2d] transition" to="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#ff4d2d] transition" to="/support">
                  Help Center
                </Link>
              </li>
              <li>
                <a className="hover:text-[#ff4d2d] transition" href="#">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100">
          <div className="mx-auto max-w-6xl px-5 py-5 sm:px-8 flex flex-col sm:flex-row gap-2 justify-between text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Zingo. All rights reserved.</p>
            <p>Built with ❤️ for fast delivery.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
