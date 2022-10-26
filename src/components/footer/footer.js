import "./footer.scss";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <section className="footer-section pt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-12 text-lg-center">
              <div className="px-5 px-lg-3">
                <img
                  src="/img/whitelogo.png"
                  alt="logo"
                  className="footerlogo"
                />
                <div className="footerAddress mt-5">
                  <p>Doha, Qatar</p>
                  <a href="#">Call us : 123-456-7890</a>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-2">
              <div className="footer-links mt-3 px-5 px-md-0">
                <h4>Our Products</h4>
                <ul>
                  <li>
                    <Link to="/">The Support Suite</Link>
                  </li>
                  <li>
                    <Link to="/">The Sales Suite</Link>
                  </li>
                  <li>
                    <Link to="/">Support</Link>
                  </li>
                  <li>
                    <Link to="/"> Guide</Link>
                  </li>
                  <li>
                    <Link to="/"> Explore</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-lg-2" md={4} lg={2}>
              <div className="footer-links mt-3 px-5 px-md-0">
                <h4>Our Products</h4>
                <ul>
                  <li>
                    <Link to="/">The Support Suite</Link>
                  </li>
                  <li>
                    <Link to="/">The Sales Suite</Link>
                  </li>
                  <li>
                    <Link to="/">Support</Link>
                  </li>
                  <li>
                    <Link to="/"> Guide</Link>
                  </li>
                  <li>
                    <Link to="/"> Explore</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-lg-2">
              <div className="footer-links mt-3 px-5 px-md-0">
                <h4>Our Products</h4>
                <ul>
                  <li>
                    <Link to="/">The Support Suite</Link>
                  </li>
                  <li>
                    <Link to="/">The Sales Suite</Link>
                  </li>
                  <li>
                    <Link to="/">Support</Link>
                  </li>
                  <li>
                    <Link to="/"> Guide</Link>
                  </li>
                  <li>
                    <Link to="/"> Explore</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-12 col-lg-3">
              <div className="footerMap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115443.09541843645!2d51.44195675873958!3d25.28414778835866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x44d9319f78cfd4b1!2sDoha%2C%20Qatar!5e0!3m2!1sen!2s!4v1655129002179!5m2!1sen!2s"></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_button py-2 text-center">
          <div>Copyright 2022 - 2023 © Storck Digital.</div>
        </div>
      </section>
    </>
  );
};
export default Footer;
