import "./globals.css";
import Header from "../components/Header";
import MotionProvider from "../components/MotionProvider";

const siteDescription =
  "Web design & development. Dark, deliberate sites for brands that don't do beige.";

export const metadata = {
  metadataBase: new URL("https://garfishdigital.com"),
  title: {
    default: "Garfish Digital",
    template: "Garfish Digital | %s",
  },
  description: siteDescription,
  robots: "index, follow",
  openGraph: {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* viewport-fit=cover lets the page paint under Android's system bars,
            so the black reaches the very bottom of the screen */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#000000" />

        {/* Self-hosted fonts — preload the latin faces used on every page */}
        <link rel="preload" href="/fonts/courier-prime-400-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/courier-prime-700-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Favicons */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Garfish" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <MotionProvider>
          {children}
          <Header />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Garfish Digital",
              url: "https://garfishdigital.com",
              logo: "https://garfishdigital.com/web-app-manifest-512x512.png",
              sameAs: ["https://instagram.com/garfishdigital"],
            }),
          }}
        />
      </body>
    </html>
  );
}
