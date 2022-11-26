import "./footer.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
  const services = useSelector((state) => state.authReducer.services);
  const [newsEmail, SetNewsEmail] = useState("");
  // ==============================================================
  // Post Api for NewLetters
  // ===============================================================
  const submitNewsEmail = (event) => {
    SetNewsEmail("");
    event.preventDefault();
  };
  return (
    <>
      <section className="footer-section pt-4 px-1 px-md-5">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-2 col-12">
              <div className="px-5 px-lg-3 mt-3">
                <img
                  src="/img/logo-white.png"
                  alt="logo"
                  className="footerlogo"
                />
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <div className="footer-links mt-3 px-5 px-md-0">
                <h4>Our Services</h4>
                <ul>
                  {services &&
                    services.map((item, index) => {
                      return (
                        <>
                          <li key={index}>
                            <Link to={`/services/${item.id}`}>
                              {item.title}
                            </Link>
                          </li>
                        </>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <div className="footer-links mt-3 px-5 px-md-0">
                <h4>UseFull Links</h4>
                <ul>
                  <li>
                    <Link to="/">Your Account</Link>
                  </li>
                  <li>
                    <Link to="/">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/">Terms And Conditions</Link>
                  </li>
                  <li>
                    <Link to="/">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-lg-4">
              <div className="footer_newLetter mt-3 footer-links ">
                <h4>News Letter</h4>
                <form onSubmit={submitNewsEmail}>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    required
                    value={newsEmail}
                    onChange={(e) => SetNewsEmail(e.target.value)}
                  />
                  <button className="submit_btn form-control mt-2 ">
                    SUBMIT
                  </button>
                </form>
                <p>Note: Submit your email for news updates</p>
              </div>
              <div className="footer_apps_link d-flex align-items-center gap-2 justify-content-end">
                <Link to="/">
                  <img src="/img/andriod-icon.png" alt="img" />
                </Link>
                <Link to="/">
                  <img src="/img/apple-icon.png" alt="img" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="new1" />
        <div className="footer_button py-2 text-center">
          <div>Copyright 2022 - 2023 © Storak Digital.</div>
        </div>
      </section>
    </>
  );
};
export default Footer;
