import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { I18nProvider } from "@/lib/i18n";

const BASE_URL = "https://design-sparkle-edit.lovable.app";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CryptoReceipt Pro — #1 Best-Selling Crypto Receipt Generator 2026 | 30,000+ Users" },
      { name: "description", content: "Create pixel-perfect Binance, Trust Wallet, Coinbase and USDT TRC20/BEP20 crypto receipts in seconds. Trusted by 30,000+ professionals worldwide. #1 best-selling generator, 4.9/5 rating. Available in English, 中文, Русский & Español. Just 200 USDT/year." },
      { name: "keywords", content: "crypto receipt generator, crypto receipt editor, Binance receipt maker, Trust Wallet receipt, Coinbase receipt generator, USDT TRC20 receipt, BEP20 receipt, cryptocurrency receipt, fake receipt generator, crypto proof of payment, transaction receipt creator, multilingual receipt software, generador de recibos cripto, генератор крипто-чеков" },
      { name: "author", content: "CryptoReceiptPro" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { property: "og:title", content: "CryptoReceipt Pro — #1 Best-Selling Crypto Receipt Generator 2026" },
      { property: "og:description", content: "Create pixel-perfect Binance, Trust Wallet, Coinbase and USDT TRC20 receipts in seconds. Trusted by 30,000+ users worldwide. 200 USDT/year." },
      { property: "og:image", content: `${BASE_URL}/favicon.png` },
      { property: "og:url", content: BASE_URL },
      { property: "og:site_name", content: "CryptoReceiptPro" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "zh_CN" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:locale:alternate", content: "ru_RU" },
      { property: "og:locale:alternate", content: "es_ES" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "CryptoReceipt Pro — #1 Best-Selling Crypto Receipt Generator 2026" },
      { name: "twitter:description", content: "Pixel-perfect crypto receipt editor for Binance, Trust Wallet, Coinbase. 30,000+ happy customers. English, 中文, Русский, Español." },
      { name: "twitter:image", content: `${BASE_URL}/favicon.png` },
      { name: "theme-color", content: "#0a0a0f" },
      { name: "application-name", content: "CryptoReceiptPro" },
      { name: "apple-mobile-web-app-title", content: "CryptoReceiptPro" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "mobile-web-app-capable", content: "yes" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/favicon.png",
      },
      {
        rel: "canonical",
        href: BASE_URL,
      },
      {
        rel: "alternate",
        hreflang: "zh",
        href: BASE_URL,
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: BASE_URL,
      },
      {
        rel: "alternate",
        hreflang: "ru",
        href: BASE_URL,
      },
      {
        rel: "alternate",
        hreflang: "es",
        href: BASE_URL,
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: BASE_URL,
      },
      {
        rel: "sitemap",
        type: "application/xml",
        href: `${BASE_URL}/sitemap.xml`,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "CryptoReceiptPro",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web",
          "description": "Create pixel-perfect Binance, Trust Wallet, Coinbase & USDT TRC20/BEP20 crypto receipts in seconds. #1 best-selling editor trusted by 30,000+ professionals worldwide.",
          "url": BASE_URL,
          "offers": {
            "@type": "Offer",
            "price": "200",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2026-12-31",
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "30000",
            "bestRating": "5",
            "worstRating": "1",
          },
          "image": `${BASE_URL}/favicon.png`,
          "inLanguage": ["zh-CN", "en", "ru", "es"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "CryptoReceiptPro",
          "url": BASE_URL,
          "logo": `${BASE_URL}/favicon.png`,
          "sameAs": ["https://t.me/CryptoReceiptPro"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Which wallets are supported?",
              "acceptedAnswer": { "@type": "Answer", "text": "Binance, Trust Wallet, Coinbase, USDT TRC20 & BEP20, MetaMask, OKX, and many more — all included." }
            },
            {
              "@type": "Question",
              "name": "How fast do I get access after payment?",
              "acceptedAnswer": { "@type": "Answer", "text": "Instant. Once your USDT payment is confirmed on-chain, you receive your license within 60 seconds." }
            },
            {
              "@type": "Question",
              "name": "Can I see how it works before buying?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes — visit our channel to watch step-by-step tutorial videos of every feature." }
            },
            {
              "@type": "Question",
              "name": "Is there a refund policy?",
              "acceptedAnswer": { "@type": "Answer", "text": "We offer a 7-day satisfaction guarantee. Contact support if the software doesn't meet your expectations." }
            },
            {
              "@type": "Question",
              "name": "Do you add new templates?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes — new wallet templates are added every month and pushed to your account automatically." }
            },
            {
              "@type": "Question",
              "name": "Which languages are supported?",
              "acceptedAnswer": { "@type": "Answer", "text": "The app interface is fully available in English, Chinese (中文), Russian (Русский) and Spanish (Español) — switch anytime from the settings menu." }
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <I18nProvider>
      <Outlet />
    </I18nProvider>
  );
}
