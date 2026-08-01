export const metadata = {
  title: "Gallery",
  description:
    "Four live demos — a brewery, a tattoo shop, a metal band, an MMA gym. See what we build.",
  openGraph: {
    title: "Garfish Digital | Gallery",
    description:
      "Four live demos — a brewery, a tattoo shop, a metal band, an MMA gym. See what we build.",
    url: "/gallery",
    siteName: "Garfish Digital",
    images: ["/og-image.png"],
    type: "website",
  },
};

export default function GalleryLayout({ children }) {
  return children;
}
