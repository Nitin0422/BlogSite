import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Blogs from "./pages/Blogs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import BlockedAfterLogin from "./components/BlockedAfterLogin";
import PageNotFound from "./pages/PageNotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ActivateAccount from "./pages/ActivateAccount";
import ActivateAccountForm from "./pages/ActivateAccountForm";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<ActivateAccount/>} path="/activate/account/:uid/:token" />
          <Route
            path="/blogs"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />
          <Route
            element={
              <BlockedAfterLogin>
                <Register />
              </BlockedAfterLogin>
            }
            path="/register"
          />
          <Route
            element={
              <BlockedAfterLogin>
                <Login />
              </BlockedAfterLogin>
            }
            path="/login"
          />
          <Route
            element={
              <BlockedAfterLogin>
                <ForgotPassword />
              </BlockedAfterLogin>
            }
            path="/forgot/password"
          />
          <Route
            element={
              <BlockedAfterLogin>
                <ResetPassword />
              </BlockedAfterLogin>
            }
            path="/reset/password/:uid/:token"
          />
          <Route
            element={
              <BlockedAfterLogin>
                <ActivateAccountForm />
              </BlockedAfterLogin>
            }
            path="/activate/account"
          />
          
          <Route element={<PageNotFound/>} path="*"/>
            
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
