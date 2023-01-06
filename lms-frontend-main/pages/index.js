import Link from "next/link";
import Layout from "../src/layout/Layout";

import dynamic from "next/dynamic";
// import Slider from "react-slick";
import Index1WorkStepSlider from "../src/components/slider/Index1WorkStepSlider";
import TestimonialsSlider from "../src/components/slider/testimonialsSlider";
import { useEffect } from "react";
// import { index1EventWrap, index1Testimonial } from "../src/sliderProps";

const Index1Isotope = dynamic(() => import("../src/components/isotope/Index1Isotope"), {
  ssr: false
});

function Index() {
  useEffect(() => {
    let userAccessToken = localStorage.getItem("user");
    if (userAccessToken) {
      let tokenObj = JSON.parse(userAccessToken);
      if (tokenObj && tokenObj.access) {
        const decode = JSON.parse(atob(tokenObj.access.split(".")[1]));
        let exp = decode && decode.exp;
        if (Date.now() > exp * 1000) {
          localStorage.removeItem("user");
        }
      }
    }
  }, []);
  return (
    <Layout footer={1}>
      <section className="hero-section rel z-1 pt-150 rpt-135 pb-75 rpb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="hero-content rpt-25 rmb-75">
                {/* <span className="sub-title style-two mb-20 wow fadeInUp delay-0-2s">
                  Coaching &amp; Speker
                </span> */}
                <h1 className="mb-20 wow fadeInUp delay-0-4s" style={{ textTransform: "none" }}>
                  Learn to Leverage Evidence for Decisions
                </h1>
                <p className="wow fadeInUp delay-0-6s">
                  A global knowledge exchange for empowering learners with skills <br />
                  in data-driven decision making
                </p>
                {/* <div className="hero-btn mt-30 wow fadeInUp delay-0-8s">
                  <Link href="/course-grid">
                    <a className="theme-btn">
                      Get Your Free Coach <i className="fas fa-arrow-right" />
                    </a>
                  </Link>
                </div> */}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-right-images text-lg-right wow fadeInUp delay-0-2s">
                <img src="assets/images/hero/hero-right.png" alt="Hero" />
              </div>
            </div>
          </div>
        </div>
        <span className="bg-text">coach</span>
      </section>
      {/* Hero Section End */}
      {/* Features Section Start */}
      <section className="features-section rel z-1 pt-80 pb-40 bg-blue text-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="feature-item wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="assets/images/features/icon1.png" alt="Icon" />
                </div>
                <div className="content">
                  <h4>Online Courses from Experts</h4>
                  <p>Designed by experts, our courses help you expand your skills and engage with a global network of learners.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-item wow fadeInUp delay-0-4s">
                <div className="image">
                  <img src="assets/images/features/live_training_icon.png" alt="Icon" />
                </div>
                <div className="content">
                  <h4>Live Training Sessions</h4>
                  <p>Our courses are led by seasoned industry experts who conduct live sessions and engage closely with learners.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-item wow fadeInUp delay-0-6s">
                <div className="image">
                  <img src="assets/images/features/case_baed_icon.png" alt="Icon" />
                </div>
                <div className="content">
                  <h4>Case-based Learning</h4>
                  <p>Immerse yourself in real-world learning and engage in application-based interactive sessions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="rectangle-dots" src="assets/images/shapes/rectangle-dots.png" alt="Shape" />
        <img className="circle-dots" src="assets/images/shapes/circle-dots.png" alt="Shape" />
      </section>
      {/* Features Section End */}
      {/* About Section Start */}
      <section className="about-section pt-130 rpt-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 align-self-end">
              <div className="about-man rmb-75 wow fadeInLeft delay-0-2s">
                <img src="assets/images/about/man.png" alt="Man" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="about-content rel z-2 pb-115 rpb-85 wow fadeInRight delay-0-2s">
                <div className="section-title mb-40">
                  {/* <span className="sub-title mb-25">about us</span> */}
                  <h2>Monitoring, Evaluation, and Learning for Development Professionals</h2>
                </div>
                <div className="about-features">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="feature-item" style={{ maxWidth: "100%" }}>
                        <div className="icon">
                          <i className="fas fa-check" />
                        </div>
                        <div className="content">
                          {/* <h5>Exclusive Coach</h5> */}
                          <p>Development professionals must understand the complex problems they want to solve, from public health to climate-friendly energy to education and livelihoods.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="feature-item">
                        <div className="icon">
                          <i className="fas fa-check" />
                        </div>
                        <div className="content">
                          {/* <h5>Creative Minds</h5> */}
                          <p>How can they effectively interpret data and evidence for making strategic decisions?</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="feature-item">
                        <div className="icon">
                          <i className="fas fa-check" />
                        </div>
                        <div className="content">
                          {/* <h5>Master Certified</h5> */}
                          <p>How do they verify that their programs are having the intended impact?</p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-sm-6">
                      <div className="feature-item">
                        <div className="icon">
                          <i className="fas fa-check" />
                        </div>
                        <div className="content">
                          <h5>Video Tutorials</h5>
                          <p>Sit consectetur adipiscing eiuse tempor incides</p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="about-btns">
                  <p>Sambodhi has designed an 18-week course to help answer these questions by enhancing knowledge, skills, and dialogue on MEL.</p>
                  {/* <Link href="/">
                    <a className="theme-btn style-two my-15">
                      Learn more us <i className="fas fa-arrow-right" />
                    </a>
                  </Link> */}
                  {/* <Link href="/faqs">
                    <a className="read-more">
                      How it works <i className="fas fa-arrow-right" />
                    </a>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section End */}
      {/* Coach Section Start */}
      {/* <Index1Isotope /> */}
      {/* Coach Section End */}

      <section className="why-choose-section pt-120 rpt-90 pb-130 rpb-100">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <div className="why-choose-content rmb-80 wow fadeInUp delay-0-2s">
                <div className="section-title mb-25">
                  {/* <span className="sub-title-three">
                    Why Ch<span>oose Us</span>
                  </span> */}
                  <h2>Why Learn with Us</h2>
                </div>
                {/* <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptat
                  santium doloremque laudantium, totam rem aperiam, eaque ipsa
                  quae abillo inventore veritatis et quasi architecto beatae
                  vitae dicta sunt explica boemo enim ipsam voluptatem quia
                  voluptas
                </p> */}
                <ul className="list-style-four pt-5 pb-35">
                  <li>Developed and facilitated by industry leaders and experts</li>
                  <li>Case studies and real-world examples from different sectors</li>
                  <li>Application-based interactive learning through classroom activities</li>
                  <li>Scholarships and discounts</li>
                  <li>Tailored for early career professionals with weekend classes</li>
                </ul>
                {/* <Link href="/">
                  <a className="theme-btn style-four">
                    Learn more <i className="fas fa-arrow-right" />
                  </a>
                </Link> */}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="why-choose-images mt-10 wow fadeInUp delay-0-4s">
                <img src="assets/images/why-choose/section_3_image.png" alt="Circle" className="circle" />
                {/* <img
                  src="assets/images/why-choose/why-choose1.jpg"
                  alt="Why Choose"
                  className="why-choose-one"
                />
                <img
                  src="assets/images/why-choose/why-choose2.jpg"
                  alt="Why Choose"
                  className="why-choose-two"
                />
                <img
                  src="assets/images/why-choose/why-choose3.jpg"
                  alt="Why Choose"
                  className="why-choose-three"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process Section Start */}
      <section className="work-process-section bg-white rel z-1 pt-130 rpt-100 pb-100 rpb-70">
        <div className="container">
          <Index1WorkStepSlider />
        </div>
      </section>
      {/* Work Process Section End */}
      {/* Newsletter Section Start */}
      <section className="newsletter-section pb-130 rpb-100 wow fadeInUp delay-0-2s">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="newsletter-video overlay">
                <img src="assets/images/video/video-bg.jpg" alt="Video" />
                {/* <a
                  href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                  className="mfp-iframe video-play"
                >
                  <i className="fas fa-play" />
                </a>*/}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="newsletter-content bg-lighter">
                <div className="section-title mb-20">
                  {/* <span className="sub-title mb-25">Newsletters</span> */}
                  <h2>Our vision</h2>
                </div>
                <p>
                  As an organization with almost two decades of experience in field building and nurturing outcomes-driven ecosystems, we are relentlessly pursuing our vision of empowering individuals and organizations with strategic and technical
                  skills to help them make better data-driven decisions, improve public policy, and pursue powerful ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter Section End */}
      <section className="why-learn-area pb-120 rpb-100">
        <div className="container">
          <div className="row align-items-center large-gap wow fadeInLeft delay-0-2s">
            <div className="col-lg-6">
              <div className="why-learn-content rmb-35 about-four-content">
                <div className="section-title mb-30">
                  {/* <span className="sub-title-two">Why Learn Us</span> */}
                  <h2>Who can learn with us</h2>
                </div>
                <ul className="list-style-one pt-5 pb-35">
                  <li>Individuals and organizations with a demonstrated commitment to and passion for serving the public interest.</li>
                  <li>Decision makers and think tanks with an urgency to make a difference in the world.</li>
                  <li>Those in need of specific skills, informed perspectives, and nuanced understanding to solve public problems.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="why-learn-image wow fadeInRight delay-0-2s">
                <img src="assets/images/about/why-learn.jpg" alt="Why Learn" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="work-process-section bg-white rel z-1 pt-130 rpt-100 pb-100 rpb-70">
        <div className="container">
          <TestimonialsSlider />
        </div>
      </section>
    </Layout>
  );
}
export default Index;
