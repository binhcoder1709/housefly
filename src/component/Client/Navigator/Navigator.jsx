import React from 'react'
import Logo from '../../../assets/imgs/1.png'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faGear, faCompactDisc, faMusic, faRankingStar } from '@fortawesome/free-solid-svg-icons';
export default function Navigator() {
  return (
    <>
      <nav className="navigator w-full h-[calc(100vh-80px)] flex flex-col pl-[10px] pr-[10px] justify-around bg-[#02004f]">
          <img src={Logo} alt="" />
          <div className="nav-bar flex flex-col gap-5">
            <NavLink to="/" className="p-[10px] w-full text-center text-white rounded-md"><FontAwesomeIcon icon={faHome} /> Trang chủ</NavLink>
            <NavLink to="/BXH" className="p-[10px] w-full text-white text-center rounded-md"><FontAwesomeIcon icon={faRankingStar}/> Bảng xếp hạng</NavLink>
            <NavLink to="/Library" className="p-[10px] w-full text-white text-center rounded-md"><FontAwesomeIcon icon={faMusic}/> Thư viện</NavLink>
          </div>
          <div className="setting-bar flex">
            <NavLink to="/Settings" className="p-[10px] w-full text-white text-center rounded-md"><FontAwesomeIcon icon={faGear}/> Cài đặt</NavLink>
          </div>
      </nav>
    </>
  )
}
