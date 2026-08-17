import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Programs from "./pages/Programs.tsx";
import ProgramDetail from "./pages/ProgramDetail.tsx";
import Media from "./pages/Media.tsx";
import MediaDetail from "./pages/MediaDetail.tsx";
import Books from "./pages/Books.tsx";
import Events from "./pages/Events.tsx";
import GetInvolved from "./pages/GetInvolved.tsx";
import Contact from "./pages/Contact.tsx";
import Accessibility from "./pages/Accessibility.tsx";
import Terms from "./pages/Terms.tsx";
import Privacy from "./pages/Privacy.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:slug" element={<ProgramDetail />} />
            <Route path="/media" element={<Media />} />
            <Route path="/media/:id" element={<MediaDetail />} />
            <Route path="/books" element={<Books />} />
            <Route path="/events" element={<Events />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
