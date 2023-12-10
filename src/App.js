import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import Admin from "./pages/Admin/Admin";
import Users from "./pages/Users/Users";
import DetailRoom from "./pages/DetailRoom/DetailRoom";
import Account from "./pages/Account/Account";
import ProfileUser from "./pages/ProfilesUser/ProfilesUser";
import Test from "./components/Test";

export const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserLayout>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/detail/:idRoom" element={<DetailRoom />} />
              <Route path="/account/:idUser" element={<Account />} />
              <Route path="/profiles/:idUser" element={<ProfileUser />} />
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
      </QueryClientProvider>
    </div>
  );
}

export default App;
