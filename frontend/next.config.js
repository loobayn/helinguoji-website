/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // GitHub Pages 配置
  assetPrefix: process.env.NODE_ENV === 'production' ? '/helinguoji-website' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/helinguoji-website' : '',
  trailingSlash: true,
  output: 'export',
  // 移除file-loader配置，使用Next.js内置处理
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.(mp4|webm)$/,
  //     use: {
  //       loader: 'file-loader',
  //       options: {
  //         publicPath: '/_next/static/',
  //         outputPath: 'static/',
  //         name: '[name].[hash].[ext]',
  //       },
  //     },
  //   });
  //   return config;
  // },
};

module.exports = nextConfig; 