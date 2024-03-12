import React, { useEffect, useState } from "react";
import logo from "../../assets/image/AirbnbLogo.png";
import { GlobeAltIcon } from "@heroicons/react/20/solid";
import "./styles/styles.css";
import { Link } from "react-router-dom";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import defaultAvatar from "../../assets/image/AvatarUser.png";
import { useGetProfilesUsersbyId } from "../../pages/Users/query/userQuery";
import { usersApi } from "../../services/usersServices";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/reducers/userReducer";
import { handleLogOut } from "../../utils/logOut";

const handleShowNavs = () => {
  if (window.innerWidth >= 900) return;
  const navs = document.getElementById("navs");
  navs.classList.toggle("show");
};

function Header() {
  const dispath = useDispatch();
  const [account, setAccount] = useState({});
  const { user, stateUser } = useSelector((state) => state.userReducer);
  let { isLogin } = stateUser;

  useEffect(() => {
    try {
      const data = getUserFromLocalStorage();
      if (data?.token) {
        usersApi
          .getProfilesUserById(data.id)
          .then((res) => {
            setAccount(res.data.content);
            dispath(
              userAction({
                user: res.data.content,
                stateUser: { isLogin: true },
              })
            );
          })
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, [isLogin]);

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
          <div className="avatar flex justify-center items-center rounded-full">
            <button onClick={handleShowNavs} className="btn-bars" role="button">
              <i className="fa-solid fa-bars"></i>
            </button>

            <div className="account">
              {account.id ? (
                <div className="account__avatar rounded-full border-2">
                  <button
                    className="btn-account w-full h-full block"
                    role="button"
                  >
                    <img
                      className="rounded-full object-fill w-full h-full"
                      src={account.avatar || defaultAvatar}
                    />
                  </button>
                </div>
              ) : (
                <i className="fa-regular fa-circle-user"></i>
              )}

              <ul className="account__dropdown">
                {!isLogin && (
                  <li className="dropdown-items">
                    <Link to="/login">
                      <i className="fa-solid fa-address-card"></i>Đăng Nhập
                    </Link>
                  </li>
                )}

                <li className="dropdown-items">
                  <Link to="/register">
                    <i className="fa-regular fa-pen-to-square"></i>Đăng Ký
                  </Link>
                </li>

                {user?.role && user?.role === "ADMIN" && (
                  <li className="dropdown-items">
                    <Link to={`/admin/`}>
                      <i className="fa-solid fa-layer-group"></i>Admin
                    </Link>
                  </li>
                )}
                <li className="dropdown-items">
                  <Link to={`/account/${account.id}`}>
                    <i className="fa-solid fa-layer-group"></i>Phòng Đặt
                  </Link>
                </li>
                <li className="dropdown-items">
                  <Link to={`/profiles/${account.id}`}>
                    <i className="fa-solid fa-layer-group"></i>Thông Tin
                  </Link>
                </li>
                <li className="dropdown-items">
                  <a onClick={handleLogOut} role="button">
                    <i className="fa-solid fa-right-from-bracket"></i>Đăng Xuất
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
