import React, {useState, useEffect} from "react";
import { firestore } from "../../../firebase/firebase.config";
import { getDocs, collection } from "firebase/firestore";

export default function ActiveAccount() {
  // link active icon
  const activeIcon = "https://img.icons8.com/emoji/48/green-circle-emoji.png";
  // lấy dữ liệu tài khoản từ database
  const [accountData, setAccountData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const accountDocuments = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().status == 1 && doc.data().role == "user") {
          accountDocuments.push({ id: doc.id, ...doc.data() });
        }
      });
      setAccountData(accountDocuments);
    };
    fetchData();
  }, [accountData]);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên tài khoản</th>
            <th>Email</th>
            <th>Mật khẩu</th>
            <th>Tình trạng</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {accountData.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.userName}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
                <div className="flex items-center justify-center gap-1">
                  <img
                    className="w-[10px] h-[10px]"
                    src="https://img.icons8.com/emoji/48/green-circle-emoji.png"
                    alt="green-circle-emoji"
                  />
                  <span className="text-black">Đang hoạt động</span>
                </div>
              </td>
              <td className="">
                <div className="flex gap-1 items-center justify-center">
                  <button type="button" className="bg-slate-400">
                    <img
                      className="w-[20px] h-[20px]"
                      src="https://img.icons8.com/ios-glyphs/30/edit--v1.png"
                      alt="edit--v1"
                    />
                  </button>
                  <button type="button" className="bg-slate-400">
                    <img
                      className="w-[20px] h-[20px]"
                      src="https://img.icons8.com/ios/50/lock--v1.png"
                      alt="lock--v1"
                    />
                  </button>
                  <button type="button" className="bg-slate-400">
                    <img
                      className="w-[20px] h-[20px]"
                      src="https://img.icons8.com/ios-glyphs/30/filled-trash.png"
                      alt="filled-trash"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
