import { Platform } from 'react-native';

export const fonts = {
  // Base monospace fonts
  mono: Platform.select({
    ios: 'Anonymous Pro',
    android: 'Anonymous Pro',
    default: 'Courier New',
  }),
  monoBold: Platform.select({
    ios: 'Anonymous Pro-Bold',
    android: 'Anonymous Pro-Bold',
    default: 'Courier New',
  }),
  monoBlack: Platform.select({
    ios: 'Anonymous Pro-Black',
    android: 'Anonymous Pro-Black',
    default: 'Courier New',
  }),
  monoItalic: Platform.select({
    ios: 'Anonymous Pro-Italic',
    android: 'Anonymous Pro-Italic',
    default: 'Courier New',
  }),
  
  // JetBrains Mono alternatives
  jetbrains: Platform.select({
    ios: 'JetBrains Mono',
    android: 'JetBrains Mono',
    default: 'Courier New',
  }),
  jetbrainsBold: Platform.select({
    ios: 'JetBrains Mono-Bold',
    android: 'JetBrains Mono-Bold',
    default: 'Courier New',
  }),
  jetbrainsBlack: Platform.select({
    ios: 'JetBrains Mono-Black',
    android: 'JetBrains Mono-Black',
    default: 'Courier New',
  }),
}; 