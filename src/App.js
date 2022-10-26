import "./App.scss";
import Home from "./pages/home/home.jsx";
import Services from './pages/services/services.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropertyDetailPage from "./pages/PropertyDetails/propertyDetails";
import ProfileDetail from './pages/profileDetails/profileDetails';
import Login from "./pages/auth/login";
import Register from './pages/auth/signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:id" element={<Services />} />
          <Route path="/propertydetails/:id" element={<PropertyDetailPage />} />
          <Route path="/profiledetails" element={<ProfileDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
