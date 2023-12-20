import React, { useEffect, useRef, useState } from "react";
import { Pagination, message, Form, Button, InputNumber, Input } from "antd";
import dayjs from "dayjs";
import "./Booking.scss";
import Loading from "../../components/Loading/Loading.js";
import Register from "./components/Register/Register.js";
// import { stringToSlug } from "../../utils/method.js";
import { queryClient } from "../../App.js";
import { dateFormat } from "../../utils/constants/dateFormat.js";
import { useDeleteBookingMutation } from "./mutation/bookingMutation.js";
import {
  useGetAllBookings,
  fetchSearchBookingsById,
} from "./query/bookingQuery.js";

export default function Booking() {
  /* Hook */
  const [page, setPage] = useState({ currentPage: 1, pageSize: 10 });
  const [open, setOpen] = useState(false);
  const [bookingEdit, setUserEdit] = useState({});
  const [bookings, setBookings] = useState([]);
  const inputSearchRef = useRef(HTMLElement);

  /* Query */
  const { data: responseBookings, isLoading, refetch } = useGetAllBookings();
  /* Mutation */
  const { mutate, isLoading: deleteLoading } = useDeleteBookingMutation();

  /* */
  useEffect(() => {
    if (responseBookings !== undefined) {
      setBookings(responseBookings);
    }
  }, [responseBookings]);

  useEffect(() => {
    refetch();
  }, [page]);

  /* Handle */
  // Delete
  const handleDeleteLocation = (id) => {
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
  const handleSearchById = async () => {
    let searchValue = inputSearchRef.current.input.value;
    if (inputSearchRef.current.input.value === "" || isNaN(searchValue)) {
      const bookings = queryClient.getQueryData(["getAllBookings"]);
      setBookings(bookings);
      isNaN(searchValue) && message.error("Invalid user code");
      return;
    }

    let data = await queryClient.fetchQuery({
      queryKey: ["fetchSearchBookingsById", searchValue],
      queryFn: () => fetchSearchBookingsById(searchValue),
    });
    data && setBookings(data);
  };

  /* Handle */
  // ChangePage
  const handelChangePage = (numberPage, pageSize) => {
    setPage({ currentPage: numberPage !== 0 ? numberPage : 1, pageSize });
  };

  // Edit
  const handleEdit = (booking) => {
    setUserEdit(booking);
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
  const renderBookings = (bookings = []) => {
    if (bookings.length === 0 || bookings === undefined) return;
    return bookings.map((booking, index) => {
      return (
        <tr className="row " key={`booling-${index}`}>
          <td className="cell cell-center">{booking?.id}</td>

          <td className="cell pl-[1rem] text-center">{booking?.maNguoiDung}</td>
          <td className="cell pl-[1rem] text-center">{booking?.maPhong}</td>

          <td className="cell cell-center">
            {dayjs(booking?.ngayDen).format(dateFormat)}
          </td>
          <td className="cell cell-center">
            {dayjs(booking?.ngayDi).format(dateFormat)}
          </td>
          <td className="cell text-center">{booking?.soLuongKhach}</td>

          <td className="cell cell-center">
            {/* <Link className="btn btn-details" to={`/profiles/${booking.id}`}>
              Details
            </Link> */}
            <button
              onClick={() => handleEdit(booking)}
              className="btn btn-edit"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteLocation(booking?.id)}
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
    <section id="booking" className=" min-w-full ">
      <div className="bookings-top flex justify-evenly">
        <Button
          className="btn btn-add"
          type="button"
          onClick={handleShowRegister}
        >
          Add New Booking
        </Button>
        <Form className="form" layout="inline">
          <Form.Item>
            <Input
              autoFocus
              min={0}
              ref={inputSearchRef}
              className="input-search"
              placeholder="Enter your User ..."
            />
          </Form.Item>
          <Button
            onClick={handleSearchById}
            className="btn btn-search"
            type="button"
          >
            SEARCH
          </Button>
        </Form>
      </div>
      <div className="bookings-content flex-grown">
        <table className="table table-auto">
          <thead>
            <tr className="heading">
              <th>Id</th>
              <th>User Code</th>
              <th>Room Code</th>
              <th>Arrival Date</th>
              <th>Departure Date</th>
              <th>Number of Guests</th>
              <th>Setting</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-slate-200">
            {renderBookings(bookings)}
          </tbody>
        </table>
      </div>
      <div className="bookings-footer py-2 text-center">
        <Pagination
          size="small"
          className=" mx-auto"
          total={responseBookings.length}
          showTotal={() =>
            `Total: ${responseBookings ? responseBookings.length : 0}`
          }
          pageSize={page.pageSize}
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={(page, pageSize) => handelChangePage(page, pageSize)}
          showSizeChanger
          showQuickJumper
        />
      </div>
      <Register
        refetchBookings={refetch}
        bookingEdit={bookingEdit}
        open={open}
        setBookings={setBookings}
        setOpen={setOpen}
      ></Register>
    </section>
  );
}
