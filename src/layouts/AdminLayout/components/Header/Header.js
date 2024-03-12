import React, { useEffect, useState } from "react";
import "./Header.scss";
import defaultAvatar from "../../../../assets/image/AvatarUser.png";
import logo from "../../../../assets/image/AirbnbLogo.png";
import { Dropdown } from "antd";
import { Link, useParams } from "react-router-dom";
import { getUserFromLocalStorage } from "../../../../utils/localStorage";
import { usersApi } from "../../../../services/usersServices";
import { handleLogOut } from "../../../../utils/logOut";
import { useSelector } from "react-redux";

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
      <a onClick={handleLogOut} role="button">
        Logout
      </a>
    ),
    key: "3",
  },
];

export default function Header() {
  const [account, setAccount] = useState({});
  const idAdmin = useParams();
  // const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    try {
      const data = getUserFromLocalStorage();
      if (data?.token) {
        usersApi
          .getProfilesUserById(data.id)
          .then((res) => {
            setAccount(res.data.content);
          })
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

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
