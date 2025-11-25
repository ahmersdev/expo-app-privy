// Import required polyfills first - order matters!
// react-native-get-random-values must be imported first to polyfill crypto.getRandomValues
import "react-native-get-random-values";
import "fast-text-encoding";
import "@ethersproject/shims";
import { Buffer } from "buffer";

// Then import the expo router
import "expo-router/entry";
global.Buffer = Buffer;
