import React from "react";
import "./Header.scss";
import defaultAvatar from "../../../../assets/image/AvatarUser.png";
import logo from "../../../../assets/image/AirbnbLogo.png";
import { Dropdown } from "antd";
import { useGetProfilesUsersbyId } from "../../../../pages/Users/query/userQuery";

const handelLogout = () => {
  console.log("Logout");
  localStorage.removeItem("user");
  window.location.href = "/";
};

const items = [
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1nd menu item
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: (
      <a className="" onClick={handelLogout} role="button">
        Logout
      </a>
    ),
    key: "3",
  },
];
export default function Header({ id }) {
  const { data: user } = useGetProfilesUsersbyId(4826);

  return (
    <header
      id="headerAdmin"
      className="py-2 px-5 min-w-full flex flex-row justify-evenly items-center"
    >
      <div className="header-left w-[10vw] mr-5">
        <img className="logo object-cover block" src={logo} alt="logo" />
      </div>
      <div className="header-right flex flex-row justify-between items-center flex-grow">
        <div className="header-tools">
          <input className="tools-input" type="text" />
          <button className="tools-button" type="button">
            SEARCH
          </button>
        </div>
        <div className="header-login flex flex-row justify-between items-center">
          <button type="button">
            <i className="fa-solid fa-bell"></i>
          </button>

          <div className="login-img ml-3">
            <Dropdown
              menu={{
                items,
              }}
            >
              <img
                className="login-image w-full h-full block"
                src={user !== undefined ? user.avatar : defaultAvatar}
                alt="avatar"
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}
