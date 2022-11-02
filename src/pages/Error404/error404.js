import "./error404.scss";
import Mainlayout from "../../layouts/mainLayout/mainLayout";
const Error404 = () => {
  return (
    <>
      <Mainlayout>
        <div className="error_page">
          <di className="error_pageContent">
            <div className="d-flex justify-content-center align-items-end">
              <div className="text-center">
                <h5>ERROR</h5>
                <h4>404</h4>
              </div>
              <div>
                <img src="/img/404.png" />{" "}
              </div>
            </div>
            <p>OOPS..SORRY WE COULDN’T FIND YOUR PAGE</p>
          </di>
        </div>
      </Mainlayout>
    </>
  );
};
export default Error404;
