import Link from "next/link";
import { Fragment } from "react";
// import Newsletters from "../components/Newsletters";

// const Footer = ({ footer }) => {
  // const scrollTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };
//   switch (footer) {
//     case 1:
//       return <Footer1 scrollTop={scrollTop} />;
//     case 3:
//       return <Footer3 scrollTop={scrollTop} />;
//     case 4:
//       return <Footer4 scrollTop={scrollTop} />;
//     default:
//       return <DefaultFooter scrollTop={scrollTop} />;
//   }
// };
// export default Footer;

  const CopyRight = () => (
    <p>
      © {new Date().getFullYear()} <Link href="/">Sambodhi</Link> Research and Communications Pvt Ltd. <br/>All rights reserved.
    </p>
  );

  const FollowIcon = () => (
    <Fragment>
      <Link href="https://www.facebook.com/sambodhiresearch">
        <a>
          <i className="fab fa-facebook-f" />
        </a>
      </Link>
      <Link href="https://twitter.com/home">
        <a>
          <i className="fab fa-twitter" />
        </a>
      </Link>
      <Link href="https://www.linkedin.com/company/209274/admin/">
        <a>
          <i className="fab fa-linkedin-in" />
        </a>
      </Link>
      <Link href="https://www.youtube.com/channel/UC5k9Iiom0XcAHapsIwzncOw">
        <a>
          <i className="fab fa-youtube" />
        </a>
      </Link>
    </Fragment>
  );

  const Footer = () => {

    const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
    <footer className="main-footer bg-blue text-white pt-75">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-3 col-sm-4">
            <div className="footer-widget about-widget">
              <h5 className="footer-title">About Us</h5>
              <p>
              A global knowledge exchange for empowering learners with skills in data-driven decision making
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4">
          <div className="footer-widget contact-info-widget">
              <h5 className="footer-title">SOUTH ASIA</h5>
              <ul>
                  <li>
                    <i className="fas fa-map-marker-alt" />C - 126, Sector 2, Noida - 201301, Uttar Pradesh
                  </li>
                  <li>
                    <i className="far fa-envelope" />{" "}
                    <a href="mailto:course@educationnest.com">course@educationnest.com</a>
                  </li>
                  <li>
                    <i className="fas fa-phone" />{" "}
                    <a href="callto:+918069555055">+91 8069555055</a>
                  </li>
                </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4">
          <div className="footer-widget contact-info-widget">
              <h5 className="footer-title">SOUTH-EAST ASIA</h5>
              <ul>
                  <li>
                    <i className="fas fa-map-marker-alt" /> #132C, Street 135, Sangkat Psar Doeum Thkov, Khan Chamkarmorn Phnom Penh
                  </li>
                  {/* <li>
                    <i className="far fa-envelope" />{" "}
                    <a href="mailto:course@educationnest.com">course@educationnest.com</a>
                  </li>
                  <li>
                    <i className="fas fa-phone" />{" "}
                    <a href="callto:8069555055">8069555055</a>
                  </li> */}
                </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer-widget contact-info-widget">
              <h5 className="footer-title">SUB-SAHARAN AFRICA</h5>
              <ul>
                <li>
                  <i className="fas fa-map-marker-alt" /> Sambodhi Ltd 1 Floor, Acacia Estates Building, Kinondoni Road Dar-es-Salaam, Tanzania
                </li>
                {/* <li>
                  <i className="far fa-envelope" />{" "}
                  <a href="mailto:trainings@sambodhi.co.in">trainings@sambodhi.co.in</a>
                </li>
                <li>
                  <i className="fas fa-phone" />{" "}
                  <a href="callto:+0123456789"> +255 787894173</a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area bg-dark-blue rel">
        <div className="container">
          <div className="copyright-inner">
            <CopyRight />
            <div className="social-style-one">
                <FollowIcon />
              </div> 
          </div>
        </div>
        {/* Scroll Top Button */}
        <button
          className="scroll-top scroll-to-target"
          data-target="html"
          style={{ display: "inline-block" }}
          onClick={() => scrollTop()}
        >
          <span className="fas fa-angle-double-up" />
        </button>
      </div>
    </footer>
  )
};

export default Footer;