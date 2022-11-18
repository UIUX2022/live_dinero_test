import "./mainLayout.scss";
import Header from "../../components/header/header.jsx";
import Footer from "../../components/footer/footer";
import MainMenu from "../../components/menuBar/menuBar";
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <MainMenu />
      <div className="layout-container mx-auto">{children}</div>

      <Footer />
    </>
  );
};
export default MainLayout;
