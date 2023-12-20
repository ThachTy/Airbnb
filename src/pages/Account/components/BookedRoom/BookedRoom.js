import React, { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import "./BookedRoom.scss";
import { dateFormat } from "../../../../utils/constants/dateFormat";
import { phongService } from "../../../../services/phongServices";

export default function BookedRoom({ room }) {
  const { data } = useQuery({
    queryKey: ["bookedRoom", room.id],
    queryFn: async () => {
      try {
        let response = await phongService
          .getDetailRoom(room.maPhong)
          .then((res) => res)
          .catch((err) => {
            throw err;
          });
        return response.data.content;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const dateBooking = useCallback(
    (fromDate, toDate) => {
      let fromD = new Date(fromDate).valueOf();
      let toD = new Date(toDate).valueOf();
      let days = Math.floor((fromD - toD) / (86400 * 1000));

      return days > 0 ? days : 1;
    },
    [data]
  );

  const priceBooking = useCallback(
    (price, fromDate, toDate) => {
      if (typeof price === undefined) return;
      let days = dateBooking(fromDate, toDate);
      let result = price * days;
      return result.toLocaleString();
    },
    [data]
  );

  if (typeof room === undefined) return;
  return (
    <div className="booking-item w-full max-h-content flex flex-row ">
      {/* Image */}
      <div className="booking-image w-[170px] md:w-[200px] lg:w-[250px] min-h-full">
        <img className="w-full h-full block object-fill" src={data?.hinhAnh} />
      </div>
      {/*  Info */}
      <div className="booking-info w-full min-h-content">
        <div className="info-top gap-2 px-2 md:px-2 lg:px-4 py-1 lg:py-2 flex flex-col  md:flex-row lg:flex-row justify-between items-start">
          <div className="info-left flex-grow min-h-max ">
            <h4 className="h-[40px] md:h-[80px] lg:h-80px text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]">
              {data?.tenPhong}
            </h4>
            <span className="text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem]">
              <i className="fa-solid fa-calendar-days mr-1"></i>
              {dayjs(room?.ngayDen).format(dateFormat)}
              <i className="fa-solid fa-arrow-right-long mx-1"></i>
              {dayjs(room?.ngayDi).format(dateFormat)}
            </span>
          </div>
          <p className="info-right md:px-0 lg:px-1 min-w-content lg:w-[120px] text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem]">
            <i className="fa-solid fa-wallet mr-1"></i>
            <span className="info-cash">
              {typeof data?.giaTien !== undefined &&
                priceBooking(data?.giaTien, room?.ngayDi, room?.ngayDen)}
              $
            </span>
            /
            <span className="info-date">
              {dateBooking(room?.ngayDi, room?.ngayDen)} ngày
            </span>
          </p>
        </div>
        <div className="info-bottom h-[50%] px-4 py-2 hidden md:hidden lg:block">
          <h4 className="text-[0.6rem] md:text-[0.8rem] lg:text-[1rem]">
            Tiện Ích
          </h4>
          <div className="info-icons md:gap-y-1 h-12 py-1 grid grid-rows-3 md:grid-rows-2 lg:grid-rows-1 grid-flow-col">
            {/* phongNgu : number*/}
            {data?.phongNgu && <i className="fa-solid fa-house-user"></i>}
            {/* giuong : number */}
            {data?.giuong && <i className="fa-solid fa-bed"></i>}
            {/* phongTam  : number */}
            {data?.phongTam && <i className="fa-solid fa-bath"></i>}
            {/* mayGiat : boolean */}
            {data?.mayGiat && <i className="fa-solid fa-socks"></i>}
            {/* banLa    */}
            {data?.banLa && (
              <i className="fa-solid fa-person-dots-from-line"></i>
            )}
            {/* tivi */}
            {data?.tivi && <i className="fa-solid fa-tv"></i>}
            {/* dieuHoa */}
            {data?.dieuHoa && <i className="fa-solid fa-temperature-low"></i>}
            {/* wifi */}
            {data?.wifi && <i className="fa-solid fa-wifi"></i>}
            {/* bep */}
            {data?.bep && <i className="fa-solid fa-kitchen-set"></i>}
            {/* doXe */}
            {data?.doXe && <i className="fa-solid fa-car-rear"></i>}
            {/* hoBoi */}
            {data?.hoBoi && <i className="fa-solid fa-person-swimming"></i>}
          </div>
        </div>
      </div>
    </div>
  );
}
