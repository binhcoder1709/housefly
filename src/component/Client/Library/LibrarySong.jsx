import React, {Component} from 'react'
import Navigator from '../Navigator/Navigator.jsx'
import Header from '../Header/Header.jsx'
import PlayBar from '../Playbar/PlayBar.jsx'
import { Link, NavLink } from 'react-router-dom'
import LibraryNavigator from './LibraryNavigator.jsx'
import AvaSong from '../../../assets/imgs/thai-hoang-6-16824106562841461371481.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons'
export default class LibrarySong extends Component {
  render() {
    return (
      <>
        <div className='flex items-center justify-between p-[10px] hover:text-black rounded-md transition hover:bg-[#00ff00]'>
          <div className='flex gap-3'>
          <button type="button"><FontAwesomeIcon icon={faPlay}/></button>
          <img src={AvaSong} className='w-[50px] h-[50px] object-cover object-top' alt="" />
          <div className='flex flex-col'>
            <span className='whitespace-nowrap overflow-hidden text-ellipsis w-[900px] font-bold'>Only you ft freedom</span>
            <span className='text-sm'>Thái hoàng</span>
          </div>
          </div>
          <div className='flex items-center gap-2'>
            <span>1:00:00</span>
            <button type="button"><FontAwesomeIcon icon={faHeart}/></button>
            <button type="button"><FontAwesomeIcon icon={faEllipsis}/></button>
          </div>
        </div>
      </>
    )
  }
}

