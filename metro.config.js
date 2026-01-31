const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)

// ADD THIS LINE:
config.resolver.assetExts.push('lottie');
 
module.exports = withNativeWind(config, { input: './global.css' })