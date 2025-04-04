// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,  // Kết hợp cấu hình mặc định từ Expo
  resolver: {
    ...config.resolver,  // Kết hợp resolver từ cấu hình mặc định
    extraNodeModules: {
      ...config.resolver.extraNodeModules, // Kết hợp các module bổ sung (nếu có)
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      os: require.resolve('os-browserify/browser'),
      url: require.resolve('url'),
      util: require.resolve('util'),
    },
  },
};
