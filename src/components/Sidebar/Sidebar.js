import React, { useState } from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  BookOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Dashboard
  const items = [
    getItem(
      <p onClick={toggleCollapsed}>Airbnb</p>,
      "toggle",
      <i
        onClick={toggleCollapsed}
        className={`fa-solid  w-[16px] h-[16px] 
          ${collapsed ? "fa-square-caret-right" : "fa-square-caret-left"}`}
      ></i>
    ),
    getItem("Dashboard", "sub1", <PieChartOutlined />, [
      getItem(<Link to="/admin">Default</Link>, "1"),
      getItem("Analytics", "2"),
    ]),
    // Pages
    getItem("Pages", "sub2", <DesktopOutlined />, [
      getItem(<Link to="/">Home</Link>, "3"),
      getItem(<Link to="/admin">Admin</Link>, "4"),
      getItem(<Link to="/login">Login</Link>, "5"),
      getItem(<Link to="/register">Register</Link>, "6"),
    ]),
    // User
    getItem(
      <Link to="/Admin/Users">Users Management</Link>,
      "7",
      <ContainerOutlined />
    ),
    getItem(
      <Link to="/Admin/Locations">Location Management</Link>,
      "8",
      <EnvironmentOutlined />
    ),
    getItem(
      <Link to="/Admin/Rooms">Room Management</Link>,
      "9",
      <ShopOutlined />
    ),

    getItem(
      <Link to="/Admin/Booking">Booking Management</Link>,
      "sub3",
      <BookOutlined />
    ),
  ];
  return (
    <aside id="sidebar" className="min-h-full">
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        inlineCollapsed={collapsed}
        mode="inline"
        items={items}
        theme="dark"
      ></Menu>
    </aside>
  );
};
export default Sidebar;
