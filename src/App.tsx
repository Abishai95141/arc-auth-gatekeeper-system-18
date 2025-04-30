
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute, AdminProtectedRoute, PublicOnlyRoute } from "@/components/ProtectedRoute";

// Authentication Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SignupSuccessPage from "./pages/SignupSuccessPage";
import AdminLoginPage from "./pages/AdminLoginPage";

// User Pages
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";

// Admin Pages
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminUsersPage from "./pages/AdminUsersPage";

// Other Pages
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

// Ideas Pages
import IdeasPage from "./pages/ideas/IdeasPage";
import MyIdeasPage from "./pages/ideas/MyIdeasPage";
import IdeaDetailPage from "./pages/ideas/IdeaDetailPage";
import NewIdeaPage from "./pages/ideas/NewIdeaPage";

// Projects Pages
import ProjectsPage from "./pages/projects/ProjectsPage";
import MyProjectsPage from "./pages/projects/MyProjectsPage";
import ProjectWorkspacePage from "./pages/projects/ProjectWorkspacePage";
import NewProjectPage from "./pages/projects/NewProjectPage";

// Docs Pages
import DocsPage from "./pages/docs/DocsPage";
import MyDocsPage from "./pages/docs/MyDocsPage";
import DocDetailPage from "./pages/docs/DocDetailPage";
import NewDocPage from "./pages/docs/NewDocPage";

// Talks Pages
import TalksCalendarPage from "./pages/talks/TalksCalendarPage";
import UpcomingTalksPage from "./pages/talks/UpcomingTalksPage";
import TalkArchivePage from "./pages/talks/TalkArchivePage";
import ProposeTalkPage from "./pages/talks/ProposeTalkPage";

// Community Pages
import CommunityPage from "./pages/community/CommunityPage";
import UserProfilePage from "./pages/community/UserProfilePage";
import MessagesPage from "./pages/community/MessagesPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SettingsPage from "./pages/settings/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            
            {/* Public Auth Routes (redirect if already logged in) */}
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signup-success" element={<SignupSuccessPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
            </Route>
            
            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              
              {/* Ideas Routes */}
              <Route path="/ideas" element={<IdeasPage />} />
              <Route path="/ideas/mine" element={<MyIdeasPage />} />
              <Route path="/ideas/:id" element={<IdeaDetailPage />} />
              <Route path="/ideas/new" element={<NewIdeaPage />} />
              
              {/* Projects Routes */}
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/mine" element={<MyProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectWorkspacePage />} />
              <Route path="/projects/new" element={<NewProjectPage />} />
              
              {/* Docs Routes */}
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/docs/mine" element={<MyDocsPage />} />
              <Route path="/docs/:id" element={<DocDetailPage />} />
              <Route path="/docs/new" element={<NewDocPage />} />
              
              {/* Talks Routes */}
              <Route path="/talks" element={<TalksCalendarPage />} />
              <Route path="/talks/upcoming" element={<UpcomingTalksPage />} />
              <Route path="/talks/archive" element={<TalkArchivePage />} />
              <Route path="/talks/new" element={<ProposeTalkPage />} />
              
              {/* Community Routes */}
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/users/:id" element={<UserProfilePage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            
            {/* Protected Admin Routes */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
            </Route>
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
