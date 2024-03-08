import React, { useEffect, useState } from "react";
import logo from "../../assets/image/AirbnbLogo.png";
import { GlobeAltIcon } from "@heroicons/react/20/solid";
import "./styles/styles.css";
import { Link } from "react-router-dom";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import defaultAvatar from "../../assets/image/AvatarUser.png";
import { useGetProfilesUsersbyId } from "../../pages/Users/query/userQuery";

const handleShowNavs = () => {
  if (window.innerWidth >= 900) return;
  const navs = document.getElementById("navs");
  navs.classList.toggle("show");
};

const handleLogOut = () => {
  removeUserFromLocalStorage() && console.log("Log out successful");
  window.location.assign("/");
};

const Header = () => {
  const [account, setAccount] = useState({});
  let login = getUserFromLocalStorage();
  const { data: user } = useGetProfilesUsersbyId(login.user.id);

  useEffect(() => {
    if (user) {
      setAccount(user);
    }
  }, [user]);

  return (
    <header id="header" className="shadow-md py-5">
      <div className="container">
        {/* left */}
        <Link to="/">
          <img className="image-logo" src={logo} alt="logo" />
        </Link>
        {/* middle - search */}
        <nav id="navs" className="navs">
          <a className="nav-items" href="#">
            Anywhere
          </a>
          <a className="nav-items" href="#">
            Any week
          </a>
          <a className="nav-items" href="#">
            Add Guest
          </a>
          {/* <button className="nav-items" rolte="button">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </button> */}
        </nav>
        {/* right */}
        <div className="flex items-center justify-end space-x-4 text-gray-500">
          <p className="hidden cursor-pointer md:inline">
            Thuê chỗ ở qua Airbnb
          </p>
          <GlobeAltIcon className="h-6 cursor-pointer" />
          <div className="btn-bars flex items-center space-x-2 border-2 rounded-full">
            <button onClick={handleShowNavs} className="btn-bars" role="button">
              <i className="fa-solid fa-bars"></i>
            </button>

            <div className="account">
              <button className="btn-account" role="button">
                {account.id ? (
                  <img
                    className="rounded-full"
                    width="50"
                    height="50"
                    src={account.avatar || defaultAvatar}
                  />
                ) : (
                  <i className="fa-regular fa-circle-user"></i>
                )}
              </button>
              <ul className="dropdown">
                <li className="dropdown-items">
                  <Link to="/login">
                    <i className="fa-solid fa-address-card"></i>Login
                  </Link>
                </li>
                <li className="dropdown-items">
                  <Link to="/register">
                    <i className="fa-regular fa-pen-to-square"></i>Register
                  </Link>
                </li>
                <li className="dropdown-items">
                  <Link to="/admin">
                    <i className="fa-solid fa-layer-group"></i>Admin
                  </Link>
                </li>
                <li className="dropdown-items">
                  <Link to="/account/:idUser">
                    <i className="fa-solid fa-layer-group"></i>Booked Room
                  </Link>
                </li>
                <li className="dropdown-items">
                  <Link to={`/profiles/${account.id}`}>
                    <i className="fa-solid fa-layer-group"></i>Profiles
                  </Link>
                </li>
                <li className="dropdown-items">
                  <a onClick={handleLogOut} role="button">
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
