module.exports = {
  reactStrictMode: true,
  // Isolate verification builds from an existing development server's .next files.
  distDir: process.env.GARFISH_BUILD_DIR || ".next",
};
