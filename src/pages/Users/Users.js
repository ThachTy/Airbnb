import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import "./Users.scss";
import { current } from "@reduxjs/toolkit";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  console.log(users);
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        await fetch(
          // "https://airbnbnew.cybersoft.edu.vn/api/users/phan-trang-tim-kiem?pageIndex=1&pageSize=10",
          "https://airbnbnew.cybersoft.edu.vn/api/users",
          {
            method: "GET",
            headers: {
              tokenCybersoft:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NiIsIkhldEhhblN0cmluZyI6IjE4LzA0LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMzM5ODQwMDAwMCIsIm5iZiI6MTY4MzMwNjAwMCwiZXhwIjoxNzEzNTQ2MDAwfQ.4A7jJib1YUkmnIr-QDcjs_3j1YY0Ft1wPZDfe8qFrqE",
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            setUsers(res?.content);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllUser();
  }, []);

  /* Render */
  const renderUsers = (users = []) => {
    return users.map((user, index) => {
      return (
        <tr className="row" key={`user-${index}`}>
          <td className="cell">{index}</td>
          <td className="cell">{user?.name}</td>
          <td className="cell">{user?.email}</td>
          <td className="cell">
            <img
              className="w-[45px] h-[45px] object-fit-cover"
              alt={user?.name}
              src={user?.avatar}
            />
          </td>

          <td className="cell">{user?.gender ? "male" : "female"}</td>
          <td className="cell">
            <button className="btn " type="button">
              Edit
            </button>
            <button className="btn" type="button">
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <section className="min-w-full ">
      <div className="user-top">
        <a href=".">Thêm Quản Trị Viên</a>
        <form className="form ">
          <div className="row row-cols-2  ">
            <input
              className="bg-red-400"
              placeholder="Nhập vào tài khoản hoặc họ tên người dùng..."
              type="text"
            />
            <button className="btn bg-blue-400" type="button">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="user-content flex-grown">
        <table className="table">
          <thead>
            <tr className="heading">
              <th>Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Avatar</th>
              <th>Role</th>
              <th>Setting</th>
            </tr>
          </thead>
          <tbody>{renderUsers(users)}</tbody>
        </table>
      </div>
      <div className="user-footer">
        <Pagination
          size="small"
          className=" mx-auto"
          total={users.length || 0}
          defaultPageSize={pageSize}
          pageSizeOptions={[5, 20, 50, 100]}
          onChange={(page, pageSize) => {}}
          showSizeChanger
          showQuickJumper
        />
      </div>
    </section>
  );
}
