import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./pages/Home";
import BlogsPage from "./pages/Blogs";

function App() {
 
  return (
    <div className="">
      <BrowserRouter>
      <Routes>
          <Route element={<HomePage /> } path="/"/>
          <Route element={<BlogsPage /> } path="/blogs"/>
      </Routes>
      </BrowserRouter>       
    </div>
  )
}

export default App
