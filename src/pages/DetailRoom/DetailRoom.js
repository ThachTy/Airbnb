import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { binhluanServices, phongService, vitriServices } from "../../services";
import { DateRangePicker } from "@progress/kendo-react-dateinputs";
import "./DetailRoom.scss";
import CustomStartDate from "./CustomStartDate";
import CustomEndDate from "./CustomEndDate";
import { detailRoomUtils } from "../../utils/constants";
import { Button, List, Skeleton } from "antd";


export default function DetailRoom() {
  let count = 3;
  let maxList = 0;
  const { idRoom } = useParams();

  const [detailRoom, setDetailRoom] = useState(null);
  const [isClose, setIsClose] = useState(true);
  const [khach, setKhach] = useState(0);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [s, setS] = useState(0)
  const [comments, setComments] = useState([]);
  const [maxComments, setmaxComments] = useState([]);

  // console.log('comments', comments)
  // console.log('maxComments', maxComments)

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

  const detailRoomComments = useQuery({
    queryKey: ['comments'],
    queryFn: () => binhluanServices.getCommentsByIdRoom(idRoom),
    onSuccess: (data) => {
      // console.log('dataComments', data.data.content);
      setComments((data.data.content));
    }
  })


  useEffect(() => {
    let cloneKey = detailRoom && Object.keys(detailRoom).filter((key, index) => {
      return detailRoom[key] == true;
    })
    setList(convertDetailUtil(funcT(cloneKey)));
  }, [detailRoom])

  useEffect(() => {
    setmaxComments(converDetailComments(comments))
  }, [comments])


  const [value, setValue] = useState({
    start: new Date(2018, 8, 5),
    end: new Date(2018, 8, 6),
  });


  const handleChange = (event) => {
    setValue(event.value);
  };

  const handleChangeCustomer = (change) => {
    if (khach + change < 0) return;
    setKhach(khach + change);
  }

  const funcT = (cloneKey) => {
    let detailUtils = [];

    cloneKey && Object.keys(cloneKey).forEach((key, index) => {
      let cloneDetailUtil = detailRoomUtils.find((item, index) => {
        return item.key == cloneKey[key];
      })
      if (cloneDetailUtil) detailUtils.push(cloneDetailUtil)
    })

    maxList = detailUtils.length;
    setS(detailUtils.length)
    return detailUtils;
  }

  const convertDetailUtil = (array, initSlice = 0, upperSlice = array.length / 2) => {
    if (array.length <= 4) return array;
    return array.slice(initSlice, upperSlice);
  }

  const converDetailComments = (comments, initSlice = 0, upperSlice = 10) => {
    //comments <= 10 => rtn;
    // comments > 10 => 1 times more = 10 comments
    //vd: 63 comments => 6 times more, du 3
    //maxcomment = comments.slice(0, 9)
    //maxcomment = comments.slice(10, 21) 
    //=> check(maxcomments.l + 4(du) == comments.l) 
    //? comments.slice(maxcomments.l + 1, comments.l); 
    //: comments.slice(maxcomments.l, maxcomments.l + 9);
    //maxcomment = comments.slice(22, 32)
    //maxcomment = comments.slice(33, 43)
    //maxcomment = comments.slice(44, 54)
    //maxcomment = comments.slice(55, 64)
    if (comments.length <= 10) return comments;
    return comments.slice(initSlice, upperSlice);
  }

  const calculateDaysDifference = () => {
    const startDate = value?.start?.getTime();
    const endDate = value?.end?.getTime();
    const timeDifference = endDate - startDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24); // Chuyển đổi từ milliseconds sang ngày
    return daysDifference;
  };


  const images = [1, 2, 3, 4, 5];

  const onLoadMore = () => {
    if (list.length + 3 > s) {
      return;
    };
    let upCount = count + 3;
    let cloneKey = detailRoom && Object.keys(detailRoom).filter((key, index) => {
      return detailRoom[key] == true;
    })
    setList(
      list.concat(convertDetailUtil(funcT(cloneKey), count, upCount))
    );
  };


  const loadMoreComments = () => {
    if (maxComments.length <= 9) {
      return;
    }
    let du = comments.length % 10;
    let upCount = maxComments.length + 9;
    console.log({ up: upCount, maxComments })

    // if (maxComments.length + du >= comments.length) {
    //   console.log('du')
    //   setmaxComments(
    //     maxComments.concat(converDetailComments(comments, maxComments.length, comments.length))
    //   )
    // } else {
    // }
    setmaxComments(
      maxComments.concat(converDetailComments(comments, maxComments.length, upCount)) //maxComments.length + 1 
    )
  }

  const calTotalPrice = (price, days) => {
    return price * days;
  }

  const loadMore = <button className="detailroom-btn" onClick={onLoadMore}>loading more</button>
  const loadMoreCommentsBtn = <button className="detailroom-comments-btn" onClick={loadMoreComments}>Xem thêm bình luận</button>

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
            <div className="detailroom-desc-more">
              <p>Một số thông tin đã được dịch tự động. <a>Hiển thị ngôn ngữ gốc</a> </p>
              <p>Nhà nghỉ thôn dã hình lưỡi liềm trong một ngôi làng nghệ thuật gốm hai nghìn năm. Một ngôi nhà nguyên khối lớn với sân thượng ba tầng của Bảo tàng Văn hóa Guitar Serra, nổi tiếng với mặt tiền đặc sắc trong một ngôi làng nghệ thuật gốm hai nghìn năm pha trộn rất tốt với thiên nhiên.</p>
              <p>Tận hưởng kỳ nghỉ dưỡng sức cảm xúc thư giãn trong một căn phòng ấm cúng, chào...</p>
              <a href="#">Hiển thị thêm</a>
            </div>
            <div className="detailroom-desc-utils">
              <p>Nơi này có những gì cho bạn</p>
              <div className="detailroom-desc-utils-child">
                {
                  <List
                    className="detailroom-desc-utils-child-list"
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={(item) => (
                      <List.Item className="detailroom-desc-utils-child-list-item">
                        <div>
                          {item.icon} - {item.text}
                        </div>
                      </List.Item>
                    )}
                  />
                }
              </div>
            </div>
          </div>
          <div className="detailroom__desc-booking">
            <div className="detailroom-booking__wrapper">
              <div className="detailroom-booking__heading">
                <p> $80 <span>/đêm</span> </p>
              </div>
              <div className="date-section">
                <DateRangePicker className="datePicker" startDateInput={CustomStartDate} endDateInput={CustomEndDate} value={value} onChange={handleChange} />
                <div className="customerChoose">
                  <p>Khach</p>
                  <div className="">
                    <button onClick={() => handleChangeCustomer(-1)}>-</button>
                    <span>{khach}</span>
                    <button onClick={() => handleChangeCustomer(1)}>+</button>
                  </div>
                </div>
              </div>
              <div className="detailroom-booking__btn-section">
                <button className="detailroom-booking__btnbooking">Đặt phòng</button>
              </div>
              <div className="detailroom-booking__total-section">
                <div className="detailroom-booking__totalprice">
                  <p> $<span>{detailRoom.giaTien}</span> x <span>${value && calculateDaysDifference()}</span> đêm</p>
                  <p>${value && calTotalPrice(detailRoom.giaTien, calculateDaysDifference())}</p>
                </div>
                <div className="detailroom-booking__totalfee">
                  <p>Phí dịch vụ</p>
                  <p>0$</p>
                </div>
              </div>
              <div className="detailroom-booking__totalbeforetax">
                <p>Tổng trước thuế</p>
                <p>${value && calTotalPrice(detailRoom.giaTien, calculateDaysDifference())}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="detailroom__comments">
          <h1> <span>{comments.length}</span> đánh giá</h1>
          <List
            className="detailroom__comments-list"
            itemLayout="horizontal"
            loadMore={loadMoreCommentsBtn}
            dataSource={maxComments}
            renderItem={(item) => (
              <List.Item className="detailroom__comments-item">
                <div className="commentItem__wrapper">
                  <div className="commentItem__heading">
                    <img src={item.avatar} alt="" width={50} height={50} />
                    <div>
                      <h3>{item.tenNguoiBinhLuan}</h3>
                      <p>{item.ngayBinhLuan}</p>
                    </div>
                  </div>
                  <div className="commentItem__body">
                    <p>{item.noiDung}</p>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  );
}
