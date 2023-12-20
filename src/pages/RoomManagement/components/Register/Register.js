import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Modal,
  Input,
  InputNumber,
  Form,
  message,
  Checkbox,
  Row,
  Col,
  Select,
} from "antd";
import {
  usePostNewRoomMutation,
  usePutNewRoomMutation,
} from "../../mutation/roomManagementMutation";

const Register = ({ open, setOpen, roomEdit, refetchRooms, dataLocations }) => {
  const [formRoom] = Form.useForm();
  const { mutate: postRoom } = usePostNewRoomMutation();
  const { mutate: putRoom } = usePutNewRoomMutation();

  const [groupCheck, setGroupCheck] = useState({
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
  });

  /* */
  useEffect(() => {
    if (typeof roomEdit !== undefined && open) {
      formRoom.setFieldsValue({
        id: roomEdit.id || 0,
        maViTri: roomEdit?.maViTri,
        tenPhong: roomEdit?.tenPhong,
        khach: roomEdit?.khach,
        phongNgu: roomEdit?.phongNgu,
        giuong: roomEdit?.giuong,
        phongTam: roomEdit?.phongTam,
        giaTien: roomEdit?.giaTien,
        hinhAnh: roomEdit?.hinhAnh,
        moTa: roomEdit?.moTa,
      });
      setGroupCheck({
        mayGiat: roomEdit?.mayGiat,
        banLa: roomEdit?.banLa,
        tivi: roomEdit?.tivi,
        dieuHoa: roomEdit?.dieuHoa,
        wifi: roomEdit?.wifi,
        bep: roomEdit?.bep,
        doXe: roomEdit?.doXe,
        hoBoi: roomEdit?.hoBoi,
        banUi: roomEdit?.banUi,
      });
    }
  }, [open]);

  const handleSubmit = async (data) => {
    let newRoom = { ...data, ...groupCheck };

    // Post || Put Room
    newRoom.id === 0
      ? postRoom(newRoom, {
          onSuccess: () => {
            /* Render Message in here */
            message.success("Add New Room Successfully");
            // Clear Form
            formRoom.resetFields();
            formRoom.setFieldValue("id", 0);
            setGroupCheck({
              mayGiat: false,
              banLa: false,
              tivi: false,
              dieuHoa: false,
              wifi: false,
              bep: false,
              doXe: false,
              hoBoi: false,
              banUi: false,
            });
            refetchRooms();
            // Clode Modal
            setOpen(false);
          },
          onError: () => {
            message.error(`Failed to add the room `);
          },
        })
      : putRoom(newRoom, {
          onSuccess: (ress) => {
            /* Render Message in here */
            message.success("Update Room Successfully");
            // Clear Form
            formRoom.resetFields();
            formRoom.setFieldValue("id", 0);
            setGroupCheck({
              mayGiat: false,
              banLa: false,
              tivi: false,
              dieuHoa: false,
              wifi: false,
              bep: false,
              doXe: false,
              hoBoi: false,
              banUi: false,
            });
            refetchRooms();
            // Clode Modal
            setOpen(false);
          },
          onError: (_) => {
            message.error(`Failed to update the room `);
          },
        });
  };

  const handleCancel = () => {
    setOpen(false);
    // Clear Form
    formRoom.resetFields();
    formRoom.setFieldValue("id", 0);
    setGroupCheck({
      mayGiat: false,
      banLa: false,
      tivi: false,
      dieuHoa: false,
      wifi: false,
      bep: false,
      doXe: false,
      hoBoi: false,
      banUi: false,
    });
  };

  const handleCheck = (event) => {
    let checkbox = event.target;

    setGroupCheck({
      ...groupCheck,
      [checkbox.name]: checkbox.checked,
    });
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
          onClick={() => formRoom.submit()}
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
      <h3 className="text-center font-semibold text-xl">Register New room</h3>
      {/* Form */}
      <Form
        id="formRoom"
        form={formRoom}
        className="mx-auto"
        onFinish={handleSubmit}
        layout="vertical"
        style={{ minWidth: "250px", maxWidth: "400px" }}
      >
        {/* id */}
        <Form.Item initialValue={0} name="id">
          <Input className="hidden" disabled />
        </Form.Item>

        {/* ten Phong */}
        <Form.Item
          name="tenPhong"
          label="Name : "
          rules={[
            {
              required: true,
              message: "Invalid value entered",
            },
          ]}
        >
          <Input
            addonBefore={<i className="fa-regular fa-address-card mr-1"></i>}
            type="text"
          />
        </Form.Item>

        <Row>
          <Col span={12} className="pr-1">
            {/* Khach */}
            <Form.Item
              name="khach"
              label="Guests "
              rules={[
                {
                  required: true,
                  message: "Invalid value entered",
                },
              ]}
            >
              <InputNumber
                min={1}
                addonBefore={<i className="fa-solid fa-users"></i>}
                type="text"
              />
            </Form.Item>
          </Col>

          <Col span={12} className="pl-1">
            {/* Phong Ngu */}
            <Form.Item
              name="phongNgu"
              label="Bedrooms	: "
              rules={[
                {
                  required: true,
                  message: "Invalid value entered",
                },
              ]}
            >
              <InputNumber
                min={1}
                addonBefore={<i className="fa-solid fa-person-shelter"></i>}
                type="text"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12} className="pr-1">
            {/* Giuong */}
            <Form.Item
              name="giuong"
              label="Bed : "
              rules={[
                {
                  required: true,
                  message: "Invalid value entered",
                },
              ]}
            >
              <InputNumber
                min={1}
                addonBefore={<i className="fa-solid fa-bed"></i>}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="pl-1">
            {/* Gia */}
            <Form.Item
              name="giaTien"
              label="Price : "
              rules={[
                {
                  required: true,
                  message: "Invalid value entered",
                },
              ]}
            >
              <InputNumber
                prefix="$"
                min={0}
                addonBefore={<i className="fa-solid fa-money-check-dollar"></i>}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12} className="pr-1">
            {/* Phong Tam */}
            <Form.Item
              name="phongTam"
              label="Bathrooms : "
              rules={[
                {
                  required: true,
                  message: "Invalid value entered",
                },
              ]}
            >
              <InputNumber
                min={0}
                addonBefore={<i className="fa-solid fa-bath"></i>}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="pl-1">
            {/* maViTri */}
            <Form.Item
              name="maViTri"
              label="Locations : "
              rules={[
                {
                  required: true,
                  message: "Invalid value entered",
                },
              ]}
            >
              <Select
                placeholder="Search to Select"
                // prefixCls={<i className="fa-solid fa-bath"></i>}
                options={dataLocations}
              ></Select>
            </Form.Item>
          </Col>
        </Row>

        {/* hinhAnh */}
        <Form.Item
          name="hinhAnh"
          label="Photo : "
          rules={[
            {
              required: true,
              message: "Invalid value entered",
            },
          ]}
        >
          <Input
            min={1}
            addonBefore={<i className="fa-regular fa-image"></i>}
            type="text"
          />
        </Form.Item>

        {/* Group Icons */}
        <div className="md:gap-y-1 h-12 py-1 grid grid-rows-2  grid-flow-col">
          {/* mayGiat */}
          <Checkbox
            checked={groupCheck.mayGiat}
            name="mayGiat"
            onChange={(e) => handleCheck(e)}
          >
            <i className="fa-solid fa-socks"></i>
          </Checkbox>

          {/* banLa */}
          <Checkbox
            checked={groupCheck.banLa}
            name="banLa"
            onChange={(e) => handleCheck(e)}
          >
            <i className="fa-solid fa-person-dots-from-line"></i>
          </Checkbox>

          {/* tivi */}
          <Checkbox
            checked={groupCheck.tivi}
            name="tivi"
            onChange={(e) => handleCheck(e)}
          >
            <i className="fa-solid fa-tv"></i>
          </Checkbox>

          {/* dieuHoa */}
          <Checkbox
            checked={groupCheck.dieuHoa}
            name="dieuHoa"
            onChange={(e) => handleCheck(e)}
          >
            <i className="fa-solid fa-temperature-low"></i>
          </Checkbox>

          {/* wifi */}
          <Checkbox
            checked={groupCheck.wifi}
            name="wifi"
            onChange={(e) => handleCheck(e)}
          >
            <i className="fa-solid fa-wifi"></i>
          </Checkbox>

          {/* bep */}
          <Checkbox
            checked={groupCheck.bep}
            name="bep"
            onChange={(e) => handleCheck(e)}
          >
            <i className="fa-solid fa-kitchen-set"></i>
          </Checkbox>

          {/* doXe */}
          <Checkbox
            checked={groupCheck.doXe}
            name="doXe"
            onChange={(e) => handleCheck(e)}
          >
            <i className="fa-solid fa-car-rear"></i>
          </Checkbox>

          {/* hoBoi */}
          <Checkbox
            checked={groupCheck.hoBoi}
            name="hoBoi"
            onChange={(e) => handleCheck(e)}
          >
            <i className="fa-solid fa-person-swimming"></i>
          </Checkbox>
        </div>

        {/* moTA */}
        <Form.Item name="moTa" label="Descriptons : ">
          <Input.TextArea
            showCount
            autoSize={{
              minRows: 6,
            }}
            placeholder="max Length is 200"
            maxLength={300}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default memo(Register);
