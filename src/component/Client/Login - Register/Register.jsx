import React, { useState } from "react";
import HeaderLogin from "./HeaderLogin.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { firestore } from "../../../firebase/firebase.config.js";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import formatDate from "../../../utils/formatDate.js";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function Register() {
  const navigate = useNavigate();
  const [notiSuccess, setNotiSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      reEnPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Vui lòng nhập tên").max(8, "Tối đa 8 ký tự"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string()
        .required("Vui lòng nhập password")
        .min(8, "Mật khẩu tối thiểu 8 ký tự"),
      reEnPassword: Yup.string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
    }),
    onSubmit: async (values) => {
      // gửi thông tin từ form đăng ký lên database
      try {
        const docRef = await addDoc(collection(firestore, "users"), {
          userName: values.userName,
          email: values.email,
          password: values.password,
          role: "user",
          status: 1,
          vip: 0,
          avatar: "https://firebasestorage.googleapis.com/v0/b/music-fly3.appspot.com/o/avatar_default%2Favatar-trang-4.jpg?alt=media&token=0302df0b-b72d-4b67-8f44-4f4498b8243d",
          createdDate: formatDate(),
        });
      
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setNotiSuccess(!notiSuccess);
      setTimeout(() =>
      {
        navigate("/Login");
      }, 2000)
    },
  });

  return (
    <>
      <div className="w-full">
        <HeaderLogin />
        <div className="login-container mt-[70px] gap-2 w-full h-[calc(100vh-70px)] flex flex-col justify-center items-center">
          <h1 className="text-[#00ff00] text-3xl">Đăng ký</h1>
          <form
            action=""
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 p-[20px] w-[500px] bg-[#060442]"
          >
            <div>
              <label htmlFor="userName">Tên hiển thị</label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                name="userName"
                className="bg-transparent outline-none border-b-2 border-b-white w-full p-[10px] text-white capitalize"
                placeholder="Nhập tên..."
                id="userName"
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div className="text-red-600">{formik.errors.userName}</div>
              ) : null}
            </div>
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
            <div>
              <label htmlFor="reEnPassword">Nhập lại mật khẩu</label>
              <input
                type="password"
                className="bg-transparent outline-none border-b-2 border-b-white w-full p-[10px] text-white"
                placeholder="••••••••"
                name="reEnPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.reEnPassword}
                id="reEnPassword"
              />
              {formik.touched.reEnPassword && formik.errors.reEnPassword ? (
                <div className="text-red-600">{formik.errors.reEnPassword}</div>
              ) : null}
            </div>
            <div className="flex self-end gap-1">
              <span>Đã có tài khoản?</span>
              <Link
                to="/Login"
                className="text-[#00ff00] hover:text-white transition"
              >
                Đăng nhập ngay
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="w-full text-[#060442] p-[10px] rounded-md cursor-pointer hover:bg-[#060442] hover:border-white border-2 border-transparent transition hover:text-[#00ff00] bg-[#00ff00]"
              >
                Đăng ký
              </button>
            </div>
            <span className="text-center">hoặc</span>
            <div className="flex justify-center gap-3">
              <button className="hover:border-white hover:text-[#00ff00] transition p-[5px] rounded-md border-2 border-transparent">
                <FontAwesomeIcon icon={faGoogle} /> Đăng ký bằng Google
              </button>
              <button className="hover:border-white hover:text-[#00ff00] transition p-[5px] rounded-md border-2 border-transparent">
                <FontAwesomeIcon icon={faFacebook} /> Đăng ký bằng Google
              </button>
            </div>
          </form>
        </div>
        {notiSuccess ? (
          <div className="absolute top-12 animate-pulse right-[10px] bg-[#00ff00] p-2 text-center w-[200px]">
            <span>
              <FontAwesomeIcon icon={faCheck} /> Đăng ký thành công
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

