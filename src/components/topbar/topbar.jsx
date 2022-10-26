import "./topbar.scss";
import { Icon } from "@iconify/react";
const Topbar = () => {
  return (
    <div className="topbar_section">
      <div className="container-fluid py-2">
        <div className="row">
          <div className="col-7">
            <div className="top_Links">
              <ul className="p-0 m-0">
                <li className="px-3">
                  <a href="#">
                    <Icon icon="fluent:call-24-filled" />
                    &nbsp; +221 33 66 22
                  </a>
                </li>
                <li className="px-3">
                  <a href="#">
                    <Icon icon="fluent:mail-16-filled" />
                    &nbsp;  Info@dinero.com
                  </a>
                </li>
                <li className="px-3">
                  <a href="#">
                    {" "}
                    <Icon icon="ci:location" />
                    &nbsp;  Store Locations
                  </a>
                </li>
                <li className="px-3">
                  <a href="#">
                    <Icon icon="carbon:van" />
                    &nbsp;   Track Your Order
                  </a>
                </li>
              </ul>
            </div>
          </div>
                  <div className="col-5 d-flex justify-content-center">
                      <div className="del_return">
                          <a href="#">Delivery & Returns</a>
                      </div>
                      <div className="app_logins">
                          <Icon icon="bytesize:user" />
                          <a href="#">Login</a> / <a href="#">Login</a>
                      </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Topbar;
