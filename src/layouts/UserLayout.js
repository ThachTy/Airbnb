import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function UserLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="cus-container">{children}</div>
      <Footer />
    </div>
  );
}
