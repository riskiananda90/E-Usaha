import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  section?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

export const ResponsiveContainer = ({ 
  children, 
  className,
  maxWidth = 'xl',
  padding = true,
  section = false,
}: ResponsiveContainerProps) => {
  const Component = section ? 'section' : 'div';
  
  return (
    <Component 
      className={cn(
        'w-full mx-auto',
        maxWidthClasses[maxWidth],
        padding && 'space-container',
        section && 'space-section',
        className
      )}
    >
      {children}
    </Component>
  );
};
