import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import ProjectTeam from "./pages/ProjectTeam";
import ProjectTeamAddMember from "./pages/ProjectTeamAddMember";
import BacklogPrototype from "./pages/BacklogPrototype";
import ProjectKanbanBoard from "./pages/ProjectKanbanBoard";
import ProjectCalendarView from "./pages/ProjectCalendarView";
import ActiveSprintListView from "./pages/ActiveSprintListView";
import AddTask from "./pages/AddTask";
import ProjectActiveSprintCalendarViewMonthly from "./pages/ProjectActiveSprintCalendarViewMonthly";
import ProfileScreen from "./pages/ProfileScreen";
import PreferenceScreen from "./pages/PreferenceScreen";
import NotificationSettingScreen from "./pages/NotificationSettingScreen";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth routes - outside Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password-new" element={<ForgotPasswordNew />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/error-405" element={<Error405 />} />
            <Route path="/error-406" element={<Error406 />} />
            <Route path="/not-found" element={<NotFound />} />
            
            {/* Main app routes - inside Layout */}
            <Route path="/" element={<Layout><Outlet /></Layout>}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="help-support" element={<HelpSupport />} />
              <Route path="project-list" element={<ProjectList />} />
              <Route path="project-list-table" element={<ProjectListTable />} />
              <Route path="project-overview" element={<ProjectOverview />} />
              <Route path="team" element={<ProjectTeam />} />
              <Route path="team/add-member" element={<ProjectTeamAddMember />} />
              <Route path="backlog" element={<BacklogPrototype />} />
              <Route path="kanban" element={<ProjectKanbanBoard />} />
              <Route path="calendar" element={<ProjectCalendarView />} />
              <Route path="active-sprint" element={<ActiveSprintListView />} />
              <Route path="add-task" element={<AddTask />} />
              <Route path="chat" element={<ProjectActiveSprintCalendarViewMonthly />} />
              <Route path="profile" element={<ProfileScreen />} />
              <Route path="preference" element={<PreferenceScreen />} />
              <Route path="notification" element={<NotificationSettingScreen />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Sonner />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
