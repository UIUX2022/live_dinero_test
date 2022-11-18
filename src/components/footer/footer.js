import "./footer.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Footer = () => {
  const [services, setService] = useState([]);
  //  ================================================
  // Get api for Services
  // =================================================
  const getServices = async () => {
    await axios.get("services").then((resp) => {
      
      setService(resp.data.services);
    });
  };
  useEffect(() => {
    getServices();
  });
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
                <form>
                  <input type="email" className="form-control" />
                  <input
                    type="submit"
                    className="form-control mt-2 submit_btn"
                    value="SUBMIT"
                  />
                </form>
                <p>Note: Submit your email for news updates</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="new1" />
        <div className="footer_button py-2 text-center">
          <div>Copyright 2022 - 2023 © Storck Digital.</div>
        </div>
      </section>
    </>
  );
};
export default Footer;
