import React, { useState, useEffect } from "react";
import { faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore, storage } from "../../../firebase/firebase.config.js";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import formatDate from "../../../utils/formatDate.js";

export default function MusicSinger() {
  // state cho form
  const [form, setForm] = useState(false);
  // state chứa url của ảnh sau khi upload thành công
  const [authorImage, setAuthorImage] = useState(null);
  // state chứa dữ liệu của input
  const [authorNameInput, setAuthorNameInput] = useState("");
  // state chứa dữ liệu của select
  const [musicTypeSelect, setMusicTypeSelect] = useState(null);
  // state chứa dữ liệu về thể loại
  const [musicTypeData, setMusicTypeData] = useState([]);
  // state chứa dữ liệu về DJ/Producer
  const [authorData, setAuthorData] = useState([]);
  // state cho nút submit khi tất cả dữ liệu đã sẵn sàng
  const [formSuccess, setFormSuccess] = useState(false);
  // thay đổi trạng thái của nút submit
  useEffect(() => {
    setFormSuccess(
      authorImage != null && authorNameInput != "" && musicTypeSelect != null
    );
  }, [authorImage, authorNameInput, musicTypeSelect]);
  // hàm mở form
  const handleOpenForm = () => {
    setForm(true);
  };
  // hàm đóng form
  const handleCloseForm = () => {
    setForm(false);
  };
  // hàm lấy dữ liệu thay đổi từ input
  const handleInputChange = (e) => {
    setAuthorNameInput(e.target.value);
  };
  // hàm lấy dữ liệu thể loại từ select option
  const handleSelectMusicType = (e) => {
    setMusicTypeSelect(e.target.value);
  };
  // hàm lấy dữ liệu và upload lên database từ input file ảnh
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // Tạo tham chiếu đến Firebase Storage
    const storageRef = ref(storage, `author_avatar/${file.name}`);

    // Tải ảnh lên Firebase Storage
    await uploadBytes(storageRef, file).then((snapshot) => {
      URL.createObjectURL(file);

      // Lấy đường dẫn tới ảnh đã tải lên
      getDownloadURL(storageRef).then((url) => {
        setAuthorImage(url);
      });
    });
  };

  // đọc dữ liệu về thể loại và DJ/Producer từ database
  useEffect(() => {
    const fetchData = async () => {
      const musicTypeSnapshot = await getDocs(
        collection(firestore, "musicTypes")
      );
      const authorSnapshot = await getDocs(collection(firestore, "authors"));
      const musicTypeDocuments = [];
      const authorsDocuments = [];
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
  }, [musicTypeData, authorData]);
  // ghi dữ liệu về DJ/Producer lên database (hàm submit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, "authors"), {
        authorName: authorNameInput,
        authorImage: authorImage,
        authorMusicType: musicTypeSelect,
        createdDate: formatDate(),
      });
      setForm(false);
      setAuthorImage(null);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-end gap-1">
        <button
          type="button"
          onClick={handleOpenForm}
          className="text-black bg-[#00ff00] p-1 w-[150px] self-end rounded-md"
        >
          Thêm DJ/Producer
        </button>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Hình ảnh</th>
              <th>Tên DJ/Producer</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {authorData.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td><img className="w-[50px] h-[50px] object-cover" src={item.authorImage} alt="" /></td>
                <td>{item.authorName}</td>
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
      </div>
      {form && (
        <div
          style={{ background: "rgba(0, 0, 0, 0.9)" }}
          className="uploads-container w-full h-screen fixed top-0 left-0 flex flex-col items-center gap-2 p-3"
        >
          <div className="flex ">
            <h1>Thêm DJ/Producer</h1>
            <button
              type="button"
              onClick={handleCloseForm}
              className="relative left-[600px] bg-white text-black w-[40px] h-[40px] rounded-md"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="w-full h-[2px] bg-[#00ff00]"></div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >
            <div className="avatar flex flex-col items-center">
              <img
                className="w-[100px] h-[100px] rounded-full object-cover"
                src={authorImage}
                alt=""
              />
              <label htmlFor="uploadImage" className="cursor-pointer text-3xl">
                <FontAwesomeIcon icon={faCloudArrowUp} />
              </label>
              <input
                id="uploadImage"
                className="hidden"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <label htmlFor="musicName">Tên DJ/Producer</label>
              <input
                className="capitalize block p-2 w-[500px] bg-transparent outline-none border-b-[#00ff00] border-b-2 text-white"
                type="text"
                id="musicName"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="type">Thể loại</label>
              <select
                name=""
                id=""
                onChange={handleSelectMusicType}
                className="p-2 bg-gray-500 outline-none rounded-md"
              >
                <option value={null}>Thể loại</option>
                {musicTypeData.map((item) => (
                  <option value={item.id}>{item.typeName}</option>
                ))}
              </select>
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
                  Thêm
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}
