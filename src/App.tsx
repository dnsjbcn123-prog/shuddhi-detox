import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DigitalBalanceLab from "./pages/DigitalBalanceLab";
import Articles from "./pages/Articles";
import DigitalResetSpace from "./pages/DigitalResetSpace";
import ReflectionArchive from "./pages/ReflectionArchive";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lab" element={<DigitalBalanceLab />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/reset" element={<DigitalResetSpace />} />
          <Route path="/reflections" element={<ReflectionArchive />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
