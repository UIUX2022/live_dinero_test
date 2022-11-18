import "./App.scss";
import Home from "./pages/home/home.js";
import Services from "./pages/services/services.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  useNavigation,
} from "react-router-dom";
import PropertyDetailPage from "./pages/PropertyDetails/propertyDetails";
import ProfileDetail from "./pages/profileDetails/profileDetails";
import UserServices from "./pages/user_services/user_services";
import Login from "./pages/auth/login";
import Register from "./pages/auth/signup";
import CreateService from "./pages/createNewService/createNewService";
import UserPropertyAdd from "./pages/userProAdds/userPropAdd";
import CreateNewAdds from "./pages/createNewAdd/createNewAdd";
import Preloader from "./components/preloader/preloader";
import ProfileSetting from "./pages/profileSetting/profileSetting";
import Error404 from "./pages/Error404/error404";
import ProtectedRoute from "./protectedRoute";
import ReserPasswords from "./pages/resetPassword/resetPassword";
// import ProtectedRoute from "./protectedRoute";
import { useSelector } from "react-redux";
function App() {
  const token = useSelector((state) => state.authReducer.token);

  return (
    <>
      <Preloader />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:id" element={<Services />} />
          <Route path="/addetails/:id" element={<PropertyDetailPage />} />
          <Route path="/profiledetails/:id" element={<ProfileDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/user/services"
            element={token ? <UserServices /> : <ProtectedRoute />}
          />
          <Route
            path="/user/create/services"
            element={token ? <CreateService /> : <ProtectedRoute />}
          />
          <Route
            path="/user/propertyAdds"
            element={token ? <UserPropertyAdd /> : <ProtectedRoute />}
          />
          
          <Route
            path="/user/profile/setting"
            element={token ? <ProfileSetting /> : <ProtectedRoute />}
          />
          <Route
            path="/user/restPassword"
            element={token ? <ReserPasswords /> : <ProtectedRoute />}
          />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
