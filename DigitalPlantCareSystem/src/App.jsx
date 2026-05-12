import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { COLORS } from "./styles/colors";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Landing from "./pages/landing";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import UserDashboard from "./pages/user/userDashboard";
import PlantDetails from "./pages/user/plantDetails";
import CareSchedule from "./pages/user/careSchedule";
import Profile from "./pages/profile";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminDatabase from "./pages/admin/adminDatabase";
import AdminCareSchedule from "./pages/admin/adminCareSchedule";
import AdminPlantDetails from "./pages/admin/adminPlantDetails";
import NotFound from "./pages/notFound";

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    background-color: ${COLORS.backgroundGreen};
    font-family: 'Poppins', sans-serif;
  }
`;

// ── Route Guards ──────────────────────────────────────────────────────────────

// Requires login — any role
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

// Requires admin role
function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/dashboard" />;
  return children;
}

// Only for logged-out users.
// If already logged in: admins go to /admin, regular users go to /dashboard.
// This prevents the race where PublicRoute's <Navigate to="/dashboard"> fires
// before the programmatic navigate("/admin") in the login form can win.
function PublicRoute({ children }) {
  const { user } = useAuth();
  if (!user) return children;
  return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} />;
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Landing />} />

          {/* Auth (public only) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />

          {/* User (protected) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plant/:id"
            element={
              <ProtectedRoute>
                <PlantDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/care-schedule"
            element={
              <ProtectedRoute>
                <CareSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/database"
            element={
              <AdminRoute>
                <AdminDatabase />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/care-schedule"
            element={
              <AdminRoute>
                <AdminCareSchedule />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/database/:id"
            element={
              <AdminRoute>
                <AdminPlantDetails />
              </AdminRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
