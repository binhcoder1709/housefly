import React, { Component, useState } from "react";
import Navigator from "../Navigator/Navigator.jsx";
import Header from "../Header/Header.jsx";
import PlayBar from "../Playbar/PlayBar.jsx";
import LibraryNavigator from "./LibraryNavigator.jsx";
import { Outlet } from "react-router-dom";
export default function Library() {
  const [isLogined, setIsLogined] = useState(false);
  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin"));
  return (
    <>
          {userLoginLocal ? (
            <>
              <div className="library-container p-[20px]">
                <h1>Thư viện</h1>
                <div>
                  <Outlet/>
                </div>
              </div>
            </>
          ) : (
            <>
              <span className="text-center">Bạn chưa đăng nhập. Ấn vào <a href="/Login" className="text-[#00ff00]">đây</a> để đăng nhập</span>
            </>
          )}
    </>
  );
}
