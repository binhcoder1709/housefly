import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faL } from "@fortawesome/free-solid-svg-icons";
import {
  storage,
  database,
  firestore,
} from "../../firebase/firebase.config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { set, ref as dbref } from "firebase/database";
import { v4 } from "uuid";
import { useState } from "react";
import formatDate from "../../utils/formatDate.js";

export default function UploadMusic() {
  // set state cho các input
  const [musicName, setMusicName] = useState("");
  const [musicAuthor, setMusicAuthor] = useState("");
  const [musicURL, setMusicURL] = useState("");
  const [musicImageURL, setMusicImageURL] = useState(null);
  // state khi việc upload của các dữ liệu được upload xong
  const [uploadImageSuccess, setUploadImageSuccess] = useState(false);
  const [uploadMusicSuccess, setUploadMusicSuccess] = useState(false);
  // state khi việc upload được hoàn thành của nút tải lên
  const [uploadSuccess, setUploadSuccess] = useState(false);
  useEffect(() => {
    setUploadSuccess(uploadMusicSuccess && uploadImageSuccess && musicName != 0 && musicAuthor != 0);
  }, [uploadMusicSuccess, uploadImageSuccess, musicName, musicAuthor]);
  // hàm tải tên bài hát
  const handleMusicNameChange = (e) => {
    // musicName = e.target.value;
    const newMusicName = e.target.value;
    setMusicName(newMusicName);
  };
  //hảm tải tên tác giả
  const handleAuthorChange = (e) => {
    const musicAuthor = e.target.value;
    setMusicAuthor(musicAuthor);
  };
  // hàm tải nhạc
  const handleMusicChange = async (e) => {
    const file = e.target.files[0];

    // Lấy kích thước của file (trong MB)
    const fileSizeMB = file.size / (1024 * 1024);
    console.log("Total file size:", fileSizeMB.toFixed(2), "MB");

    // Tạo tham chiếu đến Firebase Storage
    const storageRef = ref(storage, `musics/${file.name}`);

    // Tải file lên Firebase Storage
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        // Tải lên thành công
        setUploadMusicSuccess(true);

        // Tiếp tục xử lý
        getDownloadURL(storageRef).then((url) => {
          setMusicURL(url);
        });
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Đã xảy ra lỗi khi upload:", error);
      });
  };
  // hàm tải ảnh
  const handleMusicImageChange = async (e) => {
    const file = e.target.files[0];

    // Tạo tham chiếu đến Firebase Storage
    const storageRef = ref(storage, `music_images/${file.name}`);

    // Tải ảnh lên Firebase Storage
    await uploadBytes(storageRef, file).then((snapshot) => {
      URL.createObjectURL(file);
      setUploadImageSuccess(true);
      // Lấy đường dẫn tới ảnh đã tải lên
      getDownloadURL(storageRef).then((url) => {
        setMusicImageURL(url);
      });
    });
  };
  // xử lí khi mà tất cả dữ liệu được upload thành công

  // sự kiện submit
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, "musics"), {
        musicName: musicName,
        musicAuthor: musicAuthor,
        musicImage: musicImageURL,
        musicSource: musicURL,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      <div className="uploads-container flex flex-col items-center gap-2 p-3">
        <h1>Tải nhạc lên trang cá nhân</h1>
        <div className="w-full h-[2px] bg-[#00ff00]"></div>
        <form action="" onSubmit={submitForm} className="flex flex-col gap-2">
          <div className="avatar flex flex-col items-center">
            <img
              className="w-[100px] h-[100px] rounded-full object-cover"
              src={musicImageURL}
              alt=""
            />
            <label htmlFor="uploadImage" className="cursor-pointer text-3xl">
              <FontAwesomeIcon icon={faCloudArrowUp} />
            </label>
            <input
              id="uploadImage"
              className="hidden"
              type="file"
              onChange={handleMusicImageChange}
            />
          </div>
          <div>
            <label htmlFor="musicName">Tên bài hát</label>
            <input
              className="capitalize block p-2 w-[500px] bg-transparent outline-none border-b-[#00ff00] border-b-2 text-white"
              type="text"
              id="musicName"
              onChange={handleMusicNameChange}
            />
          </div>
          <div>
            <label htmlFor="author">Tác giả</label>
            <input
              className="block p-2 w-[500px] bg-transparent outline-none border-b-[#00ff00] border-b-2 text-white"
              type="text"
              id="author"
              onChange={handleAuthorChange}
            />
          </div>
          <div className="flex items-center gap-1">
            <div className="flex gap-1 items-center border-2 border-white p-1 rounded-md">
              <label htmlFor="uploadMusic" className="cursor-pointer">
                File bài hát
              </label>
              <input
                id="uploadMusic"
                type="file"
                className="text-white cursor-pointer"
                onChange={handleMusicChange}
              />
            </div>
            {uploadMusicSuccess ? (
              <img
                className="w-[30px] h-[30px]"
                src="https://img.icons8.com/color/48/ok--v1.png"
                alt="ok--v1"
              />
            ) : (
              ""
            )}
          </div>
          <div>
            {uploadSuccess ? (
              <button
                type="submit"
                className="cursor-pointer p-1 bg-[#00ff00] w-[100px] rounded-md text-black"
              >
                Tải lên
              </button>
            ) : (
              <button
                type="submit"
                className="cursor-not-allowed p-1 bg-gray-500 w-[100px] rounded-md text-black"
              >
                Tải lên
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
