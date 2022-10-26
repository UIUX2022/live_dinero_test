import "./mainLayout.scss";
import Header from "../../components/header/header.jsx";
import Footer from "../../components/footer/footer";
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      { children }
      <Footer />
    </>
  );
};
export default MainLayout;
