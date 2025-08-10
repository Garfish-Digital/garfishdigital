import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import { ClientAuthProvider } from "../contexts/ClientAuthContext";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faHouse,
  faGrid,
  faFlaskGear,
  faMessage,
  faArrowRightFromBracket,
  faUserGear,
  faWindow,
  faEnvelopeOpenDollar,
  faFileContract,
  faEyeSlash,
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
  faUserGear,
  faWindow,
  faEnvelopeOpenDollar,
  faFileContract,
  faEyeSlash
);

export const metadata = {
  title: "Garfish Digital",
  description: "Web Design and Development",
  robots: "noindex, nofollow",
  openGraph: {
    title: "Garfish Digital",
    description: "Web Design and Development",
    url: "https://garfishdigital.com",
    siteName: "Garfish Digital",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Garfish Digital - Web Design and Development",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garfish Digital",
    description: "Web Design and Development",
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
        <meta name="theme-color" content="oklch(99.487% 0.00833 146.145)" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Favicons */}
        <link
          rel="icon"
          type="image/png"
          href="/public/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/public/favicon.svg" />
        <link rel="shortcut icon" href="/public/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/public/site.webmanifest" />
      </head>
      <body>
        <ClientAuthProvider>
          {children}
          <ClientLayout />
        </ClientAuthProvider>
      </body>
    </html>
  );
}
