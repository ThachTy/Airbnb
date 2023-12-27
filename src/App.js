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
import Login from "./pages/Login/Login";
import ProfilesUser from "./pages/ProfilesUser/ProfilesUser";
import Locations from "./pages/Location/Locations";
import Booking from "./pages/Booking/Booking";
import NotFound from "./components/NotFound/NotFound";
import RoomManagement from "./pages/RoomManagement/RoomManagement";
import Register from "./pages/Register/Register";
import Test from "./components/Test";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <UserLayout>
                  <Home />
                </UserLayout>
              }
            />
            <Route
              path="/detail/:idRoom"
              element={
                <UserLayout>
                  <DetailRoom />
                </UserLayout>
              }
            />
            <Route
              path="/account/:idUser"
              element={
                <UserLayout>
                  <Account />
                </UserLayout>
              }
            />
            <Route
              path="/profiles/:idUser"
              element={
                <UserLayout>
                  <ProfilesUser />
                </UserLayout>
              }
            />
            <Route
              path="/register"
              element={
                <UserLayout>
                  <Register />
                </UserLayout>
              }
            ></Route>

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Admin></Admin>}></Route>
              <Route path="users" element={<Users></Users>}></Route>
              <Route path="locations" element={<Locations />}></Route>
              <Route path="rooms" element={<RoomManagement />}></Route>
              <Route path="booking" element={<Booking />}></Route>
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
