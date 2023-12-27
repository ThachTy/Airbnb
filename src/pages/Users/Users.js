import React, { useEffect, useRef, useState } from "react";
import { Pagination, message, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "./Users.scss";
import defaultAvatar from "../../assets/image/AvatarUser.png";
import Loading from "../../components/Loading/Loading.js";
import Register from "./components/Register/Register.js";
import { queryClient } from "../../App.js";
import { useDeleteUserMutation } from "./mutation/userMutation.js";
import { useGetUsersPerPage, fetchSearchUserByName } from "./query/userQuery";

export default function Users() {
  /* Hook */
  const [page, setPage] = useState({ currentPage: 1, pageSize: 10 });
  const [open, setOpen] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [users, setUsers] = useState([]);
  const inputSearchRef = useRef(HTMLElement);
  const totalUsersRef = useRef(0);

  /* Query */
  const {
    data: responseUsers,
    isLoading,
    refetch,
  } = useGetUsersPerPage(page.currentPage, page.pageSize);

  /* Mutation */
  const { mutate, isLoading: deleteLoading } = useDeleteUserMutation();

  /* */
  useEffect(() => {
    if (responseUsers?.data !== undefined) {
      setUsers(responseUsers?.data);
      totalUsersRef.current = responseUsers.totalRow;
    }
  }, [responseUsers]);

  useEffect(() => {
    refetch();
  }, [page]);

  /* Handle */
  // Delete
  const handleDeleteUser = (id) => {
    mutate(id, {
      onSuccess: (res) => {
        res?.status === 200 &&
          message.open({
            type: "success",
            content: "Deleted successfully",
          });

        refetch();
      },
      onError: (err) => {
        err?.status === 400 &&
          message.open({
            type: "error",
            content: err?.response?.data?.message,
          });
      },
    });
  };

  // Search
  const hanleSearchByName = async () => {
    let valueSearch = inputSearchRef.current.input.value;
    if (valueSearch === "") {
      const users = queryClient.getQueryData(["getUsersPerPage"]);
      setUsers(users.data);
      totalUsersRef.current = users.totalRow;
      return;
    }
    let data = await queryClient.fetchQuery({
      queryKey: ["searchUsersByName", valueSearch],
      queryFn: () => fetchSearchUserByName(valueSearch),
    });

    data && setUsers(data);
  };

  /* Handle */
  // ChangePage
  const handelChangePage = (numberPage, pageSize) => {
    setPage({ currentPage: numberPage !== 0 ? numberPage : 1, pageSize });
  };

  // Edit
  const handleEdit = (user) => {
    setUserEdit(user);
    setOpen(!open);
  };

  // Show Register
  const handleShowRegister = () => {
    setUserEdit({});
    setOpen(!open);
  };

  /* Loading */
  if (isLoading || deleteLoading) return <Loading />;

  /* Render */
  const renderUsers = (users = []) => {
    if (users.length === 0 || users === undefined) return;
    return users.map((user, index) => {
      return (
        <tr className="row" key={`user-${index}`}>
          <td className="cell cell-center">{user?.id}</td>
          <td className="cell py-1">
            <img
              className=" min-w-[45px] min-h-[45px] w-[5vw] h-[5vw] rounded-full object-fit-cover mx-auto"
              alt={user?.name}
              src={user?.avatar ? user?.avatar : defaultAvatar}
            />
          </td>
          <td className="cell pl-[1rem]">{user?.name}</td>
          <td className="cell pl-[1rem]">{user?.email}</td>
          <td className="cell cell-center uppercase">{user?.role}</td>
          <td className="cell cell-center">
            <Link className="btn btn-details" to={`/profiles/${user.id}`}>
              Details
            </Link>
            <button
              onClick={() => handleEdit(user)}
              className="btn btn-edit"
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
      <div className="users-top flex justify-evenly">
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
              autoFocus
              ref={inputSearchRef}
              className="input-search"
              placeholder="Enter Account name..."
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
      <div className="users-content flex-grown">
        <table className="table">
          <thead>
            <tr className="heading">
              <th>Id</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Setting</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {renderUsers(users)}
          </tbody>
        </table>
      </div>
      <div className="users-footer py-2 text-center">
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
      <Register
        refetchUsers={refetch}
        userEdit={userEdit}
        open={open}
        setUsers={setUsers}
        setOpen={setOpen}
      ></Register>
    </section>
  );
}
