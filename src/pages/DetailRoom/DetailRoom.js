import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { phongService, vitriServices } from "../../services";
import "./DetailRoom.scss";

export default function DetailRoom() {
  const { idRoom } = useParams();

  const detailRoom = useQuery({
    queryKey: ["roomDetail"],
    queryFn: () => phongService.getDetailRoom(idRoom),
  });

  let detail = {};
  if (detailRoom?.data?.data?.content)
    detail = { ...detailRoom?.data?.data?.content };

  const {
    tenPhong,
    giaTien,
    banLa,
    bep,
    dieuHoa,
    doXe,
    giuong,
    hinhAnh,
    hoBoi,
    khach,
    moTa,
    phongNgu,
    phongTam,
    tivi,
    wifi,
    maViTri,
  } = detail;

  const detailLocation = useQuery({
    queryKey: ["locationDetail"],
    queryFn: () => vitriServices.getVitriById(maViTri),
  });

  let location = "";
  if (detailLocation?.data?.data?.content)
    location = { ...detailLocation?.data?.data?.content };

  const { tenViTri, tinhThanh, quocGia } = location;

  const images = [1, 2, 3, 4, 5];

  return (
    detail &&
    location && (
      <div className="detailroom__wrapper py-8">
        <h1 className="detailroom__title">{tenPhong}</h1>
        <div className="detailroom__location">
          <p>
            <span>{tenViTri}</span>, <span>{tinhThanh}</span>,
            <span>{quocGia}</span>
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
                <img src={hinhAnh} />
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
