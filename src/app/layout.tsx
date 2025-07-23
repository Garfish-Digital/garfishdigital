import type { Metadata } from "next";
import "./globals.css";
// 1. Import necessary Font Awesome core configuration
import { config, library } from '@fortawesome/fontawesome-svg-core';
// 2. Import Font Awesome's base CSS. Crucial for proper icon rendering.
import '@fortawesome/fontawesome-svg-core/styles.css';

// 3. Import the specific Font Awesome Pro Regular icons you plan to use.
//    These are the icons we discussed for your main site's navigation, etc.
import {
  faHouse,             // Example: Home icon
  faGrid,          // Example: For "Books" or "Library"
  faBowArrow,             // Example: For "Collections" (as discussed for Astro)
  faFlaskGear,              // Example: For "User Profile" or "Account"
  faMessage,              // Example: For "Settings"
  faEnvelopeOpenDollar,         // Example: Your attache/satchel for "shopping cart"
  faArrowRightFromBracket,
  faWindow,
  faUserGear,
  // Add any other specific Classic Regular icons you expect to use frequently here.
  // You can find their names on fontawesome.com (e.g., search "home", then look for its `fa` name).
} from '@fortawesome/pro-regular-svg-icons'; // <--- IMPORTANT: Note 'pro-regular-svg-icons'

// 4. Tell Font Awesome to skip adding the CSS automatically.
//    We explicitly import the CSS above, which is generally better for Next.js/Tailwind.
//    This prevents Flash Of Unstyled Icons (FOUT) and avoids potential conflicts.
config.autoAddCss = false;

// 5. Add the imported icons to the Font Awesome library.
//    This makes them available throughout your application without re-importing in every component.
library.add(
  faHouse,
  faGrid,
  faBowArrow,
  faFlaskGear,
  faMessage,
  faEnvelopeOpenDollar,
    faArrowRightFromBracket,
    faWindow,
      faUserGear,

);

export const metadata: Metadata = {
  title: "Garfish Digital",
  description: "Web Design and Development",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
