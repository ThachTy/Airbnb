import React from "react";
import "./Header.scss";
import defaultAvatar from "../../../../assets/image/AvatarUser.png";
import { Dropdown } from "antd";

const handelLogout = (params) => {
  console.log("Logout");
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
export default function Header() {
  return (
    <header
      id="headerAdmin"
      className="py-2 px-5 min-w-full flex flex-row justify-between items-center"
    >
      <div className="header-left w-[15vw] mx-2">
        {/* <a role="button">LOGO</a> */}
        LOGO
        <img
          className="logo object-cover block"
          src="../../../../assets/image/logo.svg"
          alt=""
        />
      </div>
      <div className="header-right flex flex-row justify-between items-center flex-grow">
        <div className="header-tools">
          {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          <input className="tools-input" type="text" />
          <button className="tools-button" type="button">
            SEARCH
          </button>
        </div>
        <div className="header-login flex flex-row justify-between items-center">
          {/* <button type="button">Subject</button> */}
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
                src={defaultAvatar}
                alt="avatar"
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}
