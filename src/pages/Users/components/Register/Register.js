import React, { memo, useEffect } from "react";
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

let { Option } = Select;
let dateFormat = "DD/MM/YYYY";
let defaultDate = dayjs();

const Register = ({ open, setOpen, userEdit }) => {
  const [formRegister] = Form.useForm();
  const { data: dataPost, mutate: postUser } = usePostNewUserMutation();
  const { data: dataPut, mutate: putUser } = usePutNewUserMutation();

  /* */
  useEffect(() => {
    formRegister.setFieldsValue({
      id: userEdit.id || 0,
      name: userEdit.name,
      password: userEdit.password,
      confirm: userEdit.password,
      email: userEdit.email,
      phone: userEdit.phone,
      gender: userEdit.gender ? true : false,
      role: userEdit.role,
      birthday: dayjs(userEdit?.birthday),
    });
  }, [userEdit]);

  const handleSubmit = async (data) => {
    try {
      let newUser = {
        ...data,
        birthday: dayjs(data.birthday).format(dateFormat),
      };

      // Post || Put user
      newUser.id === 0 ? postUser(newUser) : putUser(newUser);

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
      /* Render Message in here */
      // isSuccess
      if (dataPut?.status === 200 || dataPost?.status === 200)
        message.open({ type: "success", content: "Successfully added users!" });

      // isError
      let errorMessage =
        dataPost?.response?.data.content || dataPut?.response?.data.content;
      if (dataPost?.response !== undefined || dataPut?.response !== undefined)
        message.open({ type: "error", content: errorMessage });

      // Clode Modal
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
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
    formRegister.setFieldsValue({ id: 0, birthday: defaultDate });
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
        <Form.Item name="id" rules={[]}>
          <Input className="hidden" type="text" disabled />
        </Form.Item>
        {/* Name */}
        <Form.Item name="name" label="Name" rules={[]}>
          <Input type="text" />
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
              <Input.Password />
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
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        {/* Email */}
        <Form.Item name="email" label="Email : " rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Row>
          <Col className="w-[50%] pr-1">
            {/* Phone */}
            <Form.Item
              name="phone"
              label="Phone Number : "
              rules={
                [
                  // {
                  //   required: true,
                  //   message: "Please input your phone number!",
                  // },
                ]
              }
            >
              <Input />
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
              <DatePicker style={{ width: "100%" }} format={dateFormat} />
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
              <Select defaultDate={true} placeholder="select your gender">
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
              <Select defaultValue={"ADMIN"} placeholder="select your role">
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
