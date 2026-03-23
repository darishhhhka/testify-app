import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
   webpack(config) {
    // Ищем правило Next.js для обработки svg как файлов
    const fileLoaderRule = config.module.rules.find(
      (rule: any) =>
        rule.test?.test?.(".svg")
    );

    // Исключаем svg из стандартного file-loader
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // Добавляем SVGR
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
