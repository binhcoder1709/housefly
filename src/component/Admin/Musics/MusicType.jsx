import React, { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore } from "../../../firebase/firebase.config";
import { addDoc, getDocs, collection } from "firebase/firestore";
import formatDate from "../../../utils/formatDate";

export default function MusicType() {
  // state cho input nhập dữ liệu tên thể loại
  const [inputTypeName, setInputTypeName] = useState("");
  // state cho nút submit khi tất cả các thông tin trong form đã được thêm
  const [formSuccess, setFormSuccess] = useState(false);
  // state cho dữ liệu thể loại
  const [musicTypeData, setMusicTypeData] = useState([]);
  // state cho form
  const [form, setForm] = useState(false);
  // hàm mở form
  const handleOpenForm = () => {
    setForm(true);
  };
  // hàm đóng form
  const handleCloseForm = () => {
    setForm(false);
  };
  // hàm nhập dữ liệu ô input
  const handleTypeNameChange = (e) => {
    setInputTypeName(e.target.value);
  };
  // sự kiện thay đổi trạng thái của nút submit khi tất cả dữ liệu được thêm thành công
  useEffect(() => {
    setFormSuccess(inputTypeName != "");
  }, [inputTypeName]);
  // hàm submit form và đẩy dữ liệu lên database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, "musicTypes"), {
        typeName: inputTypeName,
        createdDate: formatDate(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  // hàm đọc dữ liệu từ database
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "musicTypes"));
      const musicTypeDocuments = [];
      querySnapshot.forEach((doc) => {
        musicTypeDocuments.push({ id: doc.id, ...doc.data() });
      });
      setMusicTypeData(musicTypeDocuments);
    };
    fetchData();
  }, [musicTypeData]);
  return (
    <>
      <div className="flex flex-col justify-end gap-1">
        <button
          type="button"
          className="text-black bg-[#00ff00] p-1 w-[100px] self-end rounded-md"
          onClick={handleOpenForm}
        >
          Thêm thể loại
        </button>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên thể loại</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {musicTypeData.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.typeName}</td>
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
            <h1>Thêm thể loại</h1>
            <button
              type="button"
              className="relative left-[600px] bg-white text-black w-[40px] h-[40px] rounded-md"
              onClick={handleCloseForm}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="w-full h-[2px] bg-[#00ff00]"></div>
          <div className="flex justify-center items-center w-full h-screen">
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex justify-center items-center flex-col gap-2"
            >
              <div>
                <label htmlFor="typeName">Tên thể loại</label>
                <input
                  className="capitalize block p-2 w-[500px] bg-transparent outline-none border-b-[#00ff00] border-b-2 text-white"
                  type="text"
                  onChange={handleTypeNameChange}
                  id="typeName"
                />
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
        </div>
      )}
    </>
  );
}
