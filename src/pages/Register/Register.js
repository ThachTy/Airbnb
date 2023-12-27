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
    <Form
      id="formRegister"
      form={formRegister}
      className="mx-auto"
      onFinish={handleSubmit}
      layout="vertical"
      style={{ minWidth: "250px", maxWidth: "400px" }}
    >
      {/* id */}
      <Form.Item name="id">
        <Input className="hidden" type="text" disabled />
      </Form.Item>
      {/* Name */}
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input your Name",
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
            label="Password : "
            rules={[
              {
                required: true,
                message: "Please input your password!",
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
            label="Confirm Password : "
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
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
          { required: true, message: "Please input your Email!" },
          { type: "email", message: "The input is not valid E-mail!" },
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
            label="Phone Number : "
            rules={[
              {
                pattern:
                  /\+?\d{1,4}?[-.\s]?\(?\d{1}?\)?[-.\s]?\d{1,3}[-.\s]?\d{1,3}[-.\s]?\d{1,3}/g,
                message: "The input is not valid Phone!",
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
            label="Birthday : "
            rules={[
              {
                type: "object",
                required: true,
                message: "Please select date!",
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
            label="Gender : "
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select
              menuItemSelectedIcon={<i className="fa-solid fa-check"></i>}
              placeholder="select your gender"
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
            label="Role : "
            rules={[
              {
                required: true,
                message: "Please select role!",
              },
            ]}
          >
            <Select
              menuItemSelectedIcon={<i className="fa-solid fa-check"></i>}
              placeholder="select your role"
            >
              {/* <Option value="ADMIN">Admin</Option> */}
              <Option value="USER">User</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Button
        className="my-2"
        onClick={() => formRegister.submit()}
        htmlType="submit"
      >
        Register
      </Button>
    </Form>
  );
};

export default RegisterUser;
