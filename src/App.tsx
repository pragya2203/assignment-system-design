// TODO: Maybe add error boundary later if needed
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "@/components/feedback/toast/Toast";
// Main pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Initialize query client with some basic config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed requests twice
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Main app component - keeping it simple for now
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToastProvider position="top-right">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* TODO: Add more routes here as needed */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
