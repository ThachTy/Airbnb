import React, { memo, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  Input,
  InputNumber,
  Form,
  Select,
  message,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import {
  usePostNewBookingMutation,
  usePutNewBookingMutation,
} from "../../mutation/bookingMutation";
import { dateFormat } from "../../../../utils/constants/dateFormat";

// {
//   "id": 0,
//   "maPhong": 0,
//   "ngayDen": "2023-12-17T15:10:19.636Z",
//   "ngayDi": "2023-12-17T15:10:19.637Z",
//   "soLuongKhach": 0,
//   "maNguoiDung": 0
// }

const Register = ({ open, setOpen, bookingEdit, refetchBookings }) => {
  const [formBooking] = Form.useForm();
  const { mutate: postUser } = usePostNewBookingMutation();
  const { mutate: putUser } = usePutNewBookingMutation();

  /* */
  useEffect(() => {
    if (bookingEdit.id !== undefined)
      formBooking.setFieldsValue({
        id: bookingEdit.id || 0,
        maNguoiDung: bookingEdit?.maNguoiDung,
        maPhong: bookingEdit?.maPhong,
        ngayDen: dayjs(bookingEdit?.ngayDen),
        ngayDi: dayjs(bookingEdit?.ngayDi),
        soLuongKhach: bookingEdit?.soLuongKhach,
      });
  }, [bookingEdit]);

  const handleSubmit = async (data) => {
    let newBooking = {
      ...data,
      birthday: dayjs(data.birthday),
    };

    // Post || Put user
    newBooking.id === 0
      ? postUser(newBooking, {
          onSuccess: (ress) => {
            /* Render Message in here */
            message.success("Add New Booking Successfully");

            // Clear Form
            formBooking.setFieldValue("id", 0);
            formBooking.resetFields(["maNguoiDung", "maPhong"]);
            formBooking.setFieldValue("soLuongKhach", 1);
            formBooking.setFieldValue("ngayDen", new dayjs());
            formBooking.setFieldValue("ngayDi", new dayjs());

            refetchBookings();
            // Clode Modal
            setOpen(false);
          },
          onError: (err) => {
            message.error(`Failed to add the booking `);
          },
        })
      : putUser(newBooking, {
          onSuccess: (ress) => {
            /* Render Message in here */
            message.success("Update Booking Successfully");

            // Clear Form
            formBooking.setFieldValue("id", 0);
            formBooking.resetFields(["maNguoiDung", "maPhong"]);
            formBooking.setFieldValue("soLuongKhach", 1);
            formBooking.setFieldValue("ngayDen", new dayjs());
            formBooking.setFieldValue("ngayDi", new dayjs());

            refetchBookings();
            // Clode Modal
            setOpen(false);
          },
          onError: (err) => {
            message.error(`Failed to update the booking `);
          },
        });
  };

  const handleCancel = () => {
    setOpen(false);
    // Clear Form
    formBooking.setFieldValue("id", 0);
    formBooking.resetFields(["maNguoiDung", "maPhong"]);
    formBooking.setFieldValue("soLuongKhach", 1);
    formBooking.setFieldValue("ngayDen", new dayjs());
    formBooking.setFieldValue("ngayDi", new dayjs());
  };

  return (
    <Modal
      forceRender
      open={open}
      okText="Submit"
      onCancel={handleCancel}
      keyboard
      footer={[
        <Button
          onClick={() => formBooking.submit()}
          key="btnRegister"
          htmlType="submit"
        >
          Submit
        </Button>,
        <Button onClick={handleCancel} key="btnCancel" htmlType="button">
          Cancel
        </Button>,
      ]}
    >
      <h3 className="text-center font-semibold text-xl">
        Register New Booking
      </h3>
      {/* Form */}
      <Form
        id="formBooking"
        form={formBooking}
        className="mx-auto"
        onFinish={handleSubmit}
        layout="vertical"
        style={{ minWidth: "250px", maxWidth: "400px" }}
      >
        {/* id */}
        <Form.Item initialValue={0} name="id">
          <Input className="hidden" disabled />
        </Form.Item>

        {/* Ma Nguoi Dung */}
        <Form.Item
          name="maNguoiDung"
          label="User Code : "
          rules={[
            {
              required: true,
              message: "Please input your User Code",
            },
          ]}
        >
          <InputNumber
            min={0}
            addonBefore={<i className="fa-regular fa-address-card mr-1"></i>}
            type="number"
          />
        </Form.Item>

        {/* Ma Phong */}
        <Form.Item
          name="maPhong"
          label="Room code"
          rules={[
            {
              required: true,
              message: "Please input your Room code",
            },
          ]}
        >
          <InputNumber
            min={0}
            addonBefore={<i className="fa-solid fa-house-user"></i>}
            type="text"
          />
        </Form.Item>

        {/* So Luong Khach */}
        <Form.Item
          name="soLuongKhach"
          label="Number of guests	"
          rules={[
            {
              required: true,
              message: "Please input your  Number of guests",
            },
          ]}
        >
          <InputNumber
            min={1}
            addonBefore={<i className="fa-solid fa-bed"></i>}
            type="text"
          />
        </Form.Item>

        {/* Ngay Den */}
        <Form.Item
          name="ngayDen"
          label="Arrival date : "
          rules={[
            { required: true, message: "Please input your Arrival date!" },
          ]}
        >
          <DatePicker
            suffixIcon={<i className="fa-solid fa-right-to-bracket"></i>}
            format={dateFormat}
          ></DatePicker>
        </Form.Item>
        {/* Ngay Di */}
        <Form.Item
          name="ngayDi"
          label="Departure date"
          rules={[
            { required: true, message: "Please input your Departure date!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("ngayDen") < value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The Departure date isn't valid!")
                );
              },
            }),
          ]}
        >
          <DatePicker
            suffixIcon={<i className="fa-solid fa-right-from-bracket"></i>}
            format={dateFormat}
          ></DatePicker>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default memo(Register);
