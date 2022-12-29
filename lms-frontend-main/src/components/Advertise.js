import Link from "next/link";
import advertise1 from "/public/assets/images/advertise/1.png";
import advertise2 from "/public/assets/images/advertise/2.png";
const Advertise = () => {
  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="advertise-item wow fadeInUp delay-0-2s">
          <div className="content">
            <h4>Become An Instructor?</h4>
            <p>
              Sit amet consectetur adipiscing sed eiusmod tempore dolore magna
              suspendisse
            </p>
            <Link href="/contact">
              <a className="theme-btn">
                Join with us <i className="fas fa-arrow-right" />
              </a>
            </Link>
          </div>
          <div className="image">
            <img src={advertise1.src} alt="Advertise" />
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="advertise-item bg-two wow fadeInUp delay-0-4s">
          <div className="content">
            <h4>Get Online Courses</h4>
            <p>
              Amet consectetur adipiscing sed eius tempore dolore magna suspens
            </p>
            <Link href="/contact">
              <a className="theme-btn style-two">
                Join with us <i className="fas fa-arrow-right" />
              </a>
            </Link>
          </div>
          <div className="image">
            <img src={advertise2.src} alt="Advertise" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Advertise;
