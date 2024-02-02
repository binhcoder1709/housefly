import React, { useState } from "react";
import HeaderLogin from "./HeaderLogin.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { firestore } from "../../../firebase/firebase.config.js";
import { getDocs, collection } from "firebase/firestore";
export default function Login() {
  const navigate = useNavigate();
  // set state cho thông báo đăng ký thành công
  const [notiSuccess, setNotiSuccess] = useState(false);
  const [notiFailed, setNotiFailed] = useState(false);
  // hàm validate form đăng nhập
  const formik = useFormik({
    initialValues: {
      // Khởi tạo giá trị ban đầu của các trường trong biểu mẫu
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      // Sử dụng Yup để định nghĩa quy tắc kiểm tra
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string().required("Vui lòng nhập password"),
    }),
    onSubmit: async (values) => {
      // lấy dữ liệu từ database
      const querySnapshot = await getDocs(collection(firestore, "users"));
      querySnapshot.forEach((doc) => {
        const user = doc.data().email == values.email && doc.data().password == values.password && doc.data().role == "user";
        const admin = doc.data().email == values.email && doc.data().password == values.password && doc.data().role == "admin";
        if(user)
        {
          const user = {
            userId: doc.id,
            ...doc.data(),
          }
          localStorage.setItem("userLogin", JSON.stringify(user));
          setNotiSuccess(!notiSuccess);
          setTimeout(() =>
          {
            navigate("/");
          }, 2000);
        }
        if(admin)
        {
          const admin = {
            userId: doc.id,
            ...doc.data(),
          }
          localStorage.setItem("adminLogin", JSON.stringify(admin));
          setNotiSuccess(!notiSuccess);
          setTimeout(() =>
          {
            navigate("/Admin");
          }, 2000);
        }
      });
    },
  });
  return (
    <>
      <div>
        <HeaderLogin />
        <div className="login-container mt-[70px] gap-2 w-full h-[calc(100vh-70px)] flex flex-col justify-center items-center">
          <h1 className="text-[#00ff00] text-3xl">Đăng nhập</h1>
          <form
            action=""
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 p-[20px] w-[500px] bg-[#060442]"
          >
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                className="bg-transparent outline-none border-b-2 border-b-white w-full p-[10px] text-white"
                placeholder="Nhập email..."
                id="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                className="bg-transparent outline-none border-b-2 border-b-white w-full p-[10px] text-white"
                placeholder="••••••••"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                id="password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="flex justify-between">
              <div>
                <Link className="hover:text-[#00ff00] transition">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="flex">
                <input type="checkbox" id="rememberInfo" />
                <label htmlFor="rememberInfo">
                  Ghi nhớ thông tin đăng nhập
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full text-[#060442] p-[10px] rounded-md cursor-pointer hover:bg-[#060442] hover:border-white border-2 border-transparent transition hover:text-[#00ff00] bg-[#00ff00]"
              >
                Đăng nhập
              </button>
            </div>
            {notiFailed ? (
              <span className="text-red-600 text-sm">Email hoặc mật khẩu không đúng!</span>
            ) : ""}
            <span className="text-red-600"></span>
            <span className="text-center">hoặc</span>
            <div className="flex justify-center gap-3">
              <button className="hover:border-white hover:text-[#00ff00] transition p-[5px] rounded-md border-2 border-transparent">
                <FontAwesomeIcon icon={faGoogle} /> Đăng nhập bằng Google
              </button>
              <button className="hover:border-white hover:text-[#00ff00] transition p-[5px] rounded-md border-2 border-transparent">
                <FontAwesomeIcon icon={faFacebook} /> Đăng nhập bằng Google
              </button>
            </div>
          </form>
        </div>
        {notiSuccess ? (
          <div className="absolute top-12 animate-pulse right-[10px] bg-[#00ff00] p-2 text-center w-[210px]">
            <span>
              <FontAwesomeIcon icon={faCheck} /> Đăng nhập thành công
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
