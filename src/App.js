import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import Admin from "./pages/Admin/Admin";
import Users from "./pages/Users/Users";
import DetailRoom from "./pages/DetailRoom/DetailRoom";
import Account from "./pages/Account/Account";
import ProfilesUser from "./pages/ProfilesUser/ProfilesUser";
import Locations from "./pages/Location/Locations";
import Booking from "./pages/Booking/Booking";
import RoomManagement from "./pages/RoomManagement/RoomManagement";
import Test from "./components/Test";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <UserLayout>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/detail/:idRoom" element={<DetailRoom />} />
              <Route path="/account/:idUser" element={<Account />} />
              <Route path="/profiles/:idUser" element={<ProfilesUser />} />
            </Routes>
          </UserLayout>

          {/* Admin Page */}
          <Routes>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Admin></Admin>}></Route>
              <Route path="users" element={<Users></Users>}></Route>
              <Route path="locations" element={<Locations />}></Route>
              <Route path="rooms" element={<RoomManagement />}></Route>
              <Route path="booking" element={<Booking />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
