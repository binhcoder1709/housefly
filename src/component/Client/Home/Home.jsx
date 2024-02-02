import React, { useEffect, useState } from "react";
import Navigator from "../Navigator/Navigator.jsx";
import Header from "../Header/Header.jsx";
import PlayBar from "../Playbar/PlayBar.jsx";
import Image1 from "../../../assets/imgs/i1.webp";
import { Link } from "react-router-dom";
import { firestore, database } from "../../../firebase/firebase.config.js";
import { ref, onValue, set } from "firebase/database";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { POSTURL } from "../../../contrains/index.js";
// import { ref, onValue } from "firebase/database";
export default function Home() {
  // state chứa dữ liệu về bài hát
  const [musicData, setMusicData] = useState([]);
  // state chứa dữ liệu về tác giả
  // gọi hàm useDisPatch();
  const dispatch = useDispatch();
  // lấy dữ liệu bài hát
  const handleMusicClick = (musicData) => {
    const musicInfo = {
      musicName: musicData.musicName,
      musicSource: musicData.musicSource,
      musicImage: musicData.musicImage,
      musicAuthor: musicData.musicAuthor,
    };
    dispatch({
      type: POSTURL,
      payload: musicInfo,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const musicSnapshot = await getDocs(collection(firestore, "musics"));
      const authorSnapshot = await getDocs(collection(firestore, "authors"));
      const musicDocuments = [];
      const authorDocuments = [];
      musicSnapshot.forEach((doc) => {
        musicDocuments.push({ id: doc.id, ...doc.data() });
      });
      setMusicData(musicDocuments);
      authorSnapshot.forEach((doc) => {
        authorDocuments.push({ id: doc.id, ...doc.data() });
      });
      setMusicData(musicDocuments);
    };
    fetchData();
  }, [musicData]);
  return (
    <>
      <div className="home-container overflow-auto h-[calc(100vh-170px)]  p-[20px]">
        <div className="flex flex-col gap-[10px]">
          <h1>Quẩy lên nào</h1>
          <div className="flex justify-center gap-5 pt-[10px] pb-[20px] border-t-[#00ff00] border-b-0 border-l-0 border-r-0 border-2">
            <Link className="w-[32%]">
              <img
                className="w-full h-[300px] object-cover"
                src={Image1}
                alt=""
              />
            </Link>
            <Link className="w-[32%]">
              <img
                className="w-full h-[300px] object-cover"
                src={Image1}
                alt=""
              />
            </Link>
            <Link className="w-[32%]">
              <img
                className="w-full h-[300px] object-cover"
                src={Image1}
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <h1>Vinahouse cực cháy</h1>
          <div className="flex gap-3 pt-[10px] pb-[20px] overflow-x-auto flex-wrap border-t-[#00ff00] border-b-0 border-l-0 border-r-0 border-2">
            {musicData.map((item) => (
              <div
                className="cursor-pointer"
                key={item.id}
                onClick={() => handleMusicClick(item)}
              >
                <img
                  className="w-[180px] h-[180px] object-cover"
                  src={item.musicImage}
                  alt=""
                />
                <span className="block whitespace-nowrap text-ellipsis overflow-hidden font-bold capitalize hover:text-[#00ff00] transition">
                  {item.musicName}
                </span>
                <span className="block whitespace-nowrap text-ellipsis overflow-hidden text-sm capitalize hover:text-[#00ff00] transition">
                  {item.musicAuthor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
