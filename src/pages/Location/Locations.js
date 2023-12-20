import React, { useEffect, useRef, useState } from "react";
import { Pagination, message, Form, Input, Button } from "antd";
import "./Locations.scss";
import defaultAvatar from "../../assets/image/AvatarUser.png";
import Loading from "../../components/Loading/Loading.js";
import Register from "./components/Register/Register.js";
import { queryClient } from "../../App.js";
import { stringToSlug } from "../../utils/method.js";
import { useDeleteLocationMutation } from "./mutation/locationsMutation.js";
import {
  useGetLocationsPerPage,
  fetchSearchLocationsByName,
} from "./query/locationsQuery.js";

export default function Locations() {
  /* Hook */
  const [page, setPage] = useState({ currentPage: 1, pageSize: 10 });
  const [open, setOpen] = useState(false);
  const [locationEdit, setLocationEdit] = useState({});
  const [locations, setLocations] = useState([]);
  const inputSearchRef = useRef(HTMLElement);
  const totalLocationsRef = useRef(0);

  /* Query */
  const {
    data: responseLocations,
    isLoading,
    refetch,
  } = useGetLocationsPerPage(page.currentPage, page.pageSize);

  /* Mutation */
  const {
    mutate,
    data: locationResponse,
    isLoading: deleteLoading,
  } = useDeleteLocationMutation();

  /* */
  useEffect(() => {
    if (responseLocations?.data !== undefined) {
      setLocations(responseLocations?.data);
      totalLocationsRef.current = responseLocations.totalRow;
    }
  }, [responseLocations]);

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
  const hanleSearchByName = async () => {
    console.log("Search");
    // if (inputSearchRef.current.input.value === "") {
    //   const locations = queryClient.getQueryData(["getLocationsPerPage"]);
    //   setLocations(locations.data);
    //   totalLocationsRef.current = locations.totalRow;
    //   return;
    // }
    // let valueSearch = stringToSlug(inputSearchRef.current.input.value);
    // let { data } = await fetchSearchLocationsByName(valueSearch);
    // data && setLocations(data.content);
  };

  /* Handle */
  // ChangePage
  const handelChangePage = (numberPage, pageSize) => {
    setPage({ currentPage: numberPage !== 0 ? numberPage : 1, pageSize });
  };

  // Edit
  const handleEdit = (location) => {
    setLocationEdit(location);
    setOpen(!open);
  };

  // Show Register
  const handleShowRegister = () => {
    setLocationEdit({});
    setOpen(!open);
  };

  /* Loading */
  if (isLoading || deleteLoading) return <Loading />;

  /* Render */
  const renderLocations = (locations = []) => {
    if (locations.length === 0 || locations === undefined) return;
    return locations.map((location, index) => {
      return (
        <tr className="row" key={`location-${index}`}>
          <td className="cell cell-center">{location?.id}</td>
          <td className="cell px-1 py-1 w-[10vw]">
            <img
              className=" p-[2px] lg:p-1 border-[1px] lg:border-2 w-full h-full aspect-square rounded-xl object-fill block mx-auto"
              alt={location?.name}
              src={location?.hinhAnh ? location?.hinhAnh : defaultAvatar}
            />
          </td>
          <td className="cell pl-[1rem]">{location?.tenViTri}</td>
          <td className="cell pl-[1rem]">{location?.tinhThanh}</td>

          <td className="cell pl-[1rem]">{location?.quocGia}</td>
          <td className="cell cell-center">
            {/* <Link className="btn btn-details" to={`/profiles/${location.id}`}>
              Details
            </Link> */}
            <button
              onClick={() => handleEdit(location)}
              className="btn btn-edit"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteLocation(location?.id)}
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
    <section id="locations" className=" min-w-full ">
      <div className="locations-top flex justify-evenly">
        <Button
          className="btn btn-add"
          type="button"
          onClick={handleShowRegister}
        >
          Add New Locations
        </Button>
        <Form className="form" layout="inline">
          <Form.Item>
            <Input
              autoFocus
              ref={inputSearchRef}
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
      <div className="locations-content flex-grown">
        <table className="table">
          <thead>
            <tr className="heading">
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>City</th>
              <th>Country</th>
              <th>Setting</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {renderLocations(locations)}
          </tbody>
        </table>
      </div>
      <div className="locations-footer py-2 text-center">
        <Pagination
          size="small"
          className=" mx-auto"
          total={totalLocationsRef.current}
          showTotal={() =>
            `Total: ${responseLocations ? responseLocations.totalRow : 0}`
          }
          pageSize={page.pageSize}
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={(page, pageSize) => handelChangePage(page, pageSize)}
          showSizeChanger
          showQuickJumper
        />
      </div>
      <Register
        refetchLocations={refetch}
        locationEdit={locationEdit}
        open={open}
        setLocations={setLocations}
        setOpen={setOpen}
      ></Register>
    </section>
  );
}
