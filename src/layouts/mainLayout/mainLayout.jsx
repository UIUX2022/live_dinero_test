import "./mainLayout.scss";
import Header from "../../components/header/header.jsx";
import Footer from "../../components/footer/footer";
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="layout-container mx-auto">{children}</div>

      <Footer />
    </>
  );
};
export default MainLayout;
