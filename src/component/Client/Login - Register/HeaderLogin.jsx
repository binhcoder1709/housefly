import React from 'react'
import Logo from '../../../assets/imgs/1.png'
import { Link } from 'react-router-dom'
export default function HeaderLogin() {
  return (
    <>
        <header className='fixed top-0 left-0 w-full flex justify-center items-center gap-6 h-[70px] bg-[#060442]'>
            <img src={Logo} className='h-full' alt="" />
            <Link to="/" className='text-[#00ff00] p-[6px] bg-black hover:bg-[#00ff00] transition hover:text-black rounded-3xl'>Trang chủ</Link>
            <Link to="/Register" className='text-[#00ff00] border-[#00ff00] border-2 p-[6px] bg-black hover:bg-[#00ff00] transition hover:text-black rounded-3xl'>Đăng ký</Link>
            <Link to="/Login" className='text-[#02004f] p-[6px] bg-[#00ff00] rounded-3xl hover:bg-[#02004f] hover:text-[#00ff00] transition'>Đăng nhập</Link>
        </header>
    </>
  )
}
