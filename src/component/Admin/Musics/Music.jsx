import React from "react";
import { Tabs } from "antd";
import MusicSong from "./MusicSong";
import MusicType from "./MusicType";
import MusicSinger from "./MusicSinger";
import MusicPlaylist from "./MusicPlaylist";
import MusicAlbum from "./MusicAlbum";
import "./css/MusicBar.css";

export default function Music() {
  const items = [
    {
      key: "1",
      label: "Bài hát",
      children: <MusicSong />,
    },
    {
      key: "2",
      label: "Thể loại",
      children: <MusicType />,
    },
    {
      key: "3",
      label: "DJ/Producer",
      children: <MusicSinger />,
    },
    {
      key: "4",
      label: "Playlist",
      children: <MusicPlaylist />,
    },
    {
      key: "5",
      label: "Album",
      children: <MusicAlbum />,
    },
  ];
  return (
    <>
      <Tabs className="p-2" defaultActiveKey="1" items={items} />
    </>
  );
}
