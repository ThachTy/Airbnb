import React, { memo, useEffect, useRef } from "react";
import { Button, Modal, Input, Form, Select, Row, Col, message } from "antd";
import dayjs from "dayjs";
import {
  usePostNewLocationMutation,
  usePutNewLocationMutation,
} from "../../mutation/locationsMutation";
import { dateFormat } from "../../../../utils/constants/dateFormat";

const Register = ({ open, setOpen, locationEdit, refetchLocations }) => {
  const [formLocation] = Form.useForm();
  const { mutate: postUser } = usePostNewLocationMutation();
  const { mutate: putUser } = usePutNewLocationMutation();

  /* */
  useEffect(() => {
    if (locationEdit.id !== undefined)
      formLocation.setFieldsValue({
        id: locationEdit.id || 0,
        tenViTri: locationEdit?.tenViTri,
        tinhThanh: locationEdit?.tinhThanh,
        quocGia: locationEdit?.quocGia,
        hinhAnh: locationEdit?.hinhAnh,
      });
  }, [locationEdit]);

  const handleSubmit = async (data) => {
    let newLocation = {
      ...data,
      birthday: dayjs(data.birthday).format(dateFormat),
    };

    // Post || Put user
    newLocation.id === 0
      ? postUser(newLocation, {
          onSuccess: (ress) => {
            /* Render Message in here */
            message.success("Add New Location Successfully");

            // Clear Form
            formLocation.resetFields([
              "tenViTri",
              "tinhThanh",
              "quocGia",
              "hinhAnh",
            ]);
            formLocation.setFieldValue("id", 0);

            refetchLocations();
            // Clode Modal
            setOpen(false);
          },
          onError: (err) => {
            message.error(`Failed to add the user `);
          },
        })
      : putUser(newLocation, {
          onSuccess: (ress) => {
            /* Render Message in here */
            message.success("Update Location Successfully");

            // Clear Form
            formLocation.resetFields([
              "tenViTri",
              "tinhThanh",
              "quocGia",
              "hinhAnh",
            ]);
            formLocation.setFieldValue("id", 0);

            refetchLocations();
            // Clode Modal
            setOpen(false);
          },
          onError: (err) => {
            message.error(`Failed to update the location `);
          },
        });
  };

  const handleCancel = () => {
    setOpen(false);
    // Clear Form
    formLocation.resetFields(["tenViTri", "tinhThanh", "quocGia", "hinhAnh"]);
    formLocation.setFieldValue("id", 0);
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
          onClick={() => formLocation.submit()}
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
        Register New Location
      </h3>
      {/* Form */}
      <Form
        id="formLocation"
        form={formLocation}
        className="mx-auto"
        onFinish={handleSubmit}
        layout="vertical"
        style={{ minWidth: "250px", maxWidth: "400px" }}
      >
        {/* id */}
        <Form.Item initialValue={0} name="id">
          <Input className="hidden" type="text" disabled />
        </Form.Item>

        {/* Name */}
        <Form.Item
          name="tenViTri"
          label="Name : "
          rules={[
            {
              required: true,
              message: "Please input your Name of the location",
            },
          ]}
        >
          <Input
            addonBefore={<i className="fa-regular fa-address-card mr-1"></i>}
            type="text"
          />
        </Form.Item>

        {/* TinhThanh */}
        <Form.Item
          name="tinhThanh"
          label="City"
          rules={[{ required: true, message: "Please input your City!" }]}
        >
          <Input
            addonBefore={<i className="fa-regular fa-address-card mr-1"></i>}
            type="text"
          />
        </Form.Item>

        {/* Quoc Gia */}
        <Form.Item
          name="quocGia"
          label="Country : "
          rules={[{ required: true, message: "Please input your Country!" }]}
        >
          <Input
            addonBefore={
              <i className="fa-solid fa-envelope-circle-check mr-1"></i>
            }
          />
        </Form.Item>

        {/* hinhAnh */}
        <Form.Item name="hinhAnh" label="Image">
          <Input
            addonBefore={
              <i className="fa-solid fa-envelope-circle-check mr-1"></i>
            }
            type="text"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default memo(Register);
