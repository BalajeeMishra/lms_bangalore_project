import Isotope from "isotope-layout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const Index1Isotope = () => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".coach-active", {
        itemSelector: ".item",
        //    layoutMode: "fitRows",
        percentPosition: true,
        masonry: {
          columnWidth: ".item",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
    //     return () => isotope.current.destroy();
  }, []);
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  const activeBtn = (value) => (value === filterKey ? "current" : "");
  return (
    <section className="coach-section rel z-1 pt-120 rpt-90 pb-100 rpb-70 bg-lighter">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7 col-md-8">
            <div className="section-title text-center mb-40">
              <h2>Best Solutions For Life Coach Solutions</h2>
            </div>
          </div>
        </div>
        <ul className="coach-filter mb-35">
          <li
            data-filter="*"
            className={`c-pointer ${activeBtn("*")}`}
            onClick={handleFilterKeyChange("*")}
          >
            Show All
          </li>
          <li
            data-filter=".design"
            className={`c-pointer ${activeBtn("design")}`}
            onClick={handleFilterKeyChange("design")}
          >
            Web Design
          </li>
          <li
            data-filter=".marketing"
            className={`c-pointer ${activeBtn("marketing")}`}
            onClick={handleFilterKeyChange("marketing")}
          >
            Marketing
          </li>
          <li
            data-filter=".development"
            className={`c-pointer ${activeBtn("development")}`}
            onClick={handleFilterKeyChange("development")}
          >
            Development
          </li>
          <li
            data-filter=".technology"
            className={`c-pointer ${activeBtn("technology")}`}
            onClick={handleFilterKeyChange("technology")}
          >
            IT &amp; Technology
          </li>
          <li
            data-filter=".photography"
            className={`c-pointer ${activeBtn("photography")}`}
            onClick={handleFilterKeyChange("photography")}
          >
            Photography
          </li>
        </ul>
        <div className="row coach-active justify-content-center">
          <div className="col-lg-4 col-md-6 item marketing technology">
            <div className="coach-item wow fadeInUp delay-0-2s">
              <div className="coach-image">
                <Link href="/course-grid">
                  <a className="category">Lifestyle</a>
                </Link>
                <img src="assets/images/coachs/coach1.jpg" alt="Coach" />
              </div>
              <div className="coach-content">
                <span className="label">Basic Coach</span>
                <h4>
                  <Link href="/course-details">
                    Learn How to Manage Your Lifestyle
                  </Link>
                </h4>
                <div className="ratting-price">
                  <div className="ratting">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <span>(3k)</span>
                  </div>
                  <span className="price">256.95</span>
                </div>
                <ul className="coach-footer">
                  <li>
                    <i className="far fa-file-alt" />
                    <span>12 Lessions</span>
                  </li>
                  <li>
                    <i className="far fa-user" />
                    <span>seats</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 item design photography">
            <div className="coach-item wow fadeInUp delay-0-4s">
              <div className="coach-image">
                <Link href="/course-grid">
                  <a className="category">Web Design</a>
                </Link>
                <img src="assets/images/coachs/coach2.jpg" alt="Coach" />
              </div>
              <div className="coach-content">
                <span className="label">HTML CSS</span>
                <h4>
                  <Link href="/course-details">
                    How to Learn Basic Web Design HTML
                  </Link>
                </h4>
                <div className="ratting-price">
                  <div className="ratting">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <span>(3k)</span>
                  </div>
                  <span className="price">256.95</span>
                </div>
                <ul className="coach-footer">
                  <li>
                    <i className="far fa-file-alt" />
                    <span>12 Lessions</span>
                  </li>
                  <li>
                    <i className="far fa-user" />
                    <span>seats</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 item development photography">
            <div className="coach-item wow fadeInUp delay-0-6s">
              <div className="coach-image">
                <Link href="/course-grid">
                  <a className="category">Development</a>
                </Link>
                <img src="assets/images/coachs/coach3.jpg" alt="Coach" />
              </div>
              <div className="coach-content">
                <span className="label">Advance</span>
                <h4>
                  <Link href="/course-details">
                    Learn How to Manage Your Lifestyle
                  </Link>
                </h4>
                <div className="ratting-price">
                  <div className="ratting">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <span>(3k)</span>
                  </div>
                  <span className="price">256.95</span>
                </div>
                <ul className="coach-footer">
                  <li>
                    <i className="far fa-file-alt" />
                    <span>12 Lessions</span>
                  </li>
                  <li>
                    <i className="far fa-user" />
                    <span>seats</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 item design technology">
            <div className="coach-item wow fadeInUp delay-0-2s">
              <div className="coach-image">
                <Link href="/course-grid">
                  <a className="category">Technology</a>
                </Link>
                <img src="assets/images/coachs/coach4.jpg" alt="Coach" />
              </div>
              <div className="coach-content">
                <span className="label">Basic Coach</span>
                <h4>
                  <Link href="/course-details">
                    Learn How to Manage Your Lifestyle
                  </Link>
                </h4>
                <div className="ratting-price">
                  <div className="ratting">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <span>(3k)</span>
                  </div>
                  <span className="price">256.95</span>
                </div>
                <ul className="coach-footer">
                  <li>
                    <i className="far fa-file-alt" />
                    <span>12 Lessions</span>
                  </li>
                  <li>
                    <i className="far fa-user" />
                    <span>seats</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 item development photography">
            <div className="coach-item wow fadeInUp delay-0-4s">
              <div className="coach-image">
                <Link href="/course-grid">
                  <a className="category">Photography</a>
                </Link>
                <img src="assets/images/coachs/coach5.jpg" alt="Coach" />
              </div>
              <div className="coach-content">
                <span className="label">Photography</span>
                <h4>
                  <Link href="/course-details">
                    Learn Photography and Video Editing Basic
                  </Link>
                </h4>
                <div className="ratting-price">
                  <div className="ratting">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <span>(3k)</span>
                  </div>
                  <span className="price">256.95</span>
                </div>
                <ul className="coach-footer">
                  <li>
                    <i className="far fa-file-alt" />
                    <span>12 Lessions</span>
                  </li>
                  <li>
                    <i className="far fa-user" />
                    <span>seats</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 item design technology">
            <div className="coach-item wow fadeInUp delay-0-6s">
              <div className="coach-image">
                <Link href="/course-grid">
                  <a className="category">Marketing</a>
                </Link>
                <img src="assets/images/coachs/coach6.jpg" alt="Coach" />
              </div>
              <div className="coach-content">
                <span className="label">Basic Coach</span>
                <h4>
                  <Link href="/course-details">
                    Learn How to Manage Marketing Strategy
                  </Link>
                </h4>
                <div className="ratting-price">
                  <div className="ratting">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <span>(3k)</span>
                  </div>
                  <span className="price">256.95</span>
                </div>
                <ul className="coach-footer">
                  <li>
                    <i className="far fa-file-alt" />
                    <span>12 Lessions</span>
                  </li>
                  <li>
                    <i className="far fa-user" />
                    <span>seats</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Index1Isotope;
