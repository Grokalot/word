import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import { theme } from '../styles/theme';
import { fonts } from '../styles/fonts';

interface TerminalButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const TerminalButton: React.FC<TerminalButtonProps> = ({
  variant = 'primary',
  size = 'md',
  style,
  children,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        };
      case 'accent':
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.border,
        };
      case 'error':
        return {
          backgroundColor: theme.colors.error,
          borderColor: theme.colors.border,
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.border,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.lg,
        };
      case 'lg':
        return {
          paddingVertical: theme.spacing.xl,
          paddingHorizontal: theme.spacing.xxxl,
        };
      default:
        return {
          paddingVertical: theme.spacing.lg,
          paddingHorizontal: theme.spacing.xl,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.text;
      case 'accent':
      case 'primary':
      case 'error':
      default:
        return theme.colors.textInverted;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return theme.fontSize.md;
      case 'lg':
        return theme.fontSize.xl;
      default:
        return theme.fontSize.lg;
    }
  };

  return (
    <TouchableOpacity
      style={[
        {
          borderWidth: theme.borderWidth.thick,
          alignItems: 'center',
          justifyContent: 'center',
        },
        getVariantStyles(),
        getSizeStyles(),
        style,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <Text
        style={{
          color: getTextColor(),
          fontFamily: fonts.monoBlack,
          fontSize: getFontSize(),
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.normal,
          textAlign: 'center',
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default TerminalButton; 