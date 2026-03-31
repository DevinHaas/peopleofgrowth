/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  sassOptions: {
    silenceDeprecations: [
      "color-functions",
      "global-builtin",
      "import",
      "if-function",
    ],
  },
};

module.exports = nextConfig;
