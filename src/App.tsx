import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import ForgotPasswordNew from "./pages/ForgotPasswordNew";
import ResetPassword from "./pages/ResetPassword";
import Error405 from "./pages/Error405";
import Error406 from "./pages/Error406";
import ProjectList from "./pages/ProjectList";
import ProjectListTable from "./pages/ProjectListTable";
import ProjectOverview from "./pages/ProjectOverview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Authentication routes - outside Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password-new" element={<ForgotPasswordNew />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/error-405" element={<Error405 />} />
          <Route path="/error-406" element={<Error406 />} />
          <Route path="/project-list" element={<ProjectList />} />
          <Route path="/project-list-table" element={<ProjectListTable />} />
          <Route path="/project-overview" element={<ProjectOverview />} />
          
          {/* Main app routes - inside Layout */}
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/help" element={
            <Layout>
              <HelpSupport />
            </Layout>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
