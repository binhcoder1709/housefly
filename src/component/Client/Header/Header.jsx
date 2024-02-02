import {
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from "../../../firebase/firebase.config";
import { getDocs, collection } from "firebase/firestore";
export default function Header() {
  // useNavigate()
  const navigate = useNavigate(); 
  // đọc dữ liệu từ firestore
  useEffect(() => {
    const readMusicData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "musics"));
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.data().musicName}`);
      });
    };
    readMusicData();
  }, []);
  // lấy dữ liệu từ localstorage
  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin"));
  // set trạng thái dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // sự kiện toggle click bút mở dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // tìm kiếm
  const handleSearchChange = (e) => {};
  // sự kiện đăng xuất
  const toggleLogout = () => {
    localStorage.removeItem("userLogin");
    navigate("/");
    location.reload();
  };
  return (
    <>
      <header className="w-full h-[90px] bg-black flex items-center justify-between pl-5 pr-5">
        <div className="search-area">
          <button
            type="button"
            className="text-white bg-[#020030] p-[15px] rounded-l-3xl"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type="text"
            id="searchInput"
            onChange={handleSearchChange}
            className="w-[500px] p-[15px] outline-none rounded-r-3xl pr-5 bg-[#020030] text-white"
            placeholder="Tìm kiếm bài hát, album, DJ yêu thích"
          />
        </div>
        <div className="login-area flex gap-2">
          {userLoginLocal ? (
            <>
              <div>
                <span
                  onClick={toggleDropdown}
                  className="bg-[#00ff00] cursor-pointer p-1 rounded-xl text-black flex justify-center items-center gap-2"
                >
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={userLoginLocal.avatar}
                    alt=""
                  />
                  {userLoginLocal.userName}{" "}
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
                {isDropdownOpen && (
                  <>
                    <div className="flex flex-col absolute bg-white p-1 rounded-lg z-10">
                      <Link
                        to="/User"
                        className="text-black p-2 hover:bg-black hover:text-white rounded-md transition-all"
                      >
                        Thông tin cá nhân
                      </Link>
                      <Link
                        to="/Uploads"
                        className="text-black p-2 hover:bg-black hover:text-white rounded-md transition-all"
                      >
                        Tải lên
                      </Link>
                      <Link className="text-black p-2 hover:bg-black hover:text-white rounded-md transition-all">
                        Nạp VIP
                      </Link>
                      <button
                        onClick={toggleLogout}
                        type="button"
                        className="text-black text-start p-2 hover:bg-black hover:text-white rounded-md transition-all"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <a
                href="/Register"
                className="text-[#00ff00] border-[#00ff00] border-2 p-[7px] bg-black hover:bg-[#00ff00] transition hover:text-black rounded-3xl"
              >
                Đăng ký
              </a>
              <a
                href="/Login"
                className="text-[#02004f] p-[7px] bg-[#00ff00] rounded-3xl hover:bg-[#02004f] hover:text-[#00ff00] transition"
              >
                Đăng nhập
              </a>
            </>
          )}
        </div>
      </header>
    </>
  );
}
