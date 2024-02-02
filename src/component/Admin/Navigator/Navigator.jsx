import React from "react";
import { NavLink } from "react-router-dom";
import LogoAdmin from "../../../assets/imgs/housefly-admin.png";

export default function Navigator() {
  return (
    <>
      <div className="navigator-admin w-full bg-black h-screen">
        <div>
          <img src={LogoAdmin} alt="" />
        </div>
        <div className="gap-1 flex flex-col items-center">
          <NavLink to="/Admin" end>
            Trang chủ
          </NavLink>
          <NavLink to="Account">Quản lý tài khoản</NavLink>
          <NavLink to="Music">Quản lí bài hát</NavLink>
          <NavLink to="VIPAccount">Quản lí VIP</NavLink>
        </div>
      </div>
    </>
  );
}
