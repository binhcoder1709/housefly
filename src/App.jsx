import PublicRouter from "./routes/PublicRouter.jsx";
import Home from "./component/Client/Home/Home.jsx";
import BXH from "./component/Client/BXH/BXH.jsx";
import Library from "./component/Client/Library/Library.jsx";
import Settings from "./component/Client/Setting/Settings.jsx";
import Login from "./component/Client/Login - Register/Login.jsx";
import Register from "./component/Client/Login - Register/Register.jsx";
import LibraryNavigator from "./component/Client/Library/LibraryNavigator.jsx";
import UserInfo from "./component/Client/UserInfo/UserInfo.jsx";
import UploadMusic from "./component/Client/UploadMusic.jsx";
import PrivateRouter from "./routes/PrivateRouter.jsx";
import HomeAdmin from "./component/Admin/Home/HomeAdmin.jsx";
import { Routes, Route } from "react-router-dom";
import Music from "./component/Admin/Musics/Music.jsx";
import Account from "./component/Admin/Account/Account.jsx";
import VIP from "./component/Admin/VIPAccount/VIP.jsx";
function App() {
  return (
    <>
      <Routes>
        // đường dẫn tới public router
        <Route path="/" element={<PublicRouter />}>
          <Route index element={<Home />} />
          <Route path="/BXH" element={<BXH />} />
          <Route path="/Library" element={<Library />}>
            <Route index element={<LibraryNavigator />} />
          </Route>
          <Route path="/Settings" element={<Settings />} />
          <Route path="/User" element={<UserInfo />} />
          <Route path="/Uploads" element={<UploadMusic />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        // đường dẫn tới private router
        <Route path="/Admin" element={<PrivateRouter />}>
          <Route index element={<HomeAdmin />} />
          <Route path="Account" element={<Account />} />
          <Route path="Music" element={<Music />} />
          <Route path="VIPAccount" element={<VIP />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
