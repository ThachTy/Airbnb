import React from 'react'
import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/image/AirbnbLogo.png'
import { FiSearch } from "react-icons/fi";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  Bars3Icon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
// import { Menu } from 'antd'

// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }


const Header = () => {
  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <div className="relative z-50 items-center grid-cols-3 cursor-pointer shadow-md px-20 py-5 grid">
      {/* left */}
      <img
        src={logo}
        alt='logo'
        objectFit="contain"
        objectPosition="left"
        width="102px"
        height="20px"
        display="block"
      ></img>


      {/* middle - search */}
      <div className="hidden lg:flex justify-center items-center relative shadow-sm shadow-gray-400 border rounded-full ">
        <input
          type="search"
          placeholder=""
          className="py-2.5 w-[20rem] rounded-full outline-0"
        />
        <div className="flex justify-between absolute w-full pr-16 pl-6 font-semibold text-gray-600">
          <div className="w-full border-r">Place</div>
          <div className="border-l border-x px-6">Time</div>
          <div className="w-full text-gray-600/60 pl-2">Group Size</div>
        </div>
        <div className="bg-[#ff5a60] p-2 rounded-full mr-2">
          <FiSearch className="text-white w-full" />
        </div>
      </div>

      {/* right */}
      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <p className="hidden cursor-pointer md:inline">Thuê chỗ ở qua Airbnb</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex items-center p-2 space-x-2 border-2 rounded-full">
          <Bars3Icon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
    </div>
    
  )
};


export default Header