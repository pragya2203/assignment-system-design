
import * as React from "react";
import { cn } from "@/lib/utils";

export type ToastVariant = "default" | "info" | "success" | "warning" | "error";
export type ToastPosition =
  | "top-right"
  | "top-center"
  | "top-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Toast variant */
  variant?: ToastVariant;
  /** Whether the toast is visible */
  open?: boolean;
  /** Called when the toast is dismissed */
  onClose?: () => void;
  /** Auto-dismiss timeout in ms (0 to disable) */
  duration?: number;
  /** Toast title */
  title?: string;
  /** Toast description */
  description?: React.ReactNode;
  /** Toast icon */
  icon?: React.ReactNode;
  /** Toast action button */
  action?: React.ReactNode;
}

export interface ToastProviderProps {
  /** Children components */
  children: React.ReactNode;
  /** Default position for all toasts */
  position?: ToastPosition;
}

const ToastContext = React.createContext<{
  addToast: (toast: Omit<ToastProps, "open">) => string;
  removeToast: (id: string) => void;
  position: ToastPosition;
}>({
  addToast: () => "",
  removeToast: () => {},
  position: "top-right",
});

export function useToast() {
  const context = React.useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return {
    toast: (props: Omit<ToastProps, "open">) => context.addToast(props),
    dismiss: (id: string) => context.removeToast(id),
  };
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant = "default",
      open = true,
      onClose,
      duration = 5000,
      title,
      description,
      icon,
      action,
      ...props
    },
    ref
  ) => {
    React.useEffect(() => {
      if (duration && open) {
        const timer = setTimeout(() => {
          onClose?.();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    }, [duration, onClose, open]);

    if (!open) return null;

    const variantStyles = {
      default: "bg-background border",
      info: "bg-blue-50 border-blue-100 dark:bg-blue-950 dark:border-blue-900",
      success: "bg-green-50 border-green-100 dark:bg-green-950 dark:border-green-900",
      warning: "bg-amber-50 border-amber-100 dark:bg-amber-950 dark:border-amber-900",
      error: "bg-red-50 border-red-100 dark:bg-red-950 dark:border-red-900",
    };
    
    const titleStyles = {
      default: "text-foreground",
      info: "text-blue-800 dark:text-blue-300",
      success: "text-green-800 dark:text-green-300",
      warning: "text-amber-800 dark:text-amber-300",
      error: "text-red-800 dark:text-red-300",
    };
    
    return (
      <div
        ref={ref}
        role="alert"
        aria-live={variant === "error" ? "assertive" : "polite"}
        className={cn(
          "pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-lg border shadow-lg",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex w-full items-center gap-3 p-4">
          {icon && (
            <div className="flex flex-shrink-0 items-center justify-center">
              {icon}
            </div>
          )}
          <div className="w-0 flex-1">
            {title && (
              <h3 className={cn("font-semibold text-sm", titleStyles[variant])}>
                {title}
              </h3>
            )}
            {description && (
              <div className="mt-1 text-sm text-muted-foreground">
                {description}
              </div>
            )}
          </div>
          <div className="flex flex-shrink-0">
            {action}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "top-right",
}) => {
  const [toasts, setToasts] = React.useState<
    Array<ToastProps & { id: string }>
  >([]);

  const addToast = React.useCallback(
    (toast: Omit<ToastProps, "open">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { ...toast, id, open: true }]);
      return id;
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((toast) => 
        toast.id === id ? { ...toast, open: false } : toast
      )
    );
    
    // Remove from state after animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  }, []);

  const positionStyles: Record<ToastPosition, string> = {
    "top-right": "top-0 right-0",
    "top-center": "top-0 left-1/2 -translate-x-1/2",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
    "bottom-left": "bottom-0 left-0",
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, position }}>
      {children}
      <div
        className={cn(
          "fixed z-50 flex flex-col gap-2 w-full max-w-sm p-4 sm:max-w-md",
          positionStyles[position]
        )}
        role="region"
        aria-label="Notifications"
      >
        {toasts.map(
          ({ id, onClose, ...toastProps }) =>
            toastProps.open && (
              <Toast
                key={id}
                {...toastProps}
                onClose={() => {
                  removeToast(id);
                  onClose?.();
                }}
              />
            )
        )}
      </div>
    </ToastContext.Provider>
  );
};

Toast.displayName = "Toast";
