import React, { useEffect, useRef, useState } from "react";
import { Pagination, message, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "./Users.scss";
import Loading from "../../components/Loading/Loading.js";
import Register from "./components/Register/Register.js";
import { queryClient } from "../../App.js";
import { stringToSlug } from "../../utils/method.js";
import { useDeleteUserMutation } from "./mutation/userMutation.js";
import {
  useGetUsersPerPage,
  useSearchUserByName,
  fetchUserByPerPage,
} from "./query/userQuery";

export default function Users() {
  /* Hook */
  const [page, setPage] = useState({ currentPage: 1, pageSize: 10 });
  const [open, setOpen] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [users, setUsers] = useState([]);

  const valueSearchRef = useRef("");
  const totalUsersRef = useRef(0);

  console.log("re-render");

  /* Query */
  const { data: responseUsers, isLoading } = useGetUsersPerPage(
    page.currentPage,
    page.pageSize
  );
  const { data } = useSearchUserByName(valueSearchRef.current);

  useEffect(() => {
    if (responseUsers?.data !== undefined) {
      setUsers(responseUsers?.data);
      totalUsersRef.current = responseUsers.totalRow;
    }
  }, [responseUsers]);

  /* Mutation */
  const {
    data: userResponse,
    mutate,
    isLoading: deleteLoading,
    isSuccess,
    error,
  } = useDeleteUserMutation();

  /* Handle */
  // Delete
  const handleDeleteUser = (id) => {
    mutate(id);

    error &&
      message.open({ type: "error", content: error?.response?.data?.message });

    isSuccess &&
      queryClient.fetchQuery({
        queryKey: ["getUsersPerPage"],
        queryFn: () => fetchUserByPerPage(page.numberPage, page.pageSize),
      }) &&
      message.open({
        type: "success",
        content: userResponse?.data?.message,
      });
  };

  // ChangePage
  const handelChangePage = (numberPage, pageSize) => {
    setPage({ currentPage: numberPage !== 0 ? numberPage : 1, pageSize });
    queryClient.fetchQuery({
      queryKey: ["getUsersPerPage"],
      queryFn: () =>
        fetchUserByPerPage(numberPage !== 0 ? numberPage : 1, pageSize),
    });
  };

  // Edit
  const handleEdit = (user) => {
    setUserEdit(user);
    setOpen(!open);
  };
  // Show Register
  const handleShowRegister = () => {
    setOpen(!open);
  };

  // Search
  const hanleSearchByName = () => {
    if (valueSearchRef.current === "") {
      const { data } = queryClient.getQueryData(["getUsersPerPage"]);
      setUsers(data);
      return;
    }

    let newSearch = stringToSlug(valueSearchRef.current);

    const searchUsers = queryClient.getQueryData(["searchUsersByName"]);

    searchUsers.data.content !== undefined
      ? setUsers(searchUsers.data.content)
      : setUsers([]);
  };

  /* Loading */
  if (deleteLoading || isLoading) return <Loading />;

  /* Render */
  const renderUsers = (users = []) => {
    if (users.length === 0 || users === undefined) return;
    return users.map((user, index) => {
      return (
        <tr className="row" key={`user-${index}`}>
          <td className="cell cell-center">{index}</td>
          <td className="cell pl-[1rem]">{user?.name}</td>
          <td className="cell pl-[1rem]">{user?.email}</td>
          <td className="cell ">
            <img
              className="w-[45px] h-[45px] object-fit-cover mx-auto"
              alt={user?.name}
              src={user?.avatar}
            />
          </td>

          <td className="cell cell-center">{user?.role}</td>
          <td className="cell cell-center">
            <Link className="btn btn-details" to={`/account/${user.id}`}>
              Details
            </Link>
            <button
              onClick={() => handleEdit(user)}
              className="btn btn-edit bg-black"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteUser(user?.id)}
              className="btn btn-delete"
              type="button"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <section id="users" className=" min-w-full ">
      <div className="user-top flex justify-evenly">
        <Button
          className="btn btn-add"
          type="button"
          onClick={handleShowRegister}
        >
          Add Administrators
        </Button>
        <Form className="form" layout="inline">
          <Form.Item>
            <Input
              onChange={(e) => {
                valueSearchRef.current = e.target.value;
              }}
              className="input-search"
              placeholder="Enter your account..."
              type="text"
            />
          </Form.Item>
          <Button
            onClick={hanleSearchByName}
            className="btn btn-search"
            type="button"
          >
            SEARCH
          </Button>
        </Form>
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
          total={totalUsersRef.current}
          showTotal={() =>
            `Total: ${responseUsers ? responseUsers.totalRow : 0}`
          }
          pageSize={page.pageSize}
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={(page, pageSize) => handelChangePage(page, pageSize)}
          showSizeChanger
          showQuickJumper
        />
      </div>
      <Register userEdit={userEdit} open={open} setOpen={setOpen}></Register>
    </section>
  );
}
