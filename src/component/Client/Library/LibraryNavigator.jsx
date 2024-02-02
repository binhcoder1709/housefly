import React from "react";
import { Tabs } from "antd";
import LibrarySong from "./LibrarySong";
import LibraryTypes from "./LibraryTypes";
import LibrarySinger from "./LibrarySinger";
import LibraryAlbum from "./LibraryAlbum";
import LibraryPlaylist from "./LibraryPlaylist";
import "./css/LibraryBar.css";

export default function LibraryNavigator() {
  const items = [
    {
      key: "1",
      label: "Bài hát",
      children: <LibrarySong />,
    },
    {
      key: "2",
      label: "Thể loại",
      children: <LibraryTypes />,
    },
    {
      key: "3",
      label: "Tác giả",
      children: <LibrarySinger />,
    },
    {
      key: "4",
      label: "Album",
      children: <LibraryAlbum />,
    },
    {
      key: "5",
      label: "Playlist",
      children: <LibraryPlaylist />,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
}
