export const metadata = {
  title: "Gallery",
  description:
    "Four live demos — a brewery, a tattoo shop, a metal band, an MMA gym. See what we build.",
  openGraph: {
    title: "Gallery — Garfish Digital",
    description:
      "Four live demos — a brewery, a tattoo shop, a metal band, an MMA gym. See what we build.",
    url: "/gallery",
    siteName: "Garfish Digital",
    images: ["/og-image.jpg"],
    type: "website",
  },
};

export default function GalleryLayout({ children }) {
  return children;
}
