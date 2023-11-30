import React, { useState } from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Switch, Menu } from "antd";
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
const items = [
  // Dashboard
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
    <ContainerOutlined />
  ),
  getItem(
    <Link to="/Admin/Rooms">Room Management</Link>,
    "9",
    <ContainerOutlined />
  ),

  getItem("Booking", "sub3", <MailOutlined />, [
    getItem("Option 5", "10"),
    getItem("Option 6", "11"),
    getItem("Option 7", "12"),
    getItem("Option 8", "13"),
  ]),
];
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <aside
      id="sidebar"
      className="min-h-full"
      style={{
        width: 250,
      }}
    >
      <div className="sidebar-header">
        <h1>LOGO</h1>
        <Menu
          className="navs"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          inlineCollapsed={collapsed}
          mode="inline"
          items={items}
          theme="dark"
        ></Menu>
      </div>
      {/* <Button
        className="btn-toggle"
        type="primary"
        onClick={toggleCollapsed}
        style={{
          right: 0,
        }}
      >
        X
      </Button> */}

      <div className="sidebar-footer">
        <Switch />
      </div>
    </aside>
  );
};
export default Sidebar;
