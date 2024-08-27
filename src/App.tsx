import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import BlogsPage from "./pages/Blogs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<BlogsPage />} path="/blogs" />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
