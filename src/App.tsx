import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Layout from "./components/Layout";
import { Toaster } from "./components/ui/sonner";
import { useThemeStore } from "./store/useThemeStore";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isDarkMode = useThemeStore((s) => s.isDarkMode);
  return (
    <div>
      <Toaster
        richColors
        position="bottom-left"
        theme={isDarkMode ? "dark" : "light"}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post/:id" element={<Post />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
