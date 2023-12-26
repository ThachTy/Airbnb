import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { login } from "../../ReduxToolkit/Slice/userSlice";
import "./Login.scss";

const onFinish = (values) => {
    console.log("Success:", values);
    userService
      .dangNhap(values)
      .then((res) => [
        console.log("user", res),
        localStorage.setItem("user", JSON.stringify(res.data)),
        dispatch(login(res.data)),
        Modal.success({
          title: "This is a success message",
          content: "Đăng nhập thành công",
        }),
        navigate("/"),
      ])
      .catch((err) => console.log(err));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState } = useForm({
    defaultValue: { email: "", password: "" },
    mode: "onTouched",
  });
  const { errors } = formState;

  const onSubmit = (values) => {
    dispatch(signin(values));
  };
  if (user) {
    alert("Đăng nhập thành công");
    const redirectUrl = searchParams.get("redirectUrl");
    // Có thông tin user => đã đăng nhập => redirect redirectUrl hoặc Home
    return <Navigate to={redirectUrl || "/"} replace />;
  }

  return (
    <div className="signin">
      <h2>ĐĂNG NHẬP</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
        <div className="form-item row">
          <label className="email  col-4">Email</label>
          <input
            placeholder="email..."
            className="input-email col-8"
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "Email không được bỏ trống",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="form-item row">
          <label className="password col-4">Password</label>
          <input
            placeholder="password..."
            className="input-password col-8"
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
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button className="btn-signin" disabled={loading}>
          Đăng Nhập
        </button>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
