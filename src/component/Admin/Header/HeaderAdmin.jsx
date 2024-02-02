import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom';

export default function HeaderAdmin() {
    // lấy dữ liệu admin từ local
    const adminLocal = JSON.parse(localStorage.getItem("adminLogin"));
  return (
    <>
        <div className='w-full bg-gray-400 h-[60px] flex justify-between items-center pr-[15px] pl-[15px]'>
            <button type="button" className='text-black'><FontAwesomeIcon icon={faBars}/></button>
            <div>
                <div className='flex items-center gap-1 cursor-pointer hover:bg-slate-200 p-1 rounded-md transition-all'>
                <img src={adminLocal.avatar} className='w-[40px] h-[40px] rounded-full' alt="" />
                <span className='text-black'>{adminLocal.userName}</span>
                <FontAwesomeIcon icon={faChevronDown}/>
                </div>
                <div className='absolute header-admin-dropdown hidden flex-col bg-slate-500 p-1 rounded-md mt-1'>
                    <Link>Thông tin cá nhân</Link>
                    <Link>Đổi mật khẩu</Link>
                    <Link>Đăng xuất</Link>
                </div>
            </div>
        </div>
    </>
  )
}
