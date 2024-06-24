import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./pages/Home";
import BlogsPage from "./pages/Blogs";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
 
  return (
    <div className="">
      <BrowserRouter>
      <Routes>
          <Route element={<HomePage /> } path="/"/>
          <Route element={<BlogsPage /> } path="/blogs"/>
          <Route element={<Register />} path="/register" />
          <Route element={<Login/>} path="/login" />
      </Routes>
      </BrowserRouter>       
    </div>
  )
}

export default App
