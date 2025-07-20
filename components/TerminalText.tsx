import React from 'react';
import { Text, TextProps } from 'react-native';
import { theme } from '../styles/theme';
import { fonts } from '../styles/fonts';

interface TerminalTextProps extends TextProps {
  variant?: 'default' | 'muted' | 'accent' | 'error' | 'warning' | 'inverted';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl' | 'xxxxxl' | 'xxxxxxl';
  weight?: 'normal' | 'bold' | 'black';
}

const TerminalText: React.FC<TerminalTextProps> = ({
  variant = 'default',
  size = 'md',
  weight = 'normal',
  style,
  children,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'muted':
        return { color: theme.colors.textMuted };
      case 'accent':
        return { color: theme.colors.accent };
      case 'error':
        return { color: theme.colors.error };
      case 'warning':
        return { color: theme.colors.warning };
      case 'inverted':
        return { color: theme.colors.textInverted };
      default:
        return { color: theme.colors.text };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return { fontSize: theme.fontSize.xs };
      case 'sm':
        return { fontSize: theme.fontSize.sm };
      case 'md':
        return { fontSize: theme.fontSize.md };
      case 'lg':
        return { fontSize: theme.fontSize.lg };
      case 'xl':
        return { fontSize: theme.fontSize.xl };
      case 'xxl':
        return { fontSize: theme.fontSize.xxl };
      case 'xxxl':
        return { fontSize: theme.fontSize.xxxl };
      case 'xxxxl':
        return { fontSize: theme.fontSize.xxxxl };
      case 'xxxxxl':
        return { fontSize: theme.fontSize.xxxxxl };
      case 'xxxxxxl':
        return { fontSize: theme.fontSize.xxxxxxl };
      default:
        return { fontSize: theme.fontSize.md };
    }
  };

  const getFontFamily = () => {
    switch (weight) {
      case 'bold':
        return fonts.monoBold;
      case 'black':
        return fonts.monoBlack;
      default:
        return fonts.mono;
    }
  };

  return (
    <Text
      style={[
        {
          fontFamily: getFontFamily(),
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.tight,
        },
        getVariantStyles(),
        getSizeStyles(),
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TerminalText; 