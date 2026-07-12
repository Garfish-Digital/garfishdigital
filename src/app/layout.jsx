import "./globals.css";
import Header from "../components/Header";
import MotionProvider from "../components/MotionProvider";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faHouse,
  faGrid,
  faFlaskGear,
  faMessage,
  faArrowRightFromBracket,
  faWindow,
  faBars,
} from "@fortawesome/pro-regular-svg-icons";

// 4. Tell Font Awesome to skip adding the CSS automatically.
//    We explicitly import the CSS above, which is generally better for Next.js/Tailwind.
//    This prevents Flash Of Unstyled Icons (FOUT) and avoids potential conflicts.
config.autoAddCss = false;

// 5. Add the imported icons to the Font Awesome library.
//    This makes them available throughout your application without re-importing in every component.
library.add(
  faHouse,
  faGrid,
  faFlaskGear,
  faMessage,
  faArrowRightFromBracket,
  faWindow,
  faBars
);

const siteDescription =
  "Web design & development. Dark, deliberate sites for brands that don't do beige.";

export const metadata = {
  metadataBase: new URL("https://garfishdigital.com"),
  title: {
    default: "Garfish Digital",
    template: "%s — Garfish Digital",
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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
            }),
          }}
        />
      </body>
    </html>
  );
}
