import React from "react";
import Navigator from "../component/Client/Navigator/Navigator";
import { Outlet } from "react-router-dom";
import PlayBar from "../component/Client/Playbar/PlayBar";
import Header from "../component/Client/Header/Header";

export default function PublicRouter() {
  return (
    <>
      <div className="flex bg-[#020030]">
        <div className="w-[20%]">

        <Navigator />
        </div>
        <div className="flex flex-col w-[80%]">
          <Header />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <PlayBar />
    </>
  );
}
