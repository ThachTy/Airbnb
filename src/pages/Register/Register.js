import React, { useState } from "react";
import {
  Button,
  Modal,
  Input,
  DatePicker,
  Form,
  Select,
  Row,
  Col,
  message,
} from "antd";
import dayjs from "dayjs";
import { usePostNewUserMutation } from "../Users/mutation/userMutation";
import { dateFormat } from "../../utils/constants/dateFormat";
import "./style/register.css";
let { Option } = Select;
let defaultDate = dayjs();
// {
//   "id": 0,
//   "name": "string",
//   "email": "string",
//   "password": "string",
//   "phone": "string",
//   "birthday": "string",
//   "gender": true,
//   "role": "string"
// }

const RegisterUser = () => {
  const [formRegister] = Form.useForm();
  const { mutate: postUser } = usePostNewUserMutation(defaultDate.valueOf());

  const handleSubmit = async (data) => {
    let newUser = {
      ...data,
      id: 0,
      birthday: dayjs(data.birthday).format(dateFormat),
    };

    // Post || Put user
    postUser(newUser, {
      onSuccess: (ress) => {
        /* Render Message in here */
        message.success("Add User Successfully");

        // Clear Form
        formRegister.resetFields([
          "name",
          "password",
          "confirm",
          "email",
          "phone",
          "gender",
          "role",
        ]);

        formRegister.setFieldsValue({ birthday: defaultDate });
      },
      onError: (err) => {
        message.error(`Failed to add the user `);
      },
    });
  };

  return (
    <main id="register">
      <div className="register__content">
        <h3 className="heading">Đăng Ký </h3>
        <Form
          id="formRegister"
          form={formRegister}
          className="register__form mx-auto"
          onFinish={handleSubmit}
          layout="vertical"
        >
          {/* id */}
          <Form.Item name="id" className="hidden">
            <Input type="text" disabled />
          </Form.Item>
          {/* Name */}
          <Form.Item
            name="name"
            label="Họ Tên :"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ tên",
              },
            ]}
          >
            <Input
              addonBefore={<i className="fa-regular fa-address-card mr-1"></i>}
              type="text"
            />
          </Form.Item>
          <Row>
            <Col className="pr-1 w-[50%]">
              {/* Password */}
              <Form.Item
                name="password"
                label="Mật khẩu : "
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  addonBefore={<i className="fa-solid fa-lock mr-1"></i>}
                />
              </Form.Item>
            </Col>
            {/* Confirm Password */}
            <Col className="pl-1 w-[50%]">
              <Form.Item
                name="confirm"
                label="Nhập lại mật khẩu : "
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận lại mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu không trùng nhau!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  addonBefore={<i className="fa-solid fa-lock mr-1"></i>}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* Email */}
          <Form.Item
            name="email"
            label="Email : "
            rules={[
              { required: true, message: "Vui lòng nhập E-mail!" },
              { type: "email", message: "E-mail không hợp lệ!" },
            ]}
          >
            <Input
              addonBefore={
                <i className="fa-solid fa-envelope-circle-check mr-1"></i>
              }
            />
          </Form.Item>
          <Row>
            <Col className="w-[50%] pr-1">
              {/* Phone */}
              <Form.Item
                name="phone"
                label="Số Điện Thoại : "
                rules={[
                  {
                    pattern:
                      /\+?\d{1,4}?[-.\s]?\(?\d{1}?\)?[-.\s]?\d{1,3}[-.\s]?\d{1,3}[-.\s]?\d{1,3}/g,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input
                  addonBefore={
                    <i className="fa-solid fa-mobile-screen-button mr-1"></i>
                  }
                />
              </Form.Item>
            </Col>
            <Col className="w-[50%] pl-1">
              {/* Birthday */}
              <Form.Item
                name="birthday"
                label="Ngày Sinh : "
                rules={[
                  {
                    type: "object",
                    required: true,
                    message: "Định dang sai 31/01/1990!",
                  },
                ]}
              >
                <DatePicker
                  suffixIcon={<i className="fa-solid fa-cake-candles mr-1"></i>}
                  style={{ width: "100%" }}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col className="w-[50%] pr-1">
              {/* Gender */}
              <Form.Item
                name="gender"
                label="Giới Tính : "
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn giới tính!",
                  },
                ]}
              >
                <Select
                  menuItemSelectedIcon={<i className="fa-solid fa-check"></i>}
                  placeholder="Chọn..."
                >
                  <Option value={true}>Male</Option>
                  <Option value={false}>Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className="w-[50%] pl-1">
              {/* Role */}
              <Form.Item
                name="role"
                label="Loại Người Dùng : "
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn!",
                  },
                ]}
              >
                <Select
                  menuItemSelectedIcon={<i className="fa-solid fa-check"></i>}
                  placeholder="Chọn..."
                >
                  {/* <Option value="ADMIN">Admin</Option> */}
                  <Option value="USER">User</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Button
            className="btn-register"
            onClick={() => formRegister.submit()}
            htmlType="submit"
          >
            Đăng Ký
          </Button>
        </Form>
      </div>
    </main>
  );
};

export default RegisterUser;
