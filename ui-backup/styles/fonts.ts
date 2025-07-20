import { Platform } from 'react-native';

export const fonts = {
  mono: Platform.select({
    ios: 'JetBrainsMono-Regular',
    android: 'JetBrainsMono-Regular',
    default: 'monospace',
  }),
  monoBold: Platform.select({
    ios: 'JetBrainsMono-Bold',
    android: 'JetBrainsMono-Bold',
    default: 'monospace',
  }),
  monoItalic: Platform.select({
    ios: 'JetBrainsMono-Italic',
    android: 'JetBrainsMono-Italic',
    default: 'monospace',
  }),
}; 