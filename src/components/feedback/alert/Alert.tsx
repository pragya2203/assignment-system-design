// Alert component for showing different types of messages
// TODO: Add animation for dismiss
// TODO: Consider adding auto-dismiss functionality
import * as React from "react";
import { cn } from "@/lib/utils";

// Alert variants - keeping it simple but might add more later
export type AlertVariant = "default" | "info" | "success" | "warning" | "error";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alert variant */
  variant?: AlertVariant;
  /** Alert title */
  title?: string;
  /** Whether the alert is dismissible */
  dismissible?: boolean;
  /** Called when the alert is dismissed */
  onClose?: () => void;
  /** Alert icon */
  icon?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      title,
      dismissible = false,
      onClose,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    // Simple visibility state - might need to add animation later
    const [visible, setVisible] = React.useState(true);

    const handleDismiss = React.useCallback(() => {
      setVisible(false);
      onClose?.();
    }, [onClose]);

    if (!visible) return null;

    // Styling variants - using Tailwind classes
    const variantStyles = {
      default: "bg-background border",
      info: "bg-blue-50 border-blue-100 dark:bg-blue-950 dark:border-blue-900",
      success: "bg-green-50 border-green-100 dark:bg-green-950 dark:border-green-900",
      warning: "bg-amber-50 border-amber-100 dark:bg-amber-950 dark:border-amber-900",
      error: "bg-red-50 border-red-100 dark:bg-red-950 dark:border-red-900",
    };
    
    // Title styles for different variants
    const titleStyles = {
      default: "text-foreground",
      info: "text-blue-800 dark:text-blue-300",
      success: "text-green-800 dark:text-green-300",
      warning: "text-amber-800 dark:text-amber-300",
      error: "text-red-800 dark:text-red-300",
    };
    
    // Content text styles
    const contentStyles = {
      default: "text-muted-foreground",
      info: "text-blue-700 dark:text-blue-200",
      success: "text-green-700 dark:text-green-200",
      warning: "text-amber-700 dark:text-amber-200",
      error: "text-red-700 dark:text-red-200",
    };
    
    return (
      <div
        ref={ref}
        role="alert"
        aria-live={variant === "error" ? "assertive" : "polite"}
        className={cn(
          "relative rounded-lg border p-4",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          {icon && (
            <div className="flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="w-full">
            {title && (
              <h3
                className={cn(
                  "mb-1 font-medium text-sm",
                  titleStyles[variant]
                )}
              >
                {title}
              </h3>
            )}
            <div
              className={cn(
                "text-sm",
                contentStyles[variant]
              )}
            >
              {children}
            </div>
          </div>
          {dismissible && (
            <button
              type="button"
              aria-label="Close alert"
              onClick={handleDismiss}
              className={cn(
                "ml-auto -mt-1 -mr-1 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
                variant === "default"
                  ? "focus:ring-primary"
                  : variant === "info"
                  ? "focus:ring-blue-500"
                  : variant === "success"
                  ? "focus:ring-green-500"
                  : variant === "warning"
                  ? "focus:ring-amber-500"
                  : "focus:ring-red-500"
              )}
            >
              <svg
                className={cn(
                  "h-4 w-4",
                  variant === "default"
                    ? "text-muted-foreground hover:text-foreground"
                    : variant === "info"
                    ? "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    : variant === "success"
                    ? "text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
                    : variant === "warning"
                    ? "text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
                    : "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";
