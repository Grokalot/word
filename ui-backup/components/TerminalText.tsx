import React from 'react';
import { Text, TextProps } from 'react-native';

interface TerminalTextProps extends TextProps {
  variant?: 'default' | 'muted' | 'accent' | 'error' | 'warning';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
}

const TerminalText: React.FC<TerminalTextProps> = ({
  variant = 'default',
  size = 'md',
  style,
  children,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'muted':
        return 'text-terminal-muted';
      case 'accent':
        return 'text-terminal-accent';
      case 'error':
        return 'text-terminal-error';
      case 'warning':
        return 'text-terminal-warning';
      default:
        return 'text-terminal-text';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'text-xs';
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      case 'xxl':
        return 'text-2xl';
      case 'xxxl':
        return 'text-3xl';
      default:
        return 'text-base';
    }
  };

  return (
    <Text
      className={`font-mono ${getVariantClasses()} ${getSizeClasses()}`}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TerminalText; 