import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div>
      <Header />
      <div className="cus-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
