import React from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
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

  console.log(data);

  if (typeof room === undefined) return;
  return (
    <div className="booking-item w-full max-h-content flex flex-row ">
      {/* Image */}
      <div className="booking-image w-[200px] md:w-300px lg:w-[350px]  min-h-full">
        <img className="w-full h-full block object-fill" src={data?.hinhAnh} />
      </div>
      {/*  Info */}
      <div className="booking-info w-full min-h-content">
        <div className="info-top px-4 py-2 h-[40%] flex flex-row justify-between items-start">
          <div className="info-left h-full">
            <h4 className="text-[0.9rem] md:text-[1rem] lg:text-[1.2rem]">
              {data?.tenPhong}
            </h4>
            <span className="text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]">
              {dayjs(room?.ngayDen).format(dateFormat)} --
              {dayjs(room?.ngayDi).format(dateFormat)}
            </span>
          </div>
          <p className="info-right text-[0.9rem] md:text-[1rem] lg:text-[1.2rem]">
            <span className="info-cash text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
              {data?.giaTien}$
            </span>
            /
            <span className="info-date text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
              0 ngày
            </span>
          </p>
        </div>
        <div className="info-bottom px-4 py-2 hidden md:block lg:block">
          <h4>Tiện Ích</h4>
          <div className="info-icons h-12 py-1 flex flex-row justify-evenly contents-center">
            {/* phongNgu : number*/}
            <div className="w-10 h-full  justify-center items-center bg-blue-400"></div>
            {/* giuong : number */}
            {/* phongTam  : number */}
            {/* mayGiat : boolean */}
            {/* banLa    */}
            {/* tivi */}
            {/* dieuHoa */}
            {/* wifi */}
            {/* bep */}
            {/* doXe */}
            {/* hoBoi */}
            {/* banUi    */}
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
          </div>
        </div>
      </div>
    </div>
  );
}
