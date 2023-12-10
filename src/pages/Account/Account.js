import React from "react";
import "./Account.scss";
import { isRouteErrorResponse, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { bookingApi } from "../../services/bookingServices";
import BookedRoom from "./components/BookedRoom/BookedRoom";

export default function Account() {
  const { idUser } = useParams();

  const { data } = useQuery({
    queryKey: "getRoomByIdUSer",
    queryFn: async () => {
      try {
        let response = await bookingApi
          .getBookingByIdUser(idUser)
          .then((res) => res)
          .catch((err) => {
            throw err;
          });
        return response;
      } catch (error) {
        console.error(console.error(error));
      }
    },
  });

  typeof data?.data !== undefined && console.log(data?.data?.content);

  return (
    <main id="account" className="min-w-full">
      <h4 className="heading">Chuyến Đi</h4>
      <div className="account-content min-w-full flex flex-row justify-center items-start">
        <div className="booking px-1 py-1 h-[80vh] flex-grow">
          {data?.data?.content.map((bookedRoom) => {
            return (
              <BookedRoom
                key={`bookedRoom-${bookedRoom.id}`}
                room={bookedRoom}
              ></BookedRoom>
            );
          })}
        </div>
        <div className="dicover w-[400px] h-[50%]  p-4 ml-7 hidden md:block">
          <h4>Khám phá các địa điểm thú vị</h4>
          <p>
            Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu lưu
            tiếp theo của bạn rồi
          </p>
          <button className="block button px-4 py-2" type="button">
            Bắt Đầu Tìm Kiếm
          </button>
        </div>
      </div>
    </main>
  );
}
