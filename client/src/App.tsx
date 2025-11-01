import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import { HelpSupport } from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import ForgotPasswordNew from "./pages/ForgotPasswordNew";
import { ResetPassword } from "./pages/ResetPassword";
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
import ActiveSprint from "./pages/ActiveSprint";
import AddTask from "./pages/AddTask";
import ProfileScreen from "./pages/ProfileScreen";
import PreferenceScreen from "./pages/PreferenceScreen";
import NotificationSettingScreen from "./pages/NotificationSettingScreen";
import { AddTeam } from "./pages/AddTeam";
import { Onboard } from "./pages/Onboard";
import Message from "./pages/Chat";
import { CreateProject } from "./pages/CreateProject";
import { Provider } from "react-redux";
import store from "./store/store";
import UserManagement from "./pages/Usermangment";
import Settings from "./pages/super-admin/Settings";
import { SuperAdminLayout } from "./components/layout/SuperAdminLayout";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import Companies from "./pages/super-admin/Companies";
import PlanBilling from "./pages/super-admin/PlanBilling";
import UserControl from "./pages/super-admin/UserControl";
import Analytics from "./pages/super-admin/Analytics";
import AuditLogs from "./pages/super-admin/AuditLogs";
import Announcements from "./pages/super-admin/Announcements";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth routes - outside Layout */}
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/forgot-password-new" element={<ForgotPasswordNew />} />
              <Route path="/onboard" element={<Onboard />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/error-405" element={<Error405 />} />
              <Route path="/error-406" element={<Error406 />} />
              <Route path="/not-found" element={<NotFound />} />

              {/* Main app routes - inside Layout */}
              <Route path="/" element={<Layout><Outlet /></Layout>}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="user-management" element={<UserManagement />} />
                <Route path="help-support" element={<HelpSupport />} />
                <Route path="project-list" element={<ProjectList />} />
                <Route path="project-list-table" element={<ProjectListTable />} />
                <Route path="project-overview" element={<ProjectOverview />} />
                <Route path="team" element={<ProjectTeam />} />
                <Route path="team/add-member" element={<ProjectTeamAddMember />} />
                <Route path="backlog" element={<BacklogPrototype />} />
                <Route path="project-kanban-board" element={<ProjectKanbanBoard />} />
                <Route path="calendar" element={<ProjectCalendarView />} />
                <Route path="active-sprint" element={<ActiveSprint />} />
                <Route path="add-task" element={<AddTask />} />
                <Route path="chat" element={<Message />} />
                <Route path="profile" element={<ProfileScreen />} />
                <Route path="preference" element={<PreferenceScreen />} />
                <Route path="notification" element={<NotificationSettingScreen />} />
                <Route path="add-team" element={<AddTeam />} />
                <Route path="create-project" element={<CreateProject />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Super Admin routes - separate layout */}
              <Route path="/super-admin" element={<SuperAdminLayout><Outlet /></SuperAdminLayout>}>
                <Route index element={<SuperAdminDashboard />} />
                <Route path="dashboard" element={<SuperAdminDashboard />} />
                <Route path="companies" element={<Companies />} />
                <Route path="plan-billing" element={<PlanBilling />} />
                <Route path="user-control" element={<UserControl />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="audit-logs" element={<AuditLogs />} />
                <Route path="announcements" element={<Announcements />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
              borderRadius: "12px",
              padding: "16px",
            },
            success: {
              style: {
                background: "#1BB871",
                width: 'max-content',
                height: '50px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
            error: {
              style: {
                background: "#CD272C",
                width: 'max-content',
                height: '50px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },

            },
          }} />
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>

  );
}

export default App;
