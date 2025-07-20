import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import TerminalText from './TerminalText';

interface TerminalButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'accent';
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
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-terminal-bg border border-terminal-text';
      case 'accent':
        return 'bg-terminal-accent';
      default:
        return 'bg-terminal-text';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-4';
      case 'lg':
        return 'py-6 px-8';
      default:
        return 'py-4 px-6';
    }
  };

  const getTextVariant = (): 'default' | 'muted' | 'accent' | 'error' | 'warning' => {
    switch (variant) {
      case 'secondary':
        return 'default';
      case 'accent':
        return 'default';
      default:
        return 'default';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return 'text-terminal-text';
      case 'accent':
        return 'text-terminal-bg';
      default:
        return 'text-terminal-bg';
    }
  };

  return (
    <TouchableOpacity
      className={`${getVariantClasses()} ${getSizeClasses()}`}
      style={style}
      activeOpacity={0.8}
      {...props}
    >
      <TerminalText
        variant={getTextVariant()}
        className={`font-bold text-center ${getTextColor()}`}
      >
        {children}
      </TerminalText>
    </TouchableOpacity>
  );
};

export default TerminalButton; 