import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { Navber } from "./components/Navber";
import { Suspense, useEffect, useState } from "react";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Log_Sign/Login";
import Register from "./Pages/Log_Sign/Register";
import Logout from "./Pages/Log_Sign/Logout";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-15 w-15 border-t-4 border-blue-500"></div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate delay
    return () => clearTimeout(timeout);
  }, [location.pathname]); // Runs on route change

  // Hide Navbar on login & register pages, and any routes under /dashboard
  const hideNavbarRoutes = ["/login", "/register"];
  const shouldShowNavbar =
    !hideNavbarRoutes.includes(location.pathname) &&
    !location.pathname.startsWith("/dashboard");

  return (
    <>
      {shouldShowNavbar && <Navber />}
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      )}
    </>
  );
};

function App() {
  return (
    <Suspense fallback={<p>Loading component...</p>}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
