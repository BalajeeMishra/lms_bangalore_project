import Link from "next/link";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import Slider from "react-slick";
import PageBanner from "../src/components/PageBanner";
import WellernAccordion from "../src/components/WellernAccordion";
import Layout from "../src/layout/Layout";
import { coachSlider } from "../src/sliderProps";
const MyCourseDetails = () => {
  const [active, setActive] = useState(`collapse1`);
  const onClick = (value) => {
    console.log(value);
    setActive(value === active ? "" : value);
  };
  return (
    <Layout>
      <PageBanner pageName={"Course Details"} />
      <section className="course-details-area pt-130 rpt-100">
        <div className="container">
          <div className="row large-gap">
            <div className="col-lg-8">
              <div className="course-details-content">
                <div className="course-header">
                  <span className="category">Web Design</span>
                  
                </div>
                <h2>How to Learn Basic Web Design by Photoshop and Figma</h2>
                <ul className="author-date-enroll">
                  <li>
                    <img
                      src="assets/images/coachs/couse-author.jpg"
                      alt="Authro"
                    />
                    <h6>Donald J. Miller</h6>
                  </li>
                  <li>
                    <i className="fas fa-cloud-upload-alt" /> Last Update
                    February 15, 2022
                  </li>
                  <li>
                    <i className="far fa-user" /> 25 Enrolled
                  </li>
                </ul>
                <div className="image mb-35">
                  <img
                    src="assets/images/coachs/course-details.jpg"
                    alt="Course Details"
                  />
                </div>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur autodit aut fugit sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam este qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modis tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem enim ad minima veniam quis nostrum
                  exercitationem ullam corporis suscipit laboriosam, nisi ut
                  aliquid ex ea commo quatur? Quis autem vel eum iure
                  reprehenderit quin ea voluptate velit esse quam nihil
                  molestiae consequatur vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur
                </p>
                
                <h3>Course Curriculum in Web Design</h3>
                <Accordion
                  className="faq-accordion pt-10 pb-50 wow fadeInUp delay-0-2s"
                  id="course-faq"
                  defaultActiveKey="collapse1"
                >
                  <WellernAccordion
                    eventName={"collapse1"}
                    title={"Introduce Courses"}
                    active={active}
                    onClick={() => onClick("collapse1")}
                  >
                    <ul className="course-video-list">
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">What is Web Design ?</span>{" "}
                          <i className="far fa-play-circle" />{" "}
                          <span className="duration">18:23</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">
                            Diffent Between UX and UI Design ?
                          </span>{" "}
                          <i className="far fa-play-circle" />
                          <span className="duration">35:24</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">
                            Importance Of Typography ?
                          </span>
                          <i className="far fa-play-circle" />{" "}
                          <span className="duration">120:24</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">What is Warframe ?</span>
                          <i className="far fa-play-circle" />{" "}
                          <span className="duration">13:24</span>
                        </a>
                      </li>
                    </ul>
                  </WellernAccordion>
                  <WellernAccordion
                    title={"Practical Class "}
                    eventName={"collaps2"}
                    active={active}
                    onClick={() => onClick("collaps2")}
                  >
                    <ul className="course-video-list">
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">What is Web Design ?</span>{" "}
                          <i className="far fa-play-circle" />{" "}
                          <span className="duration">18:23</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">
                            Diffent Between UX and UI Design ?
                          </span>{" "}
                          <i className="far fa-play-circle" />
                          <span className="duration">35:24</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">
                            Importance Of Typography ?
                          </span>
                          <i className="far fa-play-circle" />{" "}
                          <span className="duration">120:24</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">What is Warframe ?</span>
                          <i className="far fa-play-circle" />{" "}
                          <span className="duration">13:24</span>
                        </a>
                      </li>
                    </ul>
                  </WellernAccordion>
                  <WellernAccordion
                    title={"Advance Project Class "}
                    eventName={"collaps3"}
                    active={active}
                    onClick={() => onClick("collaps3")}
                  >
                    <ul className="course-video-list">
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">What is Web Design ?</span>{" "}
                          <i className="far fa-play-circle" />{" "}
                          <span className="duration">18:23</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">
                            Diffent Between UX and UI Design ?
                          </span>{" "}
                          <i className="far fa-play-circle" />
                          <span className="duration">35:24</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">
                            Importance Of Typography ?
                          </span>
                          <i className="far fa-play-circle" />{" "}
                          <span className="duration">120:24</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                          className="mfp-iframe course-video-play"
                        >
                          <span className="title">What is Warframe ?</span>
                          <i className="far fa-play-circle" />{" "}
                          <span className="duration">13:24</span>
                        </a>
                      </li>
                    </ul>
                  </WellernAccordion>
                </Accordion>
                <h3>Instructors</h3>
                <div className="course-instructor pt-10 pb-55 wow fadeInUp delay-0-2s">
                  <div className="row align-items-center">
                    <div className="col-sm-5">
                      <div className="instructor-image">
                        <img
                          src="assets/images/teams/instructor.jpg"
                          alt="instructor"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="instructor-details">
                        <h4>John D. Mathews</h4>
                        <span className="designations">
                          Senior Web Designer
                        </span>
                        <div className="ratting mb-10">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <span>(50)</span>
                        </div>
                        <p>
                          Sit amet consectet adipising elit sed do eiusmod
                          incididunt ut labore et dolore magna
                        </p>
                        <h5>Follow Me</h5>
                        <div className="social-style-two">
                          <Link href="/contact">
                            <a>
                              <i className="fab fa-twitter" />
                            </a>
                          </Link>
                          <Link href="/contact">
                            <a>
                              <i className="fab fa-facebook-f" />
                            </a>
                          </Link>
                          <Link href="/contact">
                            <a>
                              <i className="fab fa-instagram" />
                            </a>
                          </Link>
                          <Link href="/contact">
                            <a>
                              <i className="fab fa-pinterest-p" />
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="col-lg-4">
              <div className="course-sidebar rmt-75">
                <div className="widget widget-course-details wow fadeInUp delay-0-2s">
                  
                  
                  <ul className="course-details-list mb-25">
                    <li>
                      <i className="far fa-file-alt" />{" "}
                      <span>Course Level</span> <b>Beginner</b>
                    </li>
                    <li>
                      <i className="far fa-clock" /> <span>Duration</span>{" "}
                      <b>25.5 Hr</b>
                    </li>
                    <li>
                      <i className="far fa-play-circle" /> <span>Lectures</span>{" "}
                      <b>9 Lectures</b>
                    </li>
                    <li>
                      <i className="far fa-clipboard" /> <span>Subject</span>{" "}
                      <b>Web Design</b>
                    </li>
                    <li>
                      <i className="fas fa-globe" /> <span>Language</span>{" "}
                      <b>English</b>
                    </li>
                  </ul>
                  <p>
                    Sit amet consectetur adipiscin sed eiusmod tempor incidide
                  </p>
                  
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Course Details End */}
      {/* Recent Coach Start */}
      
    </Layout>
  );
};
export default MyCourseDetails;
