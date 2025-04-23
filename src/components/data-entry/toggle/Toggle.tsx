
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** Whether the toggle is checked */
  checked?: boolean;
  /** Default state when uncontrolled */
  defaultChecked?: boolean;
  /** Called when the state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Disable the toggle */
  disabled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Label for the toggle */
  label?: string;
  /** Helper text below toggle */
  helperText?: string;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      checked,
      defaultChecked,
      onCheckedChange,
      disabled = false,
      size = "md",
      label,
      helperText,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState<boolean>(
      defaultChecked || false
    );
    
    const toggleId = React.useId();

    const handleCheckedChange = React.useCallback(() => {
      if (disabled) return;
      
      if (onCheckedChange) {
        onCheckedChange(!isChecked);
      } else {
        setIsChecked(!isChecked);
      }
    }, [disabled, isChecked, onCheckedChange]);

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const sizes = {
      sm: "w-8 h-4",
      md: "w-10 h-5",
      lg: "w-12 h-6",
    };

    const thumbSizes = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    };

    const translateX = {
      sm: isChecked ? "translate-x-4" : "translate-x-1",
      md: isChecked ? "translate-x-5" : "translate-x-1",
      lg: isChecked ? "translate-x-6" : "translate-x-1",
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={toggleId}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              disabled && "text-muted-foreground cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}
        
        <button
          id={toggleId}
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleCheckedChange}
          ref={ref}
          className={cn(
            "relative rounded-full transition-colors",
            isChecked ? "bg-primary" : "bg-input",
            disabled && "opacity-50 cursor-not-allowed",
            sizes[size],
            className
          )}
          {...props}
        >
          <span
            className={cn(
              "absolute rounded-full bg-background translate-y-[-50%] top-[50%] left-0 transform transition-transform",
              thumbSizes[size],
              translateX[size]
            )}
          />
          <span className="sr-only">
            {isChecked ? "On" : "Off"}
          </span>
        </button>
        
        {helperText && (
          <p className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Toggle.displayName = "Toggle";
