import React from "react";
import { Outlet } from "react-router-dom";

export default function UserLayout({ children }) {
  return (
    <div>
      {/**header ở đây */}
      <div className="cus-container">
        {children}
        <Outlet />
      </div>
      {/**footer ở đây */}
    </div>
  );
}
