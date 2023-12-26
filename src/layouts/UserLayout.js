import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function UserLayout({ children }) {
  return (
    <div>
      <Header/>
      <div className="cus-container">
        {children}
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
}
