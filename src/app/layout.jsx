import ReactDOM from "react-dom";
import "./globals.css";
import MotionProvider from "../components/MotionProvider";
import RegisterServiceWorker from "../components/RegisterServiceWorker";

// Provisional wording — revisit alongside the positioning work.
const siteDescription =
  "An independent web design and development studio in Indianapolis, beating template websites.";

export const metadata = {
  metadataBase: new URL("https://garfishdigital.com"),
  title: {
    default: "Garfish Digital — Web Design & Development Studio",
    template: "Garfish Digital | %s",
  },
  description: siteDescription,
  robots: "index, follow",
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  // Emitted verbatim; `appleWebApp` would also write apple-mobile-web-app-capable,
  // which the manifest's display mode already covers.
  other: { "apple-mobile-web-app-title": "Garfish" },
  openGraph: {
    // The card art already carries the wordmark and service line, so the
    // social title stays the bare brand rather than repeating the SEO title.
    title: "Garfish Digital",
    description: siteDescription,
    url: "/",
    siteName: "Garfish Digital",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Garfish Digital — web design & development",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garfish Digital",
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

// viewport-fit=cover lets the page paint under Android's system bars,
// so the black reaches the very bottom of the screen.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  // Both faces are above the fold: Courier Prime 700 sets the wordmark (live text,
  // not outlines, since the split-letter entrance), Inter 400 the service statement
  // and every heading below it. Courier Prime 400 is not preloaded — it renders only
  // the copyright line at the very bottom.
  for (const font of ["courier-prime-700-latin", "inter-400-latin"]) {
    ReactDOM.preload(`/fonts/${font}.woff2`, {
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    });
  }

  return (
    <html lang="en">
      <body>
        <MotionProvider>
          {children}
        </MotionProvider>
        <RegisterServiceWorker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Garfish Digital",
              url: "https://garfishdigital.com",
              logo: "https://garfishdigital.com/web-app-manifest-512x512.png",
              image: "https://garfishdigital.com/og-image.png",
              description: siteDescription,
              serviceType: "Web design and development",
              email: "contact@garfishdigital.com",
              // City-level only — enough for local results, no street address published.
              address: {
                "@type": "PostalAddress",
                addressLocality: "Indianapolis",
                addressRegion: "IN",
                addressCountry: "US",
              },
              // Based in Indianapolis, works remotely; clients are not limited to it.
              areaServed: [
                { "@type": "City", name: "Indianapolis" },
                { "@type": "Country", name: "United States" },
                { "@type": "Country", name: "United Kingdom" },
              ],
              sameAs: [
                "https://instagram.com/garfishdigital",
                "https://linkedin.com/in/robertchambers12372",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
