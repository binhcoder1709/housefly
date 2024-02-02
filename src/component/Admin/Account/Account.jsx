import React from "react";
import { Tabs } from "antd";
import AllAccount from "./AllAccount";
import ActiveAccount from "./ActiveAccount";
import BlockAccount from "./BlockAccount";
import "./css/AccountBar.css";

export default function Account() {
  const items = [
    {
      key: "1",
      label: "Tất cả tài khoản",
      children: <AllAccount />,
    },
    {
      key: "2",
      label: "Tài khoản đang hoạt động",
      children: <ActiveAccount />,
    },
    {
      key: "3",
      label: "Tài khoản bị chặn",
      children: <BlockAccount />,
    },
  ];
  return (
    <>
      <Tabs className="p-2" defaultActiveKey="1" items={items} />
    </>
  );
}
