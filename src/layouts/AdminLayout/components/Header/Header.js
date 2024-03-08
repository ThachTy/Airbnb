import React, { useEffect, useState } from "react";
import "./Header.scss";
import defaultAvatar from "../../../../assets/image/AvatarUser.png";
import logo from "../../../../assets/image/AirbnbLogo.png";
import { Dropdown } from "antd";
import { useGetProfilesUsersbyId } from "../../../../pages/Users/query/userQuery";
import { Link } from "react-router-dom";
import { getUserFromLocalStorage } from "../../../../utils/localStorage";

const handelLogout = () => {
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
      <a onClick={handelLogout} role="button">
        Logout
      </a>
    ),
    key: "3",
  },
];
export default function Header({ id }) {
  const [account, setAccount] = useState({});
  let login = getUserFromLocalStorage();
  const { data: user } = useGetProfilesUsersbyId(login.user.id);

  useEffect(() => {
    if (user) {
      console.log(user);
      setAccount(user);
    }
  }, [user]);

  return (
    <header
      id="headerAdmin"
      className="py-2 px-5 min-w-full flex flex-row justify-evenly items-center"
    >
      <div className="header-left w-[10vw] mr-5">
        <Link to="/">
          <img className="logo object-cover block" src={logo} alt="logo" />
        </Link>
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
                src={account !== undefined ? account.avatar : defaultAvatar}
                alt="avatar"
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}
