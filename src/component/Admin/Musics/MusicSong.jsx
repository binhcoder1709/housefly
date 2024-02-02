import { faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { firestore, storage } from "../../../firebase/firebase.config";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import formatDate from "../../../utils/formatDate";

export default function MusicSong() {
  // set state cho form thêm bài hát
  const [formActive, setFormActive] = useState(false);
  // state chứa dữ liệu đường dẫn hình ảnh bài hát
  const [musicImageURL, setMusicImageURL] = useState(null);
  // state chứa dữ liệu của input tên bài hát
  const [musicNameInput, setMusicNameInput] = useState("");
  // state chứa dữ liệu về thể loại từ select
  const [musicType, setMusicType] = useState(null);
  // state chứa dữ liệu về tác giả của bài hát từ select
  const [musicAuthor, setMusicAuthor] = useState(null);
  // state chứa dữ liệu của đường dẫn source bài hát
  const [musicURL, setMusicURL] = useState(null);
  // state chứa dữ liệu về các thể loại bài hát
  const [musicTypeData, setMusicTypeData] = useState([]);
  // state chứa dữ liệu về các DJ/Producer
  const [authorData, setAuthorData] = useState([]);
  // state chứa dữ liệu về các bài hát
  const [musicData, setMusicData] = useState([]);
  // state set trạng thái khi file source bài hát được upload thành công
  const [musicUploadSuccess, setMusicUploadSuccess] = useState(false);
  // state set trạng thái cho nút submit khi tất cả dữ liệu đã sẵn sàng
  const [formSuccess, setFormSuccess] = useState(false);
  // sự liện onclick open cho nút thêm bài hát
  const handleFormClick = () => {
    setFormActive(true);
  };
  // sự kiện onclick close cho form thêm bài hát
  const handleCloseForm = () => {
    setFormActive(false);
  };
  // hàm upload ảnh và lấy đường dẫn sau khi đã upload
  const handleUploadMusicImageChange = async (e) => {
    const file = e.target.files[0];

    // Tạo tham chiếu đến Firebase Storage
    const storageRef = ref(storage, `music_images/${file.name}`);

    // Tải ảnh lên Firebase Storage
    await uploadBytes(storageRef, file).then((snapshot) => {
      URL.createObjectURL(file);

      // Lấy đường dẫn tới ảnh đã tải lên
      getDownloadURL(storageRef).then((url) => {
        setMusicImageURL(url);
      });
    });
  };
  // hàm lấy dữ liệu từ input
  const handleInputChange = (e) => {
    setMusicNameInput(e.target.value);
  };
  // hàm lấy dữ liệu về thể loại bài hát từ select
  const handleMusicTypeSelectChange = (e) => {
    setMusicType(e.target.value);
  };
  // hàm lấy dữ liệu về tác giả bài hát từ select
  const handleMusicAuthorSelectChange = (e) => {
    setMusicAuthor(e.target.value);
  };
  // hàm upload và lấy đường dẫn source bài hát
  const handleUploadMusicChange = async (e) => {
    const file = e.target.files[0];

    // Tạo tham chiếu đến Firebase Storage
    const storageRef = ref(storage, `musics/${file.name}`);

    // Tải ảnh lên Firebase Storage
    await uploadBytes(storageRef, file).then((snapshot) => {
      URL.createObjectURL(file);
      // set trạng thái upload thành công
      setMusicUploadSuccess(true);
      // Lấy đường dẫn tới ảnh đã tải lên
      getDownloadURL(storageRef).then((url) => {
        setMusicURL(url);
      });
    });
  };
  // thay đổi trạng thái của nút submit khi tất cả các dữ liệu đã sẵn sàng
  useEffect(() => {
    setFormSuccess(
      musicImageURL != null &&
        musicNameInput != "" &&
        musicType != null &&
        musicAuthor != null &&
        musicURL != null
    );
  }, [musicImageURL, musicNameInput, musicAuthor, musicType, musicURL]);
  // lấy dữ liệu bài hát, thể loại, tác giả từ database
  useEffect(() => {
    const fetchData = async () => {
      const musicSnapshot = await getDocs(collection(firestore, "musics"));
      const musicTypeSnapshot = await getDocs(
        collection(firestore, "musicTypes")
      );
      const authorSnapshot = await getDocs(collection(firestore, "authors"));
      const musicDocuments = [];
      const authorsDocuments = [];
      const musicTypeDocuments = [];
      musicSnapshot.forEach((doc) => {
        musicDocuments.push({ id: doc.id, ...doc.data() });
      });
      setMusicData(musicDocuments);
      musicTypeSnapshot.forEach((doc) => {
        musicTypeDocuments.push({ id: doc.id, ...doc.data() });
      });
      setMusicTypeData(musicTypeDocuments);
      authorSnapshot.forEach((doc) => {
        authorsDocuments.push({ id: doc.id, ...doc.data() });
      });
      setAuthorData(authorsDocuments);
    };
    fetchData();
  }, [musicData, authorData, musicTypeData]);
  // hàm submit form và đẩy dữ liệu bài hát lên database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, "musics"), {
        musicImage: musicImageURL,
        musicName: musicNameInput,
        musicAuthor: musicAuthor,
        musicType: musicType,
        musicSource: musicURL,
        createdDate: formatDate(),
      });
      setFormActive(false);
      setMusicImageURL(null);
      setMusicUploadSuccess(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-end gap-1">
        {/* <- nút thêm bài hát */}
        <button
          type="button"
          onClick={handleFormClick}
          className="text-black bg-[#00ff00] p-1 w-[100px] self-end rounded-md"
        >
          Thêm bài hát
        </button>
        {/* nút thêm bài hát -> */}
        {/* <- bảng dữ liệu */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Hình ảnh</th>
              <th>Tên bài hát</th>
              <th>Thể loại</th>
              <th>DJ/Producer</th>
              <th>Album</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {musicData.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td className="text-center">
                  <img
                    className="w-[50px] h-[50px] object-cover"
                    src={item.musicImage}
                    alt=""
                  />
                </td>
                <td>{item.musicName}</td>
                <td>Vinahouse</td>
                <td>{item.musicAuthor}</td>
                <td>Album</td>
                <td className="">
                  <div className="flex gap-1 items-center justify-center">
                    <button type="button" className="bg-slate-400">
                      <img
                        className="w-[20px] h-[20px]"
                        src="https://img.icons8.com/ios-glyphs/30/edit--v1.png"
                        alt="edit--v1"
                      />
                    </button>
                    <button type="button" className="bg-slate-400">
                      <img
                        className="w-[20px] h-[20px]"
                        src="https://img.icons8.com/ios/50/lock--v1.png"
                        alt="lock--v1"
                      />
                    </button>
                    <button type="button" className="bg-slate-400">
                      <img
                        className="w-[20px] h-[20px]"
                        src="https://img.icons8.com/ios-glyphs/30/filled-trash.png"
                        alt="filled-trash"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* bảng dữ liệu -> */}
      </div>
      {/* <- form thêm bài hát */}
      {formActive && (
        <div
          style={{ background: "rgba(0, 0, 0, 0.9)" }}
          className="uploads-container w-full h-screen fixed top-0 left-0 flex flex-col items-center gap-2 p-3"
        >
          <div className="flex ">
            <h1>Tải nhạc lên trang cá nhân</h1>
            <button
              type="button"
              className="relative left-[550px] bg-white text-black w-[40px] h-[40px] rounded-md"
              onClick={handleCloseForm}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="w-full h-[2px] bg-[#00ff00]"></div>
          <form
            action=""
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
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
                onChange={handleUploadMusicImageChange}
              />
            </div>
            <div>
              <label htmlFor="musicName">Tên bài hát</label>
              <input
                className="capitalize block p-2 w-[500px] bg-transparent outline-none border-b-[#00ff00] border-b-2 text-white"
                type="text"
                id="musicName"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="type">Tác giả</label>
              <select
                name=""
                id=""
                className="p-2 bg-gray-500 outline-none rounded-md"
                onChange={handleMusicAuthorSelectChange}
              >
                <option value={null}>Tác giả</option>
                {authorData.map((item) => (
                  <option value={item.id}>{item.authorName}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="type">Thể loại</label>
              <select
                name=""
                id=""
                className="p-2 bg-gray-500 outline-none rounded-md"
                onChange={handleMusicTypeSelectChange}
              >
                <option value={null}>Thể loại</option>
                {musicTypeData.map((item) => (
                  <option value={item.id}>{item.typeName}</option>
                ))}
              </select>
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
                  onChange={handleUploadMusicChange}
                />
              </div>
              {musicUploadSuccess && (
                <img
                  className="w-[30px] h-[30px]"
                  src="https://img.icons8.com/color/48/ok--v1.png"
                  alt="ok--v1"
                />
              )}
            </div>
            <div>
              {formSuccess ? (
                <button
                  type="submit"
                  className="cursor-pointer p-1 bg-[#00ff00] w-[100px] rounded-md text-black"
                >
                  Thêm
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
      )}
      {/* form thêm bài hát -> */}
    </>
  );
}
