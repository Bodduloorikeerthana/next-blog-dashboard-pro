
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Dashboard Layout and Pages
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Posts from "./pages/dashboard/posts/Posts";
import NewPost from "./pages/dashboard/posts/NewPost";
import EditPost from "./pages/dashboard/posts/EditPost";
import Categories from "./pages/dashboard/categories/Categories";
import NewCategory from "./pages/dashboard/categories/NewCategory";
import EditCategory from "./pages/dashboard/categories/EditCategory";
import Media from "./pages/dashboard/media/Media";
import Settings from "./pages/dashboard/settings/Settings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            
            {/* Posts */}
            <Route path="posts" element={<Posts />} />
            <Route path="posts/new" element={<NewPost />} />
            <Route path="posts/edit/:id" element={<EditPost />} />
            
            {/* Categories */}
            <Route path="categories" element={<Categories />} />
            <Route path="categories/new" element={<NewCategory />} />
            <Route path="categories/edit/:id" element={<EditCategory />} />
            
            {/* Media */}
            <Route path="media" element={<Media />} />
            
            {/* Settings */}
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
