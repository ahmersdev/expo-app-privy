const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Block Node.js specific builds of jose.
config.resolver.blockList = [
  ...(config.resolver.blockList || []),
  /node_modules\/jose\/dist\/node\/.*/,
];

// Configure resolver to prefer browser builds.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Force jose to use the browser build instead of Node.js build.
  if (moduleName === 'jose') {
    try {
      return {
        filePath: require.resolve('jose/dist/browser/index.js'),
        type: 'sourceFile',
      };
    } catch (e) {
      // Fall back to default resolution if browser build not found.
    }
  }

  // Default resolution.
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

