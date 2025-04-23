
import React from 'react';
import { cn } from '@/lib/utils';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextVariant = 'body' | 'label' | 'caption' | 'helper';

export interface TypographyProps {
  /** Content to be rendered */
  children: React.ReactNode;
  /** Additional class names to apply */
  className?: string;
  /** Whether to truncate text with ellipsis */
  truncate?: boolean;
  /** Whether text should wrap */
  wrap?: boolean;
}

export interface HeadingProps extends TypographyProps {
  /** The heading level element to render */
  level: HeadingLevel;
}

export interface TextProps extends TypographyProps {
  /** The text variant to render */
  variant: TextVariant;
  /** Whether text should be displayed as muted */
  muted?: boolean;
}

export const headingVariants = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "scroll-m-20 text-base font-semibold tracking-tight",
};

export const textVariants = {
  body: "text-base leading-7",
  label: "text-sm font-medium leading-none",
  caption: "text-sm text-muted-foreground",
  helper: "text-xs text-muted-foreground",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, children, className, truncate, wrap = true, ...props }, ref) => {
    const Component = level;
    
    return React.createElement(
      Component,
      {
        ref,
        className: cn(
          headingVariants[level],
          truncate && "truncate",
          !wrap && "whitespace-nowrap",
          className
        ),
        ...props
      },
      children
    );
  }
);

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant, children, className, truncate, wrap = true, muted, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          textVariants[variant],
          truncate && "truncate",
          !wrap && "whitespace-nowrap",
          muted && "text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Heading.displayName = "Heading";
Text.displayName = "Text";
