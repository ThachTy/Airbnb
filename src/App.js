import logo from "./logo.svg";
import "./App.css";
import UserLayout from "./layouts/UserLayout";
import Test from "./components/Test";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AdminLayout from "./layouts/AdminLayout";
import Admin from "./pages/Admin/Admin";
import Users from "./pages/Users/Users";
import DetailRoom from "./pages/DetailRoom/DetailRoom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserLayout>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/detail/:idRoom" element={<DetailRoom />} />
          </Routes>
        </UserLayout>

        {/* Admin Page */}
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin></Admin>}></Route>
            <Route path="users" element={<Users></Users>}></Route>
            <Route
              path="locations"
              element={<div>Locations Management</div>}
            ></Route>
            <Route path="rooms" element={<div>Room Management</div>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
