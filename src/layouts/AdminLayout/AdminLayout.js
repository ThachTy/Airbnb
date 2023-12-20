import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "./components/Header/Header";

export default function AdminLayout() {
  return (
    <div className="flex flex-row min-w-full h-screen">
      <Sidebar></Sidebar>

      <main className="w-full flex-grow">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
