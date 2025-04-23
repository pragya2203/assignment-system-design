
import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input error state */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Helper text below input */
  helperText?: string;
  /** Label for the input */
  label?: string;
  /** Leading icon */
  leadingIcon?: React.ReactNode;
  /** Trailing icon */
  trailingIcon?: React.ReactNode;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      errorMessage,
      helperText,
      label,
      leadingIcon,
      trailingIcon,
      size = 'md',
      type,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    
    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-4 py-3',
    };
    
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leadingIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leadingIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "flex w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              sizes[size],
              error && "border-destructive focus-visible:ring-destructive/30",
              leadingIcon && "pl-10",
              trailingIcon && "pr-10",
              className
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              error && errorMessage
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-description`
                : undefined
            }
            {...props}
          />
          {trailingIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {trailingIcon}
            </div>
          )}
        </div>
        
        {error && errorMessage ? (
          <p id={`${inputId}-error`} className="text-xs text-destructive">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-description`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
