import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { phongService, vitriServices } from "../../services";
import { DateRangePicker } from "@progress/kendo-react-dateinputs";
import "./DetailRoom.scss";
import CustomStartDate from "./CustomStartDate";
import CustomEndDate from "./CustomEndDate";

export default function DetailRoom() {
  const { idRoom } = useParams();

  const [detailRoom, setDetailRoom] = useState(null);
  const [isClose, setIsClose] = useState(true);

  const result = useQuery({
    queryKey: ["roomDetail"],
    queryFn: () => phongService.getDetailRoom(idRoom),
    onSuccess: (data) => {
      if (data) {
        setDetailRoom(data?.data?.content)
      }
    }
  });

  const detailLocation = useQuery({
    queryKey: ["locationDetail", detailRoom],
    queryFn: () => vitriServices.getVitriById(detailRoom?.maViTri),
    onSuccess: (data) => {
      const { quocGia, tenViTri, tinhThanh } = data?.data?.content;
      setDetailRoom({ ...detailRoom, quocGia, tenViTri, tinhThanh })
    }
  });

  console.log('after', detailRoom)

  const [value, setValue] = useState({
    start: new Date(2018, 8, 5),
    end: new Date(2018, 8, 12),
  });

  const handleChange = (event) => {
    setValue(event.value);
  };


  const images = [1, 2, 3, 4, 5];

  return (
    detailRoom && (
      <div className="detailroom__wrapper py-8">
        <h1 className="detailroom__title">{detailRoom.tenPhong}</h1>
        <div className="detailroom__location">
          <p>
            <span>{detailRoom.tenViTri}</span>, <span>{detailRoom.tinhThanh}</span>,
            <span>{detailRoom.quocGia}</span>
          </p>
          <div>
            <span>Chia sẽ</span>
            <span>Lưu</span>
          </div>
        </div>
        <div className="detailroom__img-section">
          {images.map((item) => {
            return (
              <div
                key={`images-detail-${item}`}
                className="detailroom__img-item"
              >
                <img src={detailRoom.hinhAnh} />
              </div>
            );
          })}
        </div>
        <div className="detailroom__desc-section">
          <div className="detailroom__desc-detail">
            <div className="detailroom__desc-introduce">
              <h2 className="detailroom__desc-detail-title">Toàn bộ căn hộ. Chủ nhà Sungwon</h2>
              <p className="dedetailroom__desc-detail-totalroom">
                <span>{detailRoom.khach}</span> khách,
                <span>{detailRoom.phongNgu}</span> phòng ngủ,
                <span>{detailRoom.phongTam}</span> phòng tắm
              </p>
            </div>
            <div className="detailroom__desc-general">
              <div className="general__item">
                <i class="fa-solid fa-medal"></i>
                <div>
                  <h3>Sungwon là Chủ nhà siêu cấp</h3>
                  <p>Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.</p>
                </div>
              </div>
              <div className="general__item">
                <i class="fa-solid fa-medal"></i>
                <div>
                  <h3>Địa điểm tuyệt vời</h3>
                  <p>90% khách gần đây đã xếp hạng 5 sao cho vị trí này.</p>
                </div>
              </div>
              <div className="general__item">
                <i class="fa-solid fa-medal"></i>
                <div>
                  <h3>Miễn phí hủy trong 48 giờ.</h3>
                </div>
              </div>
            </div>
            <div className="detailroom__desc-intro-web">
              <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="" width={150} height={150} />
              <p>Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ nhà hủy, thông tin nhà/phòng cho thuê không chính xác và những vấn đề khác như sự cố trong quá trình nhận phòng.</p>
              <a href="#">Tìm hiểu thêm</a>
            </div>
          </div>
          <div className="detailroom__desc-booking">
            <div className="detailroom-booking__wrapper">
              <div>
                <p> $80 <span>/đêm</span> </p>
              </div>
              <div className="date-section">
                <DateRangePicker className="datePicker" startDateInput={CustomStartDate} endDateInput={CustomEndDate} value={value} onChange={handleChange} />
                <div className="customerChoose">
                  <p>Khach</p>
                  <div className="">
                    <button>-</button>
                    <span>0</span>
                    <button>+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
