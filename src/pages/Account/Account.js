import React, { Suspense, lazy } from "react";
import "./Account.css";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { bookingApi } from "../../services/bookingServices";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
let BookedRoomLazy = lazy(() => import("./components/BookedRoom/BookedRoom"));
export default function Account() {
  const { idUser } = useParams();
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
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
        console.error(error);
      }
    },
  });

  if (user.id !== idUser * 1) navigate("/");

  return (
    <main id="account" className="min-w-full">
      <h4 className="heading">Chuyến Đi</h4>
      <div className="account-content min-w-full flex flex-row justify-center items-start">
        <div className="booking flex-grow px-1 py-1 h-[80vh] ">
          <Suspense fallback={<Loading />}>
            {data?.data?.content.map((bookedRoom) => {
              return (
                <BookedRoomLazy
                  key={`bookedRoom-${bookedRoom.id}`}
                  room={bookedRoom}
                ></BookedRoomLazy>
              );
            })}
          </Suspense>
        </div>
        <div className="dicover md:w-[40%] lg:min-w-[25%] lg:max-w-[400px] min-h-full p-4 md:mx-[0.5rem] lg:ml-[1.5rem] mt-1 hidden md:block lg:block">
          <h4 className="md:text-[0.9rem] lg:text-[1rem]">
            Khám phá các địa điểm thú vị
          </h4>
          <p className="md:text-[0.7rem] lg:text-[0.8rem]">
            Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu lưu
            tiếp theo của bạn rồi
          </p>
          <button
            className="w-full mx-auto px-4 py-3 text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem]"
            type="button"
          >
            Bắt Đầu Tìm Kiếm
          </button>
        </div>
      </div>
    </main>
  );
}
