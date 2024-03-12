import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { userAction } from "../../redux/reducers/userReducer";
import { usersApi } from "../../services/usersServices";
import { saveUserFromLocalStorage } from "../../utils/localStorage";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, formState } = useForm({
    defaultValue: { email: "", password: "" },
    mode: "onTouched",
  });
  const { errors } = formState;
  const [account, setAccount] = useState({ email: "", password: "" });

  useEffect(() => {
    if (getUserFromLocalStorage()) {
      let { user } = getUserFromLocalStorage();
      // setAccount({ email: user.email, password: user.password });
    }
  }, []);

  const onFinish = (values) => {
    usersApi
      .login(values)
      .then((res) => {
        let { user, token } = res;
        saveUserFromLocalStorage({ id: user.id, token: token });
        dispatch(userAction({ user: {}, stateUser: { isLogin: true } }));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section id="login">
      <h2 className="login-heading">ĐĂNG NHẬP</h2>
      <form onSubmit={handleSubmit(onFinish)} className="form-signin">
        <div className="row">
          <label htmlFor="email" className="label">
            Email :
          </label>
          <input
            className="input"
            id="email"
            placeholder="Email..."
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "Email không được bỏ trống",
              },
            })}
          />
          {errors.email && <span className="mess">{errors.email.message}</span>}
        </div>
        <div className="row">
          <label htmlFor="pass" className="label">
            Password :
          </label>
          <input
            id="pass"
            placeholder={"Password..."}
            className="input"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Mật khẩu không được bỏ trống",
              },
              minLength: {
                value: 6,
                message: "Mật khẩu phải từ 6 ký tự trở lên",
              },
            })}
          />
          {errors.password && (
            <span className="mess">
              {errors.password && errors.password.message}
            </span>
          )}
        </div>
        <div className="row">
          <button className="btn-signin">Đăng Nhập</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
