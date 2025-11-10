import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { PageTransition } from "@/components/layout/PageTransition";
import Index from "./pages/Index";
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent animate-pulse-glow flex items-center justify-center">
        <span className="text-xl font-bold text-white">M</span>
      </div>
      <div className="flex gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

const ScrollToTopWrapper = () => {
  useScrollToTop();
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <PageTransition>
      <Suspense fallback={<RouteLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTopWrapper />
            <AnimatedRoutes />
          </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
