import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Lazy load the main App for faster initial paint
const App = lazy(() => import("./App.tsx"));

// Loading fallback with brand colors
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent animate-pulse-glow flex items-center justify-center">
        <span className="text-2xl font-bold text-white">M</span>
      </div>
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </StrictMode>
);
