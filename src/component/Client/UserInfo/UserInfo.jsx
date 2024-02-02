import React, { useState } from "react";
import Header from "../Header/Header.jsx";
import Navigator from "../Navigator/Navigator.jsx";
import PlayBar from "../Playbar/PlayBar.jsx";
import { storage, firestore } from "../../../firebase/firebase.config.js";
import {
  getDocs,
  addDoc,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
export default function UserInfo() {
  // lấy dữ liệu từ localstorage
  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin"));
  // tạo state cho hình ảnh
  const [isNewAvatar, setIsNewAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState(userLoginLocal.avatar);
  // tạo state cho trường tên người dùng
  const [valueUserName, setValueUserName] = useState(userLoginLocal.userName);
  // tạo state cho trường email
  const [valueEmail, setValueEmail] = useState(userLoginLocal.email);
  // hàm handlechange trường tên người dùng
  const handleUserNameChange = (e) => {
    setValueUserName(e.target.value);
  };
  // xử lí thay đổi hình ảnh
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    // Tạo tham chiếu đến Firebase Storage
    const storageRef = ref(storage, `avatar_users/${file.name}`);

    // Tải ảnh lên Firebase Storage
    await uploadBytes(storageRef, file).then((snapshot) => {
      setIsNewAvatar(URL.createObjectURL(file));

      // Lấy đường dẫn tới ảnh đã tải lên
      getDownloadURL(storageRef).then((url) => {
        setAvatarURL(url);
      });
    });
  };

  // xử lí hàm submitform
  const submitForm = async (e) => {
    e.preventDefault();
    const newUser = {
      ...userLoginLocal,
      avatar: avatarURL,
      userName: valueUserName,
    };
    const savetoDb = {
      avatar: avatarURL,
      userName: valueUserName,
    };
    localStorage.setItem("userLogin", JSON.stringify(newUser));
    const userDocRef = doc(firestore, "users", userLoginLocal.userId);

    // Sử dụng updateDoc để cập nhật dữ liệu
    await updateDoc(userDocRef, savetoDb)
      .then(() => {
        console.log("Dữ liệu đã được cập nhật thành công.");
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật dữ liệu:", error);
      });
    window.location.reload();
  };
  return (
    <>
      <div className="userinfo-container flex flex-col items-center gap-2 p-3">
        <h1 className="text-center">Thông tin cá nhân</h1>
        <div className="w-full h-[2px] bg-[#00ff00]"></div>
        <form action="" onSubmit={submitForm} className="flex flex-col gap-2">
          <div className="avatar flex flex-col items-center">
            <img
              className="w-[100px] h-[100px] rounded-full"
              src={isNewAvatar || avatarURL}
              alt=""
            />
            <label htmlFor="uploadImage" className="cursor-pointer text-3xl">
              <FontAwesomeIcon icon={faCloudArrowUp} />
            </label>
            <input
              id="uploadImage"
              className="hidden"
              type="file"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <label htmlFor="userName">Tên người dùng</label>
            <input
              className="block p-2 w-[500px] bg-transparent outline-none border-b-[#00ff00] border-b-2 text-white"
              type="text"
              id="userName"
              value={valueUserName}
              onChange={handleUserNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="block p-2 w-[500px] bg-transparent outline-none border-b-[#00ff00] border-b-2 cursor-not-allowed text-gray-500"
              type="text"
              id="email"
              value={valueEmail}
              disabled
            />
          </div>
          <div>
            <button
              type="submit"
              className="p-1 bg-[#00ff00] w-[100px] rounded-md text-black"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
