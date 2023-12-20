import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Upload, Collapse, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { message } from "antd";
/* */
import avatar from "../../assets/image/AvatarUser.png";
import "./ProfilesUser.scss";
import { useGetProfilesUserById } from "./query/profilesUser";
import {
  usePutNewUserMutation,
  usePostAvavtarUser,
} from "../Users/mutation/userMutation";

export default function ProfilesUser() {
  const { idUser } = useParams();
  const [isEdit, setIsEdit] = useState(true);
  const newProfilesRef = useRef({});
  const [profiles, setProfiles] = useState({});

  /* Query */
  const { data } = useGetProfilesUserById(idUser);

  /* Mutation */
  const { data: dataProfiles, mutate } = usePutNewUserMutation(idUser);

  const { data: dataAvatar, mutate: updateAvatar } = usePostAvavtarUser();

  console.log(dataAvatar);

  useEffect(() => {
    data?.data?.content && setProfiles(data?.data?.content);
  }, [data]);

  const beforeUpload = async (file) => {
    // post new Avart in here...

    updateAvatar(file);
    return false;
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChangeProfiles = (event) => {
    if (event.target.value === "") return;

    newProfilesRef.current = {
      ...profiles,
      ...newProfilesRef.current,
      [event.target.name]: event.target.value,
    };
  };

  const handleChangeGender = (event) => {
    if (event.target.value === "") return;

    let gender = event.target.value === "male" ? true : false;

    newProfilesRef.current = {
      ...profiles,
      ...newProfilesRef.current,
      [event.target.name]: gender,
    };
  };

  const handleChangeBirthday = (_, dateString) => {
    if (dateString === "") return;

    newProfilesRef.current = {
      ...profiles,
      ...newProfilesRef.current,
      birthday: dateString,
    };
  };

  const handleUpdateProfiles = () => {
    //  newProfilesRef is empty
    if (!Object.hasOwn(newProfilesRef.current, "id")) {
      return;
    }

    mutate(newProfilesRef.current);
    // When updated successfull!
    message.open({ type: "success", content: "Done!" }) && setIsEdit(true);

    //  Error
    dataProfiles?.response?.data?.statusCode === 400 &&
      message.open({ type: "error", content: "Failed" });
    // Reset
    newProfilesRef.current = {};
  };

  return (
    <section
      id="profiles"
      className="min-w-full h-content flex flex-col md:flex-grow lg:flex-row "
    >
      {/* Left */}
      <div className="profiles-left h-full mt-6 px-2 py-4 min-w-[100%] lg:min-w-[350px] flex flex-col justify-start items-center">
        <div className="profile-image w-[130px] h-[130px] rounded-[100%] overflow-hidden mb-2">
          <img
            className="object-cover w-full h-full"
            src={profiles?.avatar ? profiles?.avatar : avatar}
            alrt="avatar"
          />
        </div>
        <Upload.Dragger
          action={""}
          name="avatar"
          accept=".png,.jpg"
          maxCount={1}
          showUploadList={true}
          beforeUpload={beforeUpload}
          iconRender={() => <span className="text-green-600">123</span>}
          onPreview={() => {
            message.open({ type: "loading", content: "Event Upload" });
          }}
          className="btn-editAvatar block mb-3"
        >
          <UploadOutlined className="mr-1" />
          <span className="hover:underline">Update avatar</span>
        </Upload.Dragger>

        <div className="flex flex-row justify-center items-center mb-4">
          <div className="checked-icon mx-2">
            <img
              className="w-full h-full object-cover"
              src="https://cdn1.iconfinder.com/data/icons/security-4/32/shield-checkmark-512.png"
              alt="check"
            />
          </div>
          <h4 className="font-semibold pl-2 text-xl w-full md:w-[50%] lg:w-[50%] ">
            Identity verification
          </h4>
        </div>
        <p className="checked-text max-w-[250px] w-[200px] text-center mb-4">
          Verify your identity with an identity verification badge.
        </p>
        <button className="btn-badge mb-4" type="button">
          Get a badge
        </button>
        <footer>
          <h4 className="mb-3">Verified</h4>
          <ul>
            <li>Email address</li>
          </ul>
        </footer>
      </div>

      {/* Right */}
      <div className="profile-right min-w-[100%] lg:min-w-[calc(100%-350px)]  mt-6 px-5 py-4">
        <div className="px-4 sm:px-0 mb-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Applicant Information
          </h3>

          <div className="flex flex-row justify-between items-center">
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details and application.
            </p>
            <div className="controls flex flex-row flex-nowrap">
              <button
                onClick={handleEdit}
                className={(isEdit ? "btn-color" : "") + " btn-save mr-1 "}
                type="button"
              >
                {isEdit ? "Edit" : "Cancel"}
              </button>
              <button
                onClick={handleUpdateProfiles}
                disabled={isEdit}
                className={(!isEdit ? "btn-color" : "") + " btn-save mr-1 "}
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <dl className="divide-y">
          {/* Required information */}
          <div className="info-required px-4 py-3 flex flex-col md:flex-col lg:flex-row   ">
            <p className="title ">Required information</p>
            <div className="w-full t-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 lg:pl-4">
              <form className="w-full">
                <div className="form-group flex flex-col">
                  <label htmlFor="name" className="label">
                    <i className="fa-regular fa-address-card mr-1"></i>
                    Account :
                  </label>
                  <input
                    onKeyUp={(event) => handleChangeProfiles(event)}
                    defaultValue={profiles?.name}
                    disabled={isEdit}
                    name="name"
                    className="form-controls"
                    type="text"
                  />
                </div>
                <div className="form-group flex flex-col">
                  <label htmlFor="email" className="label">
                    <i className="fa-solid fa-envelope-circle-check mr-1"></i>
                    Email :
                  </label>
                  <input
                    onKeyUp={(event) => handleChangeProfiles(event)}
                    disabled={isEdit}
                    defaultValue={profiles?.email}
                    className="form-controls"
                    name="email"
                    type="text"
                  />
                </div>

                <div className="form-group flex flex-col">
                  <label className="label">
                    <i className="fa-solid fa-lock mr-1"></i>
                    Password :
                  </label>
                  <input
                    onKeyUp={(event) => handleChangeProfiles(event)}
                    disabled={isEdit}
                    defaultValue={profiles?.password}
                    className="form-controls"
                    name="password"
                    type="text"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Basic Infomation */}
          <div className="info py-3 sm:px-0">
            <dd className="mt-1 selection:leading-6 ">
              <Collapse style={{ width: "100%" }} className="w-full">
                <Collapse.Panel
                  className=" w-full"
                  key={"Basic Information"}
                  header={<span className="title">Bacsic Information</span>}
                >
                  {/* Phone , Gender, Birthday */}
                  <form>
                    <div className="form-group flex flex-col">
                      <label className="label" htmlFor="phone">
                        <i className="fa-solid fa-mobile-screen-button mr-1"></i>
                        Phone :
                      </label>
                      <input
                        onKeyUp={(event) => handleChangeProfiles(event)}
                        defaultValue={profiles?.phone}
                        disabled={isEdit}
                        className="form-controls"
                        name="phone"
                        type="text"
                      />
                    </div>
                    <div className="form-group flex flex-col">
                      <label className="label" htmlFor="gender">
                        <i className="fa-solid fa-people-arrows mr-1"></i>
                        Gender :
                      </label>
                      <select
                        onChange={(event) => handleChangeGender(event)}
                        defaultValue={profiles?.gender}
                        disabled={isEdit}
                        name="gender"
                        className="form-controls"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="form-group flex flex-col">
                      <label className="label" htmlFor="birthday">
                        <i className="fa-solid fa-cake-candles mr-1"></i>
                        Birthday :
                      </label>
                      <DatePicker
                        onChange={handleChangeBirthday}
                        defaultValue={dayjs(profiles?.birthday)}
                        disabled={isEdit}
                        name="birthday"
                        format={"DD/MM/YYYY"}
                        className="form-controls"
                      />
                    </div>
                  </form>
                </Collapse.Panel>
              </Collapse>
            </dd>
          </div>

          {/* About me */}
          <div className="info py-3 sm:px-0">
            <dd className="mt-1 selection:leading-6 ">
              <Collapse style={{ width: "100%" }} className="w-full">
                <Collapse.Panel
                  className="w-full "
                  key={"about"}
                  header={<span className="title">About me</span>}
                >
                  <p className="text-[#727272]">
                    “My hobbies are reading books and working out. Along with
                    this, I also like cooking. While researching the company, I
                    got to know about the in-house gym. Having a gym in the
                    workplace is a great idea as employees can get to know each
                    other better on a casual level apart from their designated
                    roles.“
                  </p>
                </Collapse.Panel>
              </Collapse>
            </dd>
          </div>
          {/* Social Affairs Information */}
          <div className="info py-3 sm:px-0">
            <dd className="mt-1 selection:leading-6 ">
              <Collapse className="w-full">
                <Collapse.Panel
                  className="w-full"
                  key={"1"}
                  header={
                    <span className="title">Social Affairs Information</span>
                  }
                >
                  {/* Facebook , Twitter, Whatsapp */}
                  <form>
                    <div className="form-group flex flex-col">
                      <label className="label">
                        <i className="fa-brands fa-meta mr-1"></i>
                        Facebook :{" "}
                      </label>

                      {isEdit && (
                        <a
                          className="text-gray-500 leading-[1.5rem] pl-[0.5rem]"
                          target="_blank"
                          href="https://www.facebook.com/"
                        >
                          https://www.facebook.com/
                        </a>
                      )}
                      {!isEdit && (
                        <input
                          disabled={isEdit}
                          className="form-controls"
                          type="text"
                          placeholder="https://www.facebook.com/"
                        />
                      )}
                    </div>
                    <div className="form-group flex flex-col">
                      <label className="label">
                        <i className="fa-brands fa-twitter mr-1"></i>
                        Twitter :
                      </label>
                      {isEdit && (
                        <a
                          className="text-gray-500 leading-[1.5rem] pl-[0.5rem]"
                          target="_blank"
                          href="https://twitter.com/"
                        >
                          https://twitter.com/
                        </a>
                      )}
                      {!isEdit && (
                        <input
                          disabled={isEdit}
                          className="form-controls"
                          type="text"
                          placeholder="https://twitter.com/"
                        />
                      )}
                    </div>
                    <div className="form-group flex flex-col">
                      <label className="label">
                        <i className="fa-brands fa-square-whatsapp mr-1"></i>
                        Whatsapp:
                      </label>
                      {isEdit && (
                        <a
                          className="text-gray-500 leading-[1.5rem] pl-[0.5rem]"
                          target="_blank"
                          href="https://web.whatsapp.com/"
                        >
                          https://web.whatsapp.com/
                        </a>
                      )}
                      {!isEdit && (
                        <input
                          disabled={isEdit}
                          className="form-controls"
                          type="text"
                          placeholder="https://web.whatsapp.com/"
                        />
                      )}
                    </div>
                  </form>
                </Collapse.Panel>
              </Collapse>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
