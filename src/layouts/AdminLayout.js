import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex flex-row min-w-full h-screen">
      <Sidebar></Sidebar>
      <main className="w-full flex-grow ml-[250px]">
        <header className="min-w-full h-12">HEADER</header>
        <Outlet />
      </main>
    </div>
  );
}
