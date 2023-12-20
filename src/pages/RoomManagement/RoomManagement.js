import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pagination, message, Form, Button, Input, Select } from "antd";
import { Link } from "react-router-dom";
import "./RoomManagement.scss";
import { queryClient } from "../../App.js";
import Loading from "../../components/Loading/Loading.js";
import Register from "./components/Register/Register.js";
import { useDeleteRoomMutation } from "./mutation/roomManagementMutation.js";
import {
  useGetRoomsManagementPerPage,
  fetchSearchRoomsManagementByIdLocation,
} from "./query/roomManagementQuery.js";
import { useGetAllLocations } from "../Location/query/locationsQuery.js";

export default function RoomManagement() {
  /* Hook */
  const [page, setPage] = useState({ currentPage: 1, pageSize: 10 });
  const [open, setOpen] = useState(false);
  const [roomEdit, setRoomEdit] = useState({});
  const [rooms, setRooms] = useState([]);
  const [locations, setLocations] = useState([]);
  const valueSearchRef = useRef("");
  const totalRoomsRef = useRef(0);
  /* Query */
  const {
    data: responseRooms,
    isLoading,
    refetch,
  } = useGetRoomsManagementPerPage(page.currentPage, page.pageSize);

  const { data: dataLocations } = useGetAllLocations();

  /* Mutation */
  const { mutate, isLoading: deleteLoading } = useDeleteRoomMutation();

  /* */
  useEffect(() => {
    if (responseRooms !== undefined) {
      setRooms(responseRooms?.data);
      totalRoomsRef.current = responseRooms.totalRow;
    }
  }, [responseRooms]);

  useEffect(() => {
    if (dataLocations !== undefined) {
      let newLocations = changeOptionLocation(dataLocations);
      setLocations(newLocations);
    }
  }, [dataLocations]);

  useEffect(() => {
    refetch();
  }, [page]);

  const changeOptionLocation = (dataLocations) => {
    let newLocations = [];
    if (typeof dataLocations === undefined) return newLocations;

    newLocations = dataLocations.map((location) => {
      return { label: location.tenViTri, value: location.id };
    });

    return newLocations;
  };

  /* Handle */
  // Delete
  const handleDeleteRoomManagement = (id) => {
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
  const handleSearchByIdLocation = async () => {
    let searchValue = valueSearchRef.current;

    if (searchValue == "*") {
      setRooms(responseRooms?.data);
      totalRoomsRef.current = responseRooms.totalRow;
      return;
    }

    let valueSearch = await queryClient.fetchQuery({
      queryKey: ["searchUsersByIdLocation", searchValue],
      queryFn: () => fetchSearchRoomsManagementByIdLocation(searchValue),
    });

    totalRoomsRef.current = valueSearch.length;

    valueSearch && setRooms(valueSearch);
  };

  /* Handle */
  // ChangePage
  const handelChangePage = (numberPage, pageSize) => {
    setPage({ currentPage: numberPage !== 0 ? numberPage : 1, pageSize });
  };

  // Edit
  const handleEdit = (room) => {
    setRoomEdit(room);
    setOpen(!open);
  };

  // Show Register
  const handleShowRegister = () => {
    setRoomEdit({});
    setOpen(!open);
  };

  /* Loading */
  if (isLoading || deleteLoading) return <Loading />;

  /* Render */
  const renderRooms = (rooms = []) => {
    if (rooms.length === 0 || rooms === undefined) return;
    return rooms.map((room, index) => {
      return (
        <tr className="row" key={`booling-${index}`}>
          <td className="cell cell-center">{room?.id}</td>
          <td className="cell h-[70px] md:h-[80px] lg:h-[100px] w-[150px] md:w-[20vw]  lg:w-[20vw] py-1">
            <img
              className="object-fill w-full h-full"
              src={room?.hinhAnh}
              alt={room?.tenPhong}
            />
          </td>
          <td className="cell text-center">{room?.maViTri}</td>
          <td className="cell pl-[1rem]">{room?.tenPhong}</td>
          <td className="cell text-center">{room?.khach}</td>
          <td className="cell text-center">{room?.giaTien}$</td>
          <td className="cell text-center">{room?.giuong}</td>

          <td className="cell cell-center">
            <Link className="btn btn-details" to={`/detail/${room.id}`}>
              Details
            </Link>
            <button
              onClick={() => handleEdit(room)}
              className="btn btn-edit"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteRoomManagement(room?.id)}
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
    <section id="roomManagement" className=" min-w-full ">
      <div className="rooms-top flex justify-evenly">
        <Button
          className="btn btn-add"
          type="button"
          onClick={handleShowRegister}
        >
          Add New Booking
        </Button>
        <Form className="form" layout="inline">
          <Select
            onChange={(e) => {
              valueSearchRef.current = e;
            }}
            className="mx-2"
            style={{
              width: 200,
            }}
            placeholder="Search Location"
            options={[{ label: "All", value: "*" }, ...locations]}
          ></Select>
          <Button
            onClick={handleSearchByIdLocation}
            className="btn btn-search"
            type="button"
          >
            SEARCH
          </Button>
        </Form>
      </div>
      <div className="rooms-content flex-grown">
        <table className="table">
          <thead>
            <tr className="heading">
              <th>Id</th>
              <th>Photo</th>
              <th>Location</th>
              <th>Name</th>
              <th>Guests</th>
              <th>Price</th>
              <th>Bed</th>
              <th>Setting</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-slate-200">
            {renderRooms(rooms)}
          </tbody>
        </table>
      </div>
      <div className="rooms-footer py-2 text-center">
        <Pagination
          size="small"
          className=" mx-auto"
          total={totalRoomsRef.current}
          showTotal={() => `Total: ${totalRoomsRef.current}`}
          pageSize={page.pageSize}
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={(page, pageSize) => handelChangePage(page, pageSize)}
          showSizeChanger
          showQuickJumper
        />
      </div>
      <Register
        refetchRooms={refetch}
        dataLocations={locations}
        roomEdit={roomEdit}
        open={open}
        setRooms={setRooms}
        setOpen={setOpen}
      ></Register>
    </section>
  );
}
