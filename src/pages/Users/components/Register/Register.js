import React, { memo, useEffect, useRef } from "react";
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
import {
  usePostNewUserMutation,
  usePutNewUserMutation,
} from "../../mutation/userMutation";
import { dateFormat } from "../../../../utils/constants/dateFormat";

let { Option } = Select;
let defaultDate = dayjs();

const Register = ({ open, setOpen, userEdit, refetchUsers }) => {
  const [formRegister] = Form.useForm();
  const { mutate: postUser } = usePostNewUserMutation(defaultDate.valueOf());
  const { mutate: putUser } = usePutNewUserMutation(defaultDate.valueOf());

  /* */
  useEffect(() => {
    formRegister.setFieldsValue({
      id: userEdit.id || 0,
      name: userEdit?.name,
      password: userEdit?.password,
      confirm: userEdit?.password,
      email: userEdit?.email,
      phone: userEdit?.phone,
      gender: userEdit?.gender ? true : false,
      role: userEdit?.role,
      birthday: dayjs(userEdit?.birthday),
    });
  }, [userEdit]);

  const handleSubmit = async (data) => {
    let newUser = {
      ...data,
      birthday: dayjs(data.birthday).format(dateFormat),
    };

    // Post || Put user
    newUser.id === 0
      ? postUser(newUser, {
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

            formRegister.setFieldsValue({ id: 0, birthday: defaultDate });
            refetchUsers();
            // Clode Modal
            setOpen(false);
          },
          onError: (err) => {
            message.error(`Failed to add the user `);
          },
        })
      : putUser(newUser, {
          onSuccess: (ress) => {
            /* Render Message in here */
            message.success("Update User Successfully");

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

            formRegister.setFieldsValue({ id: 0, birthday: defaultDate });
            refetchUsers();
            // Clode Modal
            setOpen(false);
          },
          onError: (err) => {
            message.error(`Failed to update the user `);
          },
        });
  };

  const handleCancel = () => {
    setOpen(false);
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
    formRegister.setFieldValue("id", 0);
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
          onClick={() => formRegister.submit()}
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
        Register Administrator
      </h3>
      {/* Form */}
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
                      new Error(
                        "The new password that you entered do not match!"
                      )
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
                <Option value="ADMIN">Admin</Option>
                <Option disabled value="USER">
                  User
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default memo(Register);

